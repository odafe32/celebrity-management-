import { LegalPage } from "@/components/legal-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Cookie Policy for Ashencrest — how we use cookies and how you can control them.",
};

const SECTIONS = [
  {
    title: "1. What Are Cookies",
    body: "Cookies are small text files placed on your device by the websites you visit. They are widely used to make websites work more efficiently and to provide information to the site owners. Cookies allow a website to remember your actions and preferences over a period of time, so you do not have to re-enter them every time you visit the site or browse from one page to another.",
  },
  {
    title: "2. How We Use Cookies",
    body: "Ashencrest uses cookies for several purposes: to remember your cookie consent choice, to remember your theme preference (light or dark mode), to understand how visitors use our site through analytics, and to improve the performance and relevance of our content. We do not use cookies to identify you personally or to sell your data to third parties.",
  },
  {
    title: "3. Types of Cookies We Use",
    body: "Strictly necessary cookies are required for the basic functionality of the website, such as remembering your cookie consent choice and theme preference. These cookies cannot be disabled. Preference cookies remember your settings and preferences, such as language and theme. Analytics cookies help us understand how visitors interact with our site by collecting and reporting information anonymously.",
  },
  {
    title: "4. Third-Party Cookies",
    body: "In addition to our own cookies, we may also use various third-party cookies, including those from analytics providers such as Google Analytics. These third parties may set cookies on your device to analyze site usage. We do not control these third-party cookies and their use is subject to the respective third party's privacy policy.",
  },
  {
    title: "5. Managing Cookies",
    body: "When you first visit our site, you will see a cookie consent banner that allows you to accept or reject all non-essential cookies. Your choice is stored in your browser and remembered for future visits. You can change your preference at any time by clicking the cookie icon in the bottom-left corner of the screen, or by clearing your browser's local storage.",
  },
  {
    title: "6. Browser Controls",
    body: "Most web browsers allow you to control cookies through their settings. You can usually block cookies entirely, delete existing cookies, or set preferences for specific sites. Note that disabling cookies may affect the functionality of our site, such as preventing your theme preference from being remembered. Consult your browser's help documentation for instructions on managing cookies.",
  },
  {
    title: "7. Cookies and Your Privacy",
    body: "Our use of cookies is described in more detail in our Privacy Policy. The Privacy Policy explains how we collect, use, and protect your personal information. Cookies that collect personal data are subject to the same protections described in our Privacy Policy.",
  },
  {
    title: "8. GDPR and ePrivacy Compliance",
    body: "For visitors in the European Economic Area, the United Kingdom, and other jurisdictions with similar laws, our cookie consent mechanism is designed to comply with the General Data Protection Regulation (GDPR) and the ePrivacy Directive. We obtain your consent before setting any non-essential cookies, and you have the right to withdraw consent at any time.",
  },
  {
    title: "9. CCPA Notice",
    body: "For residents of California, the California Consumer Privacy Act (CCPA) gives you the right to know what personal information is collected about you and to ask for it to be deleted. Cookies that collect personal information are covered by our Privacy Policy and your CCPA rights as described therein.",
  },
  {
    title: "10. Changes to This Policy",
    body: "We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our business practices. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically to stay informed about how we use cookies.",
  },
  {
    title: "11. Contact",
    body: "If you have any questions about our use of cookies or this Cookie Policy, please contact us at bookings@ashencrest.com.",
  },
];

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      updated="September 2026"
      sections={SECTIONS}
    />
  );
}
