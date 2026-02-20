import { Link } from 'react-router-dom';

export function Logo({ scrolled, size = 'md' }) {
    const handleClick = () => {
        // Scroll to top po nawigacji
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    };

    // Size variants
    const sizeClasses = {
        sm: scrolled ? 'h-8 lg:h-10' : 'h-10 lg:h-12',
        md: scrolled ? 'h-10 lg:h-12' : 'h-12 lg:h-14', // default
        lg: scrolled ? 'h-14 lg:h-16' : 'h-16 lg:h-20',
        xl: scrolled ? 'h-16 lg:h-20' : 'h-20 lg:h-24'
    };

    return (
        <Link
            to="/"
            onClick={handleClick}
            className="header-logo transition-transform focus:outline-none max-w-[calc(100%-5rem)] md:max-w-none"
            aria-label="Strzykawa - Wróć do strony głównej"
        >
            <img
                src="/logo/horizontal-logo.png"
                alt="Strzykawa Coffee Shop & Roastery"
                className={`
                    w-full object-contain
                    transition-all
                    duration-300
                    ${sizeClasses[size] || sizeClasses.md}
                `}
            />
        </Link>
    );
}