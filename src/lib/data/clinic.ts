// Datos institucionales de Medipab.
// Fuente: entrevista con Dirección Médica (2026-10-03).
// Todo lo marcado PENDIENTE es un placeholder que el cliente debe confirmar antes de publicar
// (lista completa en CLAUDE.md → "Hospital data").

export const CLINIC = {
  name: "Medipab",
  fullName: "Medipab Hospital de Especialidades",
  legalName: "Medipab Hospital de Especialidades", // PENDIENTE: razón social
  phone: "(465) 000-0000", // PENDIENTE
  phoneHref: "tel:+524650000000", // PENDIENTE
  emergencyPhone: "(465) 000-0000", // PENDIENTE: línea directa de Urgencias
  emergencyPhoneHref: "tel:+524650000000", // PENDIENTE
  whatsapp: "524650000000", // PENDIENTE
  email: "contacto@medipab.com.mx", // PENDIENTE
  siteUrl: "https://medipab.com.mx", // PENDIENTE: dominio
  address: {
    street: "", // PENDIENTE: calle y número
    neighborhood: "", // PENDIENTE: colonia
    city: "Pabellón de Arteaga",
    state: "Aguascalientes",
    country: "México",
    postalCode: "", // PENDIENTE
    between: "", // PENDIENTE: entre calles / referencia
    full: "Pabellón de Arteaga, Aguascalientes", // PENDIENTE: dirección completa
    googleMapsUrl:
      "https://www.google.com/maps/search/Pabell%C3%B3n+de+Arteaga,+Aguascalientes,+M%C3%A9xico",
    googleMapsEmbed:
      "https://maps.google.com/maps?q=Pabell%C3%B3n+de+Arteaga,+Aguascalientes,+M%C3%A9xico&output=embed&hl=es",
  },
  social: {
    facebook: "", // PENDIENTE
    instagram: "", // PENDIENTE
    whatsapp: "https://wa.me/524650000000", // PENDIENTE
  },
} as const;

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
    destination: `${CLINIC.fullName}, ${CLINIC.address.full}, México`,
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
