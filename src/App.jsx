import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ComingSoon } from './pages/ComingSoon.jsx';
import { Header } from './components/layout/Header.jsx';
import { Footer } from './components/layout/Footer.jsx';
import { Home } from './pages/Home.jsx';
import { Coffees }from './pages/Coffees.jsx';
import { CoffeeDetail } from './pages/CoffeeDetail.jsx';
import { About } from "./pages/About.jsx";
import { ContactSection } from "./pages/ContactSection.jsx";
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

// The main application component. It defines top-level layout and routing.
function App() {
    const { pathname } = useLocation();
    const isStyleGuide = pathname === '/style-guide';

    // 🚨 Jeśli COMING_SOON_MODE = true, pokazuj tylko Coming Soon
    if (COMING_SOON_MODE) {
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
                    <Route path="/o-nas" element={<About />} />
                    <Route path="/b2b" element={<B2B />} />
                    <Route path="/kontakt" element={<ContactSection />} />
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
        </div>
    );
}

export default App;