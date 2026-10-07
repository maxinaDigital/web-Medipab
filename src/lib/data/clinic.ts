// Datos institucionales de Medipab.
// Fuentes: entrevista con Dirección Médica (2026-10-03) y ficha de Google Maps del hospital
// (https://maps.app.goo.gl/sHdqc2kNK48Wzm8WA, consultada 2026-10-07).
// Todo lo marcado PENDIENTE es un placeholder que el cliente debe confirmar antes de publicar
// (lista completa en CLAUDE.md → "Hospital data").

// Número de relleno heredado del arranque del proyecto. Mientras siga aquí, el build de producción falla
// (ver assertLaunchReady) para que el formulario no envíe datos de pacientes a un número ajeno.
const WHATSAPP_PLACEHOLDER = "524650000000";

export const CLINIC = {
  name: "Medipab",
  fullName: "Medipab Hospital de Especialidades",
  legalName: "Medipab Hospital de Especialidades", // PENDIENTE: razón social
  phone: "465 1111 202", // confirmado por el usuario (formato de presentación)
  phoneHref: "tel:+524651111202",
  // PENDIENTE: confirmar si Urgencias tiene línea directa; mientras, el conmutador (abierto 24 h)
  emergencyPhone: "465 1111 202",
  emergencyPhoneHref: "tel:+524651111202",
  whatsapp: WHATSAPP_PLACEHOLDER, // PENDIENTE: número de WhatsApp del hospital (52 + 10 dígitos)
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

/** Enlace de WhatsApp al hospital, opcionalmente con un mensaje prellenado. */
export function whatsappUrl(text?: string): string {
  const base = `https://wa.me/${CLINIC.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/**
 * Falla el build de producción en Vercel si siguen datos de contacto de relleno que recibirían
 * información de pacientes. Los previews (VERCEL_ENV=preview) y el desarrollo local no se bloquean.
 */
export function assertLaunchReady(): void {
  if (process.env.VERCEL_ENV !== "production") return;
  const problems = [
    CLINIC.whatsapp === WHATSAPP_PLACEHOLDER &&
      "CLINIC.whatsapp sigue siendo el número de relleno: configura el WhatsApp real del hospital.",
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
