// Fidelity: ZAH's deck rendered by the engine must equal the deck the brand
// site shipped before the extraction (test/fixtures/original-deck.html,
// frozen 2026-09-11), once the original's typed-in colours are mapped to the
// variables the engine emits and the hooks are renamed. Any other difference
// is a regression in the engine.
//
//   node test/fidelity.test.mjs          pass/fail + the first differences
//   node test/fidelity.test.mjs --dump   also writes the normalised pair to test/out/

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { renderDeck, renderPromotions } from "../src/index.js";
import content from "../examples/zah/content.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const dump = process.argv.includes("--dump");

/* ---- the original's brand values -> the engine's variables ---- */
const HEX = [
  ["#DB4A2B", "var(--zw-accent)"], ["#073763", "var(--zw-ink)"], ["#0a3f6f", "var(--zw-ink-2)"],
  ["#0b2744", "var(--zw-ink-deep)"], ["#052a4d", "var(--zw-ink-veil)"], ["#FAFAF7", "var(--zw-paper)"],
  ["#ECEDEF", "var(--zw-panel)"], ["#4A6B9B", "var(--zw-muted)"], ["#9db6d6", "var(--zw-soft)"],
  ["#cdd9e8", "var(--zw-soft-2)"], ["#dbe6f2", "var(--zw-soft-3)"], ["#7f9bbd", "var(--zw-dim)"],
  ["#C8CCD1", "var(--zw-grey)"], ["#9aa7b8", "var(--zw-grey-2)"], ["#bcd0e6", "var(--zw-gear-light)"],
];
const RGBA = [
  [/rgba\(219,74,43,(\.?[0-9.]+)\)/g, "rgb(var(--zw-accent-rgb) / $1)"],
  [/rgba\(7,55,99,(\.?[0-9.]+)\)/g, "rgb(var(--zw-ink-rgb) / $1)"],
  [/rgba\(74,107,155,(\.?[0-9.]+)\)/g, "rgb(var(--zw-muted-rgb) / $1)"],
];
const ACTS = {
  openCrm: `data-act="open" data-href="https://zahcrm.com"`,
  openUenity: `data-act="open" data-href="https://uenite.com"`,
  openServices: `data-act="open" data-href="/services"`,
  openLove: `data-act="open" data-href="/love?wallet=1"`,
  openBook: `data-act="open" data-href="/book/preview"`,
  openBook2: `data-act="open" data-href="/book/preview"`,
  openJob: `data-act="modal" data-modal-name="jobscout"`,
  openTally: `data-act="modal" data-modal-name="tally"`,
};

function normaliseOriginal(h) {
  for (const [hex, v] of HEX) h = h.replace(new RegExp(hex.replace("#", "#"), "gi"), v);
  for (const [re, v] of RGBA) h = h.replace(re, v);
  h = h.replace(/'Archivo',sans-serif/g, "var(--zw-font-display)").replace(/'Hanken Grotesk',sans-serif/g, "var(--zw-font-body)");
  h = h.replace(/data-act="(\w+)"/g, (m, act) => ACTS[act] || m);
  h = h.replace(/id="zah-(main|counter|qr-chip)"/g, 'id="zw-$1"');
  // The modal veils were inline rgba(7,55,99,.6) -> now a var; already handled by RGBA.
  return h;
}

function normaliseBoth(h) {
  return h
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\sdata-scene="[^"]*"/g, "")
    .replace(/\sdata-zw-[a-z]+="[^"]*"/g, "")
    .replace(/\sclass="zw-root[^"]*"/g, "")
    // 0.10500000000000001 and friends from the old generator's float maths
    .replace(/opacity:([0-9.]+)/g, (m, n) => "opacity:" + (Math.round(parseFloat(n) * 1000) / 1000))
    .replace(/left:([0-9.]+)%/g, (m, n) => "left:" + (Math.round(parseFloat(n) * 1000) / 1000) + "%")
    .replace(/&nbsp;/g, " ")
    .replace(/&#9650;/g, "▲")
    .replace(/&#8964;|&#10003;|&#8249;|&#8250;|&times;/g, (m) => ({ "&#8964;": "⌄", "&#10003;": "✓", "&#8249;": "‹", "&#8250;": "›", "&times;": "×" }[m]))
    .replace(/&amp;/g, "&")
    // declaration order inside a style attribute is not a difference
    .replace(/style="([^"]*)"/g, (m, css) => 'style="' + css.split(";").map((d) => d.trim()).filter(Boolean).sort().join(";") + '"')
    .replace(/>\s+</g, "><")
    .replace(/\s+/g, " ")
    .replace(/ >/g, ">")
    .trim();
}

