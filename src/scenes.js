// The eleven scene types of the ZAH Workshop arc. Each function takes its
// scene content and returns the <section> markup. Layout, motion and colour
// live here (colour only as var(--zw-*)); words come in from the content.
//
// Keep the data-* hooks: the wire (wire.js) drives reveal, counters, the
// learn rotation, the build ticks and the modals off them.

import { esc, lines, C, F, STRIPE, EASE, reveal, revealCard, section, gears, confetti, ICON, iconBox, actAttrs, button, badge, eyebrow, asset } from "./parts.js";

/* ============================================================ 01 COVER */
export function cover(s, ctx) {
  const { brand, a } = ctx;
  const chips = (s.chips || []).map((w) =>
    `<div data-intro data-anim="introChip .7s ${EASE} 1.75s both" style="padding:11px 20px;border-radius:999px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14);animation:introChip .7s ${EASE} 1.75s both"><span style="display:inline-block;color:#fff;font-weight:600;font-size:clamp(14px,1.25vw,18px);animation:zahFloat 6s ease-in-out infinite">${esc(w)}</span></div>`
  ).join("");
  const tick = s.ticker || [];
  const ticker = tick.concat(tick).map((w) =>
    `<div style="display:flex;align-items:center;gap:34px;padding:0 17px"><span style="color:${C.soft2};font-family:${F.display};font-weight:700;font-size:clamp(15px,1.5vw,21px);letter-spacing:.01em;white-space:nowrap">${esc(w)}</span><span style="width:7px;height:7px;border-radius:50%;background:${C.accent}"></span></div>`
  ).join("");
  const headline = (s.headline || []).map((line, i) =>
    `<span style="display:block;overflow:hidden;padding-bottom:.08em"><span data-intro data-anim="introLine .95s ${EASE} ${i === 0 ? ".95s" : "1.12s"} both" style="display:block;animation:introLine .95s ${EASE} ${i === 0 ? ".95s" : "1.12s"} both">${esc(line)}</span></span>`
  ).join("");
  const hint = s.hint ?? ctx.content.navHint ?? "Scroll  /  use arrows";

  return section({ idx: ctx.idx, label: "cover", bg: C.ink, align: "center" }) +
    (s.gears === false ? "" : gears({ color: C.gearLight, hub: C.ink, b: 1.5 })) +
    `<div style="position:absolute;top:-30%;left:-22%;width:70vw;height:70vw;border-radius:50%;background:radial-gradient(circle,${C.A(".28")},transparent 58%);filter:blur(70px);animation:zahPulse 10s ease-in-out infinite"></div>` +
    `<div style="position:absolute;bottom:-34%;right:-22%;width:66vw;height:66vw;border-radius:50%;background:radial-gradient(circle,${C.M(".3")},transparent 60%);filter:blur(72px);animation:zahPulse 12s ease-in-out infinite 1.5s"></div>` +
    `<div data-intro data-anim="introZoom 2.6s ${EASE} both" style="position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;text-align:center;max-width:1100px;animation:introZoom 2.6s ${EASE} both">` +
      `<div style="position:relative;display:inline-block">` +
        `<div data-intro data-anim="introBurst 1.5s ease-out .35s both" style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:150%;height:260%;border-radius:50%;background:radial-gradient(circle,${C.A(".6")},transparent 60%);animation:introBurst 1.5s ease-out .35s both;pointer-events:none"></div>` +
        `<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:0;pointer-events:none;width:min(58vh,560px);height:min(58vh,560px)">` +
          `<div style="position:absolute;inset:0;border-radius:50%;border:1.5px solid rgba(255,255,255,.14);animation:zahOrbit 60s linear infinite"><span style="position:absolute;top:-6px;left:50%;transform:translateX(-50%);width:11px;height:11px;border-radius:50%;background:${C.accent};box-shadow:0 0 18px ${C.accent}"></span></div>` +
          `<div style="position:absolute;inset:0;margin:auto;width:66%;height:66%;border-radius:50%;border:1px solid rgba(255,255,255,.08);animation:zahOrbit 46s linear infinite reverse"></div>` +
        `</div>` +
        `<img src="${esc(a(brand.logoOnDark || brand.logo))}" alt="${esc(brand.name)}" data-intro data-anim="introLogo 1.25s cubic-bezier(.2,.85,.25,1) .35s both" style="position:relative;display:block;width:min(430px,52vw);height:auto;animation:introLogo 1.25s cubic-bezier(.2,.85,.25,1) .35s both;filter:drop-shadow(0 12px 40px ${C.A(".35")})">` +
        `<div style="position:absolute;inset:0;overflow:hidden;pointer-events:none"><div data-intro data-anim="introSheen 1.2s ease-out 1.05s both" style="position:absolute;top:0;left:0;width:42%;height:100%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.6),transparent);animation:introSheen 1.2s ease-out 1.05s both"></div></div>` +
      `</div>` +
      `<h1 style="font-family:${F.display};font-weight:900;letter-spacing:-.03em;line-height:.98;color:#fff;font-size:clamp(40px,6vw,86px);margin:34px 0 0">${headline}</h1>` +
      `<div data-intro data-anim="introFlare 1.1s ease-out 1.5s both" style="width:min(300px,42vw);height:3px;margin-top:18px;background:linear-gradient(90deg,transparent,${C.accent},transparent);animation:introFlare 1.1s ease-out 1.5s both"></div>` +
      `<p data-intro data-anim="introRise .85s ${EASE} 1.55s both" style="color:${C.soft};font-size:clamp(17px,1.7vw,24px);font-weight:500;letter-spacing:.01em;margin:18px 0 0;animation:introRise .85s ${EASE} 1.55s both">${esc(s.tagline)}</p>` +
      `<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:40px;max-width:880px">${chips}</div>` +
    `</div>` +
    `<div data-intro data-anim="introVeil 1.1s cubic-bezier(.4,0,.2,1) both" style="position:absolute;inset:0;z-index:5;background:${C.inkVeil};pointer-events:none;animation:introVeil 1.1s cubic-bezier(.4,0,.2,1) both"></div>` +
    `<div style="position:absolute;left:0;bottom:74px;width:100%;display:flex;flex-direction:column;align-items:center;gap:5px;color:${C.dim};font-size:13px;font-weight:600;letter-spacing:.16em;text-transform:uppercase"><span>${esc(hint)}</span><span style="animation:zahBounce 1.8s ease-in-out infinite;font-size:18px">&#8964;</span></div>` +
    (tick.length ? `<div style="position:absolute;left:0;bottom:0;width:100%;padding:16px 0;background:rgba(255,255,255,.04);border-top:1px solid rgba(255,255,255,.08);overflow:hidden"><div data-ticker style="display:flex;width:max-content;animation:zahTicker 38s linear infinite">${ticker}</div></div>` : "") +
  `</section>`;
}

