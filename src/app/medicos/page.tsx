import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { User, ChevronRight, MessageCircle } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { doctors } from "@/lib/data/doctors";
import { services } from "@/lib/data/services";
import { CLINIC } from "@/lib/data/clinic";
import { SectionTitle } from "@/components/shared/SectionTitle";

const specialties = services.filter(
  (s) => s.category === "especialidades" || s.slug === "neonatologia-ucin"
);

export const metadata: Metadata = {
  title: "Médicos especialistas",
  description:
    "Más de 50 médicos especialistas atienden en Medipab Hospital de Especialidades, Pabellón de Arteaga, Aguascalientes.",
};

export default async function MedicosPage() {
  const t = await getTranslations("doctorsPage");
  const tc = await getTranslations("common");
  const td = await getTranslations("doctors");
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

      {/* Grid de médicos */}
      <section className="py-20 bg-brand-bg">
        <div className="max-w-5xl mx-auto px-4">
          <SectionTitle
            eyebrow={t("listEyebrow")}
            title={t("listTitle")}
            titleAccent={t("listTitleAccent")}
            centered
          />
          {doctors.length === 0 && (
            // Sin perfiles publicados todavía: directorio por especialidad + orientación por WhatsApp
            <div className="mt-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {specialties.map((s) => {
                  const Icon =
                    (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[s.icon] ??
                    LucideIcons.Stethoscope;
                  return (
                    <Link
                      key={s.slug}
                      href={`/servicios/${s.slug}`}
                      className="group flex items-center gap-4 bg-white rounded-2xl border border-brand-border p-5 hover:border-primary hover:shadow-md transition-all"
                    >
                      <div className="w-11 h-11 rounded-xl bg-primary-light flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                        <Icon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                      </div>
                      <span className="font-medium text-brand-text group-hover:text-primary transition-colors">
                        {ts(`items.${s.slug}.name`)}
                      </span>
                    </Link>
                  );
                })}
              </div>
              <div className="mt-10 bg-white rounded-2xl border border-brand-border p-8 text-center">
                <p className="text-brand-muted max-w-xl mx-auto">{t("emptyNote")}</p>
                <a
                  href={`https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(
                    `Hola, me gustaría que me orienten para elegir un especialista en ${CLINIC.name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  {t("emptyCta")}
                </a>
              </div>
            </div>
          )}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 empty:hidden">
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
    </div>
  );
}
