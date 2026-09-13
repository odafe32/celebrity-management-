import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme-provider";
import { Preloader } from "@/components/preloader";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BackToTop } from "@/components/back-to-top";
import { CookieConsent, CookiePreferencesButton } from "@/components/cookie-consent";
import "./globals.css";

// Use system fonts to avoid Google Fonts fetch during build
const geistSans = {
  variable: "--font-sans",
  className: "font-sans",
};

const geistMono = {
  variable: "--font-geist-mono",
  className: "font-mono",
};

const playfairDisplay = {
  variable: "--font-heading",
  className: "font-heading",
};

const SITE_URL = "https://ashencrest.com";
const SITE_NAME = "Ashencrest";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Book a Celebrity for Any Event`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Ashencrest is a full-service celebrity booking agency. Book actors, musicians, athletes, comedians, and TV personalities for meet & greets, corporate events, autograph signings, nightclub appearances, and more.",
  keywords: [
    "celebrity booking",
    "book a celebrity",
    "celebrity appearances",
    "meet and greet",
    "celebrity agency",
    "autograph signing",
    "corporate events",
    "celebrity endorsements",
    "Ashencrest",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    apple: [{ url: "/logo.png", type: "image/png" }],
    shortcut: ["/logo.png"],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Book a Celebrity for Any Event`,
    description:
      "A full-service celebrity booking agency. Book actors, musicians, athletes, comedians, and more for your next event.",
    images: [
      {
        url: "/logo_bg.png",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Celebrity Booking Agency`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Book a Celebrity for Any Event`,
    description:
      "A full-service celebrity booking agency. Book actors, musicians, athletes, comedians, and more for your next event.",
    images: ["/logo_bg.png"],
    creator: "@ashencrest",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "entertainment",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf6ec" },
    { media: "(prefers-color-scheme: dark)", color: "#080403" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Preloader />
          <SiteHeader />
          <main className="flex flex-1 flex-col">{children}</main>
          <SiteFooter />
          <BackToTop />
          <CookieConsent />
          <CookiePreferencesButton />
        </ThemeProvider>

        {/* Smartsupp Live Chat */}
        <Script id="smartsupp" strategy="afterInteractive">
          {`
            var _smartsupp = _smartsupp || {};
            _smartsupp.key = '2b397aa71821549518173476c2b251bc04dfef90';
            window.smartsupp||(function(d) {
              var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
              s=d.getElementsByTagName('script')[0];c=d.createElement('script');
              c.type='text/javascript';c.charset='utf-8';c.async=true;
              c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
            })(document);
          `}
        </Script>
      </body>
    </html>
  );
}
