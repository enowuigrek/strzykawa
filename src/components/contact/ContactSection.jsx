// import React from 'react';
// import { FaMapMarkerAlt, FaRoute } from 'react-icons/fa';
// import { PageHeader } from '../PageHeader';
// import { ContactInfo } from './ContactInfo';
// import { ContactMap } from './ContactMap';
// import { UniversalButton } from '../UniversalButton';
// import { useScrollToTop } from '../hooks/useScrollToTop';
//
// function ContactSection() {
//   useScrollToTop();
//
//   return (
//       <section className="py-20 bg-gradient-to-b from-primary to-primary-dark" id="kontakt">
//         <div className="container mx-auto px-4">
//
//           {/* Section Header */}
//           <PageHeader
//               icon={FaMapMarkerAlt}
//               title="Kontakt & Lokalizacja"
//               description="Znajdź nas w sercu miasta. Zapraszamy na kawę i rozmowę o najlepszych ziarnach z całego świata. Odwiedź także naszą palarnię i zobacz jak powstają nasze kawy specialty."
//           />
//
//           {/* Main Content Grid */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
//
//             {/* Contact Information */}
//             <ContactInfo />
//
//             {/* Map */}
//             <ContactMap />
//           </div>
//
//           {/* CTA Section */}
//           <div className="text-center">
//             <UniversalButton
//                 href="https://www.google.com/maps/dir//ul.+Dąbrowskiego+4,+Częstochowa"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 icon={FaRoute}
//                 variant="primary"
//                 size="lg"
//             >
//               Sprawdź dojazd w Google Maps
//             </UniversalButton>
//           </div>
//
//         </div>
//       </section>
//   );
// }
//
// export default ContactSection;