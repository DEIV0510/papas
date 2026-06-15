const { removeBackground } = require('@imgly/background-removal-node');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'assets', 'src');
const outDir = path.join(__dirname, 'assets', 'img');
fs.mkdirSync(outDir, { recursive: true });

const map = {
  'youkitass.png': 'youkitas',
  'papas.png': 'papas',
  'papasolitas.png': 'olitas',
  'chicharron.png': 'chicharron',
  'rosquitas.png': 'rosquitas',
  'platanochips.png': 'platano',
};

const config = { output: { format: 'image/png' } };

(async () => {
  for (const [src, name] of Object.entries(map)) {
    const input = path.join(srcDir, src);
    if (!fs.existsSync(input)) { console.log('MISSING', src); continue; }
    process.stdout.write(`Removing bg: ${name} ... `);

    const data = fs.readFileSync(input);
    const blobIn = new Blob([data], { type: 'image/png' });
    const out = await removeBackground(blobIn, config);
    const cutBuf = Buffer.from(await out.arrayBuffer());

    // Trim transparent margins, then add a little transparent padding
    const trimmed = await sharp(cutBuf).trim({ threshold: 12 }).png().toBuffer();
    const m = await sharp(trimmed).metadata();
    const pad = Math.round(Math.max(m.width, m.height) * 0.035);

    await sharp(trimmed)
      .extend({ top: pad, bottom: pad, left: pad, right: pad, background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .resize({ width: 1000, withoutEnlargement: true })
      .webp({ quality: 90, effort: 6, alphaQuality: 100, smartSubsample: true })
      .toFile(path.join(outDir, `${name}.webp`));

    await sharp(trimmed)
      .extend({ top: pad, bottom: pad, left: pad, right: pad, background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .resize({ width: 600, withoutEnlargement: true })
      .webp({ quality: 86, effort: 6, alphaQuality: 100 })
      .toFile(path.join(outDir, `${name}-sm.webp`));

    const sz = fs.statSync(path.join(outDir, `${name}.webp`)).size;
    console.log(`done (${m.width}x${m.height} → ${(sz / 1024).toFixed(0)}KB)`);
  }
  console.log('\nAll backgrounds removed.');
})();
