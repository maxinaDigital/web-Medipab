/**
 * Serializa datos estructurados para <script type="application/ld+json">.
 * Escapa "<" para que un texto con "</script>" (p. ej. la bio de un médico) no cierre la etiqueta
 * e inyecte HTML en la página.
 */
export function jsonLdHtml(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
