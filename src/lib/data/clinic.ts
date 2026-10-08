// Datos institucionales de Medipab.
// Fuentes: entrevista con Dirección Médica (2026-10-03) y ficha de Google Maps del hospital
// (https://maps.app.goo.gl/sHdqc2kNK48Wzm8WA, consultada 2026-10-07).
// Todo lo marcado PENDIENTE es un placeholder que el cliente debe confirmar antes de publicar
// (lista completa en CLAUDE.md → "Hospital data").


export const CLINIC = {
  name: "Medipab",
  fullName: "Medipab Hospital de Especialidades",
  legalName: "Medipab Hospital de Especialidades", // PENDIENTE: razón social
  phone: "465 1111 202", // confirmado por el usuario (formato de presentación)
  phoneHref: "tel:+524651111202",
  // PENDIENTE: confirmar si Urgencias tiene línea directa; mientras, el conmutador (abierto 24 h)
  emergencyPhone: "465 1111 202",
  emergencyPhoneHref: "tel:+524651111202",
  // PENDIENTE: WhatsApp del hospital, formato 52 + 10 dígitos (ej. "524651111202").
  // Vacío = el sitio funciona solo con teléfono: los botones dicen "Llamar" y /citas pide agendar por teléfono.
  // Al llenarlo, el formulario de citas y los botones de WhatsApp se activan solos.
  whatsapp: "" as string,
  // El hospital no tiene correo propio: se usa el de Maxina Digital (indicado por el usuario, 2026-10-07)
  email: "contacto@maxinadigital.com",
  // Dominio confirmado por el usuario (registrado 2026-10-05, DNS en Cloudflare).
  // NEXT_PUBLIC_SITE_URL solo hace falta para apuntar a otro dominio (p. ej. un entorno de pruebas).
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.medipab.com").replace(/\/$/, ""),
  geo: { latitude: 22.1489027, longitude: -102.2790758 },
  address: {
    street: "Aquiles Serdán", // PENDIENTE: número exterior (Google Maps no lo muestra)
    neighborhood: "Zona Centro",
    city: "Pabellón de Arteaga",
    state: "Aguascalientes",
    country: "México",
    postalCode: "20670",
    between: "", // PENDIENTE: entre calles / referencia
    full: "Aquiles Serdán, Zona Centro, CP 20670, Pabellón de Arteaga, Ags.",
    googleMapsUrl: "https://maps.app.goo.gl/sHdqc2kNK48Wzm8WA",
    googleMapsEmbed: "https://maps.google.com/maps?q=22.1489027,-102.2790758&z=17&output=embed&hl=es",
  },
  social: {
    facebook: "", // PENDIENTE
    instagram: "", // PENDIENTE
  },
} as const;

/** Hay WhatsApp configurado: activa el formulario de citas y los botones de WhatsApp. */
export const HAS_WHATSAPP = CLINIC.whatsapp !== "";

/** Enlace de WhatsApp con mensaje opcional, o null si el hospital aún no tiene WhatsApp configurado. */
export function whatsappUrl(text?: string): string | null {
  if (!HAS_WHATSAPP) return null;
  const base = `https://wa.me/${CLINIC.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/**
 * Falla el build de producción en Vercel si el WhatsApp configurado no tiene formato válido (recibiría
 * datos de pacientes). Sin WhatsApp el sitio funciona solo con teléfono y no se bloquea.
 */
export function assertLaunchReady(): void {
  if (process.env.VERCEL_ENV !== "production") return;
  const problems = [
    HAS_WHATSAPP &&
      !/^52\d{10}$/.test(CLINIC.whatsapp) &&
      `CLINIC.whatsapp = "${CLINIC.whatsapp}" no tiene el formato 52 + 10 dígitos: el formulario enviaría datos de pacientes a un número equivocado.`,
  ].filter(Boolean);
  if (problems.length > 0) {
    throw new Error(`No se puede publicar a producción:\n- ${problems.join("\n- ")}`);
  }
}

/** Municipios vecinos desde los que llegan pacientes (para "Cómo llegar"). */
export const NEARBY_TOWNS = [
  "Rincón de Romos",
  "San José de Gracia",
  "Tepezalá",
  "Cosío",
  "Asientos",
  "Aguascalientes",
] as const;

/** Ruta en Google Maps desde un municipio de Aguascalientes hasta el hospital. */
export function directionsUrl(fromTown: string): string {
  const params = new URLSearchParams({
    api: "1",
    origin: `${fromTown}, Aguascalientes, México`,
    destination: `${CLINIC.geo.latitude},${CLINIC.geo.longitude}`,
    travelmode: "driving",
  });
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

/** Líneas de dirección no vacías, en orden de lectura. */
export function addressLines(): string[] {
  const { street, neighborhood, postalCode, city, between } = CLINIC.address;
  return [
    street,
    neighborhood,
    [postalCode && `CP ${postalCode}`, `${city}, Ags.`].filter(Boolean).join(", "),
    between && `(${between})`,
  ].filter(Boolean);
}
