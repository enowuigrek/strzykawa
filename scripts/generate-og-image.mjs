/**
 * generate-og-image.mjs
 * Generuje public/og-image.png (1200x630) z logo Strzykawa na zielonym tle.
 * Uruchom ręcznie: node scripts/generate-og-image.mjs
 */

import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const WIDTH = 1200;
const HEIGHT = 630;

// Primary color Strzykawa
const BG = { r: 0x1e, g: 0x2a, b: 0x25, alpha: 1 };

// Logo: ok. 65% wysokości obrazka
const LOGO_TARGET_HEIGHT = 410;

const LOGO_SRC = path.join(ROOT, 'public', 'logo', 'vertical-logo.png');
const OUTPUT = path.join(ROOT, 'public', 'og-image.png');

async function main() {
    console.log('🖼️  Generowanie og-image.png...');

    // Skaluj logo zachowując proporcje
    const resizedLogo = await sharp(LOGO_SRC)
        .resize({ height: LOGO_TARGET_HEIGHT })
        .toBuffer();

    const { width: logoW, height: logoH } = await sharp(resizedLogo).metadata();

    // Wyśrodkuj logo
    const left = Math.round((WIDTH - logoW) / 2);
    const top = Math.round((HEIGHT - logoH) / 2);

    await sharp({
        create: {
            width: WIDTH,
            height: HEIGHT,
            channels: 4,
            background: BG,
        },
    })
        .composite([{ input: resizedLogo, left, top }])
        .png({ compressionLevel: 8 })
        .toFile(OUTPUT);

    console.log(`✅ Zapisano: public/og-image.png (${WIDTH}x${HEIGHT}, logo ${logoW}x${logoH} @ ${left},${top})`);
}

main().catch((err) => {
    console.error('❌ Błąd podczas generowania og-image.png:', err);
    process.exit(1);
});
