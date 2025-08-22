import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaHeart, FaCoffee, FaLeaf, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import heroImage from '../assets/hero.jpg';

/**
 * Enhanced Footer with modern Tailwind design
 * Beautiful social media links, contact info and branding
 */
function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: FaFacebookF,
      href: 'https://www.facebook.com/strzykawa',
      label: 'Facebook',
      color: 'hover:bg-white/20 hover:text-white'
    },
    {
      icon: FaInstagram,
      href: 'https://www.instagram.com/strzykawa',
      label: 'Instagram',
      color: 'hover:bg-white/20 hover:text-white'
    },
    {
      icon: FaTwitter,
      href: 'https://twitter.com/strzykawa',
      label: 'Twitter',
      color: 'hover:bg-white/20 hover:text-white'
    },
  ];

  const quickContacts = [
    { icon: FaMapMarkerAlt, text: 'ul. Dąbrowskiego 4, Częstochowa', color: 'text-accent' },
    { icon: FaPhone, text: '+48 668 011 806', href: 'tel:+48668011806', color: 'text-white/70' },
    { icon: FaEnvelope, text: 'fitanddrink@gmail.com', href: 'mailto:fitanddrink@gmail.com', color: 'text-green-400' },
  ];

  return (
      <footer className="relative bg-gradient-to-b from-primary-dark to-black border-t border-white/10 overflow-hidden">

        {/* Hero Background Image with transparency */}
        <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{ backgroundImage: `url(${heroImage})` }}
        />

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-muted blur-2xl"></div>
        </div>

        <div className="relative z-10">
          {/* Main Footer Content */}
          <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

              {/* Brand Section */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-accent/20 border border-accent/30">
                    <FaCoffee className="w-8 h-8 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-white via-muted to-white bg-clip-text text-transparent">
                      S T R Z Y K A W A
                    </h3>
                    <p className="text-sm text-muted uppercase tracking-wider">Coffee Shop & Roastery</p>
                  </div>
                </div>

                <p className="text-muted/90 leading-relaxed max-w-md">
                  Pasjonaci kawy specialty z Częstochowy. Palimy, parzym i dzielimy się miłością
                  do najlepszych ziaren z całego świata. Każda filiżanka to podróż smakowa.
                </p>

                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted">Robione z</span>
                  <FaHeart className="w-4 h-4 text-red-400 animate-pulse" />
                  <span className="text-muted">i najlepszą kawą</span>
                  <FaLeaf className="w-4 h-4 text-green-400" />
                </div>
              </div>

              {/* Quick Contact */}
              <div className="space-y-6">
                <h4 className="text-xl font-semibold text-white">Kontakt</h4>
                <div className="space-y-4">
                  {quickContacts.map((contact, index) => {
                    const Icon = contact.icon;
                    const content = (
                        <div className="flex items-center gap-3 text-sm hover:scale-105 transition-transform duration-300">
                          <div className="flex-shrink-0 p-2 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300">
                            <Icon className={`w-4 h-4 ${contact.color}`} />
                          </div>
                          <span className="text-muted hover:text-white transition-colors duration-300">
                        {contact.text}
                      </span>
                        </div>
                    );

                    return contact.href ? (
                        <a key={index} href={contact.href}>
                          {content}
                        </a>
                    ) : (
                        <div key={index}>
                          {content}
                        </div>
                    );
                  })}
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-6">
                <h4 className="text-xl font-semibold text-white">Śledź nas</h4>
                <div className="flex flex-col gap-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                        <a
                            key={index}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 transition-all duration-300 ${social.color} hover:scale-105 hover:shadow-lg hover:border-white/20`}
                            aria-label={social.label}
                        >
                          <div className="p-2 bg-white/10 hover:bg-white/20 transition-colors duration-300">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="font-medium">{social.label}</span>
                        </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 bg-primary-dark/50 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">

                {/* Copyright */}
                <div className="flex items-center gap-2 text-sm text-muted">
                  <span>&copy; {currentYear} Strzykawa.</span>
                  <span>Wszystkie prawa zastrzeżone.</span>
                </div>

                {/* Additional Info */}
                <div className="flex items-center gap-6 text-sm text-muted">
                <span className="flex items-center gap-2">
                  <FaCoffee className="w-4 h-4 text-accent" />
                  <span>Specialty Coffee</span>
                </span>
                  <span className="flex items-center gap-2">
                  {/*<FaLeaf className="w-4 h-4 text-green-400" />*/}
                    {/*<span>Sustainable & Fair Trade</span>*/}
                </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
  );
}

export default Footer;