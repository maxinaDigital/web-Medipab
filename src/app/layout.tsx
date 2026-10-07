import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

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
  metadataBase: new URL("https://clinicacrystal.com"),
  title: {
    default: "Clínica Crystal — Atención Médica de Calidad en Aguascalientes",
    template: "%s | Clínica Crystal",
  },
  description:
    "Clínica Crystal, Aguascalientes. Atención médica privada con especialidades en maternidad, cirugía, imagenología y laboratorio propios. Agenda tu cita hoy.",
  keywords: [
    "clínica Aguascalientes",
    "médico privado Aguascalientes",
    "maternidad Aguascalientes",
    "cirugía Aguascalientes",
    "consulta médica",
    "imagenología",
    "laboratorio clínico",
  ],
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://clinicacrystal.com",
    siteName: "Clínica Crystal",
    title: "Clínica Crystal — Atención Médica de Calidad en Aguascalientes",
    description:
      "Clínica privada en Aguascalientes con 3 quirófanos de maternidad, 2 de cirugía general, imagenología y laboratorio propios.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Clínica Crystal Aguascalientes" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clínica Crystal — Aguascalientes",
    description: "Atención médica privada de calidad en Aguascalientes, México.",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  name: "Clínica Crystal",
  legalName: "CLINICA CRYSTAL S.A. de C.V.",
  url: "https://clinicacrystal.com",
  logo: "https://clinicacrystal.com/logo.svg",
  foundingDate: "2022-05-17",
  telephone: "+52-449-000-0000",
  email: "contacto@clinicacrystal.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. del Parque #348",
    addressLocality: "Aguascalientes",
    addressRegion: "Aguascalientes",
    postalCode: "20276",
    addressCountry: "MX",
  },
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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
