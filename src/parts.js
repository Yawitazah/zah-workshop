// Small pieces every scene shares: escaping, the colour shorthands, the
// reveal styles, gears, icons, buttons. No brand colour appears in this file
// or any scene; every colour is a var(--zw-*) from theme.js.

export const esc = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** Lines joined with <br>, each escaped. */
export const lines = (arr) => (Array.isArray(arr) ? arr : [arr]).map(esc).join("<br>");

/* ---- colour shorthands (CSS var references) ---- */
export const C = {
  accent: "var(--zw-accent)",
  ink: "var(--zw-ink)",
  ink2: "var(--zw-ink-2)",
  inkDeep: "var(--zw-ink-deep)",
  inkVeil: "var(--zw-ink-veil)",
  paper: "var(--zw-paper)",
  panel: "var(--zw-panel)",
  muted: "var(--zw-muted)",
  soft: "var(--zw-soft)",
  soft2: "var(--zw-soft-2)",
  soft3: "var(--zw-soft-3)",
  dim: "var(--zw-dim)",
  grey: "var(--zw-grey)",
  grey2: "var(--zw-grey-2)",
  gearLight: "var(--zw-gear-light)",
  /** accent with alpha: A(.28) -> rgb(var(--zw-accent-rgb) / .28) */
  A: (a) => `rgb(var(--zw-accent-rgb) / ${a})`,
  I: (a) => `rgb(var(--zw-ink-rgb) / ${a})`,
  M: (a) => `rgb(var(--zw-muted-rgb) / ${a})`,
};
export const F = { display: "var(--zw-font-display)", body: "var(--zw-font-body)" };

/** The accent -> ink stripe every card wears on hover. */
export const STRIPE = `linear-gradient(90deg,${C.accent},${C.ink})`;
export const EASE = "cubic-bezier(.16,.84,.34,1)";

/* ---- reveal-on-scroll inline styles (the wire writes opacity/transform back) ---- */
export const reveal = (y = 24, dur = ".8s") =>
  `opacity:0;transform:translateY(${y}px);transition:opacity ${dur} ${EASE},transform ${dur} ${EASE};`;
/** Cards: a snappier transform so the hover lift feels immediate. */
export const revealCard = (y = 30) =>
  `opacity:0;transform:translateY(${y}px);transition:opacity .8s ${EASE},transform .35s ${EASE};`;

/* ---- section shells ---- */
export function section({ idx, label, bg, extra = "", align = "center", column = true, text = "" }) {
  const flex = column ? "display:flex;flex-direction:column;justify-content:center;" : "display:flex;";
  const items = align ? `align-items:${align};` : "";
  return `<section data-idx="${idx}" data-scene="${label}" data-screen-label="${String(idx + 1).padStart(2, "0")}" style="min-height:100vh;width:100%;box-sizing:border-box;${flex}${items}${text}position:relative;scroll-snap-align:start;scroll-snap-stop:always;padding:64px 6vw;overflow:hidden;background:${bg}${extra ? ";" + extra : ""}">`;
}

