import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { EmergencyButton } from "@/components/layout/EmergencyButton";
import { CLINIC, assertLaunchReady } from "@/lib/data/clinic";

// Bloquea el deploy de producción mientras haya datos de contacto de relleno (ver clinic.ts).
assertLaunchReady();

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(CLINIC.siteUrl),
  title: {
    default: "Medipab Hospital de Especialidades — Pabellón de Arteaga, Aguascalientes",
    template: "%s | Medipab Hospital de Especialidades",
  },
  description:
    "Hospital de especialidades en Pabellón de Arteaga, Ags. Urgencias 24 horas, hospitalización, terapia intensiva adultos y neonatal, cirugía y más de 50 médicos especialistas.",
  keywords: [
    "hospital Pabellón de Arteaga",
    "urgencias Pabellón de Arteaga",
    "hospital de especialidades Aguascalientes",
    "especialistas norte de Aguascalientes",
    "terapia intensiva Aguascalientes",
    "UCIN Aguascalientes",
    "Rincón de Romos hospital",
  ],
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: CLINIC.siteUrl,
    siteName: CLINIC.fullName,
    title: "Medipab Hospital de Especialidades — Pabellón de Arteaga",
    description:
      "Urgencias 24 horas, hospitalización, terapia intensiva, cirugía y más de 50 especialistas en el norte de Aguascalientes.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Medipab Hospital de Especialidades" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Medipab Hospital de Especialidades",
    description: "Urgencias 24 horas y especialistas en Pabellón de Arteaga, Aguascalientes.",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Hospital",
  name: CLINIC.fullName,
  legalName: CLINIC.legalName,
  url: CLINIC.siteUrl,
  logo: `${CLINIC.siteUrl}/images/medipab-icono-512.png`,
  telephone: CLINIC.phoneHref.replace("tel:", ""),
  email: CLINIC.email,
  address: {
    "@type": "PostalAddress",
    ...(CLINIC.address.street ? { streetAddress: CLINIC.address.street } : {}),
    addressLocality: CLINIC.address.city,
    addressRegion: CLINIC.address.state,
    ...(CLINIC.address.postalCode ? { postalCode: CLINIC.address.postalCode } : {}),
    addressCountry: "MX",
  },
  geo: { "@type": "GeoCoordinates", latitude: CLINIC.geo.latitude, longitude: CLINIC.geo.longitude },
  hasMap: CLINIC.address.googleMapsUrl,
  areaServed: ["Pabellón de Arteaga", "Rincón de Romos", "San José de Gracia", "Tepezalá", "Cosío"],
  medicalSpecialty: ["Emergency", "Obstetric", "Pediatric", "Surgical"],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
  ],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${montserrat.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main id="main-content" className="pt-16 md:pt-[calc(2rem+4rem)]">
            {children}
          </main>
          <Footer />
          <EmergencyButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
