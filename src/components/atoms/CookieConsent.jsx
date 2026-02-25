import { useEffect } from 'react';
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import '../../styles/cookieconsent-custom.css';
import * as VanillaCookieConsent from 'vanilla-cookieconsent';

export function CookieConsent() {
    useEffect(() => {
        VanillaCookieConsent.run({
            guiOptions: {
                consentModal: {
                    layout: 'box inline',
                    position: 'bottom left',
                    equalWeightButtons: true,
                    flipButtons: false,
                },
                preferencesModal: {
                    layout: 'box',
                    position: 'right',
                    equalWeightButtons: true,
                    flipButtons: false,
                },
            },

            categories: {
                necessary: {
                    enabled: true,
                    readOnly: true,
                },
                analytics: {
                    enabled: false,
                    autoClear: {
                        cookies: [
                            { name: /^_ga/ },
                            { name: '_gid' },
                            { name: /^_gat/ },
                        ],
                    },
                },
                marketing: {
                    enabled: false,
                    autoClear: {
                        cookies: [
                            { name: /^_fb/ },
                            { name: '_fbc' },
                            { name: '_fbp' },
                        ],
                    },
                },
            },

            language: {
                default: 'pl',
                translations: {
                    pl: {
                        consentModal: {
                            title: 'Szanujemy Twoją prywatność',
                            description:
                                'Używamy plików cookies, aby zapewnić najlepsze doświadczenia na naszej stronie. Cookies niezbędne są wymagane do działania sklepu. Cookies analityczne pomagają nam zrozumieć jak korzystasz ze strony. <button type="button" data-cc="show-preferencesModal" class="cc-link">Zarządzaj preferencjami</button>',
                            acceptAllBtn: 'Akceptuję wszystkie',
                            acceptNecessaryBtn: 'Tylko niezbędne',
                            showPreferencesBtn: 'Ustawienia',
                        },
                        preferencesModal: {
                            title: 'Ustawienia cookies',
                            acceptAllBtn: 'Akceptuję wszystkie',
                            acceptNecessaryBtn: 'Tylko niezbędne',
                            savePreferencesBtn: 'Zapisz ustawienia',
                            closeIconLabel: 'Zamknij',
                            sections: [
                                {
                                    title: 'Pliki cookies',
                                    description:
                                        'Używamy plików cookies do różnych celów. Poniżej możesz wybrać które kategorie chcesz zaakceptować.',
                                },
                                {
                                    title: 'Niezbędne',
                                    description:
                                        'Te cookies są konieczne do działania sklepu — obsługują koszyk, logowanie i realizację zamówień. Nie można ich wyłączyć.',
                                    linkedCategory: 'necessary',
                                },
                                {
                                    title: 'Analityczne',
                                    description:
                                        'Te cookies pomagają nam zrozumieć jak klienci korzystają ze strony. Dzięki nim możemy ulepszać sklep i ofertę.',
                                    linkedCategory: 'analytics',
                                    cookieTable: {
                                        headers: {
                                            name: 'Nazwa',
                                            domain: 'Domena',
                                            description: 'Opis',
                                            expiration: 'Wygasa',
                                        },
                                        body: [
                                            {
                                                name: '_ga',
                                                domain: 'strzykawa.com',
                                                description: 'Google Analytics — rozróżnianie użytkowników',
                                                expiration: '2 lata',
                                            },
                                            {
                                                name: '_gid',
                                                domain: 'strzykawa.com',
                                                description: 'Google Analytics — rozróżnianie użytkowników',
                                                expiration: '24 godziny',
                                            },
                                        ],
                                    },
                                },
                                {
                                    title: 'Marketingowe',
                                    description:
                                        'Te cookies pozwalają nam wyświetlać spersonalizowane reklamy na podstawie Twoich zainteresowań.',
                                    linkedCategory: 'marketing',
                                    cookieTable: {
                                        headers: {
                                            name: 'Nazwa',
                                            domain: 'Domena',
                                            description: 'Opis',
                                            expiration: 'Wygasa',
                                        },
                                        body: [
                                            {
                                                name: '_fbp',
                                                domain: 'strzykawa.com',
                                                description: 'Facebook Pixel — śledzenie konwersji',
                                                expiration: '3 miesiące',
                                            },
                                        ],
                                    },
                                },
                                {
                                    title: 'Więcej informacji',
                                    description:
                                        'W razie pytań dotyczących naszej polityki cookies, <a href="/polityka-prywatnosci" class="cc-link">zapoznaj się z polityką prywatności</a> lub napisz do nas na adres kontakt@strzykawa.com.',
                                },
                            ],
                        },
                    },
                },
            },

            onConsent: () => {
                // Podepnij Google Analytics / Facebook Pixel w przyszłości:
                // if (VanillaCookieConsent.acceptedCategory('analytics')) { loadGoogleAnalytics(); }
                // if (VanillaCookieConsent.acceptedCategory('marketing')) { loadFacebookPixel(); }
            },

            onChange: () => {
                // Reaguj na zmianę preferencji
            },
        });
    }, []);

    return null;
}
