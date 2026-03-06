import React from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

const SITE_NAME = 'Strzykawa Palarnia Kawy';
const SITE_URL = 'https://strzykawa.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
const TITLE_SUFFIX = ' | Strzykawa Palarnia Kawy';

/**
 * SEO — dynamiczne meta tagi per strona/route.
 *
 * Props:
 * - title            — unikalny tytuł strony (bez sufixu "| Strzykawa..."), np. "Nasze kawy"
 * - description      — meta description, max 155 znaków
 * - canonical        — pełny URL strony (np. https://strzykawa.com/kawy)
 * - ogImage          — URL obrazka OG, domyślnie /og-image.png
 * - ogImageAlt       — alt text dla ogImage; domyślnie generyczny tekst Strzykawa
 * - ogType           — 'website' | 'product', domyślnie 'website'
 * - noindex          — true → dodaje <meta name="robots" content="noindex,nofollow">
 * - productSchema    — JSON-LD structured data (obiekt) dla produktu
 * - breadcrumbSchema — JSON-LD BreadcrumbList (obiekt) dla breadcrumbs
 * - fullTitle        — opcjonalnie: pełny tytuł bez dodawania sufixu
 */
export function SEO({ title, description, canonical, ogImage, ogImageAlt, ogType, noindex, productSchema, breadcrumbSchema, fullTitle }) {
    const resolvedTitle = fullTitle ?? (title ? `${title}${TITLE_SUFFIX}` : `Strzykawa | Palarnia Kawy i Kawiarnia w Częstochowie`);
    const resolvedDescription =
        description ||
        'Strzykawa — palarnia kawy i kawiarnia specialty coffee w centrum Częstochowy. Świeżo palona kawa z najlepszych ziaren. Odwiedź nas na ul. Dąbrowskiego 4.';
    const resolvedOgImage = ogImage || DEFAULT_OG_IMAGE;
    const resolvedOgImageAlt = ogImageAlt || 'Strzykawa — palarnia kawy Częstochowa';
    const resolvedOgType = ogType || 'website';

    return (
        <Helmet>
            <title>{resolvedTitle}</title>
            <meta name="description" content={resolvedDescription} />
            {canonical && <link rel="canonical" href={canonical} />}
            {noindex && <meta name="robots" content="noindex,nofollow" />}

            {/* Open Graph */}
            <meta property="og:type" content={resolvedOgType} />
            <meta property="og:title" content={resolvedTitle} />
            <meta property="og:description" content={resolvedDescription} />
            <meta property="og:image" content={resolvedOgImage} />
            <meta property="og:image:alt" content={resolvedOgImageAlt} />
            {canonical && <meta property="og:url" content={canonical} />}
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:locale" content="pl_PL" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={resolvedTitle} />
            <meta name="twitter:description" content={resolvedDescription} />
            <meta name="twitter:image" content={resolvedOgImage} />
            <meta name="twitter:image:alt" content={resolvedOgImageAlt} />

            {/* JSON-LD Product schema */}
            {productSchema && (
                <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
            )}

            {/* JSON-LD BreadcrumbList */}
            {breadcrumbSchema && (
                <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
            )}
        </Helmet>
    );
}

SEO.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    canonical: PropTypes.string,
    ogImage: PropTypes.string,
    ogImageAlt: PropTypes.string,
    ogType: PropTypes.string,
    noindex: PropTypes.bool,
    productSchema: PropTypes.object,
    breadcrumbSchema: PropTypes.object,
    fullTitle: PropTypes.string,
};
