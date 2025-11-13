import React from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';
import FooterImage from '../../assets/footer.jpg';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: FaFacebookF,
      href: 'https://www.facebook.com/StrzykawaCoffeeShop/',
      label: 'Facebook',
      hoverColor: 'hover:text-blue-500',
      count: '1430+',
      platform: 'Facebook'
    },
    {
      icon: FaInstagram,
      href: 'https://www.instagram.com/strzykawa_coffee_shop/',
      label: 'Instagram',
      hoverColor: 'hover:text-pink-500',
      count: '1559+',
      platform: 'Instagram'
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
      <footer className="relative bg-primary border-t border-white/10 overflow-hidden">
        {/* Background image */}
        <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{ backgroundImage: `url(${FooterImage})` }}
        />

        {/* Main content */}
        <div className="relative z-10 container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

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
            <div className="hidden lg:block lg:col-span-1"></div>

            {/* Kontakt - 4 kolumny */}
            <div className="lg:col-span-4 space-y-6">
              <h4 className="text-xl font-semibold text-white">Kontakt</h4>
              <div className="space-y-4">
                {contactInfo.map((contact, index) => {
                  const Icon = contact.icon;
                  return (
                      <a
                          key={index}
                          href={contact.href}
                          target={contact.href?.startsWith('http') ? '_blank' : undefined}
                          rel={contact.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
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

            {/* Spacer - 2 kolumny */}
            <div className="hidden lg:block lg:col-span-2"></div>

            {/* Social Media - 3 kolumny */}
            <div className="lg:col-span-3 space-y-6">
              <h4 className="text-xl font-semibold text-white">Śledź nas</h4>
              <div className="space-y-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                      <div key={index} className="flex items-center gap-4">
                        <a
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}
                            className={`
                        text-white
                        transition-all duration-300
                        hover:scale-110
                        ${social.hoverColor}
                      `}
                        >
                          <Icon className="w-8 h-8" />
                        </a>
                        <div className="text-sm">
                          <div className="text-white font-semibold">{social.count}</div>
                          <div className="text-white/50">na {social.platform}</div>
                        </div>
                      </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative z-10 border-t border-white/10 bg-primary-dark">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">

              {/* Left - Copyright */}
              <div className="text-base text-white/60 text-center lg:text-left">
                © {currentYear} Strzykawa. Wszystkie prawa zastrzeżone.
              </div>

              {/* Center - Legal Links */}
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
                {legalLinks.map((link, index) => (
                    <a
                        key={index}
                        href={link.href}
                        className="text-white/50 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                ))}
              </div>

              {/* Right - Credits */}
              <div className="text-sm text-white/40 text-center lg:text-right">
                <a
                    href="https://lukasznowak.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white/60 transition-colors"
                >
                  Projekt: lukasznowak.dev
                </a>
              </div>

            </div>
          </div>
        </div>
      </footer>
  );
}