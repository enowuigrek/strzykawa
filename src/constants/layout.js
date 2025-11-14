// ========== HEADER ==========
export const HEADER = {
    // Wysokości
    HEIGHT_MOBILE: 'h-16',      // 64px (4rem)
    HEIGHT_DESKTOP: 'h-20',     // 80px (5rem)

    // Padding
    PADDING_X: 'px-4 sm:px-6 lg:px-8',
    PADDING_Y: 'py-4',          // Vertical centering

    // Z-index
    Z_INDEX: 'z-50',
    Z_INDEX_MENU_OPEN: 'z-[60]',
    Z_INDEX_FLOATING: 'z-[70]',
};

// ========== MODALS ==========
export const MODAL = {
    // Z-index (nad wszystkim)
    Z_INDEX: 'z-[100]',

    // Backdrop
    BACKDROP: 'fixed inset-0 bg-black/50 backdrop-blur-sm',

    // Header height (taka sama jak main header!)
    HEADER_HEIGHT: 'h-16',      // 64px - SYNC Z HEADER.HEIGHT_MOBILE
    HEADER_PADDING: 'p-6',
};

// ========== SPACING ==========
export const SPACING = {
    CONTAINER: 'container mx-auto',
    SECTION_Y: 'py-12 lg:py-16',
    CARD_PADDING: 'p-6',
    BUTTON_PADDING: 'px-8 py-3',
};

// ========== BREAKPOINTS (dla JS logic) ==========
export const BREAKPOINTS = {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    '2XL': 1536,
    '3XL': 1600,
};