/** Split on tags so a diff reports the first differing tag, not byte 40,000. */
const tokens = (h) => h.split(/(?=<)/);

/**
 * Lift every <div data-modal="x"> block out (depth-aware) so the two sides can
 * be compared body-then-modals: the old deck kept two lightboxes inside the
 * offer section, the engine keeps all modals at the root. Same screen.
 */
function splitModals(h) {
  const modals = {};
  let out = "";
  let i = 0;
  const re = /<div data-modal="([a-z0-9-]+)"/g;
  let m;
  while ((m = re.exec(h))) {
    const start = m.index;
    let depth = 0, j = start;
    const tag = /<\/?div[^>]*>/g;
    tag.lastIndex = start;
    let t, end = -1;
    while ((t = tag.exec(h))) { if (t[0].startsWith("</")) depth--; else depth++; if (depth === 0) { end = t.index + t[0].length; break; } }
    if (end < 0) throw new Error(`unbalanced modal "${m[1]}"`);
    out += h.slice(i, start);
    modals[m[1]] = h.slice(start, end);
    i = end;
    re.lastIndex = end;
  }
  out += h.slice(i);
  return { body: out, modals };
}

function compare(name, original, rendered) {
  const A = splitModals(normaliseOriginal(original)), B = splitModals(rendered);
  let ok = compareTokens(name, tokens(normaliseBoth(A.body)), tokens(normaliseBoth(B.body)));
  for (const k of new Set([...Object.keys(A.modals), ...Object.keys(B.modals)])) {
    ok = compareTokens(`${name} modal "${k}"`, tokens(normaliseBoth(A.modals[k] || "")), tokens(normaliseBoth(B.modals[k] || ""))) && ok;
  }
  return ok;
}

function compareTokens(name, a, b) {
  if (dump) {
    mkdirSync(join(here, "out"), { recursive: true });
    const safe = name.replace(/[^a-z0-9]+/gi, "-");
    writeFileSync(join(here, "out", `${safe}-original.html`), a.join("\n"));
    writeFileSync(join(here, "out", `${safe}-rendered.html`), b.join("\n"));
  }
  let diffs = 0;
  const max = Math.max(a.length, b.length);
  for (let i = 0; i < max; i++) {
    if (a[i] !== b[i]) {
      diffs++;
      if (diffs <= 6) {
        console.log(`\n${name}: first difference at token ${i}/${max}`);
        console.log("  original: " + (a[i] || "(end)").slice(0, 300));
        console.log("  rendered: " + (b[i] || "(end)").slice(0, 300));
      }
      // Resync heuristically: if lengths differ, stop after reporting.
      if (a.length !== b.length && diffs >= 3) { console.log(`  (token counts differ: ${a.length} vs ${b.length}; stopping)`); break; }
    }
  }
  console.log(`${name}: ${diffs === 0 ? "IDENTICAL" : diffs + " differing tokens"} (${a.length} tokens)`);
  return diffs === 0;
}

const deck = renderDeck(content);
const promo = renderPromotions(content);
const okDeck = compare("deck", readFileSync(join(here, "fixtures", "original-deck.html"), "utf8"), deck.html);

// The promo fixture is only the cards column (the old page drew its own hero
// in React). Compare that column: everything after the confetti, before the
// modals, on both sides.
const column = (h) => { const s = h.indexOf('<div style="position:relative;z-index:2;flex:1 1 auto'); const e = h.indexOf("<div data-modal="); return h.slice(s, e).replace(/<\/section>\s*$/, ""); };
const okPromo = compare("promotions", column(readFileSync(join(here, "fixtures", "original-promo.html"), "utf8")), column(promo.html));

if (!okDeck || !okPromo) { console.log("\nFAIL"); process.exit(1); }
console.log("\nPASS: the engine reproduces ZAH's deck exactly.");