/* ========================================================= 02 RECEIPTS */
export function receipts(s, ctx) {
  const cards = (s.items || []).map((r) => {
    const dec = r.decimals || 0;
    return `<div data-reveal data-card="1" style="${revealCard(30)}position:relative;background:#fff;border:1px solid ${C.panel};border-radius:18px;padding:30px 26px 28px;box-shadow:0 10px 30px ${C.I(".05")};overflow:hidden;cursor:default">` +
      `<div data-stripe style="position:absolute;top:0;left:0;width:100%;height:6px;background:${STRIPE};transform:scaleX(0);transform-origin:left;transition:transform .5s ${EASE}"></div>` +
      `<div style="font-family:${F.display};font-weight:900;letter-spacing:-.02em;color:${C.ink};font-size:clamp(40px,4.2vw,62px);line-height:1;white-space:nowrap">${esc(r.pre || "")}<span data-count="${esc(r.value)}" data-dec="${dec}" style="color:${C.accent}">${esc(r.value)}</span>${esc(r.post || "")}</div>` +
      `<div style="color:${C.ink};font-weight:700;font-size:clamp(13px,1vw,15.5px);margin-top:7px">${esc(r.context)}</div>` +
      `<p style="color:${C.muted};font-size:clamp(14px,1vw,16px);font-weight:500;line-height:1.45;margin:14px 0 0">${esc(r.label)}</p>` +
    `</div>`;
  }).join("");
  const h2 = esc(s.headline) + (s.headlineAccent ? `<br><span style="color:${C.accent}">${esc(s.headlineAccent)}</span>` : "");

  return section({ idx: ctx.idx, label: "receipts", bg: C.paper, align: "center", extra: "" }).replace(/(data-idx="\d+")/, `$1 data-count="1"`) +
    (s.gears === false ? "" : gears({ color: C.ink, hub: C.paper, b: 1 })) +
    `<div style="position:relative;width:100%;max-width:1320px">` +
      eyebrow(s.eyebrow, C.accent, { mb: 14 }) +
      `<h2 data-reveal style="${reveal()}font-family:${F.display};font-weight:900;letter-spacing:-.03em;line-height:.97;color:${C.ink};font-size:clamp(38px,5.4vw,78px);margin:0">${h2}</h2>` +
      `<p data-reveal style="${reveal()}color:${C.muted};font-size:clamp(17px,1.5vw,22px);font-weight:500;max-width:760px;margin:18px 0 0;line-height:1.45">${esc(s.intro)}</p>` +
      `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:22px;margin-top:42px">${cards}</div>` +
      (s.outro ? `<p data-reveal style="${reveal()}color:${C.grey2};font-size:14px;font-weight:600;letter-spacing:.04em;margin-top:26px">${esc(s.outro)}</p>` : "") +
    `</div>` +
  `</section>`;
}

/* ============================================================= 03 MEET */
export function meet(s, ctx) {
  const { a } = ctx;
  const paras = (s.paragraphs || []).map((p, i) => i === 0
    ? `<p data-reveal style="${reveal()}color:${C.soft3};font-size:clamp(18px,1.6vw,25px);font-weight:500;line-height:1.5;max-width:620px;margin:22px 0 0">${esc(p)}</p>`
    : `<p data-reveal style="${reveal()}color:${C.soft};font-size:clamp(16px,1.25vw,19px);font-weight:500;line-height:1.55;max-width:620px;margin:20px 0 0;padding-left:20px;border-left:3px solid ${C.accent}">${esc(p)}</p>`
  ).join("");
  const cred = s.credential
    ? `<div data-reveal style="${reveal()}display:inline-flex;align-items:center;gap:12px;margin:26px 0 0;padding:11px 20px 11px 14px;background:rgba(217,119,87,.12);border:1px solid rgba(217,119,87,.42);border-radius:999px"><img src="${esc(a(s.credential.icon))}" alt="" style="width:26px;height:26px;flex:0 0 auto"><span style="color:#f0d9cd;font-size:clamp(14px,1.05vw,16.5px);font-weight:700;letter-spacing:.01em">${esc(s.credential.label)}</span></div>`
    : "";

  return section({ idx: ctx.idx, label: "meet", bg: C.ink, align: "center", column: false }) +
    (s.gears === false ? "" : gears({ color: C.soft, hub: C.ink, b: 1.2 })) +
    `<div style="position:absolute;bottom:-18%;left:-10%;width:42vw;height:42vw;border-radius:50%;background:radial-gradient(circle,${C.A(".32")},transparent 64%);filter:blur(44px)"></div>` +
    `<div style="position:relative;display:flex;align-items:center;gap:clamp(34px,5vw,90px);width:100%;max-width:1280px;margin:0 auto;flex-wrap:wrap">` +
      `<div data-reveal style="${reveal(30, ".9s")}position:relative;flex:0 0 auto">` +
        `<div style="position:absolute;top:18px;left:18px;width:100%;height:100%;border:2px solid ${C.accent};border-radius:20px"></div>` +
        `<img src="${esc(a(s.photo))}" alt="${esc(s.photoAlt || s.headline)}" style="position:relative;display:block;width:clamp(280px,30vw,400px);aspect-ratio:4/5;object-fit:cover;object-position:50% 12%;border-radius:20px;box-shadow:0 30px 60px rgba(0,0,0,.4)">` +
      `</div>` +
      `<div style="flex:1 1 420px;min-width:300px">` +
        eyebrow(s.eyebrow, C.dim, { tracking: ".2em", mb: 6 }) +
        `<h2 data-reveal style="${reveal()}font-family:${F.display};font-weight:900;letter-spacing:-.03em;line-height:.92;color:${C.accent};font-size:clamp(56px,8vw,128px);margin:0">${esc(s.headline)}</h2>` +
        paras + cred +
      `</div>` +
    `</div>` +
  `</section>`;
}

