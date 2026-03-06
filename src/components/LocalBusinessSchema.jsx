import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * LocalBusinessSchema — JSON-LD structured data dla Google
 *
 * Renderuje niewidoczny <script type="application/ld+json"> w <head>.
 * Pomaga Google wyświetlić dane kawiarni w Knowledge Panel i Mapach.
 *
 * Wstrzyknięty globalnie w App.jsx (raz dla całej strony).
 */
export function LocalBusinessSchema() {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'CoffeeShop',
        name: 'Strzykawa Palarnia Kawy',
        alternateName: 'Strzykawa',
        description:
            'Palarnia kawy specialty i kawiarnia w centrum Częstochowy. Świeżo palona kawa z najlepszych ziaren, starannie wyselekcjonowana ze sprawdzonych farm.',
        url: 'https://strzykawa.com',
        telephone: '+48668011806',
        email: 'kontakt@strzykawa.com',
        priceRange: '$$',
        servesCuisine: ['Coffee', 'Specialty Coffee'],
        image: 'https://strzykawa.com/og-image.png',
        logo: 'https://strzykawa.com/logo/logo-horizontal.png',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'ul. Dąbrowskiego 4',
            addressLocality: 'Częstochowa',
            postalCode: '42-200',
            addressCountry: 'PL',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: '50.8118',
            longitude: '19.1203',
        },
        openingHoursSpecification: [
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '09:00',
                closes: '17:00',
            },
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Saturday'],
                opens: '10:00',
                closes: '15:00',
            },
        ],
        sameAs: [
            'https://www.facebook.com/strzykawa',
            'https://www.instagram.com/strzykawa',
        ],
        hasMap: 'https://maps.google.com/?q=Strzykawa+Palarnia+Kawy+Częstochowa',
        currenciesAccepted: 'PLN',
        paymentAccepted: 'Cash, Credit Card, BLIK',
        areaServed: {
            '@type': 'City',
            name: 'Częstochowa',
        },
    };

    return (
        <Helmet>
            <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Helmet>
    );
}
