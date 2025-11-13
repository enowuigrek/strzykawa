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
            icon: FaMapMarkerAlt,
            text: 'Gen. Dąbrowskiego 4',
            subtext: '42-200 Częstochowa',
            href: 'https://maps.google.com/?q=Strzykawa+Częstochowa'
        },
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
        { label: 'Polityka cookies', href: '/polityka-cookies' },
        { label: 'Dostawa i zwroty', href: '/dostawa-zwroty' }
    ];

    return (
        <footer className="relative bg-primary-dark/95 border-white/10 overflow-hidden">
            {/* Main content */}
            <div className="relative z-10 container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8">
                    {/* Logo - 2 kolumny */}
                    <div className="lg:col-span-2">
                        <div className="footer-logo">
                            <img
                                src="/logo/vertical-logo.png"
                                alt="Strzykawa Coffee Shop & Roastery"
                                className="w-auto h-32"
                            />
                        </div>
                    </div>

                    {/* Spacer - 1 kolumna */}
                    <div className="hidden lg:block lg:col-span-1" />

                    {/* Kontakt + Social Media - 9 kolumn */}
                    <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {/* Kontakt */}
                        <div className="space-y-6">
                            <h4 className="text-xl font-semibold text-white">Social Media</h4>
                            <div className="flex gap-4">
                                {socialLinks.map((social, index) => {
                                    const Icon = social.icon;
                                    return (
                                        <a
                                            key={index}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={social.label}
                                            className={`text-muted transition-all duration-300 hover:scale-110 ${social.hoverColor}`}
                                        >
                                            <Icon className="w-8 h-8" />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="space-y-6">
                            <h4 className="text-xl font-semibold text-white">Kontakt</h4>
                            <div className="space-y-4">
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
                                            className="flex items-start gap-3 text-base text-white/70 hover:text-white transition-colors duration-300 group"
                                        >
                                            <Icon className="w-5 h-5 mt-0.5 flex-shrink-0 text-accent group-hover:text-white transition-colors" />
                                            <div>
                                                <div>{contact.text}</div>
                                                {contact.subtext && (
                                                    <div className="text-white/50">{contact.subtext}</div>
                                                )}
                                            </div>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="relative z-10 border-t border-white/10 bg-black">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                        {/* Left - Copyright */}
                        <div className="text-base text-muted text-center lg:text-left">
                            © {currentYear} Strzykawa. Wszystkie prawa zastrzeżone.
                        </div>

                        {/* Center - Legal Links */}
                        <div className="flex flex-wrap justify-center gap-x-2 gap-y-2 text-sm">
                            {legalLinks.map((link, index) => (
                                <React.Fragment key={index}>
                                    <a
                                        href={link.href}
                                        className="text-white hover:text-muted transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                    {index < legalLinks.length - 1 && (
                                        <span className="text-white/30 hidden md:inline">|</span>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>

                        {/* Right - Credits & Tech Stack */}
                        <div className="flex w-full max-w-xs items-center justify-between lg:justify-end gap-2 text-sm text-white/70">
                            <a
                                href="https://lukasznowak.dev"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-600 transition-colors"
                            >
                                lukasznowak.dev
                            </a>
                            <div className="flex items-center gap-3 md:self-center md:ml-auto">
                                <SiReact className="w-5 h-5 hover:text-[#61DAFB]" />
                                <SiShopify className="w-5 h-5 hover:text-[#95BF47]" />
                                <BiCoffeeTogo className="w-5 h-5 hover:text-[#7B4B2A]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}