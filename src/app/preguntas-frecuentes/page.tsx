import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description:
    "Resolvemos tus dudas sobre citas, urgencias, hospitalización, servicios y pagos en Medipab Hospital de Especialidades.",
};

type FaqItem = { q: string; a: string };

export default async function PreguntasFrecuentesPage() {
  const t = await getTranslations("faqPage");

  const FAQS = [
    { catKey: "cat1" as const, items: t.raw("cat1Items") as FaqItem[] },
    { catKey: "cat2" as const, items: t.raw("cat2Items") as FaqItem[] },
    { catKey: "cat3" as const, items: t.raw("cat3Items") as FaqItem[] },
    { catKey: "cat4" as const, items: t.raw("cat4Items") as FaqItem[] },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-ocean-from to-ocean-to">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-primary-light text-sm font-semibold uppercase tracking-widest mb-4">
            {t("eyebrow")}
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            {t("title")}{" "}
            <span className="text-glow-light">{t("titleAccent")}</span>
          </h1>
          <p className="text-white/75 text-lg">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-brand-bg">
        <div className="max-w-3xl mx-auto px-4 space-y-14">
          {FAQS.map((group) => (
            <div key={group.catKey}>
              <h2 className="font-heading text-2xl font-bold text-brand-text mb-6 pb-3 border-b border-brand-border">
                {t(group.catKey as "cat1" | "cat2" | "cat3" | "cat4")}
              </h2>
              <div className="space-y-3">
                {group.items.map((item) => (
                  <details
                    key={item.q}
                    className="group bg-white border border-brand-border rounded-xl overflow-hidden"
                  >
                    <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer font-medium text-brand-text list-none">
                      {item.q}
                      <span className="w-5 h-5 rounded-full bg-primary-light text-primary flex items-center justify-center flex-shrink-0 text-lg leading-none group-open:rotate-45 transition-transform">
                        +
                      </span>
                    </summary>
                    <p className="px-5 pb-5 text-brand-muted leading-relaxed">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-primary-light">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl font-bold text-brand-text mb-3">
            {t("ctaTitle")}
          </h2>
          <p className="text-brand-muted mb-6">
            {t("ctaDesc")}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center px-7 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition-colors"
            >
              {t("ctaContact")}
            </Link>
            <Link
              href="/citas"
              className="inline-flex items-center justify-center px-7 py-3 rounded-lg border-2 border-primary text-primary font-medium hover:bg-primary hover:text-white transition-colors"
            >
              {t("ctaBook")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