/* ============================================================ 04 LEARN */
export function learn(s, ctx) {
  const rows = (s.items || []).map((it, i) =>
    `<div data-reveal data-learn-row="${i}" style="opacity:0;transform:translateY(26px);transition:opacity .8s ${EASE},transform .8s ${EASE},border-color .4s,background .4s,box-shadow .4s;position:relative;display:flex;align-items:center;gap:clamp(18px,2.4vw,40px);padding:22px 30px;border:1px solid ${C.I(".12")};border-radius:16px;background:rgba(255,255,255,.45);overflow:hidden">` +
      `<div data-learn-bar style="position:absolute;left:0;top:0;width:5px;height:100%;background:${C.accent};transform:scaleY(0);transform-origin:top;transition:transform .45s ${EASE}"></div>` +
      `<span data-learn-num style="font-family:${F.display};font-weight:900;font-size:clamp(34px,4vw,60px);color:${C.grey};line-height:1;transition:color .4s;flex:0 0 auto;width:clamp(54px,5vw,82px)">${String(i + 1).padStart(2, "0")}</span>` +
      `<div><h3 style="font-family:${F.display};font-weight:800;letter-spacing:-.01em;color:${C.ink};font-size:clamp(19px,1.9vw,28px);margin:0 0 4px;line-height:1.1">${esc(it.title)}</h3><p style="color:${C.muted};font-size:clamp(15px,1.15vw,18px);font-weight:500;margin:0;line-height:1.4">${esc(it.body)}</p></div>` +
    `</div>`
  ).join("");

  return section({ idx: ctx.idx, label: "learn", bg: C.panel, align: "" }) +
    (s.gears === false ? "" : gears({ color: C.ink, hub: C.panel, b: 0.9 })) +
    `<div style="position:relative;width:100%;max-width:1180px;margin:0 auto">` +
      eyebrow(s.eyebrow) +
      `<h2 data-reveal style="${reveal()}font-family:${F.display};font-weight:900;letter-spacing:-.03em;line-height:.97;color:${C.ink};font-size:clamp(34px,4.8vw,68px);margin:0 0 34px">${lines(s.headline)}</h2>` +
      `<div style="display:flex;flex-direction:column;gap:14px">${rows}</div>` +
    `</div>` +
  `</section>`;
}

/* ========================================================= 05 PRODUCTS */
export function products(s, ctx) {
  const { a } = ctx;
  const cards = (s.items || []).map((p) => {
    const sc = p.screen || {};
    const glow = sc.glow || C.A(".35");
    let screen;
    if (sc.image) {
      screen = `<div style="position:relative;width:100%;aspect-ratio:16/10;border-radius:14px;overflow:hidden;background:${sc.background || C.inkDeep};display:flex;align-items:center;justify-content:center">` +
        `<div data-glow style="position:absolute;inset:0;background:radial-gradient(circle at 50% 40%,${glow},transparent 60%);opacity:0;transition:opacity .5s;z-index:1"></div>` +
        `<img src="${esc(a(sc.image))}" alt="${esc(sc.alt || p.name)}" style="position:relative;width:100%;height:100%;object-fit:cover"></div>`;
    } else {
      const size = sc.size || 88;
      screen = `<div style="position:relative;width:100%;aspect-ratio:16/10;border-radius:14px;overflow:hidden;background:${sc.background || C.inkDeep};display:flex;align-items:center;justify-content:center">` +
        `<div data-glow style="position:absolute;inset:0;background:radial-gradient(circle at 50% 40%,${glow},transparent 60%);opacity:0;transition:opacity .5s"></div>` +
        `<img src="${esc(a(sc.icon || p.icon))}" alt="${esc(sc.alt || p.name)}" style="position:relative;width:${size}px;height:${size}px;border-radius:22%${sc.shadow ? ";box-shadow:0 8px 24px rgba(0,0,0,.35)" : ""}"></div>`;
    }
    return `<div data-reveal data-card="1" style="${revealCard(30)}position:relative;background:#fff;border:1px solid #fff;border-radius:20px;padding:24px;box-shadow:0 14px 36px ${C.I(".08")};overflow:hidden;display:flex;flex-direction:column">` +
      `<div data-stripe style="position:absolute;top:0;left:0;width:100%;height:6px;background:${STRIPE};transform:scaleX(0);transform-origin:left;transition:transform .5s ${EASE}"></div>` +
      screen +
      `<div style="display:flex;align-items:center;gap:12px;margin-top:20px"><img src="${esc(a(p.icon))}" alt="" style="width:38px;height:38px;border-radius:22%"><h3 style="font-family:${F.display};font-weight:800;color:${C.ink};font-size:22px;margin:0">${esc(p.name)}</h3></div>` +
      `<p style="color:${C.muted};font-size:16px;font-weight:500;line-height:1.45;margin:12px 0 20px;flex:1">${esc(p.blurb)}</p>` +
      button(p.button, { size: "card" }) +
    `</div>`;
  }).join("");

  return section({ idx: ctx.idx, label: "products", bg: C.panel, align: "" }) +
    (s.gears === false ? "" : gears({ color: C.ink, hub: C.panel, b: 0.9 })) +
    `<div style="position:relative;width:100%;max-width:1320px;margin:0 auto">` +
      eyebrow(s.eyebrow) +
      `<h2 data-reveal style="${reveal()}font-family:${F.display};font-weight:900;letter-spacing:-.03em;line-height:.97;color:${C.ink};font-size:clamp(32px,4.6vw,64px);margin:0">${lines(s.headline)}</h2>` +
      `<p data-reveal style="${reveal()}color:${C.muted};font-size:clamp(17px,1.4vw,21px);font-weight:500;margin:16px 0 0">${esc(s.intro)}</p>` +
      `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(248px,1fr));gap:20px;margin-top:38px">${cards}</div>` +
    `</div>` +
  `</section>`;
}

/* ======================================================== 06 SPOTLIGHT */
const TONE = {
  green: { fg: "#34c77b", bg: "#e6f7ee" },
  amber: { fg: "#B07502", bg: "#fbf1dd" },
  blue: { fg: "#0A66C2", bg: "#e6f0fb" },
};
const AVATAR_BG = [C.ink, C.accent, C.muted];

