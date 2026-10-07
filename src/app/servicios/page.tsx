import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ChevronRight } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { services } from "@/lib/data/services";
import { SectionTitle } from "@/components/shared/SectionTitle";

export const metadata: Metadata = {
  title: "Servicios médicos",
  description:
    "Urgencias 24 horas, hospitalización, terapia intensiva, ginecobstetricia, pediatría, cirugía, ortopedia, laboratorio, imagenología y más en Medipab, Pabellón de Arteaga.",
};

export default async function ServiciosPage() {
  const t = await getTranslations("servicesPage");
  const tc = await getTranslations("common");
  const ts = await getTranslations("servicesSection");

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
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[
                service.icon
              ] ?? LucideIcons.Stethoscope;
              const name = ts(`items.${service.slug}.name`);
              const desc = ts(`items.${service.slug}.desc`);
              return (
                <Link
                  key={service.slug}
                  href={`/servicios/${service.slug}`}
                  className="group bg-white rounded-2xl border border-brand-border p-7 hover:border-primary hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center mb-5 group-hover:bg-primary transition-colors duration-300">
                    <IconComponent className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h2 className="font-heading text-xl font-semibold text-brand-text mb-2 group-hover:text-primary transition-colors">
                    {name}
                  </h2>
                  <p className="text-brand-muted text-sm leading-relaxed mb-4">
                    {desc}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    {tc("seeDetails")} <ChevronRight className="w-4 h-4" />
                  </span>
                </Link>
              );
            })}
          </div>
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
