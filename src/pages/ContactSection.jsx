import React from 'react';
import { FaMapMarkerAlt, FaRoute } from 'react-icons/fa';
import { PageHeader } from '../components/PageHeader';
import { UniversalButton } from '../components/UniversalButton';
import { useScrollToTop } from '../hooks/useScrollToTop';

// Tymczasowo importujemy komponenty inline, żeby sprawdzić czy działają
import { FaPhone, FaEnvelope, FaClock, FaCoffee, FaIndustry } from 'react-icons/fa';

function TempContactInfo() {
  const cafeHours = [
    { days: 'Poniedziałek - Piątek', hours: '9:00 - 17:00' },
    { days: 'Sobota - Niedziela', hours: '10:00 - 15:00' },
  ];

  const roasteryHours = [
    { days: 'Piątek', hours: '15:00 - 17:00' },
    { days: 'Sobota', hours: '10:00 - 12:00' },
  ];

  return (
      <div className="bg-gradient-to-br from-primary-light/50 to-primary/50 backdrop-blur-sm border border-white/10 p-8">

        {/* Locations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

          {/* Kawiarnia */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-accent/20 border border-accent/30">
                <FaCoffee className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-white">Kawiarnia</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-white">ul. Dąbrowskiego 4</div>
                  <div className="text-muted">42-200 Częstochowa</div>
                </div>
              </div>
            </div>
          </div>

          {/* Palarnia */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-accent/20 border border-accent/30">
                <FaIndustry className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-white">Palarnia</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-white">ul. Mstowska 1C</div>
                  <div className="text-muted">42-242 Rędziny</div>
                </div>
              </div>

              {/*<div className="flex items-start gap-3">*/}
              {/*  <FaClock className="w-4 h-4 text-white/70 mt-1 flex-shrink-0" />*/}
              {/*  <div>*/}
              {/*    <div className="font-semibold text-white mb-2">Zwiedzanie palarni</div>*/}
              {/*    {roasteryHours.map((schedule, index) => (*/}
              {/*        <div key={index} className="flex justify-between items-center text-sm">*/}
              {/*          <span className="text-muted">{schedule.days}</span>*/}
              {/*          <span className="text-white font-medium ml-4">{schedule.hours}</span>*/}
              {/*        </div>*/}
              {/*    ))}*/}
              {/*    <p className="text-xs text-muted/80 mt-2">*/}
              {/*      * Wizyty po wcześniejszym umówieniu*/}
              {/*    </p>*/}
              {/*  </div>*/}
              {/*</div>*/}

              {/*<div className="bg-orange-500/10 border border-orange-500/20 p-4">*/}
              {/*  <p className="text-sm text-white/90 leading-relaxed">*/}
              {/*    Zapraszamy na zwiedzanie naszej palarni! Zobacz jak powstają nasze kawy specialty,*/}
              {/*    poznaj proces palenia i spróbuj świeżo upalonych ziaren. Idealne dla miłośników kawy*/}
              {/*    i grup zorganizowanych.*/}
              {/*  </p>*/}
              {/*</div>*/}
            </div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <FaClock className="w-4 h-4 text-white/70 mt-1 flex-shrink-0" />
          <div>
            <div className="font-semibold text-white mb-2">Godziny otwarcia</div>
            {cafeHours.map((schedule, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="text-muted">{schedule.days}</span>
                  <span className="text-white font-medium ml-4">{schedule.hours}</span>
                </div>
            ))}
          </div>
        </div>
      </div>
  );
}

function TempContactMap() {
  return (
      <div className="relative h-96 lg:h-full min-h-[200px] bg-gradient-to-br from-primary-light/50 to-primary/50 overflow-hidden border border-white/10 shadow-lg">
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <div className="bg-primary-dark/90 backdrop-blur-md border border-white/20 p-3">
            <h4 className="text-white font-semibold text-center">Lokalizacja kawiarni</h4>
            <p className="text-muted text-xs text-center mt-1">ul. Dąbrowskiego 4, Częstochowa</p>
          </div>
        </div>

        <iframe
            title="Mapa Strzykawa - ul. Dąbrowskiego 4, Częstochowa"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2520.9428412218545!2d19.112638399999994!3d50.8136977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4710b5f273df9a9f%3A0xf1f0770eede360d8!2sSTRZYKAWA%20-%20Kawiarnia%2FPalarnia%20kawy!5e0!3m2!1spl!2spl!4v1756156760666!5m2!1spl!2spl"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
        />

        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-primary-dark/20 via-transparent to-transparent"></div>
      </div>
  );
}

function ContactSection() {
  useScrollToTop();

  return (
      <section className="min-h-screen bg-primary pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Section Header */}
          <PageHeader
              title="Kontakt & Lokalizacja"
              description="Znajdź nas w sercu miasta. Zapraszamy na kawę i rozmowę o najlepszych ziarnach z całego świata. Odwiedź także naszą palarnię i zobacz jak powstają nasze kawy specialty."
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">

            {/* Contact Information */}
            <TempContactInfo />

            {/* Map */}
            <TempContactMap />
          </div>
        </div>
      </section>
  );
}

export default ContactSection;