function dashboard(d, ctx) {
  const { a } = ctx;
  const metrics = (d.metrics || []).map((m) =>
    `<div style="background:${C.paper};border:1px solid ${C.panel};border-radius:12px;padding:14px 16px"><div style="color:${C.grey2};font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.06em">${esc(m.label)}</div><div style="font-family:${F.display};font-weight:900;color:${m.accent ? C.accent : C.ink};font-size:30px;line-height:1.1">${esc(m.pre || "")}<span data-count="${esc(m.value)}" data-dec="0">${esc(m.value)}</span>${esc(m.post || "")}</div></div>`
  ).join("");
  const bars = d.chart ? d.chart.bars.map((h, i, arr) => {
    const n = arr.length, color = i === n - 1 ? C.accent : i === n - 2 ? C.ink : i === n - 3 ? C.muted : C.grey;
    return `<div data-reveal style="opacity:0;transform:scaleY(0);transform-origin:bottom;transition:opacity .5s,transform .7s ${EASE};flex:1;height:${h}%;background:${color};border-radius:5px 5px 0 0"></div>`;
  }).join("") : "";
  const chart = d.chart
    ? `<div style="border:1px solid ${C.panel};border-radius:12px;padding:16px 18px"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px"><span style="font-weight:700;color:${C.ink};font-size:14px">${esc(d.chart.title)}</span>${d.chart.delta ? `<span style="color:#34c77b;font-size:12px;font-weight:700">${esc(d.chart.delta)}</span>` : ""}</div><div style="display:flex;align-items:flex-end;gap:9px;height:120px">${bars}</div></div>`
    : "";
  const rows = d.list ? d.list.rows.map((r, i, arr) => {
    const t = TONE[r.tone || "green"];
    return `<div style="display:flex;align-items:center;gap:10px;padding:8px 0${i < arr.length - 1 ? ";border-bottom:1px solid #F1F2F4" : ""}"><div style="width:30px;height:30px;border-radius:50%;background:${AVATAR_BG[i % 3]};color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700">${esc(r.initial)}</div><div style="flex:1"><div style="font-size:13px;font-weight:600;color:${C.ink}">${esc(r.name)}</div></div><span style="font-size:11px;font-weight:700;color:${t.fg};background:${t.bg};padding:3px 9px;border-radius:999px">${esc(r.status)}</span></div>`;
  }).join("") : "";
  const list = d.list ? `<div style="border:1px solid ${C.panel};border-radius:12px;padding:14px 16px"><div style="font-weight:700;color:${C.ink};font-size:14px;margin-bottom:10px">${esc(d.list.title)}</div>${rows}</div>` : "";

  return `<div data-reveal style="${reveal(30, ".9s")}width:100%;max-width:1040px;background:#fff;border-radius:18px;box-shadow:0 30px 70px rgba(0,0,0,.45);overflow:hidden;text-align:left">` +
    `<div style="display:flex;align-items:center;gap:12px;padding:14px 22px;background:${C.inkDeep};border-bottom:1px solid rgba(255,255,255,.08)">${d.logo ? `<img src="${esc(a(d.logo))}" style="width:26px;height:26px;border-radius:7px">` : ""}<span style="color:#fff;font-family:${F.display};font-weight:800;font-size:15px">${esc(d.title)}</span>${d.subtitle ? `<span style="color:${C.dim};font-size:13px;font-weight:600;margin-left:6px">${esc(d.subtitle)}</span>` : ""}${d.live ? `<span style="margin-left:auto;display:flex;align-items:center;gap:7px;color:#7fd6a8;font-size:12px;font-weight:600"><span style="width:8px;height:8px;border-radius:50%;background:#34c77b;animation:zahBlink 1.6s ease-in-out infinite"></span>${esc(d.live)}</span>` : ""}${d.avatar ? `<div style="width:28px;height:28px;border-radius:50%;background:${C.accent};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:13px">${esc(d.avatar)}</div>` : ""}</div>` +
    `<div style="padding:20px 22px">` +
      `<div style="display:grid;grid-template-columns:repeat(${(d.metrics || []).length || 1},1fr);gap:12px">${metrics}</div>` +
      (chart || list ? `<div style="display:grid;grid-template-columns:1.3fr 1fr;gap:16px;margin-top:16px">${chart}${list}</div>` : "") +
    `</div>` +
  `</div>`;
}

export function spotlight(s, ctx) {
  const { a } = ctx;
  const features = (s.features || []).map((f) =>
    `<div data-reveal style="${reveal()}flex:1 1 200px;min-width:180px;max-width:300px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:20px 22px;text-align:left"><div style="font-family:${F.display};font-weight:800;color:${C.accent};font-size:21px;margin-bottom:6px">${esc(f.title)}</div><p style="color:${C.soft2};font-size:15px;font-weight:500;line-height:1.4;margin:0">${esc(f.body)}</p></div>`
  ).join("");
  const screen = !s.screen ? "" : s.screen.kind === "image"
    ? `<div data-reveal style="${reveal(30, ".9s")}width:100%;max-width:1040px;background:#fff;border-radius:18px;box-shadow:0 30px 70px rgba(0,0,0,.45);overflow:hidden"><img src="${esc(a(s.screen.image))}" alt="${esc(s.screen.alt || s.name)}" style="display:block;width:100%;height:auto"></div>`
    : dashboard(s.screen, ctx);
  const cta = s.button
    ? `<button data-reveal${actAttrs(s.button)} style="opacity:0;transform:translateY(20px);transition:opacity .8s,background .25s,transform .25s;cursor:pointer;border:none;background:${C.accent};color:#fff;font-family:${F.body};font-weight:700;font-size:17px;padding:16px 30px;border-radius:12px;margin-top:26px;box-shadow:0 10px 26px ${C.A(".32")}">${esc(s.button.label)}</button>`
    : "";

  return section({ idx: ctx.idx, label: "spotlight", bg: C.ink, align: "center" }).replace("padding:64px 6vw", "padding:60px 6vw").replace(/(data-idx="\d+")/, `$1 data-count="1"`) +
    (s.gears === false ? "" : gears({ color: C.soft, hub: C.ink, b: 1.2 })) +
    `<div style="position:absolute;top:-14%;right:-8%;width:44vw;height:44vw;border-radius:50%;background:radial-gradient(circle,${C.A(".28")},transparent 64%);filter:blur(46px)"></div>` +
    `<div style="position:relative;width:100%;max-width:1200px;display:flex;flex-direction:column;align-items:center;text-align:center">` +
      `<div data-reveal style="${reveal()}display:flex;align-items:center;gap:16px"><img src="${esc(a(s.logo))}" alt="${esc(s.name)}" style="width:64px;height:64px;border-radius:22%;box-shadow:0 8px 24px rgba(0,0,0,.35)"><h2 style="font-family:${F.display};font-weight:900;letter-spacing:-.03em;color:#fff;font-size:clamp(44px,6vw,84px);margin:0">${esc(s.name)}</h2></div>` +
      `<p data-reveal style="${reveal()}color:${C.soft};font-size:clamp(17px,1.6vw,24px);font-weight:500;margin:16px 0 0;max-width:680px">${esc(s.intro)}</p>` +
      `<div style="display:flex;gap:16px;margin:32px 0 30px;flex-wrap:wrap;justify-content:center">${features}</div>` +
      screen + cta +
    `</div>` +
  `</section>`;
}

