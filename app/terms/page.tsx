import { LegalPage } from "@/components/legal-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Ashencrest celebrity booking platform.",
};

const SECTIONS = [
  { title: "1. Acceptance of Terms", body: "By accessing and using Ashencrest (the \"Site\"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Site." },
  { title: "2. Services", body: "Ashencrest is a celebrity booking agency that facilitates connections between clients and celebrities for events, appearances, endorsements, and related services. We do not guarantee the availability of any celebrity and reserve the right to decline any booking request." },
  { title: "3. Booking Inquiries", body: "Submitting a booking inquiry through the Site does not constitute a confirmed booking. All bookings are subject to celebrity availability, negotiation, and a signed booking agreement. A booking is only confirmed once you receive written confirmation from Ashencrest." },
  { title: "4. Payments", body: "Pricing varies by celebrity, service type, event location, and date. All fees are quoted in USD unless otherwise stated. Deposits may be required to secure a booking. Full payment terms will be outlined in your booking agreement." },
  { title: "5. Cancellations", body: "Cancellation terms vary per booking and are specified in the booking agreement. Generally, deposits are non-refundable. Cancellations within 14 days of the event date may be subject to full charges. See our Refund & Cancellation Policy for details." },
  { title: "6. Client Responsibilities", body: "Clients are responsible for providing accurate event information, ensuring a safe environment for the celebrity, and complying with all terms outlined in the booking agreement. Any changes to event details must be communicated to Ashencrest in writing." },
  { title: "7. Intellectual Property", body: "All content on this Site, including text, graphics, logos, and design elements, is the property of Ashencrest or its licensors and is protected by copyright and trademark laws. You may not reproduce, distribute, or use any content without prior written permission." },
  { title: "8. Limitation of Liability", body: "Ashencrest shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of the Site or any booking made through the Site. Our total liability shall not exceed the booking fee paid to Ashencrest." },
  { title: "9. Privacy", body: "Your use of the Site is also governed by our Privacy Policy. Please review it to understand how we collect, use, and protect your information." },
  { title: "10. Changes to Terms", body: "Ashencrest reserves the right to modify these Terms of Service at any time. Changes are effective immediately upon posting. Continued use of the Site after changes constitutes acceptance of the updated terms." },
  { title: "11. Contact", body: "For questions about these Terms, please contact us at bookings@ashencrest.com." },
];

export default function TermsPage() {
  return <LegalPage title="Terms of Service" updated="November 2025" sections={SECTIONS} />;
}
