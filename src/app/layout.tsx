import type { Metadata, Viewport } from "next";
import { Inter, Figtree } from "next/font/google";
import "./globals.css";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { StickyMobileCTA } from "@/components/sections/StickyMobileCTA";
import { CookieConsent } from "@/components/sections/CookieConsent";
import { EmergencyBanner } from "@/components/sections/EmergencyBanner";

const OG_IMAGE = "https://www.yourdentistdentalclinic.com/images/og.jpg";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d9488",
};

export const metadata: Metadata = {
  title: {
    template: "%s | YourDentist Laser Dental Clinic",
    default: "YourDentist Laser Dental Clinic | Dr. Arpita Dash - Bhubaneswar",
  },
  description:
    "Premium laser dental care in Bhubaneswar by Dr. Arpita Dash. Root Canal, Orthodontics, Implants, Aesthetic Dentistry & more. Book your appointment today!",
  keywords: [
    "dental clinic",
    "dentist",
    "Bhubaneswar",
    "root canal",
    "braces",
    "dental implants",
    "Dr. Arpita Dash",
  ],
  authors: [{ name: "Dr. Arpita Dash" }],
  creator: "YourDentist Laser Dental Clinic",
  metadataBase: new URL("https://www.yourdentistdentalclinic.com"),
  alternates: {
    canonical: "https://www.yourdentistdentalclinic.com",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.yourdentistdentalclinic.com",
    siteName: "YourDentist Laser Dental Clinic",
    title: "YourDentist Laser Dental Clinic | Dr. Arpita Dash",
    description:
      "Premium laser dental care in Bhubaneswar. Painless treatments with advanced technology.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "YourDentist Laser Dental Clinic - Dr. Arpita Dash",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YourDentist Laser Dental Clinic",
    description: "Premium laser dental care in Bhubaneswar by Dr. Arpita Dash.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "YourDentist Laser Dental Clinic",
  image: "https://www.yourdentistdentalclinic.com/images/clinic.jpg",
  "@id": "https://www.yourdentistdentalclinic.com",
  url: "https://www.yourdentistdentalclinic.com",
  telephone: "+91 7064719630",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Plot 190/2972, E Canal Rd, beside SHIBANI ENCLAVE, Bomikhal",
    addressLocality: "Bhubaneswar",
    addressRegion: "Odisha",
    postalCode: "751019",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 20.2961,
    longitude: 85.8245,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "10:00",
      closes: "13:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "17:00",
      closes: "20:30",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "150",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${inter.variable} ${figtree.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col font-sans"
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-60 focus:bg-teal-700 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium"
        >
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <EmergencyBanner />
        <div id="main-content" className="contents">
          {children}
        </div>
        <ScrollToTop />
        <StickyMobileCTA />
        <CookieConsent />
      </body>
    </html>
  );
}
