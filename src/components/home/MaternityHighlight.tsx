"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Baby, ShieldCheck, Clock, HeartPulse, CalendarDays, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

const ICONS = [Baby, ShieldCheck, Clock, HeartPulse];

export function MaternityHighlight() {
  const t = useTranslations("maternity");

  const FEATURES = [
    { title: t("feat1Title"), description: t("feat1Desc") },
    { title: t("feat2Title"), description: t("feat2Desc") },
    { title: t("feat3Title"), description: t("feat3Desc") },
    { title: t("feat4Title"), description: t("feat4Desc") },
  ];

  return (
    <section
      className="py-20 bg-gradient-to-br from-ocean-from to-ocean-to overflow-hidden relative"
      aria-labelledby="maternity-heading"
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
        {/* Left: Copy */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-glow mb-4">
            {t("eyebrow")}
          </p>
          <h2
            id="maternity-heading"
            className="text-3xl md:text-4xl font-heading font-bold text-white leading-tight mb-5"
          >
            {t("title")}{" "}
            <span className="text-glow">{t("titleAccent")}</span>
          </h2>
          <p className="text-white/75 text-lg leading-relaxed mb-8 max-w-lg">
            {t("description")}
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/citas"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-5 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-accent/30"
            >
              <CalendarDays size={17} />
              {t("cta1")}
            </Link>
            <Link
              href="/servicios/ginecologia-obstetricia"
              className="inline-flex items-center gap-2 border-2 border-white/30 text-white hover:bg-white/15 px-5 py-3 rounded-xl font-semibold transition-all"
            >
              {t("cta2")}
              <ArrowRight size={15} />
            </Link>
          </div>
        </motion.div>

        {/* Right: Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FEATURES.map(({ title, description }, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.45, ease: "easeOut" }}
                className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-5 flex flex-col gap-3 hover:bg-white/15 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-glow/20 flex items-center justify-center text-glow">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm leading-snug mb-1">{title}</h3>
                  <p className="text-xs text-white/65 leading-relaxed">{description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
