import puppeteer from 'puppeteer';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = resolve(__dirname, 'public/plexusai-board-agenda.pdf');

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();

await page.goto('http://localhost:5177/plexusai-board-agenda.html', { waitUntil: 'networkidle0', timeout: 30000 });
await page.evaluate(() => document.fonts.ready);

await page.pdf({
  path: outPath,
  format: 'A4',
  printBackground: true,
  displayHeaderFooter: true,
  headerTemplate: '<span></span>',
  footerTemplate: `
    <div style="
      width: 100%;
      font-family: 'DM Sans', Arial, sans-serif;
      font-size: 7pt;
      color: #9ca3af;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 60px;
      box-sizing: border-box;
      background: transparent;
      margin-top: 4px;
    ">
      <span><strong style="color:#0D9488;">Plexus AI</strong> · Board of Advisors Agenda</span>
      <span>Confidential · Inaugural Meeting · April 2026</span>
      <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
    </div>
  `,
  margin: {
    top: '10mm',
    bottom: '14mm',
    left: '0',
    right: '0',
  },
});

await browser.close();
console.log(`✓ PDF saved: ${outPath}`);