/* =========================================================== 07 PERSON */
export function person(s, ctx) {
  const { a } = ctx;
  const paras = (s.paragraphs || []).map((p, i) => i === 0
    ? `<p data-reveal style="${reveal()}color:${C.soft3};font-size:clamp(17px,1.5vw,23px);font-weight:500;line-height:1.55;max-width:720px;margin:18px 0 0">${esc(p)}</p>`
    : `<p data-reveal style="${reveal()}color:${C.soft};font-size:clamp(16px,1.25vw,19px);font-weight:600;margin:22px 0 0;padding-top:18px;border-top:1px solid rgba(255,255,255,.12)">${esc(p)}</p>`
  ).join("");

  return section({ idx: ctx.idx, label: "person", bg: C.ink, align: "center", text: "text-align:center;" }) +
    (s.gears === false ? "" : gears({ color: C.soft, hub: C.ink, b: 0.9 })) +
    (s.watermark ? `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none"><span style="font-family:${F.display};font-weight:900;color:rgba(255,255,255,.035);font-size:34vw;letter-spacing:-.04em;line-height:1">${esc(s.watermark)}</span></div>` : "") +
    `<div style="position:relative;max-width:900px;display:flex;flex-direction:column;align-items:center">` +
      eyebrow(s.eyebrow, C.dim, { tracking: ".2em", mb: 0, inline: false }) +
      `<h2 data-reveal style="${reveal()}font-family:${F.display};font-weight:900;letter-spacing:-.03em;line-height:.98;color:#fff;font-size:clamp(38px,5.4vw,76px);margin:14px 0 0">${lines(s.headline)}</h2>` +
      `<div data-reveal style="${reveal()}display:flex;align-items:center;gap:18px;margin:34px 0 6px"><img src="${esc(a(s.photo))}" alt="${esc(s.photoAlt || s.name)}" style="width:84px;height:84px;border-radius:50%;object-fit:cover;object-position:50% 22%;border:3px solid ${C.accent}"><div style="text-align:left"><div style="font-family:${F.display};font-weight:900;color:${C.accent};font-size:clamp(26px,3vw,40px);line-height:1">${esc(s.name)}</div><div style="color:${C.soft};font-size:15px;font-weight:600;margin-top:3px">${lines(s.titles || [])}</div></div></div>` +
      paras +
    `</div>` +
  `</section>`;
}

/* ========================================================== 08 PAIRING */
export function pairing(s, ctx) {
  const { a } = ctx;
  const name = (t) => `<div style="text-align:center;color:#fff;font-family:${F.display};font-weight:800;font-size:clamp(16px,1.5vw,21px);margin-top:16px">${esc(t)}</div>`;
  return section({ idx: ctx.idx, label: "pairing", bg: C.ink, align: "center" }) +
    (s.gears === false ? "" : gears({ color: C.soft, hub: C.ink, b: 1 })) +
    `<div style="position:relative;display:flex;align-items:center;justify-content:center;gap:clamp(20px,4vw,70px);width:100%;max-width:1080px;flex-wrap:nowrap">` +
      `<div data-reveal style="${reveal(30, ".9s")}flex:0 0 auto"><img src="${esc(a(s.left.image))}" alt="${esc(s.left.alt || s.left.name)}" style="display:block;width:clamp(220px,26vw,360px);aspect-ratio:3/4;object-fit:cover;object-position:50% 18%;border-radius:18px;box-shadow:0 30px 60px rgba(0,0,0,.45)">${name(s.left.name)}</div>` +
      `<div data-reveal style="${reveal(20, ".9s")}flex:0 0 auto;display:flex;align-items:center;width:clamp(120px,17vw,210px)"><div style="flex:1;height:2px;background:linear-gradient(90deg,rgba(255,255,255,.1),${C.accent})"></div><div style="flex:0 0 auto;width:60px;height:60px;border-radius:50%;background:${C.inkDeep};border:2px solid ${C.accent};display:flex;align-items:center;justify-content:center;animation:zahQR 2.6s ease-in-out infinite"><div style="position:relative;width:36px;height:22px"><div style="position:absolute;left:0;top:0;width:22px;height:22px;border:3px solid ${C.accent};border-radius:50%"></div><div style="position:absolute;right:0;top:0;width:22px;height:22px;border:3px solid #fff;border-radius:50%"></div></div></div><div style="flex:1;height:2px;background:linear-gradient(90deg,${C.accent},rgba(255,255,255,.1))"></div></div>` +
      `<div data-reveal style="${reveal(30, ".9s")}flex:0 0 auto;display:flex;flex-direction:column;align-items:center"><div style="width:clamp(140px,16vw,200px);height:clamp(140px,16vw,200px);border-radius:26%;background:${C.inkDeep};display:flex;align-items:center;justify-content:center;box-shadow:0 30px 60px rgba(0,0,0,.45)"><img src="${esc(a(s.right.image))}" alt="${esc(s.right.alt || s.right.name)}" style="width:88%;height:88%;border-radius:22%"></div>${name(s.right.name)}</div>` +
    `</div>` +
    `<p data-reveal style="${reveal()}position:relative;z-index:1;color:${C.soft3};font-size:clamp(18px,1.9vw,28px);font-weight:600;text-align:center;margin:46px 0 0;max-width:760px;font-family:${F.display};letter-spacing:-.01em">${esc(s.tagline)}${s.taglineAccent ? ` <span style="color:${C.accent}">${esc(s.taglineAccent)}</span>` : ""}</p>` +
  `</section>`;
}

