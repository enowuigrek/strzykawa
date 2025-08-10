// src/components/Header.jsx
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header className={`header ${scrolled ? "scrolled" : "transparent"}`}>
            <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div className="brand">STRZYKAWA</div>
                <nav className="nav">
                    <NavLink to="/">Start</NavLink>
                    <NavLink to="/kawy">Nasze kawy</NavLink>
                    <NavLink to="/dostepne-w-kawiarni">Dostępne w kawiarni</NavLink>
                    <a href="#kontakt">Kontakt</a>
                </nav>
            </div>
        </header>
    );
}