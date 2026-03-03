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

export const CAFE_STREET = 'ul. Dąbrowskiego 4';
export const CAFE_ZIP_CITY = '42-200 Częstochowa';
export const CAFE_ADDRESS = `${CAFE_STREET}, ${CAFE_ZIP_CITY}`;

export const CAFE_MAPS_URL = 'https://maps.app.goo.gl/TkVzjmw5Z8tXtYiq8';

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
