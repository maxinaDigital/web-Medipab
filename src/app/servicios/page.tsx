import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { ServicesDirectory } from "@/components/servicios/ServicesDirectory";

export const metadata: Metadata = {
  title: "Servicios médicos",
  description:
    "Urgencias 24 horas, hospitalización, terapia intensiva, ginecobstetricia, pediatría, cirugía, ortopedia, laboratorio, imagenología y más en Medipab, Pabellón de Arteaga.",
};

export default async function ServiciosPage() {
  const t = await getTranslations("servicesPage");

  return (
    <div>
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-ocean-from to-ocean-to">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-primary-light text-sm font-semibold uppercase tracking-widest mb-4">
            {t("eyebrow")}
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            {t("title")}{" "}
            <span className="text-glow-light">{t("titleAccent")}</span>
          </h1>
          <p className="text-white/75 text-lg max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Grid de servicios */}
      <section className="py-20 bg-brand-bg">
        <div className="max-w-6xl mx-auto px-4">
          <SectionTitle
            eyebrow={t("listEyebrow")}
            title={t("listTitle")}
            titleAccent={t("listTitleAccent")}
            centered
          />
          <ServicesDirectory />
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-primary-light">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl font-bold text-brand-text mb-4">
            {t("ctaTitle")}
          </h2>
          <p className="text-brand-muted mb-6">
            {t("ctaDesc")}
          </p>
          <Link
            href="/citas"
            className="inline-flex items-center gap-2 bg-primary text-white px-7 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
          >
            {t("ctaBtn")}
          </Link>
        </div>
      </section>
    </div>
  );
}
