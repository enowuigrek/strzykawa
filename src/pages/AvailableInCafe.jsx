// import React from 'react';
// import { FaMugHot, FaTint, FaFlask, FaBoxOpen, FaClock } from 'react-icons/fa';
// import { PageHeader } from '../components/PageHeader';
// import { CafeStatusSection } from '../components/CafeStatusSection';
// import { CafeCoffeeCard } from '../components/coffee/CafeCoffeeCard';
// import { useScrollToTop } from '../hooks/useScrollToTop';
// import coffees from '../data/coffees.js';
//
// const sections = [
//   {
//     key: 'espressoGrinders',
//     title: 'Na młynkach',
//     subtitle: 'Espresso i mleczne',
//     description: 'Kawy aktualnie na młynkach — idealne pod espresso i napoje mleczne. Świeże ziarna mielone na miejscu dla każdej filiżanki.',
//     icon: FaMugHot,
//     iconColor: 'text-white/80'
//   },
//   {
//     key: 'quickFilter',
//     title: 'Szybki przelew',
//     subtitle: 'Batch brew',
//     description: 'Świeżo zaparzona kawa przelew — gotowa od ręki. Idealna dla tych, którzy cenią sobie szybkość bez kompromisów w smaku.',
//     icon: FaTint,
//     iconColor: 'text-white/80'
//   },
//   {
//     key: 'brewBar',
//     title: 'Brew bar',
//     subtitle: 'Parzenie na miejscu',
//     description: 'V60, Aeropress, Chemex — wybierz metodę i obserwuj jak nasi barista tworzą dla Ciebie perfekcyjną filiżankę.',
//     icon: FaFlask,
//     iconColor: 'text-green-400'
//   },
//   {
//     key: 'retailShelf',
//     title: 'Na półce',
//     subtitle: 'Na wynos',
//     description: 'Świeżo palone kawy w opakowaniach — zabierz do domu najlepsze ziarna z naszej palarni. Idealne na prezent.',
//     icon: FaBoxOpen,
//     iconColor: 'text-white/80'
//   }
// ];
//
// function filterByAvailability(key) {
//   return coffees.filter(c => c.availability && c.availability[key]);
// }
//
// export default function AvailableInCafe() {
//   useScrollToTop();
//
//   const totalAvailable = coffees.filter(c =>
//       c.availability && Object.values(c.availability).some(Boolean)
//   ).length;
//
//   function pluralizeKawa(count) {
//     if (count === 1) return "kawa";
//     if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 12 || count % 100 > 14)) {
//       return "kawy";
//     }
//     return "kaw";
//   }
//
//   return (
//       <div className="min-h-screen bg-primary pt-20">
//         <div className="container mx-auto px-4 py-8">
//
//           {/* Page Header */}
//           <PageHeader
//               title="Dostępne w kawiarni"
//               description="Co dziś wypijesz w Strzykawie? Sprawdź naszą aktualną ofertę — od espresso na młynkach, przez batch brew, aż po kawy do parzenia na miejscu."
//           />
//
//           {/* Cafe Status Section */}
//           <CafeStatusSection totalAvailable={totalAvailable} />
//
//           {/* Coffee Sections */}
//           <div className="space-y-12">
//             {sections.map(({ key, title, subtitle, description, icon: Icon, iconColor }) => {
//               const items = filterByAvailability(key);
//               const isEmpty = items.length === 0;
//
//               return (
//                   <section key={key} className="space-y-6">
//
//                     {/* Section Header */}
//                     <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20 p-6 overflow-hidden">
//
//                       <div className="flex items-center gap-4 mb-4">
//                         <div className="p-4 bg-gradient-to-br from-primary-light/50 to-primary/50 border border-white/10 backdrop-blur-sm hover:scale-110 transition-transform duration-300">
//                           <Icon className={`w-8 h-8 ${iconColor}`} />
//                         </div>
//                         <div className="flex-grow">
//                           <div className="flex items-center gap-3 mb-2">
//                             <h2 className="text-3xl font-bold text-white">{title}</h2>
//                             <span className="px-3 py-1 bg-white/10 text-muted text-sm border border-white/20 rounded-full">
//                               {subtitle}
//                             </span>
//                             {!isEmpty && (
//                                 <div className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
//                                   <span className="text-green-400 text-sm">
//                                      {items.length} {pluralizeKawa(items.length)}
//                                   </span>
//                                 </div>
//                             )}
//                           </div>
//                           <p className="text-white/80 leading-relaxed max-w-2xl">
//                             {description}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//
//                     {/* Section Content */}
//                     {!isEmpty ? (
//                         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//                           {items.map(coffee => (
//                               <CafeCoffeeCard key={coffee.id} coffee={coffee} />
//                           ))}
//                         </div>
//                     ) : (
//                         <div className="text-center py-16">
//                           <div className="max-w-md mx-auto">
//                             <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-white/10 to-white/5 border border-white/20 mb-6">
//                               <Icon className={`w-10 h-10 ${iconColor} opacity-60`} />
//                             </div>
//                             <h3 className="text-xl font-semibold text-white mb-3">Obecnie niedostępne</h3>
//                             <p className="text-muted/80 leading-relaxed">
//                               W tej chwili nie mamy kaw w tej kategorii. Sprawdź inne opcje lub wróć później — nasza oferta zmienia się dynamicznie.
//                             </p>
//                           </div>
//                         </div>
//                     )}
//                   </section>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//   );
// }