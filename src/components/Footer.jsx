import React from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaHeart,
  FaCoffee,
  FaLeaf,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';
import heroImage from '../assets/hero.jpg';

function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: FaFacebookF,
      href: 'https://www.facebook.com/StrzykawaCoffeeShop/',
      label: 'Facebook',
      color: 'hover:bg-white/20 hover:text-white'
    },
    {
      icon: FaInstagram,
      href: 'https://www.instagram.com/strzykawa_coffee_shop/',
      label: 'Instagram',
      color: 'hover:bg-white/20 hover:text-white'
    }
  ];

  const quickContacts = [
    {
      icon: FaPhone,
      text: '+48 668 011 806',
      href: 'tel:+48668011806',
      color: 'text-white/70'
    },
    {
      icon: FaEnvelope,
      text: 'fitanddrink@gmail.com',
      href: 'mailto:fitanddrink@gmail.com',
      color: 'text-white/70'
    }
  ];

  return (
      <footer className="relative bg-gradient-to-b from-primary-dark to-black border-t border-white/10 overflow-hidden">
        {/* Background image */}
        <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{ backgroundImage: `url(${heroImage})` }}
        />

        {/* Decorative gradient blobs */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-muted blur-2xl"></div>
        </div>

        <div className="relative z-10">
          {/* Main content */}
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {/* Brand */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-accent/20 border border-accent/30">
                    <FaCoffee className="w-8 h-8 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-3xl">S T R Z Y K A W A</h3>
                    <p className="text-sm text-muted uppercase tracking-wider">
                      Coffee Shop & Roastery
                    </p>
                  </div>
                </div>
                <p className="text-muted/90 leading-relaxed max-w-md">
                  Pasjonaci kawy specialty z Częstochowy. Palimy, parzymy i dzielimy się miłością do najlepszych ziaren z całego świata. Każda filiżanka to podróż smakowa.
                </p>
              </div>

              {/* Kontakt */}
              <div className="space-y-6">
                <h4 className="text-xl font-semibold text-white">Kontakt</h4>
                <div className="space-y-4">
                  {quickContacts.map((contact, index) => {
                    const Icon = contact.icon;
                    const content = (
                        <div className="flex items-center gap-3 text-sm transition-transform duration-300">
                          <div className="flex-shrink-0 p-2">
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
                        <div key={index}>{content}</div>
                    );
                  })}
                </div>
              </div>

              {/* Social media */}
              <div className="space-y-6">
                <h4 className="text-xl font-semibold text-white">Social Media</h4>
                <div className="flex gap-6">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                        <a
                            key={index}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}
                        >
                          <Icon className="w-8 h-8 hover:text-muted" />
                        </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 bg-primary-dark/80 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4">
                {/* Left */}
                <div className="text-sm text-muted">
                  <span>&copy; {currentYear} Strzykawa. </span>
                  <span>Wszystkie prawa zastrzeżone.</span>
                </div>

                {/* Right */}
                <div className="flex items-center flex-wrap justify-center sm:justify-end gap-x-2 gap-y-1 text-xs sm:text-sm text-muted">
                <span>
                  <a
                      href="https://lukasznowak.dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                  >
                    Projekt: enowuigrek
                  </a>
                </span>
                  <span>•</span>
                  <FaCoffee className="w-3 h-3 sm:w-4 sm:h-4 text-accent" />
                  <span>• React • Tailwind CSS • Shopify</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
  );
}

export default Footer;