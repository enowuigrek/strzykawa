/**
 * Navigation Constants
 *
 * Centralna definicja wszystkich linków nawigacyjnych
 * Używane w Desktop i Mobile Navigation
 */

export const NAV_ITEMS = [
    {
        to: "/o-nas",
        label: "O Strzykawie",
        ariaLabel: "Przejdź do strony o nas"
    },
    {
        to: "/kawy",
        label: "Sklep on-line",
        ariaLabel: "Przejdź do sklepu online"
    },
    {
        to: "/b2b",
        label: "B2B",
        ariaLabel: "Przejdź do oferty B2B"
    },
    {
        to: "/kontakt",
        label: "Kontakt",
        ariaLabel: "Przejdź do strony kontakt"
    },
];

/**
 * Mobile Bottom Navigation Items
 * Różne od głównej nawigacji - używane w dolnym pasku
 */
export const MOBILE_BOTTOM_NAV_ITEMS = [
    {
        to: "/",
        icon: "FaHome",
        label: "Strona główna",
        ariaLabel: "Przejdź do strony głównej"
    },
    {
        to: "/kawy",
        icon: "HiShoppingBag",
        label: "Sklep",
        ariaLabel: "Przejdź do sklepu"
    },
];

/**
 * External Links
 */
export const GOOGLE_MAPS_URL = 'https://www.google.com/maps/dir/?api=1&destination=Strzykawa';
export const CAFE_ADDRESS = 'ul. Dąbrowskiego 4, 42-200 Częstochowa';