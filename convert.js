import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, 'images');

const files = fs.readdirSync(imagesDir);

for (const file of files) {
  if (file.endsWith('.png') || file.endsWith('.jpg')) {
    const filePath = path.join(imagesDir, file);
    const parsed = path.parse(file);
    const webpPath = path.join(imagesDir, parsed.name + '.webp');
    
    console.log(`Converting ${file}...`);
    try {
      await sharp(filePath)
        .webp({ quality: 80 })
        .toFile(webpPath);
      console.log(`Successfully converted to ${parsed.name}.webp`);
    } catch (e) {
      console.error(`Error converting ${file}:`, e);
    }
  }
}
