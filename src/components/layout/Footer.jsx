import React from 'react';
import {
    FaFacebookF,
    FaInstagram,
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

    return (
        <footer className="relative bg-primary-dark/95 border-white/10 overflow-hidden">
            {/* Main content */}
            <div className="relative z-10 container mx-auto px-4 pt-6 pb-8 md:py-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
                    {/* Logo */}
                    <div className="flex flex-col items-start">
                        <div className="footer-logo">
                            {/* Mobile: poziome logo */}
                            <img
                                src="/logo/horizontal-logo.png"
                                alt="Strzykawa Coffee Shop & Roastery"
                                className="md:hidden h-5 object-contain"
                            />
                            {/* Desktop: pionowe logo */}
                            <img
                                src="/logo/vertical-logo.png"
                                alt="Strzykawa Coffee Shop & Roastery"
                                className="hidden md:block w-auto h-20"
                            />
                        </div>
                    </div>

                    {/* Linki prawne + Social Media (desktop) */}
                    <div className="hidden md:flex flex-col justify-between h-full">
                        <div className="space-y-5">
                            <h4 className="text-2xl text-white">Informacje</h4>
                            <ul className="space-y-4">
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

                        {/* Social Media */}
                        <div className="flex gap-4 pb-4">
                            {socialLinks.map((social, index) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        className={`w-12 h-12 flex items-center justify-center bg-white/5 text-muted hover:bg-white/10 transition-all ${social.hoverColor}`}
                                    >
                                        <Icon className="w-6 h-6" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Kontakt */}
                    <div className="space-y-5 md:space-y-5">
                        <h4 className="text-2xl text-white">Kontakt</h4>

                        <div className="flex flex-col gap-5 md:gap-4">
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

                        {/* Linki prawne (mobile only) */}
                        <div className="md:hidden pt-5 border-t border-white/10">
                            <ul className="flex flex-col gap-4">
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

                        {/* Social Media (mobile only) */}
                        <div className="md:hidden flex gap-4 pt-4">
                            {socialLinks.map((social, index) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        className={`w-12 h-12 flex items-center justify-center bg-white/5 text-muted hover:bg-white/10 transition-all ${social.hoverColor}`}
                                    >
                                        <Icon className="w-6 h-6" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="relative z-10 border-t border-white/10 bg-black/95">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4 text-sm text-white/70">
                        {/* Copyright */}
                        <div className="text-accent text-left">
                            © {currentYear} Strzykawa. Wszystkie prawa zastrzeżone.
                        </div>

                        {/* Project credit + Technologies (inline on mobile) */}
                        <div className="flex items-center justify-between md:justify-end gap-4 md:gap-6">
                            <div className="flex items-center gap-1 text-white/70">
                                <span className="text-white/60">Projekt:</span>
                                <a
                                    href="https://lukasznowak.dev"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white hover:text-accent transition-colors"
                                >
                                    lukasznowak.dev
                                </a>
                            </div>

                            <div className="flex items-center gap-2 text-white/70">
                                <span className="text-white/60 hidden md:inline">Technologie:</span>
                                <div className="flex items-center gap-1">
                                    <SiReact className="w-4 h-4 hover:text-[#61DAFB] transition-colors duration-300" />
                                    <SiShopify className="w-4 h-4 hover:text-[#95BF47] transition-colors duration-300" />
                                    <BiCoffeeTogo className="w-4 h-4 hover:text-[#7B4B2A] transition-colors duration-300" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}