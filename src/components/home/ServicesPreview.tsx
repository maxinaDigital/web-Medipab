"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Stethoscope, Baby, Heart, Activity, Scissors,
  Apple, FlaskConical, ScanLine, ArrowRight,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionTitle } from "@/components/shared/SectionTitle";

const ICON_MAP: Record<string, React.ElementType> = {
  Stethoscope, Baby, Heart, Activity, Scissors,
  Apple, FlaskConical, ScanLine,
};

const SERVICE_SLUGS = [
  { slug: "medicina-general",        icon: "Stethoscope" },
  { slug: "pediatria-neonatologia",  icon: "Baby" },
  { slug: "ginecologia-obstetricia", icon: "Heart" },
  { slug: "cardiologia",             icon: "Activity" },
  { slug: "cirugia-general",         icon: "Scissors" },
  { slug: "nutricion-clinica",       icon: "Apple" },
  { slug: "laboratorio-clinico",     icon: "FlaskConical" },
  { slug: "imagenologia",            icon: "ScanLine" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.45, ease: "easeOut" as const },
  }),
};

export function ServicesPreview() {
  const ts = useTranslations("servicesSection");
  const tc = useTranslations("common");

  return (
    <section className="py-20 bg-brand-bg" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle
          eyebrow={ts("eyebrow")}
          title={ts("title")}
          titleAccent={ts("titleAccent")}
          description={ts("description")}
          className="mb-14"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICE_SLUGS.map(({ slug, icon }, i) => {
            const Icon = ICON_MAP[icon] ?? Stethoscope;
            const name = ts(`items.${slug}.name`);
            const desc = ts(`items.${slug}.desc`);
            return (
              <motion.div
                key={slug}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={cardVariants}
              >
                <Link
                  href={`/servicios/${slug}`}
                  className="group flex flex-col h-full bg-white border border-brand-border rounded-2xl p-6 hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-200"
                >
                  {/* Icon */}
                  <div className="mb-4 w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon size={22} />
                  </div>

                  {/* Content */}
                  <h3 className="font-heading font-semibold text-brand-text mb-2 group-hover:text-primary transition-colors">
                    {name}
                  </h3>
                  <p className="text-sm text-brand-muted leading-relaxed flex-1">{desc}</p>

                  {/* Footer */}
                  <div className="mt-4 flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    {tc("seeDetails")} <ArrowRight size={12} />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/servicios"
            className="inline-flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-xl font-semibold transition-all"
          >
            {tc("seeAllServices")}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
