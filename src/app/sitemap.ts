import type { MetadataRoute } from "next";
import { CLINIC } from "@/lib/data/clinic";
import { services } from "@/lib/data/services";
import { doctors } from "@/lib/data/doctors";

// /sitemap.xml generado en el build a partir de los datos del sitio.
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${CLINIC.siteUrl}${path}`;
  const lastModified = new Date();

  type Entry = MetadataRoute.Sitemap[number];
  const staticPages: MetadataRoute.Sitemap = ([
    { url: url("/"), changeFrequency: "weekly", priority: 1 },
    { url: url("/servicios"), changeFrequency: "monthly", priority: 0.9 },
    { url: url("/medicos"), changeFrequency: "monthly", priority: 0.8 },
    { url: url("/citas"), changeFrequency: "yearly", priority: 0.8 },
    { url: url("/contacto"), changeFrequency: "yearly", priority: 0.7 },
    { url: url("/nosotros"), changeFrequency: "yearly", priority: 0.6 },
    { url: url("/preguntas-frecuentes"), changeFrequency: "monthly", priority: 0.6 },
    { url: url("/aviso-de-privacidad"), changeFrequency: "yearly", priority: 0.2 },
  ] satisfies Entry[]).map((page) => ({ ...page, lastModified }));

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: url(`/servicios/${s.slug}`),
    lastModified,
    changeFrequency: "monthly",
    priority: s.category === "urgencias" ? 0.8 : 0.7,
  }));

  const doctorPages: MetadataRoute.Sitemap = doctors.map((d) => ({
    url: url(`/medicos/${d.slug}`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticPages, ...servicePages, ...doctorPages];
}
