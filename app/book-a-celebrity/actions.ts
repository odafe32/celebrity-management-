"use server";

import { z } from "zod";
import { db } from "@/src/prisma/db";
import { getCelebrityBySlug } from "@/lib/celebrities";
import { actionsLogger, dbLogger } from "@/lib/logger";
import { sendAdminEmail, sendEmail } from "@/lib/mail";

const bookingSchema = z.object({
  celebrity: z.string().min(1, "Please select a celebrity"),
  service: z.string().min(1, "Please select a service type"),
  date: z.string().min(1, "Please select an event date"),
  time: z.string().min(1, "Please select an event time"),
  persons: z.string().min(1, "Please select number of persons"),
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  phone: z.string().min(7, "Please enter a valid phone number").max(30),
  budget: z.string().max(50).optional().or(z.literal("")),
  location: z.string().max(200).optional().or(z.literal("")),
  requests: z.string().max(2000).optional().or(z.literal("")),
});

export type BookingInput = z.infer<typeof bookingSchema>;
export type SubmitBookingResult =
  | { success: true; refNumber: string }
  | { success: false; error: string };

/**
 * Submit a booking inquiry. Creates a Customer (upsert by email),
 * upserts the Educator row, and creates a Lead with stage "new".
 * Sends confirmation emails to admin and the customer.
 * No login required — customers are captured from form submissions only.
 */
