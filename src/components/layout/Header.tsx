"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Menu, X, CalendarDays, Siren } from "lucide-react";
import { useTranslations } from "next-intl";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { CLINIC } from "@/lib/data/clinic";

export function Header() {
  const t = useTranslations();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const NAV_LINKS = [
    { href: "/", label: t("nav.home") },
    { href: "/nosotros", label: t("nav.about") },
    { href: "/servicios", label: t("nav.services") },
    { href: "/medicos", label: t("nav.doctors") },
    { href: "/preguntas-frecuentes", label: t("nav.faq") },
    { href: "/contacto", label: t("nav.contact") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
          scrolled ? "shadow-md" : "shadow-sm"
        }`}
      >
        {/* Top bar — contact info */}
        <div className="hidden md:block bg-primary text-white text-xs py-1.5">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <span>{CLINIC.address.full}</span>
            <div className="flex items-center gap-4">
              <LanguageSwitcher tone="dark" />
              <a
                href={CLINIC.phoneHref}
                className="flex items-center gap-1.5 hover:text-primary-light transition-colors"
              >
                <Phone size={12} />
                <span>{CLINIC.phone}</span>
              </a>
              <a
                href={CLINIC.emergencyPhoneHref}
                className="flex items-center gap-1.5 rounded-full bg-urgent hover:bg-urgent-dark px-3 py-0.5 font-semibold transition-colors"
                aria-label={`${t("emergency.call")}: ${CLINIC.emergencyPhone}`}
              >
                <Siren size={12} aria-hidden="true" />
                <span>{t("emergency.label")}</span>
                <span className="font-normal">{CLINIC.emergencyPhone}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main nav */}
        <nav
          className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4"
          aria-label="Navegación principal"
        >
          <Logo />

          {/* Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-1" role="list">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="whitespace-nowrap px-3 py-2 text-sm text-brand-text font-medium rounded-md hover:text-primary hover:bg-primary-light transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={CLINIC.phoneHref}
              className="hidden xl:flex items-center gap-1.5 whitespace-nowrap text-sm text-brand-muted hover:text-primary transition-colors"
            >
              <Phone size={15} />
              <span>{CLINIC.phone}</span>
            </a>
            <Link
              href="/citas"
              className="flex items-center gap-2 whitespace-nowrap bg-accent text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-accent-dark transition-colors shadow-sm"
            >
              <CalendarDays size={16} />
              {t("nav.appointment")}
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2 rounded-md text-brand-text hover:bg-primary-light transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-50 w-72 bg-white shadow-2xl flex flex-col transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Menú de navegación móvil"
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-brand-border">
          <Logo height={40} />
          <button
            onClick={() => setMenuOpen(false)}
            className="p-2 rounded-md text-brand-muted hover:text-primary hover:bg-primary-light transition-colors"
            aria-label="Cerrar menú"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul role="list" className="space-y-1">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="flex items-center px-4 py-3 text-brand-text font-medium rounded-lg hover:text-primary hover:bg-primary-light transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-brand-border space-y-3">
          <div className="flex justify-center pb-2">
            <LanguageSwitcher />
          </div>
          <a
            href={CLINIC.phoneHref}
            className="flex items-center justify-center gap-2 w-full border border-primary text-primary px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-light transition-colors"
          >
            <Phone size={15} />
            {CLINIC.phone}
          </a>
          <Link
            href="/citas"
            className="flex items-center justify-center gap-2 w-full bg-accent text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-accent-dark transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            <CalendarDays size={15} />
            {t("nav.appointment")}
          </Link>
          <a
            href={CLINIC.emergencyPhoneHref}
            className="flex items-center justify-center gap-2 w-full bg-urgent text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-urgent-dark transition-colors"
          >
            <Siren size={15} aria-hidden="true" />
            {t("emergency.call")}
          </a>
        </div>
      </aside>
    </>
  );
}
