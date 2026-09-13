"use server";

import { z } from "zod";
import { sendAdminEmail, sendEmail } from "@/lib/mail";
import { actionsLogger } from "@/lib/logger";

const RequestSchema = z.object({
  celebrityName: z.string().min(2, "Celebrity name is required").max(100),
  requesterName: z.string().min(2, "Your name is required").max(100),
  requesterEmail: z.string().email("Valid email is required"),
  eventType: z.string().max(50).optional(),
  eventDate: z.string().optional(),
  eventLocation: z.string().max(200).optional(),
  budget: z.string().max(50).optional(),
  eventDetails: z.string().max(2000).optional(),
});

export type CelebrityRequestResult = {
  success: boolean;
  error?: string;
};

export async function submitCelebrityRequest(
  input: z.infer<typeof RequestSchema>
): Promise<CelebrityRequestResult> {
  actionsLogger.info({
    msg: "Celebrity request submission received",
    celebrityName: input.celebrityName,
  });

  const parsed = RequestSchema.safeParse(input);
  if (!parsed.success) {
    actionsLogger.warn({
      msg: "Celebrity request validation failed",
      errors: parsed.error.issues.map((i) => i.message).join(", "),
    });
    return { success: false, error: parsed.error.issues[0]?.message || "Invalid input" };
  }

  const {
    celebrityName,
    requesterName,
    requesterEmail,
    eventType,
    eventDate,
    eventLocation,
    budget,
    eventDetails,
  } = parsed.data;

  // ─── 1. Admin email ───
  const adminContent = `
    <h2 style="margin:0 0 8px;color:#0f0a0a;font-size:22px;font-weight:700;font-family:Georgia,serif;">New Celebrity Request</h2>
    <p style="margin:0 0 24px;color:#666;font-size:14px;">A user has submitted a celebrity request from the website.</p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8e0d4;border-radius:8px;overflow:hidden;">
      <tr style="background:#faf8f4;">
        <td style="padding:12px 16px;font-weight:700;color:#0f0a0a;font-size:13px;width:35%;border-bottom:1px solid #e8e0d4;">Requested Celebrity</td>
        <td style="padding:12px 16px;color:#444;font-size:13px;border-bottom:1px solid #e8e0d4;">${celebrityName}</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-weight:700;color:#0f0a0a;font-size:13px;border-bottom:1px solid #e8e0d4;">Requester Name</td>
        <td style="padding:12px 16px;color:#444;font-size:13px;border-bottom:1px solid #e8e0d4;">${requesterName}</td>
      </tr>
      <tr style="background:#faf8f4;">
        <td style="padding:12px 16px;font-weight:700;color:#0f0a0a;font-size:13px;border-bottom:1px solid #e8e0d4;">Requester Email</td>
        <td style="padding:12px 16px;color:#444;font-size:13px;border-bottom:1px solid #e8e0d4;"><a href="mailto:${requesterEmail}" style="color:#c9a96e;text-decoration:none;">${requesterEmail}</a></td>
      </tr>
      ${eventType ? `<tr><td style="padding:12px 16px;font-weight:700;color:#0f0a0a;font-size:13px;border-bottom:1px solid #e8e0d4;">Event Type</td><td style="padding:12px 16px;color:#444;font-size:13px;border-bottom:1px solid #e8e0d4;">${eventType}</td></tr>` : ""}
      ${eventDate ? `<tr style="background:#faf8f4;"><td style="padding:12px 16px;font-weight:700;color:#0f0a0a;font-size:13px;border-bottom:1px solid #e8e0d4;">Event Date</td><td style="padding:12px 16px;color:#444;font-size:13px;border-bottom:1px solid #e8e0d4;">${eventDate}</td></tr>` : ""}
      ${eventLocation ? `<tr><td style="padding:12px 16px;font-weight:700;color:#0f0a0a;font-size:13px;border-bottom:1px solid #e8e0d4;">Event Location</td><td style="padding:12px 16px;color:#444;font-size:13px;border-bottom:1px solid #e8e0d4;">${eventLocation}</td></tr>` : ""}
      ${budget ? `<tr style="background:#faf8f4;"><td style="padding:12px 16px;font-weight:700;color:#0f0a0a;font-size:13px;border-bottom:1px solid #e8e0d4;">Budget</td><td style="padding:12px 16px;color:#444;font-size:13px;border-bottom:1px solid #e8e0d4;">${budget}</td></tr>` : ""}
      ${eventDetails ? `<tr><td style="padding:12px 16px;font-weight:700;color:#0f0a0a;font-size:13px;border-bottom:1px solid #e8e0d4;vertical-align:top;">Event Details</td><td style="padding:12px 16px;color:#444;font-size:13px;border-bottom:1px solid #e8e0d4;">${eventDetails}</td></tr>` : ""}
    </table>

    <p style="margin:24px 0 0;color:#999;font-size:12px;">This request was submitted from the Ashencrest website.</p>
  `;

  const adminSent = await sendAdminEmail(
    `Celebrity Request: ${celebrityName}`,
    adminContent
  );

  // ─── 2. Auto-reply to user ───
  const userContent = `
    <h2 style="margin:0 0 8px;color:#0f0a0a;font-size:24px;font-weight:700;font-family:Georgia,serif;">We received your request, ${requesterName}!</h2>
    <p style="margin:0 0 20px;color:#444;font-size:15px;line-height:1.7;">
      Thank you for reaching out to Ashencrest. We have received your request to book
      <strong style="color:#c9a96e;">${celebrityName}</strong> and our team is already reviewing it.
    </p>

    <div style="background:#faf8f4;border-left:4px solid #c9a96e;border-radius:8px;padding:20px;margin:24px 0;">
      <h3 style="margin:0 0 12px;font-size:14px;color:#0f0a0a;text-transform:uppercase;letter-spacing:1px;">Your Request Summary</h3>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:6px 0;font-weight:700;color:#0f0a0a;font-size:13px;width:35%;">Celebrity:</td>
          <td style="padding:6px 0;color:#444;font-size:13px;">${celebrityName}</td>
        </tr>
        ${eventType ? `<tr><td style="padding:6px 0;font-weight:700;color:#0f0a0a;font-size:13px;">Event Type:</td><td style="padding:6px 0;color:#444;font-size:13px;">${eventType}</td></tr>` : ""}
        ${eventDate ? `<tr><td style="padding:6px 0;font-weight:700;color:#0f0a0a;font-size:13px;">Event Date:</td><td style="padding:6px 0;color:#444;font-size:13px;">${eventDate}</td></tr>` : ""}
        ${eventLocation ? `<tr><td style="padding:6px 0;font-weight:700;color:#0f0a0a;font-size:13px;">Location:</td><td style="padding:6px 0;color:#444;font-size:13px;">${eventLocation}</td></tr>` : ""}
        ${budget ? `<tr><td style="padding:6px 0;font-weight:700;color:#0f0a0a;font-size:13px;">Budget:</td><td style="padding:6px 0;color:#444;font-size:13px;">${budget}</td></tr>` : ""}
      </table>
    </div>

    <p style="margin:0 0 16px;color:#444;font-size:15px;line-height:1.7;">
      A member of our staff will follow up with you as soon as possible to discuss
      availability, pricing, and next steps. We typically respond within
      <strong>24-48 hours</strong>.
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
      Our staff will contact you separately to discuss your request.
    </p>
  `;

  const userSent = await sendEmail(
    requesterEmail,
    "We received your celebrity request — Ashencrest",
    userContent
  );

  if (!adminSent) {
    actionsLogger.warn({ msg: "Admin email not sent (SMTP not configured)" });
  }
  if (!userSent) {
    actionsLogger.warn({ msg: "Auto-reply email not sent (SMTP not configured)" });
  }

  actionsLogger.info({
    msg: "Celebrity request submitted",
    celebrityName,
    requesterName,
    adminEmailSent: adminSent,
    autoReplySent: userSent,
  });

  return { success: true };
}
