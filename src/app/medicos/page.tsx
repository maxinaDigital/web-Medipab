import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { User, ChevronRight } from "lucide-react";
import { doctors } from "@/lib/data/doctors";
import { SectionTitle } from "@/components/shared/SectionTitle";

export const metadata: Metadata = {
  title: "Médicos Especialistas — Clínica Crystal | Aguascalientes",
  description:
    "Conoce a nuestro equipo de médicos reconocidos y certificados. Ginecología, Pediatría, Cirugía, Nutrición y más en Clínica Crystal Aguascalientes.",
};

export default async function MedicosPage() {
  const t = await getTranslations("doctorsPage");
  const tc = await getTranslations("common");
  const td = await getTranslations("doctors");

  return (
    <main className="pt-16 md:pt-[calc(2rem+4rem)]">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-[#0a4a5a] to-[#1a9090]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-primary-light text-sm font-semibold uppercase tracking-widest mb-4">
            {t("eyebrow")}
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            {t("title")}{" "}
            <span className="text-[#7ae8e8]">{t("titleAccent")}</span>
          </h1>
          <p className="text-white/75 text-lg max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Grid de médicos */}
      <section className="py-20 bg-brand-bg">
        <div className="max-w-5xl mx-auto px-4">
          <SectionTitle
            eyebrow={t("listEyebrow")}
            title={t("listTitle")}
            titleAccent={t("listTitleAccent")}
            centered
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {doctors.map((doctor) => (
              <Link
                key={doctor.slug}
                href={`/medicos/${doctor.slug}`}
                className="group bg-white rounded-2xl border border-brand-border hover:border-primary hover:shadow-lg transition-all duration-300 overflow-hidden flex gap-0 flex-col sm:flex-row"
              >
                {/* Photo placeholder */}
                <div className="sm:w-40 h-40 sm:h-auto bg-primary-light flex items-center justify-center flex-shrink-0">
                  <User className="w-16 h-16 text-primary opacity-40" />
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
                    {td(`${doctor.slug}.specialty`)}
                  </p>
                  <h2 className="font-heading text-xl font-semibold text-brand-text mb-1 group-hover:text-primary transition-colors">
                    {doctor.name}
                  </h2>
                  <p className="text-brand-muted text-xs mb-3">{tc("cedula")}: {doctor.cedula}</p>
                  <p className="text-brand-muted text-sm leading-relaxed line-clamp-2 mb-4">
                    {doctor.bio}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    {tc("viewProfile")} <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