/* ======================================================== 09 STATEMENT */
export function statement(s, ctx) {
  const { a } = ctx;
  return section({ idx: ctx.idx, label: "statement", bg: C.paper, align: "center", text: "text-align:center;" }) +
    (s.gears === false ? "" : gears({ color: C.ink, hub: C.paper, b: 0.85 })) +
    `<div style="position:absolute;width:clamp(300px,40vw,560px);height:clamp(300px,40vw,560px);border-radius:50%;border:2px solid ${C.A(".18")};animation:zahSonar 4s ease-out infinite"></div>` +
    `<div style="position:absolute;width:clamp(300px,40vw,560px);height:clamp(300px,40vw,560px);border-radius:50%;border:2px solid ${C.A(".18")};animation:zahSonar 4s ease-out infinite 2s"></div>` +
    `<div style="position:absolute;width:clamp(180px,22vw,300px);height:clamp(180px,22vw,300px);border-radius:50%;background:radial-gradient(circle,${C.A(".16")},transparent 68%);animation:zahPulse 5s ease-in-out infinite"></div>` +
    `<div style="position:relative;display:flex;flex-direction:column;align-items:center">` +
      (s.logo !== null ? `<img src="${esc(a(s.logo || ctx.brand.logo))}" alt="${esc(ctx.brand.name)}" style="width:min(300px,42vw);height:auto;margin-bottom:26px">` : "") +
      eyebrow(s.eyebrow, C.accent, { tracking: ".2em", mb: 0, inline: false }) +
      `<h2 data-reveal style="${reveal()}font-family:${F.display};font-weight:900;letter-spacing:-.03em;line-height:.98;color:${C.ink};font-size:clamp(42px,6vw,88px);margin:12px 0 0">${lines(s.headline)}</h2>` +
      (s.sub ? `<p data-reveal style="${reveal()}color:${C.muted};font-size:clamp(18px,1.7vw,26px);font-weight:500;margin:18px 0 0">${esc(s.sub)}</p>` : "") +
    `</div>` +
  `</section>`;
}

/* ============================================================ 10 BUILD */
export function build(s, ctx) {
  const rows = (s.items || []).map((it, i) =>
    `<div data-reveal data-build="${i}" data-act="build" data-go="${i}" style="${reveal()}display:flex;align-items:center;gap:20px;padding:20px 26px;background:#fff;border:1px solid #fff;border-radius:14px;box-shadow:0 8px 24px ${C.I(".05")};cursor:pointer">` +
      `<div data-build-box style="flex:0 0 auto;width:34px;height:34px;border-radius:9px;border:2px solid ${C.grey};background:#fff;display:flex;align-items:center;justify-content:center;transition:background .4s,border-color .4s"><span data-build-tick style="opacity:0;transition:opacity .35s;color:#fff;font-size:19px;font-weight:900;line-height:1">&#10003;</span></div>` +
      `<div style="flex:1"><h3 data-build-title style="font-family:${F.display};font-weight:800;color:${C.muted};font-size:clamp(19px,1.9vw,26px);margin:0 0 2px;transition:color .4s">${esc(it.title)}</h3><p style="color:${C.muted};font-size:clamp(14px,1.1vw,17px);font-weight:500;margin:0">${esc(it.body)}</p></div>` +
    `</div>`
  ).join("");

  return section({ idx: ctx.idx, label: "build", bg: C.panel, align: "" }) +
    (s.gears === false ? "" : gears({ color: C.ink, hub: C.panel, b: 0.9 })) +
    `<div style="position:relative;width:100%;max-width:1080px;margin:0 auto">` +
      eyebrow(s.eyebrow) +
      `<h2 data-reveal style="${reveal()}font-family:${F.display};font-weight:900;letter-spacing:-.03em;line-height:.97;color:${C.ink};font-size:clamp(40px,5.6vw,82px);margin:0 0 32px">${esc(s.headline)}${s.headlineAccent ? ` <span style="color:${C.accent}">${esc(s.headlineAccent)}</span>` : ""}</h2>` +
      `<div style="display:flex;flex-direction:column;gap:13px">${rows}</div>` +
      (s.outro ? `<p data-reveal style="${reveal()}color:${C.grey2};font-size:14px;font-weight:600;letter-spacing:.04em;margin-top:24px">${esc(s.outro)}</p>` : "") +
    `</div>` +
  `</section>`;
}

/* ============================================================ 11 OFFER */
const CARD = (extra = "") => `${revealCard(24)}position:relative;background:#fff;border:1px solid ${C.panel};border-radius:22px;padding:0;box-shadow:0 20px 46px ${C.I(".1")};overflow:hidden;${extra}`;
const STRIPE5 = `<div data-stripe style="position:absolute;top:0;left:0;width:100%;height:5px;z-index:3;background:${STRIPE};transform:scaleX(0);transform-origin:left;transition:transform .5s"></div>`;
const titleRow = (title, bd, size, mb = 9) =>
  `<div style="display:flex;align-items:center;gap:9px;flex-wrap:wrap;margin-bottom:${mb}px"><h3 style="font-family:${F.display};font-weight:800;color:${C.ink};font-size:${size};margin:0">${esc(title)}</h3>${bd}</div>`;

