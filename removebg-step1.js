// Step 1 — AI background removal ONLY (no sharp in this process, to avoid the
// onnxruntime/sharp native-module conflict on Windows). Writes raw cutout PNGs.
const { removeBackground } = require('@imgly/background-removal-node');
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'assets', 'src');
const cutDir = path.join(__dirname, 'assets', 'cut');
fs.mkdirSync(cutDir, { recursive: true });

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
    process.stdout.write(`bg: ${name} ... `);
    const data = fs.readFileSync(input);
    const blobIn = new Blob([data], { type: 'image/png' });
    const out = await removeBackground(blobIn, config);
    const buf = Buffer.from(await out.arrayBuffer());
    fs.writeFileSync(path.join(cutDir, `${name}.png`), buf);
    console.log(`done (${(buf.length / 1024).toFixed(0)}KB)`);
  }
  console.log('Cutouts written to assets/cut/');
})();