export async function submitBooking(input: BookingInput): Promise<SubmitBookingResult> {
  actionsLogger.info(
    { celebrity: input.celebrity, service: input.service, name: input.name },
    "Booking inquiry received"
  );

  const parsed = bookingSchema.safeParse(input);
  if (!parsed.success) {
    actionsLogger.warn({ issues: parsed.error.issues }, "Booking validation failed");
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const { celebrity, date, time, persons, name, email, phone, budget, location, requests } = parsed.data;

  const celeb = getCelebrityBySlug(celebrity);
  if (!celeb) {
    actionsLogger.warn({ celebritySlug: celebrity }, "Booking: celebrity not found in roster");
    return { success: false, error: "Celebrity not found" };
  }

  let refNumber = `ASH-${Date.now().toString(36).toUpperCase().slice(-6)}`;

  try {
    // 1. Upsert Customer (identified by email, no login)
    dbLogger.debug({ email }, "Upserting Customer for booking");
    const customer = await db.customer.upsert({
      where: { email },
      create: { name, email, phone },
      update: {},
    });

    // 2. Upsert Educator row
    dbLogger.debug({ slug: celeb.slug }, "Upserting Educator for booking");
    const educator = await db.educator.upsert({
      where: { slug: celeb.slug },
      create: {
        name: celeb.name,
        slug: celeb.slug,
        profession: celeb.profession,
        photoUrl: celeb.photoUrl || null,
        bio: celeb.bio,
        extLink: celeb.wikiUrl,
        status: "published",
        featured: celeb.featured,
        sortOrder: celeb.sortOrder,
        currency: celeb.currency,
      },
      update: {},
    });

    // 3. Create Lead
    dbLogger.debug({ customerId: customer.id, educatorId: educator.id }, "Creating Lead");
    const lead = await db.lead.create({
      data: {
        educatorId: educator.id,
        customerId: customer.id,
        eventDate: date,
        eventTime: time,
        numPersons: parseInt(persons, 10) || 1,
        budget: budget || null,
        eventLocation: location || null,
        specialRequests: requests || null,
        stage: "new",
      },
    });

    refNumber = `ASH-${lead.id.toString(36).toUpperCase().padStart(6, "0")}`;

    actionsLogger.info(
      { leadId: lead.id, refNumber, customerId: customer.id, educatorId: educator.id, celebrity: celeb.slug },
      "Booking inquiry created successfully"
    );
  } catch (err) {
    actionsLogger.error({ err, celebrity: celeb.slug, name }, "submitBooking DB failed — continuing with email");
    // Don't fail the whole submission if DB fails — still send emails
  }

  // ─── Send emails ───
  const serviceLabel = celeb.profession;
  const formattedDate = date ? new Date(date + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) : date;

  // Admin email
  const adminContent = `
    <h2 style="margin:0 0 8px;color:#0f0a0a;font-size:22px;font-weight:700;font-family:Georgia,serif;">New Booking Inquiry</h2>
    <p style="margin:0 0 8px;color:#666;font-size:14px;">A booking inquiry has been submitted from the website.</p>
    <p style="margin:0 0 24px;color:#c9a96e;font-size:16px;font-weight:700;">Reference: ${refNumber}</p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8e0d4;border-radius:8px;overflow:hidden;">
      <tr style="background:#faf8f4;">
        <td style="padding:12px 16px;font-weight:700;color:#0f0a0a;font-size:13px;width:35%;border-bottom:1px solid #e8e0d4;">Celebrity</td>
        <td style="padding:12px 16px;color:#444;font-size:13px;border-bottom:1px solid #e8e0d4;">${celeb.name}</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-weight:700;color:#0f0a0a;font-size:13px;border-bottom:1px solid #e8e0d4;">Service Type</td>
        <td style="padding:12px 16px;color:#444;font-size:13px;border-bottom:1px solid #e8e0d4;">${input.service}</td>
      </tr>
      <tr style="background:#faf8f4;">
        <td style="padding:12px 16px;font-weight:700;color:#0f0a0a;font-size:13px;border-bottom:1px solid #e8e0d4;">Event Date</td>
        <td style="padding:12px 16px;color:#444;font-size:13px;border-bottom:1px solid #e8e0d4;">${formattedDate} at ${time}</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-weight:700;color:#0f0a0a;font-size:13px;border-bottom:1px solid #e8e0d4;">Number of Persons</td>
        <td style="padding:12px 16px;color:#444;font-size:13px;border-bottom:1px solid #e8e0d4;">${persons}</td>
      </tr>
      <tr style="background:#faf8f4;">
        <td style="padding:12px 16px;font-weight:700;color:#0f0a0a;font-size:13px;border-bottom:1px solid #e8e0d4;">Customer Name</td>
        <td style="padding:12px 16px;color:#444;font-size:13px;border-bottom:1px solid #e8e0d4;">${name}</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-weight:700;color:#0f0a0a;font-size:13px;border-bottom:1px solid #e8e0d4;">Email</td>
        <td style="padding:12px 16px;color:#444;font-size:13px;border-bottom:1px solid #e8e0d4;"><a href="mailto:${email}" style="color:#c9a96e;text-decoration:none;">${email}</a></td>
      </tr>
      <tr style="background:#faf8f4;">
        <td style="padding:12px 16px;font-weight:700;color:#0f0a0a;font-size:13px;border-bottom:1px solid #e8e0d4;">Phone</td>
        <td style="padding:12px 16px;color:#444;font-size:13px;border-bottom:1px solid #e8e0d4;">${phone}</td>
      </tr>
      ${budget ? `<tr><td style="padding:12px 16px;font-weight:700;color:#0f0a0a;font-size:13px;border-bottom:1px solid #e8e0d4;">Budget</td><td style="padding:12px 16px;color:#444;font-size:13px;border-bottom:1px solid #e8e0d4;">${budget}</td></tr>` : ""}
      ${location ? `<tr style="background:#faf8f4;"><td style="padding:12px 16px;font-weight:700;color:#0f0a0a;font-size:13px;border-bottom:1px solid #e8e0d4;">Event Location</td><td style="padding:12px 16px;color:#444;font-size:13px;border-bottom:1px solid #e8e0d4;">${location}</td></tr>` : ""}
      ${requests ? `<tr><td style="padding:12px 16px;font-weight:700;color:#0f0a0a;font-size:13px;border-bottom:1px solid #e8e0d4;vertical-align:top;">Special Requests</td><td style="padding:12px 16px;color:#444;font-size:13px;border-bottom:1px solid #e8e0d4;">${requests}</td></tr>` : ""}
    </table>

    <p style="margin:24px 0 0;color:#999;font-size:12px;">This booking inquiry was submitted from the Ashencrest website.</p>
  `;

  const adminSent = await sendAdminEmail(`Booking Inquiry: ${celeb.name} — ${refNumber}`, adminContent);

  // Customer auto-reply
  const userContent = `
    <h2 style="margin:0 0 8px;color:#0f0a0a;font-size:24px;font-weight:700;font-family:Georgia,serif;">Thank you, ${name}!</h2>
    <p style="margin:0 0 20px;color:#444;font-size:15px;line-height:1.7;">
      Your booking inquiry has been received. We&rsquo;ll be in touch within
      <strong style="color:#c9a96e;">24 hours</strong> to discuss availability and pricing for
      <strong style="color:#c9a96e;">${celeb.name}</strong>.
    </p>

    <div style="background:#faf8f4;border-left:4px solid #c9a96e;border-radius:8px;padding:20px;margin:24px 0;">
      <h3 style="margin:0 0 12px;font-size:14px;color:#0f0a0a;text-transform:uppercase;letter-spacing:1px;">Your Booking Reference</h3>
      <p style="margin:0;font-family:monospace;font-size:20px;font-weight:700;color:#c9a96e;">${refNumber}</p>
      <p style="margin:8px 0 0;color:#999;font-size:12px;">Please keep this reference number for your records.</p>
    </div>

    <div style="background:#faf8f4;border-radius:8px;padding:20px;margin:24px 0;">
      <h3 style="margin:0 0 12px;font-size:14px;color:#0f0a0a;text-transform:uppercase;letter-spacing:1px;">Booking Summary</h3>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:6px 0;font-weight:700;color:#0f0a0a;font-size:13px;width:35%;">Celebrity:</td>
          <td style="padding:6px 0;color:#444;font-size:13px;">${celeb.name}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-weight:700;color:#0f0a0a;font-size:13px;">Service:</td>
          <td style="padding:6px 0;color:#444;font-size:13px;">${input.service}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-weight:700;color:#0f0a0a;font-size:13px;">Date & Time:</td>
          <td style="padding:6px 0;color:#444;font-size:13px;">${formattedDate} at ${time}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-weight:700;color:#0f0a0a;font-size:13px;">Persons:</td>
          <td style="padding:6px 0;color:#444;font-size:13px;">${persons}</td>
        </tr>
        ${location ? `<tr><td style="padding:6px 0;font-weight:700;color:#0f0a0a;font-size:13px;">Location:</td><td style="padding:6px 0;color:#444;font-size:13px;">${location}</td></tr>` : ""}
        ${budget ? `<tr><td style="padding:6px 0;font-weight:700;color:#0f0a0a;font-size:13px;">Budget:</td><td style="padding:6px 0;color:#444;font-size:13px;">${budget}</td></tr>` : ""}
      </table>
    </div>

    <p style="margin:0 0 16px;color:#444;font-size:15px;line-height:1.7;">
      A member of our team will review your request and contact you shortly with availability,
      pricing, and next steps. If you have any urgent questions in the meantime, feel free to
      reach us using the contact details below.
    </p>

    <div style="background:#0f0a0a;border-radius:8px;padding:20px;margin:24px 0;text-align:center;">
      <p style="margin:0 0 8px;color:#a89070;font-size:11px;text-transform:uppercase;letter-spacing:2px;">Need to reach us sooner?</p>
      <p style="margin:0;color:#ffffff;font-size:14px;">
        <a href="mailto:bookings@ashencrest.com" style="color:#c9a96e;text-decoration:none;">bookings@ashencrest.com</a>
        &nbsp;&middot;&nbsp;
        <a href="tel:+12096210270" style="color:#c9a96e;text-decoration:none;"> </a>
      </p>
      <p style="margin:8px 0 0;color:#8a8078;font-size:12px;">
        Or use the live chat on our website to speak with our team directly.
      </p>
    </div>

    <p style="margin:24px 0 0;color:#999;font-size:12px;line-height:1.6;border-top:1px solid #e8e0d4;padding-top:16px;">
      This is an automated confirmation email. Please do not reply to this message.
      Our staff will contact you separately to discuss your booking.
    </p>
  `;

  const userSent = await sendEmail(email, `Your booking inquiry — ${refNumber}`, userContent);

  if (!adminSent) actionsLogger.warn({ refNumber }, "Booking admin email not sent");
  if (!userSent) actionsLogger.warn({ refNumber, email }, "Booking auto-reply email not sent");

  return { success: true, refNumber };
}
