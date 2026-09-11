// ZAH Workshop — the one entry point.
//
//   renderDeck(content)        -> { html, css, fontsUrl }   the full-screen deck
//   renderPromotions(content)  -> { html, css, fontsUrl }   the offer scene as a normal page
//   pageHtml(rendered, opts)   -> a complete standalone HTML document
//
// Behaviour is mounted separately by src/wire.js (mountDeck / mountPromotions)
// so the same markup works in a static file, an Express site or a React app.

import { esc, C, F, asset, gears, confetti, iconBox, lines } from "./parts.js";
import { SCENES, DEFAULT_LABELS, offerRows } from "./scenes.js";
import { dots, prevNext, qrChip, modals } from "./chrome.js";
import { themeCss, resolveTheme } from "./theme.js";

export { themeCss, resolveTheme } from "./theme.js";
export { baseCss } from "./styles.js";
import { baseCss } from "./styles.js";

function context(content, options = {}) {
  if (!content || !content.brand || !Array.isArray(content.scenes)) {
    throw new Error("zah-workshop: content needs { brand, scenes[] }");
  }
  const base = options.assetBase || "";
  return { content, brand: content.brand, a: (src) => asset(src, base), base };
}

export function renderDeck(content, options = {}) {
  const ctx = context(content, options);
  const labels = [];
  const scenes = content.scenes.map((s, idx) => {
    const fn = SCENES[s.type];
    if (!fn) throw new Error(`zah-workshop: unknown scene type "${s.type}"`);
    labels.push(s.label || DEFAULT_LABELS[s.type]);
    return fn(s, { ...ctx, idx });
  });
  const offerIdx = content.scenes.findIndex((s) => s.type === "offer");
  const html =
    `<div class="zw-root" data-zw-deck="${esc(content.id || "deck")}" data-zw-total="${scenes.length}" data-zw-offer="${offerIdx}" style="position:fixed;inset:0;overflow:hidden;background:${C.paper};font-family:${F.body}">` +
      `<div id="zw-main" style="position:absolute;inset:0;overflow-y:scroll;overflow-x:hidden;scroll-snap-type:y proximity">${scenes.join("")}</div>` +
      qrChip(content.qr, ctx.base) +
      dots(labels) +
      prevNext(scenes.length) +
      modals(content.modals, ctx.base) +
    `</div>`;
  const theme = resolveTheme(content.theme);
  return { html, css: themeCss(content.theme) + "\n" + baseCss, fontsUrl: theme.fontsUrl, labels };
}

/** A normal page has no reveal-on-scroll: strip the hidden starting state. */
const unhide = (h) => h.replace(/opacity:0;transform:translateY\(\d+px\);/g, "");

/**
 * The offer scene on its own, as a page that scrolls normally: a contained
 * hero (Ken Burns zoom + scroll parallax, both from the wire) over the copy,
 * then the cards. No side panel, no QR chip. This is the page the QR points at.
 */
export function renderPromotions(content, options = {}) {
  const ctx = context(content, options);
  const s = content.scenes.find((x) => x.type === "offer");
  if (!s) throw new Error("zah-workshop: renderPromotions needs an offer scene");
  const html =
    `<div class="zw-root zw-promo" data-zw-deck="${esc(content.id || "deck")}" style="background:${C.paper};font-family:${F.body}">` +
      `<section style="position:relative;overflow:hidden;isolation:isolate;width:100%;padding:clamp(28px,4vw,56px) clamp(16px,4vw,32px)">` +
        (s.gears === false ? "" : gears({ color: C.ink, hub: C.paper, b: 1.1 })) +
        `<div style="position:relative;z-index:1;max-width:1240px;margin:0 auto">` +
          `<div data-zw-hero style="position:relative;width:100%;height:clamp(440px,56vh,600px);overflow:hidden;border-radius:24px;background:#000;box-shadow:0 22px 50px ${C.I(".18")}">` +
            `<div data-zw-parallax class="zw-hero-parallax" style="position:absolute;left:0;right:0;top:-18%;height:136%"><img class="zw-hero-img" src="${esc(ctx.a(s.hero.image))}" alt="${esc(s.hero.alt || "")}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 22%;opacity:.75"></div>` +
            `<div style="position:absolute;inset:0;background:linear-gradient(to top,${C.I(".95")} 0%,${C.I(".72")} 26%,${C.I(".22")} 54%,${C.I("0")} 78%)"></div>` +
            `<div style="position:absolute;left:0;right:0;bottom:0"><div style="max-width:1240px;margin:0 auto;padding:0 clamp(24px,5vw,80px) clamp(30px,4.5vw,58px)">` +
              `<span style="display:inline-flex;align-items:center;gap:8px;color:${C.accent};font-weight:800;letter-spacing:.18em;text-transform:uppercase;font-size:13px;margin-bottom:12px">${iconBox("spark", 16)}${esc(s.eyebrow)}</span>` +
              `<h2 style="font-family:${F.display};font-weight:900;letter-spacing:-.03em;line-height:.98;color:#fff;font-size:clamp(30px,4.6vw,62px);margin:0;text-shadow:0 2px 30px rgba(0,0,0,.35)">${lines(s.headline)}</h2>` +
              `<p style="color:rgba(255,255,255,.88);font-size:clamp(16px,1.4vw,21px);font-weight:500;margin:14px 0 0;text-shadow:0 1px 16px rgba(0,0,0,.3)">${esc(s.sub)}</p>` +
            `</div></div>` +
          `</div>` +
        `</div>` +
      `</section>` +
      `<section style="min-height:100vh;width:100%;box-sizing:border-box;position:relative;display:flex;align-items:stretch;justify-content:center;overflow:clip;background:${C.paper}">` +
        (s.gears === false ? "" : gears({ color: C.accent, hub: C.paper, b: 0.5 })) +
        confetti() +
        `<div style="position:relative;z-index:2;flex:1 1 auto;min-width:0;padding:64px clamp(28px,5vw,80px) 80px;max-width:1240px">${unhide(offerRows(s, ctx))}</div>` +
      `</section>` +
      modals(content.modals, ctx.base) +
    `</div>`;
  const theme = resolveTheme(content.theme);
  return { html, css: themeCss(content.theme) + "\n" + baseCss, fontsUrl: theme.fontsUrl };
}

/** Wrap a render in a complete document (what the CLI writes). */
export function pageHtml(rendered, { title = "Workshop", wireSrc = "./wire.js", mount = "deck", lang = "en" } = {}) {
  const fonts = rendered.fontsUrl
    ? `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="${esc(rendered.fontsUrl)}">`
    : "";
  const fn = mount === "promotions" ? "mountPromotions" : "mountDeck";
  return `<!doctype html>
<html lang="${esc(lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="robots" content="noindex">
${fonts}
<style>html,body{margin:0;padding:0;background:var(--zw-paper,#fff)}
${rendered.css}</style>
</head>
<body>
${rendered.html}
<script type="module">
import { ${fn} } from "${esc(wireSrc)}";
${fn}(document.querySelector(".zw-root"));
</script>
</body>
</html>
`;
}
