# ZAH Workshop

A keynote that runs in a browser instead of a slide app. Eleven full-screen
scenes of a fixed arc — cover, receipts that count themselves up, meet the
speaker, what you'll learn, the products, a product spotlight with a live
dashboard, the person it was built for, the pairing, a live diagnosis, a build
list that ticks itself off while the thing gets built for real, and the offer
with a QR panel. Every word comes from **one content file**. Every colour comes
from **CSS variables**. The first deck on it is ZAH's own at
[zahbrandsolutions.com/workshop](https://zahbrandsolutions.com/workshop); the
sales demo — a fictional client in another palette, rebuilt from this repo on
every push — is at [yawitazah.github.io/zah-workshop](https://yawitazah.github.io/zah-workshop/)
(its offer page: [/promotions.html](https://yawitazah.github.io/zah-workshop/promotions.html)).

**This is a ZAH product. Install it and give it content. Do not rebuild it,
port it, or use it as inspiration for a new deck.** If the arc or a scene
cannot say what a client needs, extend the contract *in this repo* (a new field,
a new scene type) so every deck gets it.

## Install

```bash
npm i github:Yawitazah/zah-workshop
```

Node 18+. No dependencies. Plain ESM, so it runs in Node (a build step, an
Express route, a Next.js server component) and the wire runs in any browser.

## The one entry point

```js
import { renderDeck, renderPromotions, pageHtml } from "zah-workshop";
import { mountDeck, mountPromotions } from "zah-workshop/wire";   // browser side

const deck = renderDeck(content);          // { html, css, fontsUrl, labels }
const promo = renderPromotions(content);   // { html, css, fontsUrl }
```

- `html` — put it on the page. The deck is `position:fixed; inset:0` and takes
  the whole viewport; the promotions page is a normal scrolling page.
- `css` — the theme block (`.zw-root{--zw-accent:…}`) plus keyframes. Put it in
  a `<style>`. Once per page is enough.
- `fontsUrl` — a Google Fonts stylesheet URL for the theme's fonts, or `null`.
- Then, in the browser: `const unmount = mountDeck(document.querySelector(".zw-root"))`.
  It returns an unmount function; call it when the page goes away (React effects).

`pageHtml(rendered, { title, wireSrc, mount })` wraps a render in a complete
HTML document. That is what the CLI writes.

`renderDeck(content, { assetBase })` prefixes every asset path that starts with
`/`. The CLI passes `"."` so a built folder works from any URL.

## The CLI

```bash
npx zah-workshop init client-name          # starter content + placeholder assets
npx zah-workshop check content.json        # renders, prints the scene list
npx zah-workshop build content.json --assets assets --out dist
```

`build` writes `dist/index.html` (the deck), `dist/promotions.html` (the offer
scene as its own page — the page the QR points at), `dist/wire.js`, and copies
`--assets` to `dist/workshop/assets/`. The folder deploys anywhere static:
GitHub Pages, Railway, a client's own site.

Content is `.json`, or `.mjs` exporting the object (use `.mjs` when a modal
needs raw HTML — see `examples/zah/content.mjs`).

## Content

The full contract is `src/types.d.ts`. In short:

```jsonc
{
  "id": "acme-workshop",                     // namespaces the remembered scroll position
  "title": "Acme — The Workshop",
  "brand": { "name": "Acme", "logo": "/workshop/assets/logo.svg", "logoOnDark": "…", "site": "acme.com" },
  "theme": { "accent": "#E0A030", "ink": "#123524", "paper": "#FBFAF6" },
  "qr":    { "image": "/workshop/assets/qr.svg", "label": "Scan me" },
  "scenes": [ /* in the order they play; each has a "type" */ ],
  "modals": { "guide": { "image": "…" }, "app": { "html": "…" } }
}
```

### Scene types

| type | what it is | the fields that matter |
|---|---|---|
| `cover` | logo, two-line headline, tagline, chips, ticker | `headline[]`, `tagline`, `chips[]`, `ticker[]` |
| `receipts` | four numbers that count up | `items[{pre, value, decimals, post, context, label}]`, `headlineAccent`, `outro` |
| `meet` | photo + who the speaker is | `photo`, `eyebrow`, `headline`, `paragraphs[]`, `credential{icon,label}` |
| `learn` | the numbered list that rotates on its own | `headline[]`, `items[{title, body}]` |
| `products` | cards with a screen, a mark, a button | `items[{name, blurb, icon, screen, button}]` — `screen` is `{image}` or `{icon, background, size, glow, shadow}` |
| `spotlight` | one product, three features, a screen, a CTA | `screen` is `{kind:"dashboard", metrics[], chart, list}` or `{kind:"image", image}` |
| `person` | the operator / member spotlight | `watermark`, `photo`, `name`, `titles[]`, `paragraphs[]` |
| `pairing` | a person and a product, joined | `left{image,name}`, `right{image,name}`, `tagline`, `taglineAccent` |
| `statement` | one big line (the live diagnosis) | `headline[]`, `sub`, `logo` |
| `build` | the checklist that ticks itself | `items[{title, body}]`, `headlineAccent`, `outro` |
| `offer` | hero, cards, side panel with the QR | `hero{image}`, `rows[]`, `panel{headline[], qr, lines[], button}` |

Scenes can be left out or reordered; the dot nav, the counter and the
behaviour follow the array. `label` on a scene names its dot. `gears:false`
turns the background gears off on that scene.

### Offer cards

`rows` is a list; an entry that is itself a list renders as a row of equal
columns (the two-up brand cards).

| kind | looks like |
|---|---|
| `feature` | the gradient card at the top: floating image, badge, title, copy, white button |
| `book` | copy beside an image; `imageSide`, `imageAction` (lightbox modal or link), optional `button` |
| `brand` | a branded band (`header{image, name, sub, background, nameFont…}`) over title, badge, copy, button |
| `simple` | one line: icon (`calendar`/`heart`/`star`/`spark`), title, badge, copy, button |

### Buttons and modals

Every button is `{ label, href }` (opens a new tab) or `{ label, modal }`
(opens `modals[name]`). A modal is `{ image, alt }` (a lightbox) or `{ html }`
(your own panel inside the standard veil — give it a
`<button data-act="closeModal">`).

### Theme

Give `accent`, `ink`, `paper`. Everything else — panel, muted, the soft tints
on dark scenes, the gradient partner, the gear colour — is derived from those,
and any of the tokens in `src/types.d.ts` can be overridden. The defaults are
ZAH's own palette and fonts (Archivo + Hanken Grotesk from Google Fonts).
`fontsUrl: null` loads no fonts; `fontDisplay` / `fontBody` are CSS
`font-family` values.

The engine never writes a brand colour. The two exceptions are honest:
semantic UI colours inside the dashboard mock (green/amber/blue status pills),
and colours a card *brings with it* (a partner's brand band, a book cover's
backdrop) — those are content.

## Using it in a site

**Static / Express:** build with the CLI and serve the folder, or
`res.send(pageHtml(renderDeck(content)))` and serve `zah-workshop/wire`.

**Next.js (the brand site is the reference):** render on the server (a page
or server component), hand the strings to a client component, mount in an
effect. The package has no Node-only imports, but rendering on the server keeps
the engine and the content out of the browser bundle.

```tsx
// app/workshop/page.tsx (server)
import { renderDeck } from "zah-workshop";
import { content } from "@/content/workshop";
export default function Page() { const d = renderDeck(content); return <WorkshopDeck html={d.html} css={d.css} fontsUrl={d.fontsUrl} />; }

// components/workshop-deck.tsx (client)
"use client";
import { mountDeck } from "zah-workshop/wire";
export function WorkshopDeck({ html, css }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { const root = ref.current?.querySelector<HTMLElement>(".zw-root"); return root ? mountDeck(root) : undefined; }, []);
  return <><style dangerouslySetInnerHTML={{ __html: css }} /><div ref={ref} dangerouslySetInnerHTML={{ __html: html }} /></>;
}
```

Mount the `.zw-root` element itself, not a wrapper around it.

## What the wire does

Scroll-snap between scenes with reveal-on-scroll; counters count when their
scene arrives; the `learn` list rotates its highlight; the `build` list ticks
its items one by one (and a click toggles one); the cover's intro replays when
you come back to it; arrow keys, PageUp/Down and Space move; Escape closes a
modal; the dot nav and the `1 / 11 · Label` counter follow; the QR chip hides
on the offer scene; the scroll position is remembered per `id`.

## Failure modes already met

- **A folder built with the CLI 404s on every image** when served under a
  sub-path with absolute asset paths. The CLI now renders assets relative
  (`--base .`); pass `--base /` if you really deploy at a domain root.
- **Custom `html` modals are not rebased** — their asset paths are left exactly
  as written. Use absolute paths that are true on the host site.
- **A React host can re-create the injected HTML** (identity hydration on the
  promotions page). The promotions markup is therefore visible without the
  wire and its hover is CSS; do not make it depend on inline changes.
- **The `learn` and `build` behaviours key off `data-scene`, not the index.**
  Reordering scenes is fine; renaming a type is not.
- **`rgb(var(--zw-ink-rgb) / .1)`** is how alpha colours are written. Keep the
  `-rgb` triplets in sync if you ever change how the theme block is built.

## Fidelity

`npm test` renders ZAH's deck (`examples/zah`) and diffs it, token by token,
against the deck the brand site shipped before the extraction
(`test/fixtures`). It must stay IDENTICAL. `test/shoot.cjs <url> <dir>`
screenshots every scene of a served deck.

## Layout of this repo

```
src/index.js     renderDeck, renderPromotions, pageHtml, themeCss   (the entry point)
src/scenes.js    the eleven scene renderers
src/chrome.js    dots, prev/next, QR chip, modals
src/parts.js     escaping, colour shorthands, gears, icons, buttons
src/theme.js     tokens and derivation
src/wire.js      browser behaviour (mountDeck, mountPromotions)
src/styles.css   keyframes and the few classes
src/types.d.ts   the content contract
bin/             the CLI
examples/zah     ZAH's own deck (the reference + the fidelity fixture)
examples/starter what `init` copies: a fictional client in another palette
```

Built by Zah Brand Solutions. House credit belongs in the host page's footer,
as on every ZAH surface.
