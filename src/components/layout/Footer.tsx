"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Share2, Camera, MessageCircle, CalendarDays } from "lucide-react";
import { useTranslations } from "next-intl";
import { Logo } from "./Logo";
import { CLINIC } from "@/lib/data/clinic";
import { services } from "@/lib/data/services";

export function Footer() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const ts = useTranslations("servicesSection");
  const tl = useTranslations("locationSection");

  const SERVICES_LINKS = services
    .filter((s) => s.featured)
    .map((s) => ({ href: `/servicios/${s.slug}`, label: ts(`items.${s.slug}.name`) }));

  // Solo las redes con URL configurada en clinic.ts
  const SOCIAL_LINKS = [
    { href: CLINIC.social.facebook, label: "Facebook", Icon: Share2 },
    { href: CLINIC.social.instagram, label: "Instagram", Icon: Camera },
    { href: CLINIC.social.whatsapp, label: "WhatsApp", Icon: MessageCircle },
  ].filter((link) => link.href);

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
            {SOCIAL_LINKS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-accent transition-colors"
                aria-label={`${label} de ${CLINIC.name}`}
              >
                <Icon size={16} />
              </a>
            ))}
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
                {(["h1", "h3"] as const).map((key) => (
                  <p key={key}>
                    <span className="text-slate-300">{tl(key)}: </span>
                    {tl(`${key}Val`)}
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
        <div className="max-w-7xl mx-auto px-6 pt-5 pb-20 md:pb-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} {CLINIC.legalName}. {t("rights")}
          </p>
          <div className="flex items-center gap-4">
            <Link href="/aviso-de-privacidad" className="hover:text-slate-200 transition-colors">
              {t("privacy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
