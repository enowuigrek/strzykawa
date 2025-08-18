import React from 'react';
import { FaMugHot, FaTint, FaFlask, FaBoxOpen, FaClock, FaMapMarkerAlt, FaWifi, FaThermometerHalf } from 'react-icons/fa';
import coffees from '../data/coffees.js';
import CoffeeCard from '../components/CoffeeCard.jsx';

const sections = [
  {
    key: 'espressoGrinders',
    title: 'Na młynkach',
    subtitle: 'Espresso i mleczne',
    descr: 'Kawy aktualnie na młynkach — idealne pod espresso i napoje mleczne.',
    icon: FaMugHot,
    accent: 'espresso',
    bgColor: 'from-amber-500/20 to-orange-500/20',
    borderColor: 'border-amber-500/30',
    iconColor: 'text-amber-400'
  },
  {
    key: 'quickFilter',
    title: 'Szybki przelew',
    subtitle: 'Batch brew',
    descr: 'Świeżo zaparzona kawa przelew — gotowa od ręki.',
    icon: FaTint,
    accent: 'batch',
    bgColor: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/30',
    iconColor: 'text-blue-400'
  },
  {
    key: 'brewBar',
    title: 'Brew bar',
    subtitle: 'Parzenie na miejscu',
    descr: 'V60, Chemex, Aeropress — wybierz metodę i obserwuj proces.',
    icon: FaFlask,
    accent: 'brewbar',
    bgColor: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'border-green-500/30',
    iconColor: 'text-green-400'
  },
  {
    key: 'retailShelf',
    title: 'Na półce',
    subtitle: 'Na wynos',
    descr: 'Świeżo palone kawy w opakowaniach — zabierz do domu.',
    icon: FaBoxOpen,
    accent: 'shelf',
    bgColor: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-500/30',
    iconColor: 'text-purple-400'
  }
];

function filterByAvailability(key) {
  return coffees.filter(c => c.availability && c.availability[key]);
}

export default function AvailableInCafe() {
  const totalAvailable = coffees.filter(c =>
      c.availability && Object.values(c.availability).some(Boolean)
  ).length;

  const currentTime = new Date().toLocaleTimeString('pl-PL', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
      <div className="min-h-screen bg-primary pt-20">
        <div className="container mx-auto px-4 py-8">

          {/* Enhanced Hero Section */}
          <div className="relative bg-gradient-to-br from-primary-light/60 via-primary/80 to-primary-dark/60 backdrop-blur-sm border border-white/10 rounded-3xl p-8 mb-10 overflow-hidden">

            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-accent to-muted rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-4 left-4 w-24 h-24 bg-gradient-to-br from-muted to-accent rounded-full blur-2xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10">
              {/* Header with Live Indicator */}
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative p-4 bg-gradient-to-br from-accent/30 to-muted/30 rounded-2xl border border-white/20 backdrop-blur-sm">
                    <FaClock className="w-8 h-8 text-accent" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-ping"></div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full"></div>
                  </div>
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-muted to-white bg-clip-text text-transparent">
                      Dostępne w kawiarni
                    </h1>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full border border-green-500/30">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-green-400 text-sm font-semibold">NA ŻYWO</span>
                      </div>
                      <span className="text-muted text-sm">Aktualizacja: {currentTime}</span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">{totalAvailable}</div>
                    <div className="text-sm text-muted">dostępnych kaw</div>
                  </div>
                  <div className="w-px h-12 bg-white/20"></div>
                  <div className="flex items-center gap-2 text-muted">
                    <FaMapMarkerAlt className="w-4 h-4 text-accent" />
                    <span className="text-sm">ul. Dąbrowskiego 4</span>
                  </div>
                </div>
              </div>

              <p className="text-xl text-muted/90 leading-relaxed max-w-3xl">
                Co dziś wypijesz w Strzykawie? Sprawdź naszą aktualną ofertę —
                od espresso na młynkach, przez batch brew, aż po kawy do parzenia na miejscu.
              </p>
            </div>
          </div>

          {/* Enhanced Sections */}
          <div className="space-y-8">
            {sections.map(({ key, title, subtitle, descr, icon: Icon, accent, bgColor, borderColor, iconColor }) => {
              const items = filterByAvailability(key);
              const isEmpty = items.length === 0;

              return (
                  <section key={key} className="group">

                    {/* Section Header */}
                    <div className={`flex items-center gap-6 p-6 mb-6 bg-gradient-to-r ${bgColor} backdrop-blur-sm border ${borderColor} rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-white/5`}>

                      {/* Icon */}
                      <div className={`relative flex-shrink-0 p-4 bg-gradient-to-br from-primary-light/50 to-primary/50 rounded-2xl border border-white/10 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-8 h-8 ${iconColor}`} />
                        {!isEmpty && (
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">{items.length}</span>
                            </div>
                        )}
                      </div>

                      {/* Section Info */}
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="text-2xl font-bold text-white">{title}</h2>
                          <span className="px-3 py-1 bg-white/10 rounded-full text-muted text-sm border border-white/20">
                        {subtitle}
                      </span>
                        </div>
                        <p className="text-muted/90 leading-relaxed">{descr}</p>
                      </div>

                      {/* Count Badge */}
                      <div className="flex-shrink-0 text-center">
                        <div className={`inline-flex items-center gap-2 px-4 py-3 bg-white/10 border ${borderColor} rounded-xl backdrop-blur-sm`}>
                          <span className="text-2xl font-bold text-white">{items.length}</span>
                          <span className="text-sm text-muted">kaw</span>
                        </div>
                      </div>
                    </div>

                    {/* Section Content */}
                    <div className="ml-6">
                      {!isEmpty ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {items.map(coffee => (
                                <CoffeeCard key={coffee.id} coffee={coffee} />
                            ))}
                          </div>
                      ) : (
                          <div className="text-center py-12">
                            <div className="max-w-md mx-auto">
                              <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${bgColor} border ${borderColor} rounded-2xl mb-4`}>
                                <Icon className={`w-10 h-10 ${iconColor} opacity-50`} />
                              </div>
                              <h3 className="text-xl font-semibold text-white mb-2">Obecnie niedostępne</h3>
                              <p className="text-muted/80 leading-relaxed">
                                W tej chwili nie mamy kaw w tej kategorii. Sprawdź inne opcje lub wróć później.
                              </p>
                            </div>
                          </div>
                      )}
                    </div>
                  </section>
              );
            })}
          </div>

          {/* Enhanced Footer Info */}
          <div className="mt-12 p-6 bg-gradient-to-r from-primary-light/30 to-primary/30 backdrop-blur-sm border border-white/10 rounded-2xl">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/20 rounded-lg">
                  <FaClock className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="font-semibold text-white">Ostatnia aktualizacja</div>
                  <div className="text-sm text-muted">Dziś, {currentTime}</div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-muted">
                  <FaThermometerHalf className="w-4 h-4 text-blue-400" />
                  <span className="text-sm">Temperatura serwowania: 65-70°C</span>
                </div>
                <div className="flex items-center gap-2 text-muted">
                  <FaWifi className="w-4 h-4 text-green-400" />
                  <span className="text-sm">WiFi dostępne</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-center text-muted/80 text-sm leading-relaxed">
                Oferta może się zmieniać w ciągu dnia w zależności od dostępności.
                W razie wątpliwości zapytaj naszych barista o aktualną ofertę.
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}