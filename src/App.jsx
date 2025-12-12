import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ComingSoon } from './pages/ComingSoon.jsx';
import { Header } from './components/layout/Header.jsx';
import { Footer } from './components/layout/Footer.jsx';
import { Home } from './pages/Home.jsx';
import { Coffees }from './pages/Coffees.jsx';
import { CoffeeDetail } from './pages/CoffeeDetail.jsx';
import { Orders } from './pages/Orders.jsx';
import { Profile } from './pages/Profile.jsx';
import { About } from "./pages/About.jsx";
import { Contact } from "./pages/Contact.jsx";
import { B2B } from './pages/B2B.jsx';
import { TermsAndConditions } from "./pages/TermsAndConditions.jsx";
import {
    PrivacyPolicy,
    CookiePolicy,
    ShippingAndReturns
} from './pages/LegalPages';
import StyleGuide from "./pages/StyleGuide.jsx";
import {CheckoutSuccess} from "./pages/CheckoutSuccess.jsx";
import {CheckoutCanceled} from "./pages/CheckoutCanceled.jsx";
import { NotFound } from './pages/NotFound.jsx';
import { CookieConsent } from './components/atoms/CookieConsent.jsx';
import { PREVIEW_PASSWORD, PREVIEW_STORAGE_KEY } from './constants/preview.js';
import { useAuthStore } from './store/authStore.js';

// 🚨 COMING SOON MODE - Kontrolowane przez zmienną środowiskową
// Lokalne: .env.development (false) | Produkcja: .env.production (true)
const COMING_SOON_MODE = import.meta.env.VITE_COMING_SOON === 'true';

// Hook do automatycznego scrollowania na górę przy zmianie trasy
function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "auto"
        });
    }, [pathname]);

    return null;
}

// Hook do sprawdzania preview mode (tajny dostęp mimo Coming Soon)
function usePreviewMode() {
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const location = useLocation();

    useEffect(() => {
        // Sprawdź URL params przy każdym załadowaniu
        const params = new URLSearchParams(location.search);
        const previewParam = params.get('preview');

        // Jeśli URL zawiera poprawne hasło, zapisz w localStorage
        if (previewParam === PREVIEW_PASSWORD) {
            localStorage.setItem(PREVIEW_STORAGE_KEY, 'true');
            setIsPreviewMode(true);
            // Usuń param z URL (opcjonalnie, dla czystości)
            window.history.replaceState({}, '', location.pathname);
        }
        // Jeśli localStorage ma flagę preview, aktywuj preview mode
        else if (localStorage.getItem(PREVIEW_STORAGE_KEY) === 'true') {
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

    // Sprawdź autentykację przy starcie aplikacji
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

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
                    <Route path="/dostawa-zwroty" element={<ShippingAndReturns />} />
                    <Route path="/style-guide" element={<StyleGuide />} />
                    <Route path="/checkout/success" element={<CheckoutSuccess />} />
                    <Route path="/checkout/canceled" element={<CheckoutCanceled />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            {!isStyleGuide && <Footer />}
            <CookieConsent />
        </div>
    );
}

export default App;