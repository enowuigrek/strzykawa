import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Coffees from './pages/Coffees.jsx';
import AvailableInCafe from './pages/AvailableInCafe.jsx';
import ContactSection from "./pages/ContactSection.jsx";
import About from "./pages/About.jsx";

// The main application component. It defines top-level layout and routing.
function App() {
    return (
        <div className="app">
            <Header />
                <main id="main">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/kawy" element={<Coffees />} />
                        <Route path="/dostepne-w-kawiarni" element={<AvailableInCafe />} />
                        <Route path="/o-nas" element={<About />} />
                        <Route path="/kontakt" element={<ContactSection />} />
                    </Routes>
                </main>
            <Footer />
        </div>
    );
}

export default App;