/* ---- gears (the brand's signature background) ---- */
function gearSvg(teeth, hub) {
  const outer = 50, inner = 42, hubR = 18, bore = 8, step = 360 / teeth, tooth = step / 2;
  const pts = [];
  const polar = (r, deg) => { const a = (deg * Math.PI) / 180; return [Math.cos(a) * r, Math.sin(a) * r]; };
  for (let i = 0; i < teeth; i++) {
    const a0 = i * step;
    pts.push(polar(outer, a0)); pts.push(polar(outer, a0 + tooth * 0.45));
    pts.push(polar(inner, a0 + tooth * 0.55)); pts.push(polar(inner, a0 + tooth));
  }
  const poly = pts.map((p) => p[0].toFixed(2) + "," + p[1].toFixed(2)).join(" ");
  let spokes = "";
  for (let i = 0; i < 6; i++) {
    const a = (i * Math.PI) / 3;
    spokes += `<line x1="${(Math.cos(a) * (hubR - 2)).toFixed(2)}" y1="${(Math.sin(a) * (hubR - 2)).toFixed(2)}" x2="${(Math.cos(a) * inner * 0.86).toFixed(2)}" y2="${(Math.sin(a) * inner * 0.86).toFixed(2)}" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>`;
  }
  return `<svg viewBox="-50 -50 100 100" width="100%" height="100%"><polygon points="${poly}" fill="currentColor"/><circle cx="0" cy="0" r="${hubR}" fill="${hub}"/><circle cx="0" cy="0" r="${hubR - 1}" fill="none" stroke="currentColor" stroke-width="1.5"/>${spokes}<circle cx="0" cy="0" r="${bore}" fill="${hub}"/><circle cx="0" cy="0" r="${bore}" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`;
}

const round = (n) => Math.round(n * 1000) / 1000;

/**
 * Four gears behind a scene. `color` is the gear colour, `hub` the scene's
 * own background (so the hub reads as a hole), `b` a brightness multiplier.
 */
export function gears({ color, hub, b = 1 }) {
  const gear = (size, teeth, speed, reverse, opacity, pos) =>
    `<div style="position:absolute;width:${size}px;height:${size}px;opacity:${round(opacity)};color:${color};pointer-events:none;${pos}"><div style="width:100%;height:100%;animation:${reverse ? "gearSpinRev" : "gearSpin"} ${speed}s linear infinite">${gearSvg(teeth, hub)}</div></div>`;
  const inner =
    gear(360, 14, 90, false, 0.08 * b, "top:-120px;right:-100px;") +
    gear(220, 12, 65, true, 0.07 * b, "top:38%;left:-80px;") +
    gear(140, 10, 40, false, 0.09 * b, "bottom:-40px;right:12%;") +
    gear(90, 9, 32, true, 0.1 * b, "top:80px;left:32%;");
  return `<div style="position:absolute;inset:0;z-index:0;pointer-events:none;overflow:hidden;color:${color}">${inner}</div>`;
}

/* ---- confetti on the offer ---- */
export function confetti() {
  const colors = [C.accent, C.ink, C.grey, C.accent, C.muted, C.accent];
  let out = "";
  for (let i = 0; i < 16; i++) {
    const left = round((i * 6.3 + 3) % 100), delay = ((i * 37) % 50) / 10, dur = round(4.2 + (i % 5) * 0.7), size = 7 + (i % 3) * 4, c = colors[i % colors.length];
    out += `<span style="position:absolute;top:-8vh;left:${left}%;width:${size}px;height:${size}px;background:${c};border-radius:${i % 2 ? "2px" : "50%"};opacity:0;pointer-events:none;animation:zahConfetti ${dur}s linear ${delay}s infinite"></span>`;
  }
  return `<div style="position:absolute;inset:0;overflow:hidden;pointer-events:none">${out}</div>`;
}

/* ---- icons (stroke icons inherit currentColor) ---- */
const STROKE = `fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`;
export const ICON = {
  arrow: `<svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
  zoom: `<svg viewBox="0 0 24 24" width="100%" height="100%" ${STROKE}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3M11 8v6M8 11h6"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" width="100%" height="100%" ${STROKE}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4M9 14l2 2 4-4"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor"><path d="M12 20.7C7 17 3 13.6 3 9.6 3 7 5 5 7.6 5c1.6 0 3.1.8 3.9 2.1C12.3 5.8 13.8 5 15.4 5 18 5 20 7 20 9.6c0 4-4 7.4-8 11.1z"/></svg>`,
  spark: `<svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor"><path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6z"/></svg>`,
  star: `<svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z"/></svg>`,
};
export const iconBox = (name, px) => `<span style="display:inline-block;width:${px}px;height:${px}px">${ICON[name] || ""}</span>`;

