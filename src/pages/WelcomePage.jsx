import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingBag, FaUser } from 'react-icons/fa';
import { useAuthStore } from '../store/authStore.js';

const CONFETTI_COLORS = ['#6B7F73', '#0E8C6F', '#9CA8A1', '#3A5F55', '#2C3A35', '#ffffff'];

// Deterministyczne konfetti — nie zmienia się przy re-renderze
const confettiPieces = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    left: `${((i * 13 + 7) % 97) + 1}%`,
    delay: `${((i * 7) % 30) / 10}s`,
    duration: `${2.8 + ((i * 3) % 18) / 10}s`,
    width: `${6 + (i % 5) * 2}px`,
    height: `${8 + (i % 4) * 3}px`,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    rotate: `${(i * 43) % 360}deg`,
}));

export function WelcomePage() {
    const user = useAuthStore((state) => state.user);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const firstName = user?.firstName || '';
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) return null;

    return (
        <div className="min-h-screen bg-primary flex items-center justify-center px-4 py-12 relative overflow-hidden">
            {/* Confetti CSS */}
            <style>{`
                @keyframes confetti-fall {
                    0%   { transform: translateY(-40px) rotate(0deg); opacity: 1; }
                    80%  { opacity: 0.8; }
                    100% { transform: translateY(105vh) rotate(540deg); opacity: 0; }
                }
                .confetti-piece {
                    position: absolute;
                    top: -40px;
                    border-radius: 2px;
                    animation: confetti-fall linear infinite;
                    pointer-events: none;
                }
            `}</style>

            {confettiPieces.map((piece) => (
                <div
                    key={piece.id}
                    className="confetti-piece"
                    style={{
                        left: piece.left,
                        width: piece.width,
                        height: piece.height,
                        background: piece.color,
                        animationDuration: piece.duration,
                        animationDelay: piece.delay,
                        transform: `rotate(${piece.rotate})`,
                    }}
                />
            ))}

            {/* Treść */}
            <div className="relative z-10 max-w-lg mx-auto text-center">
                {/* Logo vertical */}
                <div className="mb-10 flex justify-center">
                    <img
                        src="/logo/vertical-logo.png"
                        alt="Strzykawa Coffee Shop & Roastery"
                        className="h-48 md:h-64 w-auto"
                        style={{ filter: 'brightness(0) saturate(100%) invert(100%)' }}
                    />
                </div>

                {/* Nagłówek */}
                <h1 className="text-3xl md:text-4xl text-white font-normal mb-3">
                    Witaj w Strzykawie{firstName ? `, ${firstName}` : ''}!
                </h1>
                <p className="text-muted text-base mb-10 max-w-sm mx-auto">
                    Miło nam, że do nas dołączyłeś.
                </p>

                {/* Przyciski CTA */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/kawy"
                        className="inline-flex items-center justify-center gap-3 bg-cta hover:bg-cta-hover text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-md"
                    >
                        <FaShoppingBag />
                        <span>Odkryj nasze kawy</span>
                    </Link>
                    <Link
                        to="/profil"
                        className="inline-flex items-center justify-center gap-3 border border-accent text-accent hover:text-white hover:border-white px-8 py-4 rounded-full font-medium transition-all duration-300"
                    >
                        <FaUser />
                        <span>Mój profil</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
