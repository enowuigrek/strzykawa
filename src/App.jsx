import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/layout/Header.jsx';
import { Footer } from './components/layout/Footer.jsx';
import { Home } from './pages/Home.jsx';
import { Coffees }from './pages/Coffees.jsx';
import { CoffeeDetail } from './pages/CoffeeDetail.jsx'; // ✅ NOWY IMPORT
import { About } from "./pages/About.jsx";
import { ContactSection } from "./pages/ContactSection.jsx";
import { B2B } from './pages/B2B.jsx';
import { ShopifyDebugger } from './components/ShopifyDebugger.jsx';
import { Regulamin } from './pages/Regulamin';
import { PolitykaPrywatnosci, PolitykaCookies, DostawaZwroty } from './pages/LegalPages';

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
    return (
        <div className="app">
            <ScrollToTop />
            <Header />
            <main id="main">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/kawy" element={<Coffees />} />
                    <Route path="/kawy/:handle" element={<CoffeeDetail />} /> {/* ✅ NOWY ROUTE */}
                    <Route path="/o-nas" element={<About />} />
                    <Route path="/b2b" element={<B2B />} />
                    <Route path="/kontakt" element={<ContactSection />} />
                    <Route path="/debug-shopify" element={<ShopifyDebugger />} />
                    <Route path="/regulamin" element={<Regulamin />} />
                    <Route path="/polityka-prywatnosci" element={<PolitykaPrywatnosci />} />
                    <Route path="/polityka-cookies" element={<PolitykaCookies />} />
                    <Route path="/dostawa-zwroty" element={<DostawaZwroty />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;