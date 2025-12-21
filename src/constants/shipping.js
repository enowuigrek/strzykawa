/**
 * Shipping Constants
 * Konfiguracja wysyłki i progów cenowych
 */

/**
 * Próg darmowej wysyłki (w PLN)
 * UWAGA: Łatwo edytowalna wartość - zmień tutaj jeśli próg się zmieni
 */
export const FREE_SHIPPING_THRESHOLD = 250;

/**
 * Koszty wysyłki (w PLN)
 */
export const SHIPPING_COSTS = {
    KURIER: 15,      // Kurier - dostawa pod adres
    PACZKOMAT: 12,   // Paczkomat InPost
};

/**
 * Waluta
 */
export const CURRENCY = 'PLN';
export const CURRENCY_SYMBOL = 'zł';
