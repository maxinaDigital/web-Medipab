"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ClipboardList, BedSingle, MessagesSquare, Pill, CheckCircle2, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionTitle } from "@/components/shared/SectionTitle";

const ICONS = [ClipboardList, BedSingle, MessagesSquare, Pill];

// Guía para pacientes que se van a internar: qué llevar y cómo es la estancia.
export function PatientGuide() {
  const t = useTranslations("patientGuide");
  const checklist = t.raw("checklist") as string[];

  const STEPS = [1, 2, 3, 4].map((n) => ({
    title: t(`item${n}Title`),
    description: t(`item${n}Desc`),
  }));

  return (
    <section className="py-20 bg-brand-bg" aria-labelledby="patient-guide-heading">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle
          eyebrow={t("eyebrow")}
          title={t("title")}
          titleAccent={t("titleAccent")}
          description={t("description")}
          centered
        />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Qué llevar */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-gradient-to-br from-ocean-from to-ocean-to rounded-2xl p-7 text-white"
          >
            <h3 id="patient-guide-heading" className="font-heading text-xl font-bold mb-5">
              {t("checklistTitle")}
            </h3>
            <ul className="space-y-3" role="list">
              {checklist.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/85">
                  <CheckCircle2 className="w-5 h-5 text-glow flex-shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/servicios/hospitalizacion"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-glow-light hover:text-white transition-colors"
            >
              {t("cta")} <ArrowRight size={15} />
            </Link>
          </motion.div>

          {/* Pasos de la estancia */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {STEPS.map(({ title, description }, i) => {
              const Icon = ICONS[i];
              return (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.08, duration: 0.45, ease: "easeOut" }}
                  className="bg-white rounded-2xl border border-brand-border p-6 flex gap-4"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary-light flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-brand-text mb-1">{title}</h3>
                    <p className="text-sm text-brand-muted leading-relaxed">{description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
