/**
 * Optimises everything in public/images:
 *  - re-encodes JPEG (max 1800px wide, mozjpeg)
 *  - writes a WebP sibling for every image (~30% smaller, universal support)
 *  - emits image-manifest.json with intrinsic dimensions so <img> can carry
 *    width/height and the browser reserves space (no layout shift / better CLS)
 *
 * Run with: npm run optimize-images
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const dir = 'public/images';
const files = fs.readdirSync(dir).filter((f) => /\.(png|jpe?g)$/i.test(f));

const results = [];
const manifest = {};

for (const file of files) {
  const inputPath = path.join(dir, file);
  const before = fs.statSync(inputPath).size;
  const meta = await sharp(inputPath).metadata();
  const maxWidth = 1800;
  const targetWidth = meta.width && meta.width > maxWidth ? maxWidth : meta.width;

  const outName = file.replace(/\.png$/i, '.jpg');
  const outPath = path.join(dir, outName);
  const tmpPath = outPath + '.tmp';

  await sharp(inputPath)
    .resize({ width: targetWidth, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(tmpPath);

  fs.renameSync(tmpPath, outPath);
  if (outName !== file) fs.unlinkSync(inputPath);

  // WebP sibling
  const webpName = outName.replace(/\.jpe?g$/i, '.webp');
  await sharp(outPath)
    .resize({ width: targetWidth, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(path.join(dir, webpName));

  const after = fs.statSync(outPath).size;
  const webpSize = fs.statSync(path.join(dir, webpName)).size;
  const finalMeta = await sharp(outPath).metadata();

  manifest[`/images/${outName}`] = {
    width: finalMeta.width,
    height: finalMeta.height,
    webp: `/images/${webpName}`,
  };

  results.push({
    file,
    outName,
    before,
    jpg: after,
    webp: webpSize,
    webpSavedPct: (100 * (1 - webpSize / after)).toFixed(1),
  });
}

fs.writeFileSync('image-manifest.json', JSON.stringify(manifest, null, 2) + '\n');

console.table(results);
console.log(`\nimage-manifest.json: ${Object.keys(manifest).length} Bilder mit Massen erfasst.`);
