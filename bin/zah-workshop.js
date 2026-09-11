#!/usr/bin/env node
// zah-workshop CLI
//
//   zah-workshop build <content.(json|mjs|js)> [--out dist] [--assets <dir>] [--base <url>] [--no-promotions]
//       Writes out/index.html (the deck), out/promotions.html (the offer page),
//       out/wire.js, and copies --assets into out/ so the folder deploys anywhere.
//
//   zah-workshop init [dir]
//       Copies the starter content + placeholder assets into dir (default: ./workshop)
//       so a new client's deck starts from a working file, not a blank one.
//
//   zah-workshop check <content.(json|mjs|js)>
//       Renders without writing; prints scene count, labels and any error.

import { readFileSync, writeFileSync, mkdirSync, cpSync, existsSync } from "node:fs";
import { resolve, dirname, join, extname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { renderDeck, renderPromotions, pageHtml } from "../src/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const version = JSON.parse(readFileSync(join(here, "..", "package.json"), "utf8")).version;
const argv = process.argv.slice(2);
const cmd = argv[0];
const flag = (name) => { const i = argv.indexOf(name); return i >= 0 ? argv[i + 1] : undefined; };
const has = (name) => argv.includes(name);

async function loadContent(file) {
  const abs = resolve(file);
  if (!existsSync(abs)) throw new Error(`no such file: ${abs}`);
  if (extname(abs) === ".json") return JSON.parse(readFileSync(abs, "utf8"));
  const mod = await import(pathToFileURL(abs).href);
  return mod.default || mod.content;
}

function usage() {
  console.log(`zah-workshop ${version}
  zah-workshop build <content> [--out dist] [--assets <dir>] [--base <url>] [--no-promotions]
  zah-workshop init [dir]
  zah-workshop check <content>`);
}

try {
  if (cmd === "build") {
    const file = argv[1];
    if (!file) throw new Error("build needs a content file");
    const content = await loadContent(file);
    const out = resolve(flag("--out") || "dist");
    mkdirSync(out, { recursive: true });
    const title = content.title || `${content.brand?.name || "Workshop"} — Workshop`;
    // Asset paths in content start with "/"; a built folder must work from any
    // path, so they are made relative to the page unless --base says otherwise.
    const opts = { assetBase: flag("--base") ?? "." };
    const deck = renderDeck(content, opts);
    writeFileSync(join(out, "index.html"), pageHtml(deck, { title, mount: "deck" }));
    if (!has("--no-promotions") && content.scenes.some((s) => s.type === "offer")) {
      writeFileSync(join(out, "promotions.html"), pageHtml(renderPromotions(content, opts), { title: `${title} — what you walk away with`, mount: "promotions" }));
    }
    cpSync(join(here, "..", "src", "wire.js"), join(out, "wire.js"));
    const assets = flag("--assets");
    if (assets) cpSync(resolve(assets), join(out, "workshop", "assets"), { recursive: true });
    console.log(`built ${deck.labels.length} scenes -> ${out}`);
  } else if (cmd === "init") {
    const dir = resolve(argv[1] || "workshop");
    if (existsSync(join(dir, "content.json"))) throw new Error(`${dir} already has a content.json`);
    mkdirSync(dir, { recursive: true });
    cpSync(join(here, "..", "examples", "starter"), dir, { recursive: true });
    console.log(`started ${dir}
  edit content.json, drop real images into assets/, then
  zah-workshop build ${join(dir, "content.json")} --assets ${join(dir, "assets")} --out ${join(dir, "dist")}`);
  } else if (cmd === "check") {
    const content = await loadContent(argv[1]);
    const deck = renderDeck(content);
    console.log(`ok: ${deck.labels.length} scenes: ${deck.labels.join(" · ")}`);
  } else {
    usage();
    process.exit(cmd ? 1 : 0);
  }
} catch (e) {
  console.error("zah-workshop:", e.message);
  process.exit(1);
}
