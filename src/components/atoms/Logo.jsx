import { Link } from 'react-router-dom';

/**
 * Logo - Navigation logo component
 *
 * Komponent logo z linkiem do strony głównej
 * Automatycznie scrolluje na górę po kliknięciu
 *
 * @param {boolean} scrolled - Czy strona jest przewinięta (dla animacji)
 */
export function Logo({ scrolled }) {
    const handleClick = () => {
        // Scroll to top po nawigacji
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    };

    return (
        <Link
            to="/"
            onClick={handleClick}
            className="header-logo transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent rounded"
            aria-label="Strzykawa - Wróć do strony głównej"
        >
            <img
                src="/logo/horizontal-logo.png"
                alt="Strzykawa Coffee Shop & Roastery"
                className={`
                    w-auto 
                    transition-all 
                    duration-300
                    ${scrolled ? 'h-10 lg:h-12' : 'h-12 lg:h-14'}
                `}
            />
        </Link>
    );
}