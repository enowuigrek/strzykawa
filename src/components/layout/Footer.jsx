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

    return (
        <footer className="relative bg-primary-dark/95 border-white/10 overflow-hidden">
            {/* Main content */}
            <div className="relative z-10 container mx-auto px-4 py-6 md:py-8">
                {/* Mobile: 2 kolumny (Logo | Kontakt+Social) */}
                {/* Desktop: 3 kolumny (Logo | Kontakt | Social) */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-16 items-start">
                    {/* Logo - mobile 1/2, desktop 1/3 */}
                    <div className="flex justify-center lg:justify-start col-span-1">
                        <div className="footer-logo">
                            <img
                                src="/logo/vertical-logo.png"
                                alt="Strzykawa Coffee Shop & Roastery"
                                className="w-auto h-12 md:h-32"
                            />
                        </div>
                    </div>

                    {/* Kontakt + Social (mobile razem w 1 kolumnie, desktop osobno) */}
                    <div className="col-span-1 lg:col-span-2 lg:grid lg:grid-cols-2 lg:gap-12 space-y-6 lg:space-y-0">
                        {/* Kontakt */}
                        <div className="space-y-3 md:space-y-4">
                            <h4 className="text-xl md:text-xl font-semibold text-white">Kontakt</h4>
                            <div className="space-y-2 md:space-y-3">
                                {contactInfo.map((contact, index) => {
                                    const Icon = contact.icon;
                                    return (
                                        <a
                                            key={index}
                                            href={contact.href}
                                            target={contact.href?.startsWith('http') ? '_blank' : undefined}
                                            rel={
                                                contact.href?.startsWith('http')
                                                    ? 'noopener noreferrer'
                                                    : undefined
                                            }
                                            className="flex items-start gap-2 md:gap-3 text-base md:text-base transition-colors duration-300 group"
                                        >
                                            <Icon className="w-5 h-5 md:w-5 md:h-5 mt-0.5 flex-shrink-0 text-muted group-hover:text-accent transition-colors" />
                                            <div className="flex-1 min-w-0">
                                                <div className="text-white/90 group-hover:text-white transition-colors break-words">
                                                    {contact.text}
                                                </div>
                                                {contact.subtext && (
                                                    <div className="text-white/50 text-sm md:text-sm break-words">
                                                        {contact.subtext}
                                                    </div>
                                                )}
                                            </div>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="space-y-3 md:space-y-4 lg:text-right">
                            <h4 className="text-xl md:text-xl font-semibold text-white">Social Media</h4>
                            <div className="flex gap-3 md:gap-4 lg:justify-end">
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
                                            <Icon className="w-8 h-8 md:w-8 md:h-8" />
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