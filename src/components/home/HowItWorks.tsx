"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarCheck, MapPin, Stethoscope } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { buttonVariants } from "@/components/ui/button";

const ICONS = [CalendarCheck, MapPin, Stethoscope];

export function HowItWorks() {
  const t = useTranslations("howItWorksSection");

  const STEPS = [
    { step: "01", title: t("step1Title"), description: t("step1Desc") },
    { step: "02", title: t("step2Title"), description: t("step2Desc") },
    { step: "03", title: t("step3Title"), description: t("step3Desc") },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <SectionTitle
          eyebrow={t("eyebrow")}
          title={t("title")}
          titleAccent={t("titleAccent")}
          description={t("description")}
          centered
        />

        <div className="mt-14 relative">
          {/* Connector line — desktop only */}
          <div className="hidden md:block absolute top-10 left-0 right-0 h-0.5 bg-brand-border mx-28" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            {STEPS.map(({ step, title, description }, i) => {
              const Icon = ICONS[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" as const }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="relative z-10 w-20 h-20 rounded-full bg-primary-light border-4 border-white shadow-md flex items-center justify-center mb-5">
                    <Icon className="w-8 h-8 text-primary" />
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                      {step}
                    </span>
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-brand-text mb-3">
                    {title}
                  </h3>
                  <p className="text-brand-muted text-sm leading-relaxed">{description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" as const }}
          className="mt-12 text-center"
        >
          <Link href="/citas" className={buttonVariants({ size: "lg" })}>
            {t("cta")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
