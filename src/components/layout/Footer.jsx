import React from 'react';
import {
    FaFacebookF,
    FaInstagram,
    FaMapMarkerAlt,
    FaPhone,
    FaEnvelope
} from 'react-icons/fa';
import { SiShopify, SiReact } from 'react-icons/si';
import { BiCoffeeTogo } from 'react-icons/bi';

export function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        {
            icon: FaFacebookF,
            href: 'https://www.facebook.com/StrzykawaCoffeeShop/',
            label: 'Facebook',
            hoverColor: 'hover:text-blue-500'
        },
        {
            icon: FaInstagram,
            href: 'https://www.instagram.com/strzykawa_coffee_shop/',
            label: 'Instagram',
            hoverColor: 'hover:text-pink-500'
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

    const quickLinks = [
        { label: 'Kawy', href: '/kawy' },
        { label: 'O Strzykawie', href: '/o-nas' },
        { label: 'Kontakt', href: '/kontakt' },
        { label: 'Współpraca B2B', href: '/b2b' }
    ];

    const locationInfo = {
        address: 'ul. Dąbrowskiego 4',
        city: '42-200 Częstochowa',
        hours: 'Pn-Pt: 8:00 - 18:00, Sb-Nd: 10:00 - 16:00'
    };

    return (
        <footer className="relative bg-primary-dark/95 border-white/10 overflow-hidden">
            {/* Main content */}
            <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
                {/* Mobile: Logo pełna szerokość, potem 2 kolumny */}
                {/* Desktop: 4 kolumny równo */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
                    {/* Logo + opis - mobile pełna szerokość */}
                    <div className="col-span-2 md:col-span-1 flex flex-col items-center md:items-start space-y-4">
                        <div className="footer-logo">
                            {/* Mobile: poziome logo */}
                            <img
                                src="/logo/horizontal-logo.png"
                                alt="Strzykawa Coffee Shop & Roastery"
                                className="md:hidden w-auto h-2"
                            />
                            {/* Desktop: pionowe logo */}
                            <img
                                src="/logo/vertical-logo.png"
                                alt="Strzykawa Coffee Shop & Roastery"
                                className="hidden md:block w-auto h-5"
                            />
                        </div>
                    </div>

                    {/* Linki szybkie */}
                    <div className="space-y-4">
                        <h4 className="text-lg text-white">Menu</h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-white/70 hover:text-white text-sm transition-colors duration-300"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Kontakt + Adres */}
                    <div className="space-y-4">
                        <h4 className="text-lg text-white">Kontakt</h4>
                        <div className="space-y-3">
                            {contactInfo.map((contact, index) => {
                                const Icon = contact.icon;
                                return (
                                    <a
                                        key={index}
                                        href={contact.href}
                                        className="flex items-start gap-2 text-sm transition-colors duration-300 group"
                                    >
                                        <Icon className="w-4 h-4 mt-0.5 flex-shrink-0 text-muted group-hover:text-accent transition-colors" />
                                        <span className="text-white/70 group-hover:text-white transition-colors break-words">
                                            {contact.text}
                                        </span>
                                    </a>
                                );
                            })}

                            {/* Adres */}
                            <div className="flex items-start gap-2 text-sm pt-2">
                                <FaMapMarkerAlt className="w-4 h-4 mt-0.5 flex-shrink-0 text-muted" />
                                <div className="text-white/70">
                                    <div>{locationInfo.address}</div>
                                    <div>{locationInfo.city}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Social Media + Godziny */}
                    <div className="col-span-2 md:col-span-1 flex gap-6 md:flex-col md:gap-4">
                        <div className="flex-1">
                            <h4 className="text-lg text-white mb-4">Odwiedź nas</h4>
                            {/* Godziny */}
                            <div className="text-sm text-white/70 space-y-1">
                                <div className="text-white/90">Godziny otwarcia:</div>
                                <div className="text-xs leading-relaxed">
                                    Pn-Pt: 8:00 - 18:00<br />
                                    Sb-Nd: 10:00 - 16:00
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="flex-1">
                            <h4 className="text-lg text-white mb-4">Śledź nas</h4>
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
                                            className={`text-white/70 transition-all duration-300 hover:scale-110 ${social.hoverColor}`}
                                        >
                                            <Icon className="w-7 h-7" />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="relative z-10 border-t border-white/10 bg-black/95">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col gap-3 text-sm text-white/70">
                        {/* Row 1: Copyright (left) */}
                        <div className="text-accent text-center md:text-left">
                            © {currentYear} Strzykawa. Wszystkie prawa zastrzeżone.
                        </div>

                        {/* Row 2: Project (left), Legal links (center), Technologies (right) */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                            {/* Left: project credit */}
                            <span className="text-white/70 text-center md:text-left">
                                <span className="text-white/60">Projekt i wykonanie: </span>
                                <a
                                    href="https://lukasznowak.dev"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white hover:text-accent transition-colors"
                                >
                                    lukasznowak.dev
                                </a>
                            </span>

                            {/* Center: legal links */}
                            <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 text-center text-white/70">
                                {legalLinks.map((link, index) => (
                                    <React.Fragment key={index}>
                                        <a
                                            href={link.href}
                                            className="hover:text-white transition-colors"
                                        >
                                            {link.label}
                                        </a>
                                        {index < legalLinks.length - 1 && (
                                            <span className="text-white/40">|</span>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>

                            {/* Right: technologies */}
                            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-end gap-2 sm:gap-3 text-white/70">
                                <span className="text-white/60 text-center">Użyte technologie:</span>

                                <div className="flex items-center gap-1">
                                    {/* React */}
                                    <div className="flex items-center group">
                                        <span className="mr-2 text-xs text-white/60 overflow-hidden max-w-0 group-hover:max-w-[80px] opacity-0 group-hover:opacity-100 transition-all duration-300">
                                            React
                                        </span>
                                        <SiReact className="w-5 h-5 transition-colors duration-300 group-hover:text-[#61DAFB]" />
                                    </div>

                                    {/* Shopify */}
                                    <div className="flex items-center group">
                                        <span className="mr-2 text-xs text-white/60 overflow-hidden max-w-0 group-hover:max-w-[80px] opacity-0 group-hover:opacity-100 transition-all duration-300">
                                            Shopify
                                        </span>
                                        <SiShopify className="w-5 h-5 transition-colors duration-300 group-hover:text-[#95BF47]" />
                                    </div>

                                    {/* Coffee */}
                                    <div className="flex items-center group">
                                        <span className="mr-2 text-xs text-white/60 overflow-hidden max-w-0 group-hover:max-w-[80px] opacity-0 group-hover:opacity-100 transition-all duration-300">
                                            Kawa
                                        </span>
                                        <BiCoffeeTogo className="w-5 h-5 transition-colors duration-300 group-hover:text-[#7B4B2A]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}