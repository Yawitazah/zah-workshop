// Everything around the scenes: the dot nav, prev/next, the floating QR chip
// and the modals. All fixed-position, all driven by the wire.

import { esc, C, F, asset } from "./parts.js";

export function dots(labels) {
  const items = labels.map((l, i) =>
    `<button data-dot="${i}" data-act="goto" data-go="${i}" aria-label="${esc(l)}" style="cursor:pointer;border:none;padding:0;width:9px;height:9px;border-radius:50%;background:${C.M(".35")};transition:background .3s,transform .3s"></button>`
  ).join("");
  return `<nav style="position:fixed;left:18px;top:50%;transform:translateY(-50%);z-index:55;display:flex;flex-direction:column;gap:11px;padding:13px 9px;background:rgba(255,255,255,.55);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-radius:999px;box-shadow:0 6px 20px ${C.I(".12")}">${items}</nav>`;
}

export function prevNext(total) {
  return `<div style="position:fixed;left:50%;bottom:20px;transform:translateX(-50%);z-index:55;display:flex;align-items:center;gap:12px;background:rgba(255,255,255,.65);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);padding:7px 9px;border-radius:999px;box-shadow:0 6px 20px ${C.I(".14")}">` +
    `<button data-act="prev" aria-label="Previous" style="cursor:pointer;border:none;width:34px;height:34px;border-radius:50%;background:#fff;color:${C.ink};font-size:18px;font-weight:800;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px ${C.I(".12")};transition:background .25s,color .25s">&#8249;</button>` +
    `<span id="zw-counter" style="font-family:${F.display};font-weight:700;color:${C.ink};font-size:13px;letter-spacing:.03em;min-width:118px;text-align:center">1 / ${total}</span>` +
    `<button data-act="next" aria-label="Next" style="cursor:pointer;border:none;width:34px;height:34px;border-radius:50%;background:${C.accent};color:#fff;font-size:18px;font-weight:800;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px ${C.A(".3")};transition:background .25s,color .25s">&#8250;</button>` +
  `</div>`;
}

export function qrChip(qr, base) {
  if (!qr) return "";
  return `<div id="zw-qr-chip" style="position:fixed;right:22px;bottom:168px;z-index:60;display:flex;flex-direction:column;align-items:center;gap:5px;background:#fff;padding:9px 9px 7px;border-radius:14px;animation:zahQR 2.6s ease-in-out infinite">` +
    `<img src="${esc(asset(qr.image, base))}" width="86" height="86" alt="${esc(qr.alt || "")}" style="display:block;width:86px;height:86px">` +
    `<span style="color:${C.ink};font-family:${F.display};font-weight:800;font-size:11px;letter-spacing:.04em">${esc(qr.label || "Scan me")}</span>` +
  `</div>`;
}

/** A lightbox (image) or a custom body (html) inside the standard veil. */
export function modal(name, m, base) {
  if (m.image) {
    return `<div data-modal="${esc(name)}" style="display:none"><div data-act="closeModal" style="position:fixed;inset:0;z-index:120;background:rgba(7,18,33,.86);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:4vh 4vw;animation:zahFade .25s ease-out">` +
      `<button data-act="closeModal" style="position:absolute;top:22px;right:26px;cursor:pointer;border:none;background:rgba(255,255,255,.12);color:#fff;width:46px;height:46px;border-radius:50%;font-size:24px;font-weight:700;line-height:1">&times;</button>` +
      `<img src="${esc(asset(m.image, base))}" alt="${esc(m.alt || "")}" style="max-width:96vw;max-height:92vh;border-radius:14px;box-shadow:0 50px 110px rgba(0,0,0,.7);object-fit:contain">` +
    `</div></div>`;
  }
  // Custom markup: the author owns everything inside the veil, including its
  // own close button (data-act="closeModal"). Asset paths are left alone.
  return `<div data-modal="${esc(name)}" style="display:none"><div data-act="closeModal" style="position:fixed;inset:0;z-index:100;background:${C.I(".6")};backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:24px">${m.html || ""}</div></div>`;
}

export function modals(all = {}, base) {
  return Object.entries(all).map(([name, m]) => modal(name, m, base)).join("");
}
