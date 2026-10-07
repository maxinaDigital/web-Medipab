// Rebuilds the Medipab logo as clean vector art, using the pixelated logo.png as a measured reference.
// Uso (fuera del proyecto, en una carpeta aparte): npm i opentype.js sharp @fontsource/montserrat && node _generador-logo.js <carpeta-salida>
const fs = require("fs");
const opentype = require("opentype.js");
const sharp = require("sharp");
const path = require("path");

const FONT_DIR = "node_modules/@fontsource/montserrat/files";
const bold = opentype.parse(fs.readFileSync(path.join(FONT_DIR, "montserrat-latin-700-normal.woff")).buffer);
const medium = opentype.parse(fs.readFileSync(path.join(FONT_DIR, "montserrat-latin-500-normal.woff")).buffer);
const regular = opentype.parse(fs.readFileSync(path.join(FONT_DIR, "montserrat-latin-400-normal.woff")).buffer);

const OUT = process.argv[2];
fs.mkdirSync(OUT, { recursive: true });

const NAVY = "#14365A";
const TEAL = "#2B9E96";

// ---- helpers --------------------------------------------------------------
function glyphPath(font, ch, size) {
  return font.charToGlyph(ch).getPath(0, 0, size);
}
function bbox(p) {
  const b = p.getBoundingBox();
  return b;
}
// Transform an opentype Path by x' = x*sx + tx, y' = y*sy + ty
function transform(p, sx, sy, tx, ty) {
  const f = (n) => +n.toFixed(2);
  return p.commands
    .map((c) => {
      const X = (x) => f(x * sx + tx);
      const Y = (y) => f(y * sy + ty);
      switch (c.type) {
        case "M": return `M${X(c.x)} ${Y(c.y)}`;
        case "L": return `L${X(c.x)} ${Y(c.y)}`;
        case "Q": return `Q${X(c.x1)} ${Y(c.y1)} ${X(c.x)} ${Y(c.y)}`;
        case "C": return `C${X(c.x1)} ${Y(c.y1)} ${X(c.x2)} ${Y(c.y2)} ${X(c.x)} ${Y(c.y)}`;
        case "Z": return "Z";
      }
    })
    .join("");
}

// Fit one glyph into a measured box [x0,x1] with cap from top..baseline
function fitGlyph(font, ch, x0, x1, top, baseline, maxStretch = 0.12) {
  const p = glyphPath(font, ch, 100);
  const b = bbox(p);
  const s = (baseline - top) / (b.y2 - b.y1); // uniform scale from cap height
  const natural = (b.x2 - b.x1) * s;
  let sx = s * ((x1 - x0) / natural);
  sx = Math.min(Math.max(sx, s * (1 - maxStretch)), s * (1 + maxStretch));
  const w = (b.x2 - b.x1) * sx;
  const cx = (x0 + x1) / 2;
  return transform(p, sx, s, cx - w / 2 - b.x1 * sx, baseline - b.y2 * s);
}

// Lay out a string with fixed tracking, then compress horizontally to span exactly [x0,x1]
function trackedText(font, text, x0, x1, top, baseline, trackEm = 0.035) {
  const cb = bbox(glyphPath(font, 'H', 100));
  const s = (baseline - top) / (cb.y2 - cb.y1);
  const size = 100 * s;
  const glyphs = font.stringToGlyphs(text);
  const tracking = trackEm * size;
  let x = 0;
  const parts = glyphs.map((g) => {
    const p = g.getPath(x, 0, size);
    x += (g.advanceWidth / font.unitsPerEm) * size + tracking;
    return p;
  });
  const merged = new opentype.Path();
  parts.forEach((p) => merged.extend(p));
  const b = merged.getBoundingBox();
  const sx = (x1 - x0) / (b.x2 - b.x1);
  return transform(merged, sx, 1, x0 - b.x1 * sx, baseline);
}

// ---- wordmark ---------------------------------------------------------------
const TOP = 63.5, BASE = 121.5;
const letters = [
  ["M", 217, 278.5],
  ["E", 288, 321.5],
  ["D", 328, 377.5],
  ["P", 415, 456],
  ["A", 451, 505.5],
  ["B", 512, 552.5],
].map(([ch, a, b]) => fitGlyph(bold, ch, a, b, TOP, BASE)).join("");

