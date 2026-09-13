import nodemailer from "nodemailer";
import fs from "node:fs";
import path from "node:path";
import { actionsLogger } from "@/lib/logger";

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 465;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

const SITE_URL = "https://ashencrest.com";

// Load logo as base64 for embedding in emails
let LOGO_BASE64: string | null = null;
try {
  const logoPath = path.join(process.cwd(), "public", "logo.png");
  if (fs.existsSync(logoPath)) {
    LOGO_BASE64 = `data:image/png;base64,${fs.readFileSync(logoPath).toString("base64")}`;
  }
} catch {
  // Logo not available — emails will use text header instead
}

/**
 * Wraps content in a beautiful branded Ashencrest email template with logo.
 */
function emailTemplate(content: string): string {
  const logoHtml = LOGO_BASE64
    ? `<img src="${LOGO_BASE64}" alt="Ashencrest" width="120" height="120" style="display:block;margin:0 auto;border-radius:16px;" />`
    : `<h1 style="color:#c9a96e;font-size:28px;font-weight:700;letter-spacing:2px;margin:0;">ASHENCREST</h1>`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ashencrest</title>
</head>
<body style="margin:0;padding:0;background:#f5f3ef;font-family:Georgia,'Times New Roman',serif;">
  <!-- Preheader (hidden) -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">Ashencrest — Celebrity Booking Agency</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f3ef;">
    <tr>
      <td align="center" style="padding:24px 16px;">
        <!-- Main container -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(15,10,10,0.08);">

          <!-- Header with logo -->
          <tr>
            <td style="padding:40px 40px 32px;text-align:center;background:linear-gradient(180deg,#0f0a0a 0%,#1a1212 100%);">
              ${logoHtml}
              <p style="margin:12px 0 0;color:#a89070;font-size:11px;letter-spacing:3px;text-transform:uppercase;">Celebrity Booking Agency</p>
            </td>
          </tr>

          <!-- Gold accent line -->
          <tr>
            <td style="padding:0;">
              <div style="height:3px;background:linear-gradient(90deg,#c9a96e,#e8d5b0,#c9a96e);"></div>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:40px;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:32px 40px;background:#0f0a0a;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="text-align:center;">
                    <p style="margin:0 0 8px;color:#c9a96e;font-size:16px;font-weight:700;letter-spacing:1px;">Ashencrest</p>
                    <p style="margin:0 0 16px;color:#8a8078;font-size:12px;line-height:1.6;">
                      A full-service celebrity booking agency connecting clients<br>
                      with world-renowned talent for unforgettable experiences.
                    </p>
                    <p style="margin:0 0 4px;color:#8a8078;font-size:12px;">
                      <a href="mailto:bookings@ashencrest.com" style="color:#c9a96e;text-decoration:none;">bookings@ashencrest.com</a>
                      &nbsp;&middot;&nbsp;
                      <a href="tel:+12096210270" style="color:#c9a96e;text-decoration:none;"> </a>
                    </p>
                    <p style="margin:16px 0 0;color:#5a5048;font-size:11px;">
                      &copy; 2026 Ashencrest. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>

        <!-- Disclaimer below email -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <tr>
            <td style="padding:16px 0;text-align:center;">
              <p style="margin:0;color:#999;font-size:10px;line-height:1.5;">
                Ashencrest is an independent booking agency and is not affiliated with,<br>
                endorsed by, or sponsored by any of the celebrities listed. All celebrity names,<br>
                images, and likenesses are the property of their respective owners.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Sends an email to the admin (bookings@ashencrest.com) using the configured
 * Hostinger SMTP server. Falls back to a no-op log when credentials are missing
 * so the app still works in development without email configured.
 */
export async function sendAdminEmail(subject: string, html: string): Promise<boolean> {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || SMTP_PASS === "your_hostinger_email_password") {
    actionsLogger.warn({ msg: "Email not sent — SMTP not configured", subject });
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"Ashencrest" <${SMTP_USER}>`,
      to: SMTP_USER,
      subject,
      html: emailTemplate(html),
    });

    actionsLogger.info({ msg: "Admin email sent", subject });
    return true;
  } catch (err) {
    actionsLogger.error({ msg: "Failed to send admin email", subject, error: String(err) });
    return false;
  }
}

/**
 * Sends an email to a specific recipient (e.g. auto-reply to the user).
 */
export async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || SMTP_PASS === "your_hostinger_email_password") {
    actionsLogger.warn({ msg: "Email not sent — SMTP not configured", subject, to });
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"Ashencrest" <${SMTP_USER}>`,
      to,
      subject,
      html: emailTemplate(html),
    });

    actionsLogger.info({ msg: "Email sent", subject, to });
    return true;
  } catch (err) {
    actionsLogger.error({ msg: "Failed to send email", subject, to, error: String(err) });
    return false;
  }
}
