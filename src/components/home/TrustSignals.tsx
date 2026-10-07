"use client";

import { motion } from "framer-motion";
import { Clock, Stethoscope, HeartPulse, BedSingle } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionTitle } from "@/components/shared/SectionTitle";

const ICONS = [Clock, Stethoscope, HeartPulse, BedSingle];

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

export function TrustSignals() {
  const t = useTranslations("trustSignals");

  const STATS = [
    { value: t("item1Value"), label: t("item1Label"), description: t("item1Desc") },
    { value: t("item2Value"), label: t("item2Label"), description: t("item2Desc") },
    { value: t("item3Value"), label: t("item3Label"), description: t("item3Desc") },
    { value: t("item4Value"), label: t("item4Label"), description: t("item4Desc") },
  ];

  return (
    <section className="py-20 bg-white" aria-labelledby="trust-heading">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle
          eyebrow={t("eyebrow")}
          title={t("title")}
          titleAccent={t("titleAccent")}
          className="mb-14"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map(({ value, label, description }, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={itemVariants}
                className="relative group"
              >
                <div className="h-full bg-brand-bg border border-brand-border rounded-2xl p-7 flex flex-col gap-4 hover:border-primary hover:shadow-md transition-all duration-200">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon size={26} />
                  </div>

                  {/* Stat */}
                  <div>
                    <p className="text-4xl font-heading font-bold text-primary leading-none mb-1">
                      {value}
                    </p>
                    <p className="font-semibold text-brand-text">{label}</p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-brand-muted leading-relaxed">{description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