const subtitle = trackedText(medium, "HOSPITAL DE ESPECIALIDADES", 217, 552.5, 133.2, 151.5);

// The "I" of MEDIPAB is a standing figure in a suit with a briefcase
function figure(fill, light) {
  return `
  <g fill="${fill}">
    <circle cx="394.6" cy="55.6" r="6.9"/>
    <path d="M388.6 63.4h12c2.2 0 3.6 1.6 3.6 3.6V69h-19.2v-2c0-2 1.4-3.6 3.6-3.6z"/>
    <rect x="387.4" y="65" width="14.4" height="31" rx="2"/>
    <rect x="383" y="64.6" width="5.6" height="29.6" rx="2.6"/>
    <rect x="400.6" y="64.6" width="5.6" height="27" rx="2.6"/>
    <rect x="401" y="93.2" width="6.6" height="10.6" rx="1.2"/>
    <rect x="388" y="93" width="6.3" height="28.5" rx="1.6"/>
    <rect x="394.9" y="93" width="6.3" height="28.5" rx="1.6"/>
  </g>
  <path d="M390.4 63.4h8.4l-4.2 11.4z" fill="${light}"/>
  <path d="M393.7 65.2h1.8l.8 6.4-1.7 3.4-1.7-3.4z" fill="${fill}"/>
  <path d="M389.2 65.6l5.4 11.8M399.8 65.6l-5.2 11.8" stroke="${light}" stroke-opacity=".55" stroke-width=".7" fill="none"/>
  <rect x="403.3" y="91.6" width="2" height="2.2" rx=".6" fill="${fill}"/>`;
}

// ---- emblem -----------------------------------------------------------------
const CX = 92.5, CY = 105, R = 80.5;
function crossPath(cx, cy, half, t, r) {
  // plus sign: arms of half-length `half`, thickness `t`, outer corner radius r
  const a = t / 2;
  const pts = [
    [cx - a, cy - half], [cx + a, cy - half], [cx + a, cy - a], [cx + half, cy - a],
    [cx + half, cy + a], [cx + a, cy + a], [cx + a, cy + half], [cx - a, cy + half],
    [cx - a, cy + a], [cx - half, cy + a], [cx - half, cy - a], [cx - a, cy - a],
  ];
  // outer corners get radius r, inner (concave) corners a small radius
  const outer = new Set([0, 1, 3, 4, 6, 7, 9, 10]);
  let d = "";
  pts.forEach((p, i) => {
    const prev = pts[(i + pts.length - 1) % pts.length];
    const next = pts[(i + 1) % pts.length];
    const rr = outer.has(i) ? r : 2.2;
    const v1 = [prev[0] - p[0], prev[1] - p[1]];
    const v2 = [next[0] - p[0], next[1] - p[1]];
    const l1 = Math.hypot(...v1), l2 = Math.hypot(...v2);
    const s = [p[0] + (v1[0] / l1) * rr, p[1] + (v1[1] / l1) * rr];
    const e = [p[0] + (v2[0] / l2) * rr, p[1] + (v2[1] / l2) * rr];
    d += (i === 0 ? `M${s[0].toFixed(2)} ${s[1].toFixed(2)}` : `L${s[0].toFixed(2)} ${s[1].toFixed(2)}`);
    d += `Q${p[0]} ${p[1]} ${e[0].toFixed(2)} ${e[1].toFixed(2)}`;
  });
  return d + "Z";
}
const cross = crossPath(92.2, 104, 43.2, 32.5, 5.5);

function hmpLetter(ch, top) {
  const cap = 15.5;
  const p = glyphPath(medium, ch, 100);
  const b = bbox(p);
  const s = cap / (b.y2 - b.y1);
  const w = (b.x2 - b.x1) * s;
  return transform(p, s, s, 92.2 - w / 2 - b.x1 * s, top + cap - b.y2 * s);
}
const hmp = hmpLetter("H", 72.5) + hmpLetter("M", 96.3) + hmpLetter("P", 120);

