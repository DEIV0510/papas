// @imgly-only: remove background from the cropped chicharron source,
// overwrite the cutout used by removebg-step2.js.
const { removeBackground } = require('@imgly/background-removal-node');
const fs = require('fs');
const path = require('path');
const inp = path.join(__dirname, 'assets', '_chich_crop.png');
const outP = path.join(__dirname, 'assets', 'cut', 'chicharron.png');

(async () => {
  const blob = new Blob([fs.readFileSync(inp)], { type: 'image/png' });
  const out = await removeBackground(blob, { output: { format: 'image/png' } });
  fs.writeFileSync(outP, Buffer.from(await out.arrayBuffer()));
  console.log('Regenerated chicharron cutout (no guides) ->', outP);
})();
