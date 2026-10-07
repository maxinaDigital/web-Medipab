import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Heart, Shield, Users, Award, Building2, Coffee } from "lucide-react";
import { SectionTitle } from "@/components/shared/SectionTitle";

export const metadata: Metadata = {
  title: "Nosotros — Clínica Crystal | Aguascalientes",
  description:
    "Conoce la historia, misión y valores de Clínica Crystal. Una clínica privada en Aguascalientes con médicos reconocidos, 5 quirófanos equipados y atención 24/7.",
};

const VALUE_ICONS = [Heart, Shield, Users, Award];
const FACILITY_ICONS = [Building2, Shield, Award, Coffee];

export default async function NosotrosPage() {
  const t = await getTranslations("aboutPage");
  const ts = await getTranslations("trustSignals");

  const VALUES = [
    { title: t("value1Title"), text: t("value1Text") },
    { title: t("value2Title"), text: t("value2Text") },
    { title: t("value3Title"), text: t("value3Text") },
    { title: t("value4Title"), text: t("value4Text") },
  ];

  const FACILITIES = [
    { title: t("facility1Title"), text: t("facility1Text") },
    { title: t("facility2Title"), text: t("facility2Text") },
    { title: t("facility3Title"), text: t("facility3Text") },
    { title: t("facility4Title"), text: t("facility4Text") },
  ];

  const QUICK_STATS = [
    { value: "5",    label: ts("item2Label") },
    { value: "8+",   label: ts("item3Label") },
    { value: "24/7", label: ts("item1Label") },
    { value: "100%", label: ts("item4Label") },
  ];

  return (
    <main className="pt-16 md:pt-[calc(2rem+4rem)]">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-[#0a4a5a] to-[#1a9090]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-primary-light text-sm font-semibold uppercase tracking-widest mb-4">
            {t("eyebrow")}
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            {t("title")}{" "}
            <span className="text-[#7ae8e8]">{t("titleAccent")}</span>
          </h1>
          <p className="text-white/75 text-lg max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-20 bg-brand-bg">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white rounded-2xl border border-brand-border p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
                {t("missionLabel")}
              </p>
              <h2 className="font-heading text-2xl font-bold text-brand-text mb-4">
                {t("missionTitle")}
              </h2>
              <p className="text-brand-muted leading-relaxed">
                {t("missionText")}
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-brand-border p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
                {t("visionLabel")}
              </p>
              <h2 className="font-heading text-2xl font-bold text-brand-text mb-4">
                {t("visionTitle")}
              </h2>
              <p className="text-brand-muted leading-relaxed">
                {t("visionText")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <SectionTitle
            eyebrow={t("valuesEyebrow")}
            title={t("valuesTitle")}
            titleAccent={t("valuesTitleAccent")}
            centered
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {VALUES.map((v, i) => {
              const Icon = VALUE_ICONS[i];
              return (
                <div key={v.title} className="flex gap-4 p-6 rounded-2xl border border-brand-border bg-brand-bg">
                  <div className="w-11 h-11 rounded-xl bg-primary-light flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-brand-text mb-1">{v.title}</h3>
                    <p className="text-brand-muted text-sm leading-relaxed">{v.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Instalaciones */}
      <section className="py-20 bg-brand-bg">
        <div className="max-w-5xl mx-auto px-4">
          <SectionTitle
            eyebrow={t("facilitiesEyebrow")}
            title={t("facilitiesTitle")}
            titleAccent={t("facilitiesTitleAccent")}
            description={t("facilitiesDesc")}
            centered
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {FACILITIES.map((f, i) => {
              const Icon = FACILITY_ICONS[i];
              return (
                <div key={f.title} className="bg-white rounded-2xl border border-brand-border p-6 flex gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary-light flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-brand-text mb-1">{f.title}</h3>
                    <p className="text-brand-muted text-sm leading-relaxed">{f.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Datos rápidos */}
      <section className="py-14 bg-gradient-to-br from-[#0a4a5a] to-[#1a9090]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {QUICK_STATS.map((s) => (
              <div key={s.label}>
                <p className="font-heading text-4xl font-bold text-[#7ae8e8]">{s.value}</p>
                <p className="text-white/70 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
