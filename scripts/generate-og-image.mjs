/**
 * generate-og-image.mjs
 * Generuje public/og-image.png (1200x630) z białym logo Strzykawa na zielonym tle.
 * Uruchom ręcznie: node scripts/generate-og-image.mjs
 */

import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const WIDTH = 1200;
const HEIGHT = 630;
const BG = { r: 0x1e, g: 0x2a, b: 0x25, alpha: 1 };
const LOGO_TARGET_HEIGHT = 410;

const LOGO_SRC = path.join(ROOT, 'public', 'logo', 'vertical-logo.png');
const OUTPUT = path.join(ROOT, 'public', 'og-image.png');

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
        white[i * 4]     = 255; // R
        white[i * 4 + 1] = 255; // G
        white[i * 4 + 2] = 255; // B
        white[i * 4 + 3] = alpha; // zachowaj kształt
    }

    return sharp(white, {
        raw: { width: info.width, height: info.height, channels: 4 },
    })
        .png()
        .toBuffer();
}

async function main() {
    console.log('🖼️  Generowanie og-image.png (białe logo)...');

    const whiteLogo = await makeWhiteLogo(LOGO_SRC, LOGO_TARGET_HEIGHT);

    const { width: logoW, height: logoH } = await sharp(whiteLogo).metadata();
    const left = Math.round((WIDTH - logoW) / 2);
    const top  = Math.round((HEIGHT - logoH) / 2);

    await sharp({
        create: { width: WIDTH, height: HEIGHT, channels: 4, background: BG },
    })
        .composite([{ input: whiteLogo, left, top }])
        .png({ compressionLevel: 8 })
        .toFile(OUTPUT);

    console.log(`✅ Zapisano: public/og-image.png (${WIDTH}x${HEIGHT}, logo ${logoW}x${logoH})`);
}

main().catch((err) => {
    console.error('❌ Błąd:', err);
    process.exit(1);
});
