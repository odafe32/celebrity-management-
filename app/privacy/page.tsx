import { LegalPage } from "@/components/legal-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Ashencrest celebrity booking platform — how we collect, use, share, and protect your personal information.",
};

const SECTIONS = [
  {
    title: "1. Introduction",
    body: "Ashencrest (\u201cwe,\u201d \u201cus,\u201d or \u201cour\u201d) is a celebrity booking agency that connects clients with celebrities for events, appearances, endorsements, and related services. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. We are committed to protecting your privacy and complying with applicable data protection laws, including the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA).",
  },
  {
    title: "2. Information We Collect",
    body: "We collect information that you provide directly to us when you submit a booking inquiry, contact form, or communication request. This includes: (a) Contact details \u2014 your name, email address, phone number, and WhatsApp number; (b) Event details \u2014 event date, time, location, number of attendees, budget range, and special requests; (c) Preferences \u2014 the celebrity or service you are interested in, and any specific requirements; (d) Communication records \u2014 messages you send us via email, WhatsApp, or our contact forms. We do not require you to create an account to use our booking inquiry services. We do not collect passwords or login credentials from customers.",
  },
  {
    title: "3. Information Collected Automatically",
    body: "When you visit our Site, we and our third-party service providers may automatically collect certain technical information, including: your IP address, browser type and version, device type, operating system, referring URL, pages visited, time spent on pages, and approximate geographic location based on IP. This information is collected through cookies, log files, and similar tracking technologies. See our Cookie Policy for more details.",
  },
  {
    title: "4. How We Use Your Information",
    body: "We use the information we collect for the following purposes: (a) Processing and responding to your booking inquiries; (b) Coordinating celebrity bookings, including sharing relevant details with celebrities and their management teams; (c) Communicating with you about your request, booking status, and event logistics; (d) Providing customer support and resolving disputes; (e) Sending service-related updates, confirmations, and reminders; (f) Improving our website, services, and user experience; (g) Analyzing usage trends and measuring the effectiveness of our promotional campaigns; (h) Detecting, preventing, and addressing fraud, security issues, and violations of our Terms; (i) Complying with legal obligations and protecting our rights.",
  },
  {
    title: "5. Legal Basis for Processing (GDPR)",
    body: "If you are a resident of the European Economic Area (EEA), we process your personal information under the following legal bases: (a) Consent \u2014 where you have given us clear consent to process your information for a specific purpose, such as sending marketing communications; (b) Contractual necessity \u2014 where processing is necessary to fulfill our obligations under a booking agreement or to take steps at your request before entering into one; (c) Legitimate interests \u2014 where processing is in our legitimate business interests, such as improving our services and preventing fraud, provided your rights do not override those interests; (d) Legal obligation \u2014 where processing is necessary to comply with applicable laws.",
  },
  {
    title: "6. Information Sharing and Disclosure",
    body: "We do not sell, rent, or trade your personal information. We may share your information in the following circumstances: (a) With celebrities and their management \u2014 we share only the information necessary to evaluate and coordinate a booking request; (b) With service providers \u2014 third parties that provide services on our behalf, such as email delivery, payment processing, analytics, and communication tools, under contractual obligations to protect your data; (c) With legal authorities \u2014 when required by law, court order, or government regulation, or to protect our rights, property, safety, or the safety of others; (d) In connection with a business transfer \u2014 if we are involved in a merger, acquisition, or sale of assets, your information may be transferred, subject to the protections described in this policy.",
  },
  {
    title: "7. Cross-Border Data Transfers",
    body: "Your information may be transferred to and processed in countries other than your country of residence, including the United States. We take reasonable steps to ensure that your data is treated securely and in accordance with this Privacy Policy. Where required by law, we will implement appropriate safeguards for cross-border transfers, such as Standard Contractual Clauses (SCCs) approved by the European Commission.",
  },
  {
    title: "8. Data Retention",
    body: "We retain your personal information only for as long as necessary to fulfill the purposes described in this Privacy Policy, unless a longer retention period is required by law. Booking inquiry data is typically retained for up to 24 months after the last interaction. Completed booking records are retained for up to 7 years for legal, tax, and accounting purposes. You may request early deletion of your data at any time by contacting us at bookings@ashencrest.com, subject to legal retention obligations.",
  },
  {
    title: "9. Data Security",
    body: "We implement appropriate technical, administrative, and physical security measures designed to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encrypted data transmission (TLS/SSL), access controls, regular security reviews, and staff training. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.",
  },
  {
    title: "10. Your Rights \u2014 GDPR (EEA Residents)",
    body: "If you are a resident of the EEA, you have the following rights: (a) Right of access \u2014 request a copy of your personal data; (b) Right to rectification \u2014 request correction of inaccurate or incomplete data; (c) Right to erasure (\u201cright to be forgotten\u201d) \u2014 request deletion of your data; (d) Right to restrict processing \u2014 request that we limit processing of your data; (e) Right to data portability \u2014 receive your data in a structured, machine-readable format; (f) Right to object \u2014 object to processing based on legitimate interests or for direct marketing; (g) Right to withdraw consent \u2014 withdraw consent at any time where processing is based on consent. To exercise any of these rights, contact us at bookings@ashencrest.com.",
  },
  {
    title: "11. Your Rights \u2014 CCPA (California Residents)",
    body: "If you are a California resident, you have the following rights under the CCPA: (a) Right to know \u2014 request disclosure of the categories and specific pieces of personal information we collect, the purpose of collection, and the categories of third parties with whom we share it; (b) Right to delete \u2014 request deletion of your personal information; (c) Right to opt-out \u2014 opt-out of the sale or sharing of your personal information. We do not sell personal information. To exercise these rights, submit a verifiable consumer request by contacting us at bookings@ashencrest.com.",
  },
  {
    title: "12. Cookies and Tracking Technologies",
    body: "Our Site uses cookies and similar tracking technologies (web beacons, pixel tags, localStorage) to enhance your browsing experience, analyze traffic, remember preferences, and measure the effectiveness of our marketing efforts. We use both session cookies (which expire when you close your browser) and persistent cookies (which remain on your device for a set period). You can control and manage cookies through your browser settings. Disabling cookies may affect some functionality of the Site. For more details, please review our Cookie Policy.",
  },
  {
    title: "13. Third-Party Services",
    body: "We may use third-party services for email delivery, payment processing, analytics, communication tools, and cloud hosting. These providers operate independently and have their own privacy policies. We do not control their data practices and are not responsible for their handling of your information. We recommend reviewing the privacy policies of these third parties.",
  },
  {
    title: "14. Marketing Communications",
    body: "With your consent, we may send you promotional emails, newsletters, or other marketing communications about our services, new celebrity additions, and special offers. You may opt out of marketing communications at any time by clicking the unsubscribe link in any marketing email, or by contacting us at bookings@ashencrest.com. We will process your opt-out request promptly. Service-related and transactional emails (e.g., booking confirmations) are not marketing communications and will continue to be sent.",
  },
  {
    title: "15. Children\u2019s Privacy",
    body: "Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from minors. If you believe we have collected information from a child under 18, please contact us at bookings@ashencrest.com and we will take steps to delete such information promptly.",
  },
  {
    title: "16. Do Not Track Signals",
    body: "Some browsers offer a \u201cDo Not Track\u201d (DNT) feature. Because there is currently no industry consensus on how to interpret DNT signals, we do not currently respond to them. We will update this policy if standards change or if we implement a DNT response mechanism.",
  },
  {
    title: "17. Changes to This Privacy Policy",
    body: "We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or operational needs. When we do, we will revise the \u201cLast updated\u201d date at the top of this page. For material changes, we will provide a more prominent notice, such as on our homepage or via email. We encourage you to review this page periodically to stay informed about how we protect your information.",
  },
  {
    title: "18. Contact Us",
    body: "If you have any questions, concerns, or requests regarding this Privacy Policy or our handling of your personal information, please contact us at: Email: bookings@ashencrest.com | Phone/WhatsApp:   | Address: Los Angeles, CA, USA. We are committed to resolving your privacy concerns promptly and transparently.",
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="September 2026" sections={SECTIONS} />
  );
}
