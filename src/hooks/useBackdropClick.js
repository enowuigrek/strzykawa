/**
 * Custom hook do zamykania modali po kliknięciu w backdrop
 * Sprawdza czy kliknięcie było na backdrop (e.target === e.currentTarget)
 *
 * @param {Function} onClose - Funkcja wywoływana po kliknięciu w backdrop
 * @returns {Function} Handler do przypisania na onClick backdrop
 *
 * @example
 * const handleBackdropClick = useBackdropClick(() => setIsOpen(false));
 * <div onClick={handleBackdropClick}>...</div>
 */
export function useBackdropClick(onClose) {
    return (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
}
