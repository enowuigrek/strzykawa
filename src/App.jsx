import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ComingSoon } from './pages/ComingSoon.jsx';
import { Header } from './components/layout/Header.jsx';
import { Footer } from './components/layout/Footer.jsx';
import { Home } from './pages/Home.jsx';
import { Coffees } from './pages/Coffees.jsx';
import { CoffeeDetail } from './pages/CoffeeDetail.jsx';
import { CookieConsent } from './components/atoms/CookieConsent.jsx';
import { Spinner } from './components/atoms/Spinner.jsx';
import { PREVIEW_PASSWORD, PREVIEW_STORAGE_KEY } from './constants/preview.js';
import { useAuthStore } from './store/authStore.js';
import { useCartStore } from './store/cartStore.js';

// Lazy-loaded pages — ładowane tylko gdy użytkownik nawiguje do danej trasy
const About = lazy(() => import('./pages/About.jsx').then((m) => ({ default: m.About })));
const Contact = lazy(() => import('./pages/Contact.jsx').then((m) => ({ default: m.Contact })));
const B2B = lazy(() => import('./pages/B2B.jsx').then((m) => ({ default: m.B2B })));
const Orders = lazy(() => import('./pages/Orders.jsx').then((m) => ({ default: m.Orders })));
const Profile = lazy(() => import('./pages/Profile.jsx').then((m) => ({ default: m.Profile })));
const CheckoutPage = lazy(() =>
    import('./pages/CheckoutPage.jsx').then((m) => ({ default: m.CheckoutPage }))
);
const CheckoutSuccess = lazy(() =>
    import('./pages/CheckoutSuccess.jsx').then((m) => ({ default: m.CheckoutSuccess }))
);
const CheckoutCanceled = lazy(() =>
    import('./pages/CheckoutCanceled.jsx').then((m) => ({ default: m.CheckoutCanceled }))
);
const ResetPasswordPage = lazy(() =>
    import('./pages/ResetPasswordPage.jsx').then((m) => ({ default: m.ResetPasswordPage }))
);
const TermsAndConditions = lazy(() =>
    import('./pages/TermsAndConditions.jsx').then((m) => ({ default: m.TermsAndConditions }))
);
const PrivacyPolicy = lazy(() =>
    import('./pages/PrivacyPolicy.jsx').then((m) => ({ default: m.PrivacyPolicy }))
);
const CookiePolicy = lazy(() =>
    import('./pages/CookiePolicy.jsx').then((m) => ({ default: m.CookiePolicy }))
);
const StyleGuide = lazy(() => import('./pages/StyleGuide.jsx'));
const NotFound = lazy(() =>
    import('./pages/NotFound.jsx').then((m) => ({ default: m.NotFound }))
);

// 🚨 COMING SOON MODE - Kontrolowane przez zmienną środowiskową
// Lokalne: .env.development (false) | Produkcja: .env.production (true)
const COMING_SOON_MODE = import.meta.env.VITE_COMING_SOON === 'true';

// Fallback pokazywany podczas ładowania leniwych stron
function PageLoader() {
    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <Spinner size="lg" />
        </div>
    );
}

// Hook do automatycznego scrollowania na górę przy zmianie trasy
function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, [pathname]);

    return null;
}

// Hook do sprawdzania preview mode (tajny dostęp mimo Coming Soon)
function usePreviewMode() {
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const previewParam = params.get('preview');

        if (previewParam === PREVIEW_PASSWORD) {
            localStorage.setItem(PREVIEW_STORAGE_KEY, 'true');
            setIsPreviewMode(true);
            window.history.replaceState({}, '', location.pathname);
        } else if (localStorage.getItem(PREVIEW_STORAGE_KEY) === 'true') {
            setIsPreviewMode(true);
        }
    }, [location]);

    return isPreviewMode;
}

// The main application component. It defines top-level layout and routing.
function App() {
    const { pathname } = useLocation();
    const isStyleGuide = pathname === '/style-guide';
    const isPreviewMode = usePreviewMode();
    const checkAuth = useAuthStore((state) => state.checkAuth);
    const initializeCart = useCartStore((state) => state.initializeCart);

    // Sprawdź autentykację i załaduj koszyk z Shopify przy starcie aplikacji
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    useEffect(() => {
        initializeCart();
    }, [initializeCart]);

    // 🚨 Jeśli COMING_SOON_MODE = true I NIE MA preview mode, pokazuj tylko Coming Soon
    if (COMING_SOON_MODE && !isPreviewMode) {
        return (
            <div className="app">
                <ComingSoon />
            </div>
        );
    }

    // 🟢 Normalna strona (gdy COMING_SOON_MODE = false)
    return (
        <div className="app">
            <ScrollToTop />
            {!isStyleGuide && <Header />}
            <main id="main">
                <Suspense fallback={<PageLoader />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/kawy" element={<Coffees />} />
                        <Route path="/kawy/:handle" element={<CoffeeDetail />} />
                        <Route path="/profil" element={<Profile />} />
                        <Route path="/zamowienia" element={<Orders />} />
                        <Route path="/o-nas" element={<About />} />
                        <Route path="/b2b" element={<B2B />} />
                        <Route path="/kontakt" element={<Contact />} />
                        <Route path="/regulamin" element={<TermsAndConditions />} />
                        <Route path="/polityka-prywatnosci" element={<PrivacyPolicy />} />
                        <Route path="/polityka-cookies" element={<CookiePolicy />} />
                        <Route path="/style-guide" element={<StyleGuide />} />
                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="/checkout/success" element={<CheckoutSuccess />} />
                        <Route path="/checkout/canceled" element={<CheckoutCanceled />} />
                        <Route path="/account/reset/:customerId/:token" element={<ResetPasswordPage />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </main>
            {!isStyleGuide && <Footer />}
            <CookieConsent />
        </div>
    );
}

export default App;
