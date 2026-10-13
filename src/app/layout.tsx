import type { Metadata, Viewport } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/data/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | GNM Nursing & D.Pharma in Ayurveda, Azamgarh`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  keywords: [
    "Shri Shaktimayi",
    "Ayurvedic pharmacy college Azamgarh",
    "GNM nursing college Azamgarh",
    "D.Pharma Ayurveda",
    "nursing college Uttar Pradesh",
    "pharmacy diploma Azamgarh",
  ],
  applicationName: site.shortName,
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | GNM Nursing & D.Pharma in Ayurveda, Azamgarh`,
    description: site.description,
    images: [
      { url: "/images/hero/hero-1.jpg", width: 1000, height: 563, alt: `${site.name} campus` },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: ["/images/hero/hero-1.jpg"],
  },
  icons: {
    icon: [{ url: "/images/favicon.jpg", sizes: "128x128", type: "image/jpeg" }],
    apple: "/images/favicon.jpg",
  },
};

export const viewport: Viewport = {
  themeColor: "#091e3e",
  width: "device-width",
  initialScale: 1,
};

/**
 * LocalBusiness/EducationalOrganization markup. Deliberately contains no
 * accreditation, rating, acceptance-rate or placement claims — only facts the
 * college already publishes on its live site.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["College", "EducationalOrganization"],
  name: site.name,
  alternateName: "Shri Shakti Mayi Ayurvedic Pharmacy & Nursing College",
  url: site.url,
  logo: `${site.url}/images/logo.jpg`,
  image: `${site.url}/images/hero/hero-1.jpg`,
  description: site.description,
  foundingDate: String(site.foundedYear),
  founder: { "@type": "Person", name: site.founder },
  telephone: "+918726274444",
  email: "info@shrishaktimayi.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Shri Shaktimayi Hospital, Kharihani",
    addressLocality: "Azamgarh",
    addressRegion: "Uttar Pradesh",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 25.816810406328006,
    longitude: 83.20119957417756,
  },
  areaServed: "Azamgarh, Uttar Pradesh, India",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceSerif.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-navy-800 focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-ivory-50"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-1">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}

