import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const dir = 'public/images';
const files = fs.readdirSync(dir).filter(f => /\.(png|jpe?g)$/i.test(f));

const results = [];

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

  const after = fs.statSync(outPath).size;
  results.push({ file, outName, before, after, savedPct: (100 * (1 - after / before)).toFixed(1) });
}

console.log(JSON.stringify(results, null, 2));
