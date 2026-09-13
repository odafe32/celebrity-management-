import { LegalPage } from "@/components/legal-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description: "Refund and cancellation policy for Ashencrest celebrity bookings.",
};

const SECTIONS = [
  { title: "1. Deposits", body: "A deposit is required to secure most celebrity bookings. Deposits are non-refundable and serve to reserve the celebrity's date and time." },
  { title: "2. Cancellation by Client", body: "If you cancel more than 30 days before the event date, you will receive a 50% refund of any amount paid beyond the deposit. Cancellations within 14-30 days of the event are subject to 75% charges. Cancellations within 14 days of the event are subject to full charges." },
  { title: "3. Cancellation by Celebrity", body: "If a celebrity cancels due to unforeseen circumstances, Ashencrest will offer a full refund or the option to book an alternative celebrity of equal or greater value at no additional cost." },
  { title: "4. Event Postponement", body: "If you need to postpone your event, contact us as soon as possible. We will work with the celebrity's team to reschedule. Postponement is subject to availability and may incur additional fees if the new date requires different arrangements." },
  { title: "5. Force Majeure", body: "Ashencrest is not liable for cancellations or delays caused by acts of God, natural disasters, pandemics, government restrictions, or other circumstances beyond our control. In such cases, we will work with you to reschedule or provide a credit for future bookings." },
  { title: "6. Refund Processing", body: "Approved refunds are processed within 10 business days to the original payment method. Processing times may vary depending on your bank or payment provider." },
  { title: "7. Partial Services", body: "If a celebrity appears at your event but the engagement is cut short due to client-side issues (venue problems, safety concerns, etc.), no refund will be issued." },
  { title: "8. Disputes", body: "Any disputes regarding refunds or cancellations should be directed to bookings@ashencrest.com. We aim to resolve all disputes within 5 business days." },
];

export default function RefundPage() {
  return <LegalPage title="Refund & Cancellation Policy" updated="November 2025" sections={SECTIONS} />;
}
