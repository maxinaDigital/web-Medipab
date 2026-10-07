import type { MetadataRoute } from "next";
import { CLINIC } from "@/lib/data/clinic";

// /robots.txt — todo el sitio es público; se indica dónde está el sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${CLINIC.siteUrl}/sitemap.xml`,
    host: CLINIC.siteUrl,
  };
}