function offerCard(c, ctx) {
  const { a } = ctx;
  switch (c.kind) {
    case "feature":
      return `<div data-reveal style="${reveal(26)}position:relative;border-radius:22px;overflow:hidden;background:linear-gradient(125deg,${C.accent} 0%,${C.ink} 100%);padding:26px 30px;box-shadow:0 22px 50px ${C.A(".26")}">` +
        `<div style="position:absolute;top:-45%;right:-4%;width:340px;height:340px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.2),transparent 60%);pointer-events:none"></div>` +
        `<div style="position:absolute;right:14px;bottom:-44px;width:210px;height:210px;color:rgba(255,255,255,.09);pointer-events:none">${ICON.heart}</div>` +
        `<div style="position:absolute;left:24%;top:16px;width:9px;height:9px;border-radius:50%;background:rgba(255,255,255,.5);animation:zahFloat 4s ease-in-out infinite"></div>` +
        `<div style="position:absolute;left:52%;bottom:22px;width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.4);animation:zahFloat 5s ease-in-out infinite 1s"></div>` +
        `<div style="position:relative;display:flex;align-items:center;gap:26px;flex-wrap:wrap">` +
          `<div style="position:relative;flex:0 0 auto"><div style="position:absolute;inset:-16px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.4),transparent 66%);animation:zahPulse 3s ease-in-out infinite"></div><img src="${esc(a(c.image))}" alt="${esc(c.alt || c.title)}" style="position:relative;width:108px;height:108px;border-radius:24%;box-shadow:0 14px 32px rgba(0,0,0,.4);animation:zahFloat 5s ease-in-out infinite"></div>` +
          `<div style="flex:1 1 280px;min-width:240px;color:#fff">` +
            `<div style="display:inline-flex;align-items:center;gap:7px;background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.28);border-radius:999px;padding:5px 13px;font-size:11.5px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;margin-bottom:11px">${iconBox("heart", 13)}${esc(c.badge)}</div>` +
            `<h3 style="font-family:${F.display};font-weight:900;font-size:clamp(28px,3vw,42px);line-height:1;margin:0 0 9px">${esc(c.title)}</h3>` +
            `<p style="color:rgba(255,255,255,.92);font-size:clamp(14px,1.05vw,16px);font-weight:500;line-height:1.5;margin:0;max-width:540px">${esc(c.body)}</p>` +
          `</div>` +
          button({ tone: "white", arrow: true, ...c.button }, { size: "feature", extra: "flex:0 0 auto;margin-left:auto;" }) +
        `</div>` +
      `</div>`;

    case "book": {
      const side = c.imageSide || "right";
      const zoomChip = (pos) => `<div style="position:absolute;bottom:14px;${pos}:14px;display:inline-flex;align-items:center;gap:7px;background:${C.I(".7")};backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);color:#fff;font-size:12.5px;font-weight:700;letter-spacing:.02em;padding:7px 13px;border-radius:999px;pointer-events:none">${iconBox("zoom", 14)}${esc((c.imageAction && c.imageAction.label) || "Click to enlarge")}</div>`;
      const img = `<div${actAttrs(c.imageAction)} style="position:relative;flex:1 1 340px;min-width:300px;${c.imageAction ? "cursor:zoom-in;" : ""}overflow:hidden;background:${c.imageBackground || C.inkDeep};min-height:300px${side === "right" ? ";order:2" : ""}"><img src="${esc(a(c.image))}" alt="${esc(c.alt || c.name)}" style="width:100%;height:100%;object-fit:cover;object-position:center;display:block;transition:transform .6s ${EASE}" data-bookimg="1">${c.imageAction ? zoomChip(side === "right" ? "right" : "left") : ""}</div>`;
      const text = `<div style="flex:1 1 360px;min-width:300px;padding:34px 38px;display:flex;flex-direction:column;justify-content:center${side === "right" ? ";order:1" : ""}">` +
        titleRow(c.title, badge(c.badge, c.badgeTone || "ink"), "clamp(22px,2vw,30px)") +
        `<div style="font-family:${F.display};font-weight:900;color:${C.accent};font-size:${side === "right" ? "clamp(24px,2.4vw,35px)" : "clamp(26px,2.6vw,38px)"};letter-spacing:.01em;line-height:.98;margin:0 0 12px">${esc(c.name)}</div>` +
        `<p style="color:${C.muted};font-size:clamp(16px,1.25vw,18.5px);font-weight:500;line-height:1.55;margin:0;max-width:440px">${esc(c.body)}</p>` +
        (c.button ? button({ arrow: true, ...c.button }, { size: "small", extra: "margin-top:20px;align-self:flex-start;" }) : "") +
      `</div>`;
      return `<div data-reveal data-card="1" style="${CARD("display:flex;gap:0;align-items:stretch;flex-wrap:wrap")}">${STRIPE5}${side === "right" ? text + img : img + text}</div>`;
    }

    case "brand": {
      const h = c.header;
      const bd = c.badge ? badge(c.badge, c.badgeColor || "accent", { size: 11.5 }) : "";
      return `<div data-reveal data-card="1" style="${CARD("display:flex;flex-direction:column;min-height:336px")}">${STRIPE5}` +
        `<div style="background:${h.background || `linear-gradient(135deg,${C.ink2} 0%,${C.ink} 100%)`};padding:34px 32px 30px;display:flex;align-items:center;gap:18px;flex-wrap:wrap">` +
          `<img src="${esc(a(h.image))}" alt="${esc(h.alt || h.name)}" style="width:60px;height:60px;${h.imageRadius ? `border-radius:${h.imageRadius};` : ""}flex:0 0 auto${h.imageShadow ? ";box-shadow:0 10px 22px rgba(0,0,0,.32)" : ""}">` +
          `<div><div style="font-family:${h.nameFont || F.display};color:${h.nameColor || "#fff"};font-size:${h.nameFont ? "clamp(28px,2.6vw,34px)" : "clamp(26px,2.4vw,32px)"};font-weight:${h.nameFont ? 600 : 800};letter-spacing:-.01em;line-height:1">${esc(h.name)}</div>${h.sub ? `<div style="color:${h.subColor || C.soft};font-size:12.5px;font-weight:700;letter-spacing:${h.nameFont ? ".14em" : ".12em"};text-transform:uppercase;margin-top:5px">${esc(h.sub)}</div>` : ""}</div>` +
        `</div>` +
        `<div style="padding:26px 32px 30px;display:flex;flex-direction:column;justify-content:center;flex:1">` +
          titleRow(c.title, bd, "clamp(20px,1.8vw,25px)", 10) +
          `<p style="color:${C.muted};font-size:clamp(15px,1.2vw,17.5px);font-weight:500;line-height:1.55;margin:0${c.bodyGap ? ` 0 ${c.bodyGap}px` : ""}">${esc(c.body)}</p>` +
          (c.button ? button({ arrow: true, ...c.button }, { size: "small", extra: `${c.bodyGap ? "" : "margin-top:18px;"}align-self:flex-start;` }) : "") +
        `</div>` +
      `</div>`;
    }

    case "simple":
      return `<div data-reveal data-card="1" style="${revealCard(24)}position:relative;background:#fff;border:1px solid ${C.panel};border-radius:20px;padding:28px 32px;box-shadow:0 14px 34px ${C.I(".08")};overflow:hidden;display:flex;gap:24px;align-items:center">` +
        `<div data-stripe style="position:absolute;top:0;left:0;width:100%;height:5px;background:${STRIPE};transform:scaleX(0);transform-origin:left;transition:transform .5s"></div>` +
        `<div style="flex:0 0 auto;width:74px;height:74px;border-radius:18px;background:${C.ink};display:flex;align-items:center;justify-content:center;color:#fff;box-shadow:0 8px 18px ${C.I(".28")}"><div style="width:36px;height:36px">${ICON[c.icon || "calendar"]}</div></div>` +
        `<div style="flex:1"><div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:5px"><h3 style="font-family:${F.display};font-weight:800;color:${C.ink};font-size:clamp(21px,1.8vw,26px);margin:0">${esc(c.title)}</h3>${badge(c.badge, "ink", { size: 11.5 })}</div><p style="color:${C.muted};font-size:clamp(15px,1.2vw,17.5px);font-weight:500;line-height:1.5;margin:0">${esc(c.body)}</p></div>` +
        button({ tone: "ink", arrow: true, ...c.button }, { size: "row", extra: "flex:0 0 auto;" }) +
      `</div>`;
  }
  return "";
}

