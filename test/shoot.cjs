// Screenshot every scene of a built deck: node test/shoot.cjs <url> <outdir>
const puppeteer = require("D:/video-editing/projects/node_modules/puppeteer-core");
const fs = require("fs"); const path = require("path");
(async () => {
  const [url, out] = process.argv.slice(2);
  fs.mkdirSync(out, { recursive: true });
  const browser = await puppeteer.launch({ executablePath: "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  page.on("pageerror", (e) => console.log("PAGEERROR", e.message));
  page.on("console", (m) => { if (m.type() === "error") console.log("CONSOLE", m.text()); });
  // "load", not networkidle: a real site keeps beacons and polls open forever.
  await page.evaluateOnNewDocument(() => { try { localStorage.clear(); } catch {} });
  await page.goto(url, { waitUntil: "load", timeout: 60000 });
  await page.waitForSelector("#zw-main", { timeout: 20000 });
  await new Promise((r) => setTimeout(r, 3200));
  const n = await page.evaluate(() => document.querySelectorAll("#zw-main [data-idx]").length);
  for (let i = 0; i < n; i++) {
    await page.evaluate((i) => { const m = document.querySelector("#zw-main"); const s = m.querySelector(`[data-idx="${i}"]`); m.scrollTo({ top: s.offsetTop }); }, i);
    await new Promise((r) => setTimeout(r, i === 9 ? 7600 : 1500));
    await page.screenshot({ path: path.join(out, `scene-${String(i + 1).padStart(2, "0")}.jpg`), type: "jpeg", quality: 70 });
  }
  const counter = await page.evaluate(() => document.querySelector("#zw-counter").textContent);
  console.log(`${n} scenes shot -> ${out}; counter reads "${counter}"`);
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
