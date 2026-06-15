const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'assets', 'src');
const outDir = path.join(__dirname, 'assets', 'img');
fs.mkdirSync(outDir, { recursive: true });

// Map source files -> clean output names
const map = {
  'youkitass.png': 'youkitas',
  'papas.png': 'papas',
  'papasolitas.png': 'olitas',
  'chicharron.png': 'chicharron',
  'rosquitas.png': 'rosquitas',
  'platanochips.png': 'platano',
};

(async () => {
  for (const [src, name] of Object.entries(map)) {
    const input = path.join(srcDir, src);
    if (!fs.existsSync(input)) { console.log('MISSING', src); continue; }

    // Full optimized WebP (cap width 1000, no upscale), high quality 4:4:4
    await sharp(input)
      .resize({ width: 1000, withoutEnlargement: true })
      .webp({ quality: 86, effort: 6, smartSubsample: true })
      .toFile(path.join(outDir, `${name}.webp`));

    // Smaller variant for thumbnails / gallery / mobile
    await sharp(input)
      .resize({ width: 600, withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toFile(path.join(outDir, `${name}-sm.webp`));

    const { size } = fs.statSync(path.join(outDir, `${name}.webp`));
    console.log(`${name}.webp  ${(size / 1024).toFixed(0)}KB`);
  }
  console.log('\nDone. Output files:');
  fs.readdirSync(outDir).forEach(f => console.log('  ' + f));
})();
