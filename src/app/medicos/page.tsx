import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { doctors } from "@/lib/data/doctors";
import { SPECIALTY_SERVICES } from "@/lib/data/services";
import { serviceIcon } from "@/components/shared/serviceIcons";
import { CLINIC } from "@/lib/data/clinic";
import { ContactLink } from "@/components/shared/ContactLink";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { DoctorsDirectory } from "@/components/medicos/DoctorsDirectory";

export const metadata: Metadata = {
  title: "Médicos especialistas",
  description:
    "Más de 50 médicos especialistas atienden en Medipab Hospital de Especialidades, Pabellón de Arteaga, Aguascalientes.",
};

export default async function MedicosPage() {
  const t = await getTranslations("doctorsPage");
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
                {SPECIALTY_SERVICES.map((s) => {
                  const Icon = serviceIcon(s.icon);
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
                <ContactLink
                  message={`Hola, me gustaría que me orienten para elegir un especialista en ${CLINIC.name}.`}
                  whatsappLabel={t("emptyCta")}
                  callLabel={t("emptyCtaCall")}
                  className="mt-5 inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                  iconClassName="w-5 h-5"
                />
              </div>
            </div>
          )}
          {doctors.length > 0 && <DoctorsDirectory />}
        </div>
      </section>
    </div>
  );
}
