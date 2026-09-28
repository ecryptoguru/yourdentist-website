/**
 * Generates og:image rasters (1200x630 JPEG) from the existing category cover
 * SVGs in public/images/blog/, plus a default og card from the clinic photo,
 * plus resized WebP/JPEG variants of the hero image.
 * Run: node scripts/gen-covers.mjs
 */
import { mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const root = join(process.cwd(), 'public', 'images');
const blogCovers = join(root, 'blog');
mkdirSync(join(root, 'og'), { recursive: true });

// og:image per blog category — rasterized from the display covers.
for (const file of readdirSync(blogCovers).filter((f) => f.endsWith('.svg'))) {
  const slug = file.replace(/\.svg$/, '');
  await sharp(join(blogCovers, file))
    .resize(1200, 630, { fit: 'cover' })
    .jpeg({ quality: 82 })
    .toFile(join(root, 'og', `${slug}.jpg`));
}

// Default og card: clinic photo cropped to 1200x630.
await sharp(join(root, 'clinic.jpg'))
  .resize(1200, 630, { fit: 'cover' })
  .jpeg({ quality: 82 })
  .toFile(join(root, 'og', 'default.jpg'));

// Hero image: resized WebP variants + JPEG fallback.
const hero = sharp(join(root, 'hero-welcome.jpeg'));
await hero.clone().resize(800).webp({ quality: 80 }).toFile(join(root, 'hero-welcome-800.webp'));
await hero.clone().resize(1200).webp({ quality: 80 }).toFile(join(root, 'hero-welcome-1200.webp'));
await hero.clone().resize(1200).jpeg({ quality: 82, progressive: true }).toFile(join(root, 'hero-welcome.jpg'));

console.log('Generated og/ and resized hero assets.');
