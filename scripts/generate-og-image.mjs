/**
 * generate-og-image.mjs
 * Generuje OG images dla Strzykawa:
 *   - public/og-image.png  (1200x630) — główny OG image
 *   - public/og-icon.png   (400x400)  — fallback dla podstron
 *
 * Uruchom ręcznie: node scripts/generate-og-image.mjs
 */

import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const BG = { r: 0x1e, g: 0x2a, b: 0x25, alpha: 1 };

/**
 * Konwertuje logo do białego — zachowuje kształt (alpha), zamienia kolor na biały.
 */
async function makeWhiteLogo(logoPath, targetHeight) {
    const resized = await sharp(logoPath)
        .resize({ height: targetHeight })
        .ensureAlpha()
        .toBuffer();

    const { data, info } = await sharp(resized)
        .raw()
        .toBuffer({ resolveWithObject: true });

    const white = Buffer.alloc(info.width * info.height * 4);
    for (let i = 0; i < info.width * info.height; i++) {
        const alpha = data[i * 4 + 3];
        white[i * 4]     = 255;
        white[i * 4 + 1] = 255;
        white[i * 4 + 2] = 255;
        white[i * 4 + 3] = alpha;
    }

    return sharp(white, {
        raw: { width: info.width, height: info.height, channels: 4 },
    })
        .png()
        .toBuffer();
}

async function compose(whiteLogo, canvasW, canvasH, outputPath) {
    const { width: logoW, height: logoH } = await sharp(whiteLogo).metadata();
    const left = Math.round((canvasW - logoW) / 2);
    const top  = Math.round((canvasH - logoH) / 2);

    await sharp({
        create: { width: canvasW, height: canvasH, channels: 4, background: BG },
    })
        .composite([{ input: whiteLogo, left, top }])
        .png({ compressionLevel: 8 })
        .toFile(outputPath);

    return { logoW, logoH };
}

async function generateMainOgImage() {
    const logo = await makeWhiteLogo(
        path.join(ROOT, 'public', 'logo', 'icon-logo.png'),
        450  // ~71% wysokości 630px, kwadratowe logo wycentrowane
    );
    const { logoW, logoH } = await compose(
        logo, 1200, 630,
        path.join(ROOT, 'public', 'og-image.png')
    );
    console.log(`✅ og-image.png  (1200x630, logo ${logoW}x${logoH})`);
}

async function generateIconOgImage() {
    const logo = await makeWhiteLogo(
        path.join(ROOT, 'public', 'logo', 'icon-logo.png'),
        280  // 70% z 400px
    );
    const { logoW, logoH } = await compose(
        logo, 400, 400,
        path.join(ROOT, 'public', 'og-icon.png')
    );
    console.log(`✅ og-icon.png   (400x400,  logo ${logoW}x${logoH})`);
}

async function main() {
    console.log('🖼️  Generowanie OG images...');
    await generateMainOgImage();
    await generateIconOgImage();
    console.log('✅ Gotowe!');
}

main().catch((err) => {
    console.error('❌ Błąd:', err);
    process.exit(1);
});
