"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Share2, Camera, MessageCircle, CalendarDays } from "lucide-react";
import { useTranslations } from "next-intl";
import { Logo } from "./Logo";
import { CLINIC } from "@/lib/data/clinic";

export function Footer() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const ts = useTranslations("servicesSection");

  const SERVICES_LINKS = [
    { href: "/servicios/medicina-general",        label: ts("items.medicina-general.name") },
    { href: "/servicios/pediatria-neonatologia",  label: ts("items.pediatria-neonatologia.name") },
    { href: "/servicios/ginecologia-obstetricia", label: ts("items.ginecologia-obstetricia.name") },
    { href: "/servicios/cardiologia",             label: ts("items.cardiologia.name") },
    { href: "/servicios/cirugia-general",         label: ts("items.cirugia-general.name") },
    { href: "/servicios/laboratorio-clinico",     label: ts("items.laboratorio-clinico.name") },
    { href: "/servicios/imagenologia",            label: ts("items.imagenologia.name") },
  ];

  const NAV_LINKS = [
    { href: "/nosotros",              label: tn("about") },
    { href: "/medicos",               label: tn("doctors") },
    { href: "/citas",                 label: tn("appointment") },
    { href: "/contacto",              label: tn("contact") },
    { href: "/preguntas-frecuentes",  label: tn("faq") },
  ];

  return (
    <footer className="bg-primary-dark text-white" aria-label="Pie de página">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand column */}
        <div className="space-y-5">
          <Logo variant="white" height={52} />
          <p className="text-sm text-slate-300 leading-relaxed max-w-xs">
            {t("tagline")}
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="p-2 rounded-full bg-white/10 hover:bg-accent transition-colors"
              aria-label="Facebook de Clínica Crystal"
            >
              <Share2 size={16} />
            </button>
            <button
              type="button"
              className="p-2 rounded-full bg-white/10 hover:bg-accent transition-colors"
              aria-label="Instagram de Clínica Crystal"
            >
              <Camera size={16} />
            </button>
            <button
              type="button"
              className="p-2 rounded-full bg-white/10 hover:bg-accent transition-colors"
              aria-label="WhatsApp de Clínica Crystal"
            >
              <MessageCircle size={16} />
            </button>
          </div>
        </div>

        {/* Services column */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">{t("services")}</h3>
          <ul className="space-y-2" role="list">
            {SERVICES_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm text-slate-200 hover:text-glow transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation column */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">{t("navigation")}</h3>
          <ul className="space-y-2" role="list">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm text-slate-200 hover:text-glow transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact column */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">{t("contact")}</h3>
          <ul className="space-y-4" role="list">
            <li className="flex items-start gap-3 text-sm text-slate-200">
              <MapPin size={15} className="shrink-0 mt-0.5 text-glow" />
              <span>{CLINIC.address.full}</span>
            </li>
            <li>
              <a
                href={CLINIC.phoneHref}
                className="flex items-center gap-3 text-sm text-slate-200 hover:text-glow transition-colors"
              >
                <Phone size={15} className="shrink-0 text-glow" />
                {CLINIC.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${CLINIC.email}`}
                className="flex items-center gap-3 text-sm text-slate-200 hover:text-glow transition-colors"
              >
                <Mail size={15} className="shrink-0 text-glow" />
                {CLINIC.email}
              </a>
            </li>
            <li className="flex items-start gap-3 text-sm text-slate-200">
              <Clock size={15} className="shrink-0 mt-0.5 text-glow" />
              <div>
                {CLINIC.hours.map(({ days, hours }) => (
                  <p key={days}>
                    <span className="text-slate-300">{days}: </span>
                    {hours}
                  </p>
                ))}
              </div>
            </li>
          </ul>

          <Link
            href="/citas"
            className="mt-6 inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors"
          >
            <CalendarDays size={15} />
            {tn("appointment")}
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} {CLINIC.legalName}. {t("rights")}
          </p>
          <div className="flex items-center gap-4">
            <Link href="/aviso-de-privacidad" className="hover:text-slate-200 transition-colors">
              Aviso de Privacidad
            </Link>
            <Link href="/terminos-de-uso" className="hover:text-slate-200 transition-colors">
              Términos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