/** The column of offer cards (used by the deck and the promotions page). */
export function offerRows(s, ctx) {
  const rows = (s.rows || []).map((row) => Array.isArray(row)
    ? `<div style="display:grid;grid-template-columns:${row.map(() => "1fr").join(" ")};gap:18px">${row.map((c) => offerCard(c, ctx)).join("")}</div>`
    : offerCard(row, ctx)
  );
  // The first row (the feature card) sits alone; the rest share a tighter column.
  const [first, ...rest] = rows;
  return `<div style="margin-top:26px;display:flex;flex-direction:column;gap:16px">${first || ""}<div style="display:flex;flex-direction:column;gap:18px">${rest.join("")}</div></div>`;
}

export function offerHero(s, ctx) {
  const { a } = ctx;
  return `<div data-reveal style="${reveal(26)}position:relative;width:100%;border-radius:20px;overflow:hidden;margin-bottom:24px;background:#000;box-shadow:0 22px 50px ${C.I(".18")}">` +
    `<img class="zw-hero-img zw-deck-hero" src="${esc(a(s.hero.image))}" alt="${esc(s.hero.alt || "")}" style="display:block;width:100%;object-fit:cover;object-position:50% 22%;opacity:.75">` +
    `<div style="position:absolute;inset:0;background:linear-gradient(to top,${C.I(".96")} 0%,${C.I(".68")} 30%,${C.I(".2")} 60%,${C.I("0")} 84%);pointer-events:none"></div>` +
    `<div style="position:absolute;left:0;right:0;bottom:0;padding:clamp(20px,2.6vw,38px) clamp(22px,2.8vw,44px)">` +
      `<span style="display:inline-flex;align-items:center;gap:8px;color:${C.accent};font-weight:800;letter-spacing:.18em;text-transform:uppercase;font-size:13px;margin-bottom:10px">${iconBox("spark", 16)}${esc(s.eyebrow)}</span>` +
      `<h2 style="font-family:${F.display};font-weight:900;letter-spacing:-.03em;line-height:.98;color:#fff;font-size:clamp(26px,3.4vw,48px);margin:0;text-shadow:0 2px 26px rgba(0,0,0,.4)">${lines(s.headline)}</h2>` +
      `<p style="color:rgba(255,255,255,.86);font-size:clamp(15px,1.2vw,18px);font-weight:500;margin:12px 0 0;text-shadow:0 1px 14px rgba(0,0,0,.35)">${esc(s.sub)}</p>` +
    `</div>` +
  `</div>`;
}

function panel(p, ctx) {
  const { brand, a } = ctx;
  return `<aside style="position:sticky;top:0;align-self:flex-start;flex:0 0 clamp(350px,30vw,460px);height:100vh;background:linear-gradient(165deg,${C.ink2} 0%,${C.ink} 100%);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:22px;padding:48px 36px;box-shadow:-24px 0 60px ${C.I(".22")};overflow:hidden;z-index:3">` +
    `<div style="position:absolute;top:-12%;left:-20%;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,${C.A(".22")},transparent 62%);pointer-events:none"></div>` +
    `<img src="${esc(a(brand.logoOnDark || brand.logo))}" alt="${esc(brand.name)}" style="position:relative;width:210px;height:auto;filter:brightness(1.05)">` +
    `<div style="position:relative;width:54px;height:3px;background:${C.accent};border-radius:3px"></div>` +
    `<div style="position:relative;color:#fff;font-family:${F.display};font-weight:900;font-size:clamp(22px,1.7vw,29px);line-height:1.08;text-align:center;letter-spacing:-.01em">${lines(p.headline)}</div>` +
    `<div style="position:relative;background:#fff;padding:20px;border-radius:20px;animation:zahQR 2.6s ease-in-out infinite"><img src="${esc(a(p.qr.image))}" width="208" height="208" alt="${esc(p.qr.alt || "")}" style="display:block;width:208px;height:208px"></div>` +
    ((p.lines || []).length ? `<div style="position:relative;display:flex;flex-direction:column;gap:9px;text-align:center;width:100%">${p.lines.map((l, i) => i === 0 ? `<div style="color:#fff;font-size:17px;font-weight:700">${esc(l)}</div>` : `<div style="color:${C.soft};font-size:15px;font-weight:600">${esc(l)}</div>`).join("")}</div>` : "") +
    (p.button ? button({ arrow: true, ...p.button }, { size: "panel", extra: "position:relative;" }).replace(`box-shadow:0 8px 20px ${C.A(".28")}`, `box-shadow:0 14px 30px ${C.A(".4")}`) : "") +
    (brand.site ? `<div style="position:relative;color:${C.dim};font-size:13px;font-weight:600;letter-spacing:.04em">${esc(brand.site)}</div>` : "") +
  `</aside>`;
}

export function offer(s, ctx) {
  return `<section data-idx="${ctx.idx}" data-scene="offer" data-screen-label="${String(ctx.idx + 1).padStart(2, "0")}" style="min-height:100vh;width:100%;box-sizing:border-box;position:relative;scroll-snap-align:start;display:flex;align-items:stretch;overflow:clip;background:${C.paper}">` +
    (s.gears === false ? "" : gears({ color: C.accent, hub: C.paper, b: 0.5 })) +
    confetti() +
    `<div style="position:relative;z-index:2;flex:1 1 auto;min-width:0;padding:52px clamp(32px,4vw,72px) 72px clamp(52px,6vw,132px)">` +
      offerHero(s, ctx) +
      offerRows(s, ctx) +
    `</div>` +
    (s.panel ? panel(s.panel, ctx) : "") +
  `</section>`;
}

export const SCENES = { cover, receipts, meet, learn, products, spotlight, person, pairing, statement, build, offer };

export const DEFAULT_LABELS = {
  cover: "Cover", receipts: "Receipts", meet: "Meet", learn: "Learn", products: "Products",
  spotlight: "Spotlight", person: "Spotlight", pairing: "Pairing", statement: "Diagnosis", build: "Live Build", offer: "The Offer",
};
