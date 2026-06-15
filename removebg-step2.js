// Step 2 — sharp ONLY (no @imgly). Cleans the AI cutouts: removes floating
// artifacts (render guide lines W/H, corner brackets) via connected-component
// analysis (keep large blobs = product bags, drop thin/small disconnected bits),
// then trims, pads and exports optimized transparent WebP.
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const cutDir = path.join(__dirname, 'assets', 'cut');
const outDir = path.join(__dirname, 'assets', 'img');
const names = ['youkitas', 'papas', 'olitas', 'chicharron', 'rosquitas', 'platano'];

async function cleanComponents(pngBuf) {
  const { data, info } = await sharp(pngBuf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H, channels } = info;
  const N = W * H;
  const A = 24; // alpha threshold for "solid" foreground
  const label = new Int32Array(N).fill(-1);
  const fg = new Uint8Array(N);
  for (let i = 0; i < N; i++) fg[i] = data[i * channels + 3] > A ? 1 : 0;

  const sizes = [];
  const stack = new Int32Array(N);
  let cur = 0;
  for (let s = 0; s < N; s++) {
    if (fg[s] && label[s] === -1) {
      let sp = 0; stack[sp++] = s; label[s] = cur; let size = 0;
      while (sp > 0) {
        const p = stack[--sp]; size++;
        const x = p % W, y = (p / W) | 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (!dx && !dy) continue;
            const nx = x + dx, ny = y + dy;
            if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
            const np = ny * W + nx;
            if (fg[np] && label[np] === -1) { label[np] = cur; stack[sp++] = np; }
          }
        }
      }
      sizes.push(size);
      cur++;
    }
  }

  const maxA = sizes.length ? Math.max(...sizes) : 0;
  const keepMin = Math.max(3000, maxA * 0.06); // drop blobs < 6% of the biggest bag
  const out = Buffer.from(data);
  let dropped = 0;
  for (let i = 0; i < N; i++) {
    const l = label[i];
    if (l !== -1 && sizes[l] < keepMin) { out[i * channels + 3] = 0; dropped++; }
  }
  return {
    buf: await sharp(out, { raw: { width: W, height: H, channels } }).png().toBuffer(),
    comps: sizes.length, kept: sizes.filter(s => s >= keepMin).length, dropped,
  };
}

(async () => {
  for (const name of names) {
    const cut = path.join(cutDir, `${name}.png`);
    if (!fs.existsSync(cut)) { console.log('MISSING', name); continue; }
    const { buf, comps, kept } = await cleanComponents(fs.readFileSync(cut));
    const trimmed = await sharp(buf).trim({ threshold: 10 }).png().toBuffer();
    const m = await sharp(trimmed).metadata();
    const pad = Math.round(Math.max(m.width, m.height) * 0.035);
    const ext = { top: pad, bottom: pad, left: pad, right: pad, background: { r: 0, g: 0, b: 0, alpha: 0 } };

    await sharp(trimmed).extend(ext).resize({ width: 1000, withoutEnlargement: true })
      .webp({ quality: 90, effort: 6, alphaQuality: 100, smartSubsample: true })
      .toFile(path.join(outDir, `${name}.webp`));
    await sharp(trimmed).extend(ext).resize({ width: 600, withoutEnlargement: true })
      .webp({ quality: 86, effort: 6, alphaQuality: 100 })
      .toFile(path.join(outDir, `${name}-sm.webp`));

    console.log(`${name}: ${comps} comps → kept ${kept} (bags), final ${m.width}x${m.height}`);
  }
  console.log('\nClean transparent products written to assets/img/');
})();
