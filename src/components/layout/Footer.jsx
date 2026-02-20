import React from 'react';
import {
    FaFacebookF,
    FaInstagram,
    FaPhone,
    FaEnvelope
} from 'react-icons/fa';

export function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        {
            icon: FaFacebookF,
            href: 'https://www.facebook.com/StrzykawaCoffeeShop/',
            label: 'Facebook',
            hoverColor: 'hover:text-[#1877F2]'
        },
        {
            icon: FaInstagram,
            href: 'https://www.instagram.com/strzykawa_coffee_shop/',
            label: 'Instagram',
            hoverColor: 'hover:text-[#E4405F]'
        }
    ];

    const contactInfo = [
        {
            icon: FaPhone,
            text: '+48 668 011 806',
            href: 'tel:+48668011806'
        },
        {
            icon: FaEnvelope,
            text: 'kontakt@strzykawa.com',
            href: 'mailto:kontakt@strzykawa.com'
        }
    ];

    const legalLinks = [
        { label: 'Regulamin sklepu', href: '/regulamin' },
        { label: 'Polityka prywatności', href: '/polityka-prywatnosci' },
        { label: 'Polityka cookies', href: '/polityka-cookies' }
    ];

    const brandLogos = [
        { src: '/brands/przelewy24.svg', alt: 'Przelewy24' },
        { src: '/brands/blik.svg',       alt: 'BLIK'       },
        { src: '/brands/visa.svg',       alt: 'Visa'       },
        { src: '/brands/mastercard.svg', alt: 'Mastercard' },
        { src: '/brands/inpost.svg',     alt: 'InPost'     },
    ];

    return (
        <footer className="relative bg-primary-dark/95 border-white/10">
            {/* Main content */}
            <div className="relative z-10 container mx-auto px-4 pt-6 pb-4 md:pt-10 md:pb-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10 items-start">

                    {/* Kolumna 1: Logo */}
                    <div className="flex flex-col items-start">
                        <div className="footer-logo">
                            <img
                                src="/logo/horizontal-logo.png"
                                alt="Strzykawa Coffee Shop & Roastery"
                                className="md:hidden h-5 object-contain"
                            />
                            <img
                                src="/logo/vertical-logo.png"
                                alt="Strzykawa Coffee Shop & Roastery"
                                className="hidden md:block w-auto h-20"
                            />
                        </div>
                    </div>

                    {/* Kolumna 2: Dane firmy — desktop i mobile */}
                    <div className="flex flex-col space-y-4">
                        <h4 className="text-2xl text-white">Dane firmy</h4>
                        <ul className="flex flex-col gap-3">
                            <li className="text-white/70 text-lg">Strzykawa Damian Dzik</li>
                            <li className="text-white/70 text-lg">ul. Warszawska 241</li>
                            <li className="text-white/70 text-lg">42-209 Częstochowa</li>
                            <li className="text-white/70 text-lg">NIP: 7441726899</li>
                        </ul>
                    </div>

                    {/* Kolumna 3: Informacje */}
                    <div className="flex flex-col space-y-4">
                        <h4 className="text-2xl text-white">Informacje</h4>
                        <ul className="flex flex-col gap-3">
                            {legalLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-white/70 hover:text-white text-lg transition-colors duration-300"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Kolumna 4: Kontakt + social */}
                    <div className="flex flex-col space-y-4">
                        <h4 className="text-2xl text-white">Kontakt</h4>

                        <div className="flex flex-col gap-4">
                            {contactInfo.map((contact, index) => {
                                const Icon = contact.icon;
                                return (
                                    <a
                                        key={index}
                                        href={contact.href}
                                        className="flex items-center gap-3 text-lg transition-colors duration-300 group"
                                    >
                                        <Icon className="w-5 h-5 flex-shrink-0 text-muted group-hover:text-accent transition-colors" />
                                        <span className="text-white/70 group-hover:text-white transition-colors break-words">
                                            {contact.text}
                                        </span>
                                    </a>
                                );
                            })}
                        </div>

                        <div className="flex gap-3">
                            {socialLinks.map((social, index) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        className={`group w-10 h-10 flex items-center justify-center bg-white/5 text-muted hover:bg-white/10 transition-all duration-300 ${social.hoverColor}`}
                                    >
                                        <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-125" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </div>

            {/* Socket — czarna belka z ikonami płatności + copyright */}
            <div className="relative z-10 bg-black border-t border-white/10">
                <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-0 md:gap-0">
                    {/* Ikony płatności — mobile: pierwsze, desktop: po prawej */}
                    <div className="flex gap-3 items-center flex-wrap md:order-2 pb-3 md:pb-0">
                        {brandLogos.map((brand) => (
                            <img
                                key={brand.alt}
                                src={brand.src}
                                alt={brand.alt}
                                className="h-7 md:h-6 w-auto object-contain flex-shrink-0"
                            />
                        ))}
                    </div>
                    {/* Copyright */}
                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 text-sm text-white/40 md:order-1 border-t border-white/10 pt-3 md:border-0 md:pt-0">
                        <span>© {currentYear} Strzykawa. Wszystkie prawa zastrzeżone.</span>
                        <span className="hidden md:inline text-white/20">|</span>
                        <span>
                            Realizacja:{' '}
                            <a
                                href="https://lukasznowak.dev"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors duration-200"
                            >
                                lukasznowak.dev
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
