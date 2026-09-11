// Full-page screenshot of a normal page: node test/shoot-page.cjs <url> <out.jpg>
const puppeteer = require("D:/video-editing/projects/node_modules/puppeteer-core");
(async () => {
  const [url, out] = process.argv.slice(2);
  const browser = await puppeteer.launch({ executablePath: "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  page.on("pageerror", (e) => console.log("PAGEERROR", e.message));
  await page.goto(url, { waitUntil: "load", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 2500));
  await page.evaluate(() => window.scrollTo(0, 400));
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: out, type: "jpeg", quality: 70, fullPage: true });
  console.log("shot", out);
  await browser.close();
})().catch((e) => { console.error(e.message); process.exit(1); });
