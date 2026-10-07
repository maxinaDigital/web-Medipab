export const CLINIC = {
  name: "Clínica Crystal",
  legalName: "CLINICA CRYSTAL S.A. de C.V.",
  rfc: "CCR220517JW8",
  phone: "(449) 000-0000",
  phoneHref: "tel:+524490000000",
  whatsapp: "524490000000",
  email: "contacto@clinicacrystal.com",
  address: {
    street: "Av. del Parque #348",
    neighborhood: "Col. Jardines del Parque",
    city: "Aguascalientes",
    state: "Aguascalientes",
    country: "México",
    postalCode: "20276",
    between: "entre Av. del Lago y Av. Héroe de Nacozari",
    full: "Av. del Parque #348, Col. Jardines del Parque, CP 20276, Aguascalientes, Ags.",
    googleMapsUrl:
      "https://www.google.com/maps/search/Av.+del+Parque+%23348,+Col.+Jardines+del+Parque,+CP+20276,+Aguascalientes,+Ags.,+M%C3%A9xico",
    googleMapsEmbed:
      "https://maps.google.com/maps?q=Av.+del+Parque+%23348,+Col.+Jardines+del+Parque,+CP+20276,+Aguascalientes,+Ags.,+M%C3%A9xico&output=embed&hl=es",
  },
  hours: [
    { days: "Lunes – Domingo", hours: "Abierto 24 horas" },
  ],
  hoursShort: "Abierto 24/7 · 365 días",
  foundedYear: 2025,
  social: {
    facebook: "https://facebook.com/clinicacrystal",
    instagram: "https://instagram.com/clinicacrystal",
    whatsapp: "https://wa.me/524490000000",
  },
} as const;

export const TRUST_STATS = [
  {
    value: "24/7",
    label: "Atención continua",
    description: "Abiertos todos los días, todo el año, sin excepción",
    icon: "Clock",
  },
  {
    value: "5",
    label: "Quirófanos equipados",
    description: "3 exclusivos de maternidad y 2 de cirugía general",
    icon: "Building2",
  },
  {
    value: "8",
    label: "Especialidades médicas",
    description: "Médicos reconocidos con amplia trayectoria clínica",
    icon: "Stethoscope",
  },
  {
    value: "100%",
    label: "Diagnóstico in-house",
    description: "Laboratorio e imagenología propios, sin salir de la clínica",
    icon: "FlaskConical",
  },
] as const;

export const FACILITIES = [
  "3 quirófanos exclusivos de maternidad",
  "2 quirófanos de cirugía general",
  "Imagenología propia (ultrasonido, rayos X)",
  "Laboratorio clínico in-house",
  "Cafetería en instalaciones",
  "Salas de estar en todos los niveles",
  "Estacionamiento",
] as const;
