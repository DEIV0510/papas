// @imgly-only: remove the white background from the brand logo (keeps the
// logo's own white sticker outline as foreground).
const { removeBackground } = require('@imgly/background-removal-node');
const fs = require('fs');
const path = require('path');
const inp = path.join(__dirname, 'assets', 'src', 'logo.png');
const outP = path.join(__dirname, 'assets', 'cut', 'logo.png');

(async () => {
  const blob = new Blob([fs.readFileSync(inp)], { type: 'image/png' });
  const out = await removeBackground(blob, { output: { format: 'image/png' } });
  fs.writeFileSync(outP, Buffer.from(await out.arrayBuffer()));
  console.log('Logo background removed ->', outP);
})();
