import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCookieBite } from 'react-icons/fa';

const COOKIE_CONSENT_KEY = 'strzykawa-cookie-consent';

export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Sprawdź czy użytkownik już zaakceptował cookies
        const hasConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
        if (!hasConsent) {
            // Pokaż banner po krótkim opóźnieniu
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[200] p-4 md:p-6">
            <div className="container mx-auto">
                <div className="bg-primary-dark/95 backdrop-blur-md border border-white/10 p-4 md:p-6 shadow-2xl max-w-2xl mx-auto md:mx-0">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                        {/* Icon + Text */}
                        <div className="flex items-start gap-3 flex-1">
                            <FaCookieBite className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                            <div className="text-sm text-white/80">
                                <p>
                                    Używamy plików cookies, aby zapewnić najlepsze wrażenia na naszej stronie.{' '}
                                    <Link
                                        to="/polityka-cookies"
                                        className="text-accent hover:text-white underline transition-colors"
                                    >
                                        Dowiedz się więcej
                                    </Link>
                                </p>
                            </div>
                        </div>

                        {/* Button */}
                        <button
                            onClick={handleAccept}
                            className="px-6 py-2 bg-accent hover:bg-accent/80 text-white text-sm font-medium rounded-full transition-all duration-300 hover:scale-105 whitespace-nowrap"
                        >
                            Akceptuję
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
