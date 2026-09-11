// Theme: the CSS custom properties every scene reads.
//
// The engine never writes a brand colour. Give accent, ink and paper; the
// rest is derived unless overridden. The defaults below are ZAH's own deck
// exactly (they are not derived, so ZAH's deck stays pixel-identical).

const ZAH = {
  accent: "#DB4A2B",
  ink: "#073763",
  paper: "#FAFAF7",
  panel: "#ECEDEF",
  muted: "#4A6B9B",
  ink2: "#0a3f6f",
  inkDeep: "#0b2744",
  inkVeil: "#052a4d",
  soft: "#9db6d6",
  soft2: "#cdd9e8",
  soft3: "#dbe6f2",
  dim: "#7f9bbd",
  grey: "#C8CCD1",
  grey2: "#9aa7b8",
  gearLight: "#bcd0e6",
  fontDisplay: "'Archivo',sans-serif",
  fontBody: "'Hanken Grotesk',sans-serif",
  fontsUrl:
    "https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800;900&family=Hanken+Grotesk:wght@400;500;600;700&display=swap",
};

export function hexToRgb(hex) {
  let h = String(hex).trim().replace(/^#/, "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const n = parseInt(h.slice(0, 6), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

const toHex = (rgb) => "#" + rgb.map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0")).join("");

/** Mix colour a toward colour b by t (0..1). */
export function mix(a, b, t) {
  const A = hexToRgb(a), B = hexToRgb(b);
  return toHex(A.map((v, i) => v + (B[i] - v) * t));
}

/** "219 74 43" — the form `rgb(var(--x) / .2)` wants. */
export const rgbTriplet = (hex) => hexToRgb(hex).join(" ");

/**
 * Fill in every token. When the caller changes ink/accent/paper but leaves a
 * derived token out, that token is derived from THEIR colours, not ZAH's.
 */
export function resolveTheme(theme = {}) {
  const t = { ...theme };
  const custom = t.ink && t.ink.toLowerCase() !== ZAH.ink.toLowerCase();
  const ink = t.ink || ZAH.ink;
  const paper = t.paper || ZAH.paper;
  const d = (key, derive) => (t[key] ? t[key] : custom ? derive() : ZAH[key]);
  return {
    accent: t.accent || ZAH.accent,
    ink,
    paper,
    panel: t.panel || (t.paper && t.paper.toLowerCase() !== ZAH.paper.toLowerCase() ? mix(paper, "#000000", 0.06) : ZAH.panel),
    muted: d("muted", () => mix(ink, "#ffffff", 0.3)),
    ink2: d("ink2", () => mix(ink, "#ffffff", 0.06)),
    inkDeep: d("inkDeep", () => mix(ink, "#000000", 0.3)),
    inkVeil: d("inkVeil", () => mix(ink, "#000000", 0.2)),
    soft: d("soft", () => mix(ink, "#ffffff", 0.62)),
    soft2: d("soft2", () => mix(ink, "#ffffff", 0.8)),
    soft3: d("soft3", () => mix(ink, "#ffffff", 0.87)),
    dim: d("dim", () => mix(ink, "#ffffff", 0.48)),
    grey: t.grey || ZAH.grey,
    grey2: t.grey2 || ZAH.grey2,
    gearLight: d("gearLight", () => mix(ink, "#ffffff", 0.72)),
    fontDisplay: t.fontDisplay || ZAH.fontDisplay,
    fontBody: t.fontBody || ZAH.fontBody,
    fontsUrl: t.fontsUrl === undefined ? ZAH.fontsUrl : t.fontsUrl,
  };
}

/** The :root-style block, scoped to .zw-root so a host page is untouched. */
export function themeCss(theme) {
  const r = resolveTheme(theme);
  const vars = [
    ["accent", r.accent], ["accent-rgb", rgbTriplet(r.accent)],
    ["ink", r.ink], ["ink-rgb", rgbTriplet(r.ink)],
    ["ink-2", r.ink2], ["ink-deep", r.inkDeep], ["ink-veil", r.inkVeil],
    ["paper", r.paper], ["panel", r.panel],
    ["muted", r.muted], ["muted-rgb", rgbTriplet(r.muted)],
    ["soft", r.soft], ["soft-2", r.soft2], ["soft-3", r.soft3], ["dim", r.dim],
    ["grey", r.grey], ["grey-2", r.grey2], ["gear-light", r.gearLight],
    ["font-display", r.fontDisplay], ["font-body", r.fontBody],
  ];
  return `.zw-root{${vars.map(([k, v]) => `--zw-${k}:${v}`).join(";")}}`;
}

export const ZAH_THEME = ZAH;
