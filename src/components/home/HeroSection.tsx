"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarDays, ChevronRight, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import type { Transition } from "framer-motion";
import { CLINIC } from "@/lib/data/clinic";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.55,
      ease: "easeOut" as const,
    } satisfies Transition,
  }),
};

export function HeroSection() {
  const t = useTranslations("hero");

  const TRUST_BADGES = [t("trust1"), t("trust2"), t("trust3"), t("trust4")];

  const STATS = [
    { value: t("stat1Value"), label: t("stat1Label"), note: t("stat1Note") },
    { value: t("stat2Value"), label: t("stat2Label"), note: t("stat2Note") },
    { value: t("stat3Value"), label: t("stat3Label"), note: t("stat3Note") },
    { value: t("stat4Value"), label: t("stat4Label"), note: t("stat4Note") },
  ];

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-ocean-from via-ocean-via to-ocean-to min-h-[88vh] flex items-center"
      aria-label="Bienvenida"
    >
      {/* Decorative background pattern */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 40%, white 1px, transparent 1px),
                            radial-gradient(circle at 75% 60%, white 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Large decorative emblem: concentric rings + medical cross */}
      <div
        className="absolute right-0 top-0 bottom-0 w-1/2 opacity-[0.07] pointer-events-none hidden lg:block"
        aria-hidden="true"
      >
        <svg viewBox="0 0 400 600" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
          <circle cx="200" cy="300" r="190" fill="none" stroke="white" strokeWidth="2" />
          <circle cx="200" cy="300" r="140" fill="none" stroke="white" strokeWidth="1" />
          <path
            d="M165 184h70a6 6 0 0 1 6 6v69h69a6 6 0 0 1 6 6v70a6 6 0 0 1-6 6h-69v69a6 6 0 0 1-6 6h-70a6 6 0 0 1-6-6v-69H90a6 6 0 0 1-6-6v-70a6 6 0 0 1 6-6h69v-69a6 6 0 0 1 6-6z"
            fill="none"
            stroke="white"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Copy */}
        <div>
          {/* Pre-headline chip */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="inline-flex items-center gap-2 bg-white/15 text-white text-xs font-medium px-3 py-1.5 rounded-full mb-6 backdrop-blur-sm border border-white/20"
          >
            <span className="w-2 h-2 rounded-full bg-glow inline-block" />
            {t("badge")}
          </motion.div>

          {/* H1 */}
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-5"
          >
            {t("title")}{" "}
            <span className="text-glow">{t("titleAccent")}</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-lg text-white/80 leading-relaxed max-w-xl mb-8"
          >
            {t("description")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-wrap gap-3 mb-10"
          >
            <Link
              href="/citas"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-6 py-3.5 rounded-xl font-semibold text-base transition-all shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:-translate-y-0.5"
            >
              <CalendarDays size={18} />
              {t("cta1")}
            </Link>
            <a
              href={CLINIC.phoneHref}
              className="inline-flex items-center gap-2 border-2 border-white/40 text-white hover:bg-white/15 px-6 py-3.5 rounded-xl font-semibold text-base transition-all backdrop-blur-sm"
            >
              {t("cta2")}
              <ChevronRight size={16} />
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.ul
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-wrap gap-3"
            role="list"
          >
            {TRUST_BADGES.map((badge) => (
              <li
                key={badge}
                className="flex items-center gap-1.5 text-xs text-white/75 bg-white/10 px-3 py-1.5 rounded-full border border-white/15"
              >
                <CheckCircle2 size={13} className="text-glow shrink-0" />
                {badge}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Right: Stats card */}
        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="hidden lg:grid grid-cols-2 gap-4"
        >
          {STATS.map(({ value, label, note }) => (
            <div
              key={value}
              className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-6 flex flex-col gap-1"
            >
              <span className="text-3xl font-heading font-bold text-white">{value}</span>
              <span className="text-sm font-medium text-white/90 whitespace-pre-line leading-snug">
                {label}
              </span>
              <span className="text-xs text-white/55 mt-1">{note}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 60 L0 30 Q360 0 720 30 Q1080 60 1440 30 L1440 60 Z"
            fill="var(--color-bg, #F7FAFC)"
          />
        </svg>
      </div>
    </section>
  );
}
