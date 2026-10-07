"use client";

import { useState, useEffect, useTransition } from "react";

const LOCALES = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
] as const;

type Locale = (typeof LOCALES)[number]["code"];

function readCookieLocale(): Locale {
  const match = document.cookie.match(/(?:^|;\s*)NEXT_LOCALE=([^;]+)/);
  const raw = match?.[1] ?? "es";
  return (["es", "en"] as Locale[]).includes(raw as Locale) ? (raw as Locale) : "es";
}

type LanguageSwitcherProps = {
  tone?: "light" | "dark";
};

export function LanguageSwitcher({ tone = "light" }: LanguageSwitcherProps) {
  const [current, setCurrent] = useState<Locale>("es");
  const [mounted, setMounted] = useState(false);
  const [, startTransition] = useTransition();

  useEffect(() => {
    setCurrent(readCookieLocale());
    setMounted(true);
  }, []);

  function switchLocale(locale: Locale) {
    startTransition(() => {
      document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=31536000;SameSite=Lax`;
      window.location.reload();
    });
  }

  return (
    <div className="flex items-center gap-1" aria-label="Cambiar idioma">
      {LOCALES.map(({ code, label }) => {
        const isActive = mounted && current === code;
        return (
          <button
            key={code}
            onClick={() => switchLocale(code)}
            aria-pressed={isActive}
            className={`px-2 py-0.5 text-xs font-medium rounded transition-colors ${
              tone === "dark"
                ? isActive
                  ? "bg-white/20 text-white"
                  : "text-white/70 hover:text-white hover:bg-white/10"
                : isActive
                  ? "bg-primary text-white"
                  : "text-brand-muted hover:text-primary hover:bg-primary-light"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
