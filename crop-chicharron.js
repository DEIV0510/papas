const sharp = require('sharp');
const path = require('path');

const src = path.join(__dirname, 'assets', 'src', 'chicharron.png');
const out = path.join(__dirname, 'assets', 'img');

// Source 900x647. Trim margins where 3D-render dimension guides (W/H lines,
// corner brackets) live, keeping the well-centered bags intact.
const region = { left: 54, top: 52, width: 774, height: 556 };

(async () => {
  await sharp(src).extract(region)
    .resize({ width: 1000, withoutEnlargement: true })
    .webp({ quality: 86, effort: 6, smartSubsample: true })
    .toFile(path.join(out, 'chicharron.webp'));

  await sharp(src).extract(region)
    .resize({ width: 600, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(path.join(out, 'chicharron-sm.webp'));

  console.log('chicharron re-exported (guides cropped):', region);
})();