/* ---- actions ---- */
/** data-* hooks the wire reads: href opens a new tab, modal opens a modal. */
export function actAttrs(a) {
  if (!a) return "";
  if (a.modal) return ` data-act="modal" data-modal-name="${esc(a.modal)}"`;
  if (a.href) return ` data-act="open" data-href="${esc(a.href)}"`;
  return "";
}

const TONES = {
  accent: `background:${C.accent};color:#fff;box-shadow:0 8px 20px ${C.A(".28")}`,
  ink: `background:${C.ink};color:#fff;box-shadow:0 8px 20px ${C.I(".26")}`,
  white: `background:#fff;color:${C.accent};box-shadow:0 12px 28px rgba(0,0,0,.25)`,
};

/**
 * A button. `size` picks the padding/font of the four sizes the deck uses:
 * card (products), hero (spotlight CTA), small (offer cards), panel.
 */
export function button(a, { size = "small", extra = "", weight } = {}) {
  if (!a) return "";
  const tone = TONES[a.tone || "accent"];
  const sizes = {
    card: "font-size:16px;padding:14px 22px;border-radius:11px;transition:background .25s,transform .25s;",
    hero: "font-size:17px;padding:16px 30px;border-radius:12px;",
    small: "font-size:15px;padding:11px 20px;border-radius:10px;display:inline-flex;align-items:center;gap:8px;",
    row: "font-size:15px;padding:13px 22px;border-radius:10px;display:inline-flex;align-items:center;gap:8px;white-space:nowrap;",
    feature: "font-size:16px;padding:15px 28px;border-radius:12px;display:inline-flex;align-items:center;gap:9px;white-space:nowrap;",
    panel: "font-size:16px;padding:14px 26px;border-radius:12px;display:inline-flex;align-items:center;gap:9px;",
  };
  const w = weight || (size === "feature" || size === "panel" ? 800 : 700);
  const arrow = a.arrow ? iconBox("arrow", size === "panel" ? 16 : 15) : "";
  return `<button${actAttrs(a)} style="${extra}cursor:pointer;border:none;font-family:${F.body};font-weight:${w};${sizes[size]}${tone}">${esc(a.label)}${arrow}</button>`;
}

/** Badge beside a title. tone: ink (default) or accent; or a raw colour. */
export function badge(text, tone = "ink", { size = 12 } = {}) {
  if (!text) return "";
  const color = tone === "accent" ? C.accent : tone === "ink" ? C.ink : tone;
  const bg = tone === "accent" ? C.A(".12") : tone === "ink" ? C.I(".1") : hexAlpha(tone, 0.14);
  const pad = size >= 12 ? "5px 12px" : "4px 11px";
  return `<span style="font-size:${size}px;font-weight:800;letter-spacing:.07em;text-transform:uppercase;color:${color};background:${bg};padding:${pad};border-radius:7px">${esc(text)}</span>`;
}

/** rgba() from a hex colour, for one-off badge colours a card brings with it. */
export function hexAlpha(hex, a) {
  let h = String(hex).replace(/^#/, "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const n = parseInt(h.slice(0, 6), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${String(a).replace(/^0\./, ".")})`;
}

/** The uppercase eyebrow line. */
export const eyebrow = (text, color = C.accent, { tracking = ".18em", mb = 12, inline = true, revealStyle = reveal() } = {}) =>
  `<span data-reveal style="${revealStyle}${inline ? "display:inline-block;" : ""}color:${color};font-weight:700;letter-spacing:${tracking};text-transform:uppercase;font-size:14px;${mb ? `margin-bottom:${mb}px` : ""}">${esc(text)}</span>`;

/** Resolve an asset path: "/x.png" -> assetBase + "/x.png". */
export const asset = (src, base) => (base && typeof src === "string" && src.startsWith("/") ? base.replace(/\/$/, "") + src : src);
