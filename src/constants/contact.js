/**
 * Dane kontaktowe i lokalizacyjne firmy Strzykawa
 *
 * To jest JEDYNE miejsce, gdzie należy edytować:
 * - dane kontaktowe (telefon, email)
 * - adresy (kawiarnia, siedziba, palarnia)
 * - godziny otwarcia kawiarni
 * - informacje o firmie (nazwa, NIP)
 *
 * Po zmianie wartości tutaj, zostaną one automatycznie
 * zaktualizowane w całej aplikacji.
 */

// ─── KONTAKT ────────────────────────────────────────────────────────────────

export const CONTACT_EMAIL = 'kontakt@strzykawa.com';
export const CONTACT_EMAIL_HREF = `mailto:${CONTACT_EMAIL}`;

export const CONTACT_PHONE = '+48 668 011 806';
export const CONTACT_PHONE_HREF = 'tel:+48668011806';

// ─── DANE FIRMY ─────────────────────────────────────────────────────────────

export const COMPANY_NAME = 'Strzykawa Damian Dzik';
export const COMPANY_NAME_SHORT = 'Strzykawa';
export const COMPANY_NIP = '7441726899';

// ─── ADRES KAWIARNI ──────────────────────────────────────────────────────────

export const CAFE_STREET = 'ul. Śląska 12';
// Miejscownik — do zdań typu "na/przy ul. Śląskiej 12"
export const CAFE_STREET_LOCATIVE = 'ul. Śląskiej 12';
export const CAFE_ZIP = '42-202';
export const CAFE_CITY = 'Częstochowa';
export const CAFE_ZIP_CITY = `${CAFE_ZIP} ${CAFE_CITY}`;
export const CAFE_ADDRESS = `${CAFE_STREET}, ${CAFE_ZIP_CITY}`;

export const CAFE_MAPS_URL = 'https://maps.app.goo.gl/5nZxkPioGPMB1Fyr9';
export const CAFE_GEO = { latitude: '50.8093659', longitude: '19.1134949' };

// ─── ADRES SIEDZIBY ──────────────────────────────────────────────────────────

export const HQ_STREET = 'ul. Warszawska 241';
export const HQ_ZIP_CITY = '42-209 Częstochowa';
export const HQ_ADDRESS = `${HQ_STREET}, ${HQ_ZIP_CITY}`;

// ─── ADRES PALARNI ───────────────────────────────────────────────────────────

export const ROASTERY_STREET = 'ul. Mstowska 1C';
export const ROASTERY_ZIP_CITY = '42-242 Rędziny';
export const ROASTERY_ADDRESS = `${ROASTERY_STREET}, ${ROASTERY_ZIP_CITY}`;

// ─── GODZINY OTWARCIA KAWIARNI ───────────────────────────────────────────────
//
// TUTAJ ZMIENIAJ GODZINY (np. przy zmianie sezonu)
//

export const CAFE_HOURS = [
    { days: 'Poniedziałek - Piątek', hours: '9:00 - 17:00' },
    { days: 'Sobota',                hours: '10:00 - 15:00' },
    { days: 'Niedziela',             hours: 'zamknięte' },
];

// Skrócony format do użycia w opisach (np. opis metody dostawy)
export const CAFE_HOURS_SHORT = 'Pon–Pt 9–17, Sob 10–15';