function emblem(id) {
  return `
  <defs>
    <radialGradient id="${id}-disk" cx="0.52" cy="0.55" r="0.55" fx="0.5" fy="0.52">
      <stop offset="0" stop-color="#34B6BD"/>
      <stop offset="0.38" stop-color="#1A8DB2"/>
      <stop offset="0.66" stop-color="#0C66A3"/>
      <stop offset="0.84" stop-color="#0B4A86"/>
      <stop offset="0.94" stop-color="#152B62"/>
      <stop offset="1" stop-color="#161B45"/>
    </radialGradient>
    <linearGradient id="${id}-rim" x1="0.2" y1="0" x2="0.8" y2="1">
      <stop offset="0" stop-color="#0D1233" stop-opacity=".55"/>
      <stop offset="0.55" stop-color="#0D1233" stop-opacity="0"/>
      <stop offset="1" stop-color="#2A7FB0" stop-opacity=".25"/>
    </linearGradient>
    <radialGradient id="${id}-glow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#5FE0E6" stop-opacity=".7"/>
      <stop offset="1" stop-color="#5FE0E6" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="${id}-cross" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#5FCAD0"/>
      <stop offset="0.5" stop-color="#47B9C1"/>
      <stop offset="1" stop-color="#5BBEC6"/>
    </linearGradient>
    <filter id="${id}-blur" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="1.6"/>
    </filter>
  </defs>
  <circle cx="${CX}" cy="${CY}" r="${R}" fill="url(#${id}-disk)"/>
  <circle cx="${CX}" cy="${CY}" r="${R}" fill="url(#${id}-rim)"/>
  <circle cx="${CX}" cy="${CY}" r="58" fill="none" stroke="#8FE6F2" stroke-opacity=".22" stroke-width="1.2"/>
  <circle cx="${CX}" cy="${CY}" r="${R - 0.6}" fill="none" stroke="#0A1030" stroke-opacity=".35" stroke-width="1.2"/>
  <circle cx="92.2" cy="104" r="56" fill="url(#${id}-glow)"/>
  <path d="${cross}" fill="none" stroke="#9FF4FF" stroke-width="4" filter="url(#${id}-blur)" opacity=".85"/>
  <path d="${cross}" fill="url(#${id}-cross)"/>
  <path d="${cross}" fill="none" stroke="#B4F7FF" stroke-width="1.8"/>
  <path d="${hmp}" fill="#0F4766"/>`;
}

// ---- assemble ---------------------------------------------------------------
function svg(viewBox, body, w, h) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${w}" height="${h}">${body}
</svg>
`;
}
const fullVB = "6 18 554 174";
const variants = {
  "medipab-logo": { text: NAVY, sub: TEAL, light: "#FFFFFF" },
  "medipab-logo-blanco": { text: "#FFFFFF", sub: "#7FDDD3", light: "#14365A" },
};
for (const [name, c] of Object.entries(variants)) {
  const body = `${emblem(name)}
  <path d="${letters}" fill="${c.text}"/>${figure(c.text, c.light)}
  <path d="${subtitle}" fill="${c.sub}"/>`;
  fs.writeFileSync(path.join(OUT, `${name}.svg`), svg(fullVB, body, 554, 174));
}
fs.writeFileSync(path.join(OUT, "medipab-icono.svg"), svg("10 22.5 165 165", emblem("icono"), 165, 165));

(async () => {
  const r = (f) => fs.readFileSync(path.join(OUT, f));
  await sharp(r("medipab-logo.svg"), { density: 72 * 2400 / 554 }).png().toFile(path.join(OUT, "medipab-logo.png"));
  await sharp(r("medipab-logo-blanco.svg"), { density: 72 * 2400 / 554 }).png().toFile(path.join(OUT, "medipab-logo-blanco.png"));
  // white-background JPG-like version for documents
  await sharp(r("medipab-logo.svg"), { density: 72 * 2400 / 554 }).flatten({ background: "#ffffff" }).png().toFile(path.join(OUT, "medipab-logo-fondo-blanco.png"));
  for (const s of [512, 180, 32]) {
    await sharp(r("medipab-icono.svg"), { density: 72 * (s * 2) / 165 }).resize(s, s).png().toFile(path.join(OUT, `medipab-icono-${s}.png`));
  }
  console.log("ok");
})();
