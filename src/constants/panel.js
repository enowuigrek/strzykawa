/**
 * Panel constants — wewnętrzny panel zamówień dla obsługi kawiarni
 */

// Klucz w localStorage przechowujący hasło panelu
export const PANEL_STORAGE_KEY = 'strzykawa-panel';

// Hasło dostępu do panelu (musi zgadzać się z PANEL_PASSWORD w Netlify env vars)
export const PANEL_PASSWORD = 'strzykawa2025';

// Interwał odświeżania listy zamówień (w milisekundach)
export const PANEL_REFRESH_INTERVAL_MS = 60000; // 60 sekund
