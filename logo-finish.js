// sharp-only: trim, pad and export the transparent logo as optimized WebP.
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const cut = path.join(__dirname, 'assets', 'cut', 'logo.png');
const outDir = path.join(__dirname, 'assets', 'img');

(async () => {
  const trimmed = await sharp(cut).trim({ threshold: 12 }).png().toBuffer();
  const m = await sharp(trimmed).metadata();
  const pad = Math.round(Math.max(m.width, m.height) * 0.04);
  const ext = { top: pad, bottom: pad, left: pad, right: pad, background: { r: 0, g: 0, b: 0, alpha: 0 } };
  await sharp(trimmed).extend(ext)
    .resize({ width: 680, withoutEnlargement: true })
    .webp({ quality: 92, effort: 6, alphaQuality: 100, smartSubsample: true })
    .toFile(path.join(outDir, 'logo.webp'));
  const sz = fs.statSync(path.join(outDir, 'logo.webp')).size;
  console.log(`logo.webp written (${m.width}x${m.height} trimmed → ${(sz / 1024).toFixed(0)}KB)`);
})();
