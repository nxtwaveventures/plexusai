import puppeteer from 'puppeteer';
import { writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '../public/brand');
mkdirSync(OUT, { recursive: true });

const ACCENT = '#0D9488';
const DARK   = '#1E293B';
const BG     = '#0B1426';

// ── Helpers ──────────────────────────────────────────────────────────────────

function ring(cx, cy, R, n) {
  return Array.from({ length: n }, (_, i) => {
    const a = -Math.PI / 2 + i * (2 * Math.PI / n);
    return { x: cx + R * Math.cos(a), y: cy + R * Math.sin(a) };
  });
}

function nearest(node, pool, k = 2) {
  return pool
    .map((p, i) => ({ i, d: Math.hypot(node.x - p.x, node.y - p.y) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, k)
    .map(e => pool[e.i]);
}

// ── Logo mark SVG ─────────────────────────────────────────────────────────────

function markSVG(size) {
  const cx = size / 2, cy = size / 2;
  const inner = ring(cx, cy, size * 0.38, 5);
  const nR = size * 0.078, cR = size * 0.125, sw = size * 0.038;
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none">
  ${inner.map((a, i) => { const b = inner[(i+1)%5];
    return `<line x1="${a.x.toFixed(2)}" y1="${a.y.toFixed(2)}" x2="${b.x.toFixed(2)}" y2="${b.y.toFixed(2)}" stroke="${ACCENT}" stroke-width="${sw}" stroke-opacity="0.28" stroke-linecap="round"/>`;
  }).join('')}
  ${inner.map(a =>
    `<line x1="${cx}" y1="${cy}" x2="${a.x.toFixed(2)}" y2="${a.y.toFixed(2)}" stroke="${ACCENT}" stroke-width="${sw}" stroke-opacity="0.45" stroke-linecap="round"/>`
  ).join('')}
  <line x1="${inner[0].x.toFixed(2)}" y1="${inner[0].y.toFixed(2)}" x2="${inner[2].x.toFixed(2)}" y2="${inner[2].y.toFixed(2)}" stroke="${ACCENT}" stroke-width="${sw*0.7}" stroke-opacity="0.15" stroke-linecap="round"/>
  <line x1="${inner[0].x.toFixed(2)}" y1="${inner[0].y.toFixed(2)}" x2="${inner[3].x.toFixed(2)}" y2="${inner[3].y.toFixed(2)}" stroke="${ACCENT}" stroke-width="${sw*0.7}" stroke-opacity="0.15" stroke-linecap="round"/>
  <circle cx="${inner[0].x.toFixed(2)}" cy="${inner[0].y.toFixed(2)}" r="${nR*1.15}" fill="${ACCENT}"/>
  ${inner.slice(1).map(a => `<circle cx="${a.x.toFixed(2)}" cy="${a.y.toFixed(2)}" r="${nR}" fill="${ACCENT}" fill-opacity="0.75"/>`).join('')}
  <circle cx="${cx}" cy="${cy}" r="${cR}" fill="${ACCENT}"/>
  <circle cx="${cx - cR*0.28}" cy="${cy - cR*0.28}" r="${cR*0.35}" fill="white" fill-opacity="0.35"/>
</svg>`;
}

// ── Large plexus network (for covers) ────────────────────────────────────────

function plexusNetworkSVG(cx, cy, W, H) {
  const innerNodes = ring(cx, cy, 90, 5);
  const outerNodes = ring(cx, cy, 175, 7);
  const satNodes   = ring(cx, cy, 268, 6);

  const edges = [];
  // Center → inner
  innerNodes.forEach(n => edges.push({ a: {x:cx,y:cy}, b: n, w: 1.6, o: 0.55 }));
  // Inner ring
  innerNodes.forEach((n,i) => edges.push({ a: n, b: innerNodes[(i+1)%5], w: 1.2, o: 0.3 }));
  // Inner skip-1 (star)
  innerNodes.forEach((n,i) => edges.push({ a: n, b: innerNodes[(i+2)%5], w: 0.8, o: 0.13 }));
  // Outer → 2 nearest inner
  outerNodes.forEach(o => nearest(o, innerNodes, 2).forEach((n, k) =>
    edges.push({ a: o, b: n, w: 1.1 - k*0.2, o: 0.3 - k*0.1 })
  ));
  // Outer ring (adjacent)
  outerNodes.forEach((o, i) => edges.push({ a: o, b: outerNodes[(i+1)%7], w: 0.9, o: 0.2 }));
  // Satellites → nearest outer
  satNodes.forEach(s => edges.push({ a: s, b: nearest(s, outerNodes, 1)[0], w: 0.7, o: 0.1 }));

  const f = v => v.toFixed(1);
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none">
  <defs>
    <filter id="gn" x="-120%" y="-120%" width="340%" height="340%">
      <feGaussianBlur stdDeviation="7" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="gl" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="3" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <radialGradient id="rg" cx="${f(cx/W*100)}%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.16"/>
      <stop offset="70%" stop-color="${ACCENT}" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Background radial glow -->
  <ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${H*0.75}" ry="${H*0.65}" fill="url(#rg)"/>

  <!-- Edges -->
  <g filter="url(#gl)">
    ${edges.map(e =>
      `<line x1="${f(e.a.x)}" y1="${f(e.a.y)}" x2="${f(e.b.x)}" y2="${f(e.b.y)}" stroke="${ACCENT}" stroke-width="${e.w}" stroke-opacity="${e.o}" stroke-linecap="round"/>`
    ).join('\n    ')}
  </g>

  <!-- Satellite nodes -->
  ${satNodes.map(s =>
    `<circle cx="${f(s.x)}" cy="${f(s.y)}" r="4" fill="${ACCENT}" fill-opacity="0.22" filter="url(#gn)"/>`
  ).join('\n  ')}

  <!-- Outer nodes -->
  ${outerNodes.map(o =>
    `<circle cx="${f(o.x)}" cy="${f(o.y)}" r="6" fill="${ACCENT}" fill-opacity="0.55" filter="url(#gn)"/>`
  ).join('\n  ')}

  <!-- Inner nodes -->
  ${innerNodes.map((n, i) =>
    `<circle cx="${f(n.x)}" cy="${f(n.y)}" r="${i===0?10:7.5}" fill="${ACCENT}" fill-opacity="${i===0?1:0.82}" filter="url(#gn)"/>`
  ).join('\n  ')}

  <!-- Center node -->
  <circle cx="${f(cx)}" cy="${f(cy)}" r="14" fill="${ACCENT}" filter="url(#gn)"/>
  <circle cx="${f(cx-4)}" cy="${f(cy-4)}" r="4.5" fill="white" fill-opacity="0.38"/>
</svg>`;
}

// ── HTML shell ────────────────────────────────────────────────────────────────

function html(content, w, h, bg = '#ffffff') {
  return `<!DOCTYPE html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box;}
  body{width:${w}px;height:${h}px;background:${bg};display:flex;align-items:center;justify-content:center;overflow:hidden;}
</style>
</head><body>${content}</body></html>`;
}

function lockupHTML(markSize, fontSize, gap, textColor) {
  return `
<div style="display:inline-flex;align-items:center;gap:${gap}px;">
  ${markSVG(markSize)}
  <span style="font-family:'DM Sans',sans-serif;font-weight:700;font-size:${fontSize}px;letter-spacing:-0.02em;color:${textColor};line-height:1;">
    Plexus<span style="color:${ACCENT};">AI</span>
  </span>
</div>`;
}

// ── Cover template (shared by LinkedIn & Twitter) ─────────────────────────────

function coverHTML(W, H, headline = true) {
  // Network sits in the right 920px, center offset from right edge
  const netW = 920, netH = H;
  const netCX = 490, netCY = H / 2;

  return `
<div style="position:relative;width:${W}px;height:${H}px;background:${BG};overflow:hidden;font-family:'DM Sans',sans-serif;">

  <!-- Dot grid -->
  <div style="position:absolute;inset:0;
    background-image:radial-gradient(rgba(255,255,255,0.032) 1px,transparent 1px);
    background-size:34px 34px;"></div>

  <!-- Left teal accent bar -->
  <div style="position:absolute;left:0;top:0;bottom:0;width:3px;
    background:linear-gradient(to bottom,transparent 8%,${ACCENT} 28%,${ACCENT} 72%,transparent 92%);"></div>

  <!-- Network SVG (right side, z=1) -->
  <div style="position:absolute;right:0;top:0;width:${netW}px;height:${netH}px;z-index:1;">
    ${plexusNetworkSVG(netCX, netCY, netW, netH)}
  </div>

  <!-- Gradient fade: content into network -->
  <div style="position:absolute;left:${Math.round(W*0.38)}px;top:0;bottom:0;width:${Math.round(W*0.22)}px;
    background:linear-gradient(to right,${BG},transparent);z-index:2;pointer-events:none;"></div>

  <!-- Left content (z=3) -->
  <div style="position:relative;z-index:3;padding:${Math.round(H*0.14)}px ${Math.round(W*0.05)}px;
    display:flex;flex-direction:column;justify-content:center;height:100%;max-width:${Math.round(W*0.52)}px;">

    <!-- Logo lockup -->
    <div style="display:inline-flex;align-items:center;gap:${Math.round(H*0.03)}px;margin-bottom:${Math.round(H*0.056)}px;">
      ${markSVG(Math.round(H*0.11))}
      <span style="font-family:'DM Sans',sans-serif;font-weight:700;
        font-size:${Math.round(H*0.052)}px;letter-spacing:-0.02em;color:white;line-height:1;">
        Plexus<span style="color:${ACCENT};">AI</span>
      </span>
    </div>

    <!-- Headline -->
    <h1 style="font-family:'DM Sans',sans-serif;font-weight:800;
      font-size:${Math.round(H*0.136)}px;line-height:1.06;
      letter-spacing:-0.03em;color:white;margin-bottom:${Math.round(H*0.045)}px;">
      We Test and Validate<br>
      <span style="color:${ACCENT};">AI in Hospitals.</span>
    </h1>

    <!-- Divider -->
    <div style="width:48px;height:2px;background:${ACCENT};border-radius:2px;margin-bottom:${Math.round(H*0.042)}px;opacity:0.7;"></div>

    <!-- Subtitle -->
    <p style="font-family:'DM Sans',sans-serif;font-size:${Math.round(H*0.042)}px;
      color:rgba(255,255,255,0.48);font-weight:400;line-height:1.5;
      margin-bottom:${Math.round(H*0.055)}px;letter-spacing:0.005em;">
      India's First Hospital-Embedded AI Validation Hub
    </p>

    <!-- Tag pills -->
    <div style="display:flex;gap:${Math.round(H*0.026)}px;align-items:center;flex-wrap:wrap;">
      ${['Test', 'Validate', 'Certify'].map(t =>
        `<span style="font-family:'DM Sans',sans-serif;font-size:${Math.round(H*0.031)}px;
          font-weight:700;letter-spacing:0.1em;text-transform:uppercase;
          color:${ACCENT};padding:${Math.round(H*0.016)}px ${Math.round(H*0.042)}px;
          border:1px solid rgba(13,148,136,0.38);border-radius:999px;">${t}</span>`
      ).join('')}
      <span style="font-family:'DM Sans',sans-serif;font-size:${Math.round(H*0.033)}px;
        color:rgba(255,255,255,0.3);margin-left:${Math.round(H*0.01)}px;">
        support@plexusai.in
      </span>
    </div>
  </div>
</div>`;
}

// ── Screenshot helper ─────────────────────────────────────────────────────────

async function shot(browser, htmlContent, w, h, file) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 2 });
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  await page.waitForFunction(() => document.fonts.ready);
  const buf = await page.screenshot({ type: 'png' });
  writeFileSync(file, buf);
  console.log(`✓  ${path.basename(file).padEnd(36)} ${w}×${h}`);
  await page.close();
}

// ── Export all assets ─────────────────────────────────────────────────────────

(async () => {
  const browser = await puppeteer.launch({ headless: true });

  // 1. Logo on white
  await shot(browser,
    html(lockupHTML(72, 38, 18, DARK), 440, 110, '#ffffff'),
    440, 110, `${OUT}/logo-white.png`);

  // 2. Logo on dark
  await shot(browser,
    html(lockupHTML(72, 38, 18, '#ffffff'), 440, 110, BG),
    440, 110, `${OUT}/logo-dark.png`);

  // 3. Mark only on white — 512×512
  await shot(browser,
    html(markSVG(400), 512, 512, '#ffffff'),
    512, 512, `${OUT}/mark-white-512.png`);

  // 4. Mark only on dark — 512×512
  await shot(browser,
    html(markSVG(400), 512, 512, BG),
    512, 512, `${OUT}/mark-dark-512.png`);

  // 5. LinkedIn company logo square — 300×300
  await shot(browser,
    html(markSVG(220), 300, 300, BG),
    300, 300, `${OUT}/linkedin-company-logo-300x300.png`);

  // 6. LinkedIn cover — 1584×396
  await shot(browser,
    html(coverHTML(1584, 396), 1584, 396, BG),
    1584, 396, `${OUT}/linkedin-cover-1584x396.png`);

  // 7. Twitter / X banner — 1500×500
  await shot(browser,
    html(coverHTML(1500, 500), 1500, 500, BG),
    1500, 500, `${OUT}/twitter-banner-1500x500.png`);

  await browser.close();
  console.log(`\nAll exports → ${OUT}`);
})();
