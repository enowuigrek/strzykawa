import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaRoute, FaParking, FaWifi, FaCoffee } from 'react-icons/fa';
import { PageHeader } from '../components/PageHeader';
import { useScrollToTop } from '../hooks/useScrollToTop';

/**
 * Enhanced ContactSection with modern Tailwind design
 * Beautiful contact information with icons and interactive map
 */
function ContactSection() {
  useScrollToTop();

  const openingHours = [
    { days: 'Poniedziałek - Piątek', hours: '9:00 - 17:00' },
    { days: 'Sobota - Niedziela', hours: '10:00 - 15:00' },
  ];

  const amenities = [
    { icon: FaWifi, label: 'Darmowe WiFi', color: 'text-green-400' },
    { icon: FaParking, label: 'Parking w pobliżu', color: 'text-white/70' },
    { icon: FaCoffee, label: 'Takeaway', color: 'text-white/70' },
    { icon: FaRoute, label: 'Dostępne komunikacją', color: 'text-white/70' },
  ];

  return (
      <section className="py-20 bg-gradient-to-b from-primary to-primary-dark" id="kontakt">
        <div className="container mx-auto px-4">

          {/* Section Header */}
          <PageHeader
              icon={FaMapMarkerAlt}
              title="Kontakt & Lokalizacja"
              description="Znajdź nas w sercu miasta. Zapraszamy na kawę i rozmowę o najlepszych ziarnach z całego świata."
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">

            {/* Contact Information */}
            <div className="space-y-8">

              {/* Address */}
              <div className="p-6 bg-gradient-to-br from-primary-light/50 to-primary/50 backdrop-blur-sm border border-white/10 hover:shadow-lg hover:shadow-white/5 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 bg-accent/20 border border-accent/30 backdrop-blur-sm hover:scale-110 transition-transform duration-300">
                    <FaMapMarkerAlt className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-white mb-2">Adres</h3>
                    <p className="text-muted leading-relaxed">
                      ul. Dąbrowskiego 4<br />
                      42-200 Częstochowa
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Phone */}
                <div className="p-6 bg-gradient-to-br from-primary-light/50 to-primary/50 backdrop-blur-sm border border-white/10 hover:shadow-lg hover:shadow-white/5 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-white/10 hover:scale-110 transition-transform duration-300">
                      <FaPhone className="w-5 h-5 text-white/70" />
                    </div>
                    <h3 className="font-semibold text-white">Telefon</h3>
                  </div>
                  <a
                      href="tel:+48668011806"
                      className="text-muted hover:text-white transition-colors duration-300 font-medium"
                  >
                    +48 668 011 806
                  </a>
                </div>

                {/* Email */}
                <div className="p-6 bg-gradient-to-br from-primary-light/50 to-primary/50 backdrop-blur-sm border border-white/10 hover:shadow-lg hover:shadow-white/5 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-green-500/20 hover:scale-110 transition-transform duration-300">
                      <FaEnvelope className="w-5 h-5 text-green-400" />
                    </div>
                    <h3 className="font-semibold text-white">Email</h3>
                  </div>
                  <a
                      href="mailto:fitanddrink@gmail.com"
                      className="text-muted hover:text-green-400 transition-colors duration-300 font-medium break-all"
                  >
                    fitanddrink@gmail.com
                  </a>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="p-6 bg-gradient-to-br from-primary-light/50 to-primary/50 backdrop-blur-sm border border-white/10 hover:shadow-lg hover:shadow-white/5 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white/10 hover:scale-110 transition-transform duration-300">
                    <FaClock className="w-5 h-5 text-white/70" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Godziny otwarcia</h3>
                </div>
                <div className="space-y-3">
                  {openingHours.map((schedule, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-muted">{schedule.days}</span>
                        <span className="text-white font-semibold">{schedule.hours}</span>
                      </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Map */}
            <div className="relative">
              <div className="relative h-96 lg:h-full min-h-[400px] bg-gradient-to-br from-primary-light/50 to-primary/50 overflow-hidden border border-white/10 shadow-lg">

                {/* Map Header */}
                <div className="absolute top-4 left-4 right-4 z-10">
                  <div className="bg-primary-dark/90 backdrop-blur-md border border-white/20 p-3">
                    <h4 className="text-white font-semibold text-center">Nasza lokalizacja</h4>
                  </div>
                </div>

                <iframe
                    title="Mapa Strzykawa - ul. Dąbrowskiego 4, Częstochowa"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.714594299478!2d19.12885711568111!3d50.8123459775864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4710a9b40cfbdb0f%3A0x123456789abcdef!2sCz%C4%99stochowa!5e0!3m2!1spl!2spl!4v1593186123456!5m2!1spl!2spl"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                />

                {/* Map Overlay */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-primary-dark/20 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-accent to-muted hover:from-muted hover:to-accent text-white font-semibold transition-all duration-500 hover:shadow-lg hover:shadow-accent/25 hover:scale-105 cursor-pointer rounded-full">
              <FaRoute className="w-5 h-5" />
              <span>Sprawdź dojazd w Google Maps</span>
            </div>
          </div>

        </div>
      </section>
  );
}

export default ContactSection;