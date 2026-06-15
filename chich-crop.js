// sharp-only: crop the render guide lines (W top, H right) out of the chicharron
// SOURCE before background removal, so they can't stay connected to the bag.
const sharp = require('sharp');
const path = require('path');
const src = path.join(__dirname, 'assets', 'src', 'chicharron.png');
const tmp = path.join(__dirname, 'assets', '_chich_crop.png');

// Source is 900x647. Bags are centered; guides live in the top + right margins.
sharp(src)
  .extract({ left: 12, top: 26, width: 814, height: 608 })
  .png()
  .toFile(tmp)
  .then(() => console.log('Cropped chicharron source ->', tmp))
  .catch(e => { console.error(e.message); process.exit(1); });
