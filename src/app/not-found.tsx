import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Siren } from "lucide-react";
import { CLINIC } from "@/lib/data/clinic";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  const te = await getTranslations("emergency");

  return (
    <section className="py-24 bg-brand-bg">
      <div className="max-w-xl mx-auto px-4 text-center">
        <p className="font-heading text-6xl font-bold text-primary">404</p>
        <h1 className="mt-4 font-heading text-2xl md:text-3xl font-bold text-brand-text">{t("title")}</h1>
        <p className="mt-3 text-brand-muted">{t("description")}</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition-colors"
          >
            {t("home")}
          </Link>
          <Link
            href="/servicios"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-primary text-primary font-medium hover:bg-primary hover:text-white transition-colors"
          >
            {t("services")}
          </Link>
        </div>
        <a
          href={CLINIC.emergencyPhoneHref}
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-urgent hover:underline"
        >
          <Siren size={16} aria-hidden="true" />
          {te("call")}: {CLINIC.emergencyPhone}
        </a>
      </div>
    </section>
  );
}
