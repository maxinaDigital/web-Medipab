"use client";

import Link from "next/link";
import Image from "next/image";
import { CLINIC } from "@/lib/data/clinic";

// Proporción del logotipo completo (viewBox 554 × 174)
const LOGO_RATIO = 554 / 174;

type LogoProps = {
  className?: string;
  height?: number;
  variant?: "color" | "white";
};

export function Logo({ className = "", height = 52, variant = "color" }: LogoProps) {
  const src = variant === "white" ? "/images/medipab-logo-blanco.svg" : "/images/medipab-logo.svg";

  return (
    <Link
      href="/"
      className={`inline-flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md ${className}`}
      aria-label={`${CLINIC.name} — Ir al inicio`}
    >
      <Image
        src={src}
        alt={`Logotipo de ${CLINIC.name}, Hospital de Especialidades`}
        width={Math.round(height * LOGO_RATIO)}
        height={height}
        priority
        className="object-contain"
      />
    </Link>
  );
}
