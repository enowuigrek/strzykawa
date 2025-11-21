/**
 * Standardowe timeouty używane w aplikacji (w milisekundach)
 */

// Animacje i przejścia
export const ANIMATION_DURATION = {
  FAST: 200,        // Szybkie micro-interakcje
  MEDIUM: 500,      // Średnie animacje (modals, transitions)
  SLOW: 1000,       // Wolne animacje
};

// Feedback użytkownika
export const FEEDBACK_DURATION = {
  SUCCESS: 2000,    // Czas pokazywania komunikatu sukcesu (np. "Dodano do koszyka")
  ERROR: 3000,      // Czas pokazywania komunikatu błędu
};

// Symulowane opóźnienia (loading states)
export const LOADING_DELAY = {
  LOGIN: 1000,      // Symulowane logowanie
  REGISTER: 1200,   // Symulowana rejestracja
  API_CALL: 500,    // Minimalne opóźnienie dla lepszego UX
};

// Scroll behavior
export const SCROLL_THRESHOLDS = {
  HEADER_BACKGROUND: 100,   // Kiedy header zmienia tło (px)
  HEADER_AUTOHIDE: 300,     // Kiedy header się chowa (px)
  STICKY_FILTERS: 480,      // Kiedy filtry stają się sticky (px)
};
