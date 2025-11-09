import React from 'react';

export function MainHeading() {
    return (
        <div className="text-center">
            {/* Logo poziome w hero - większe */}
            <div className="hero-logo">
                <img
                    src="/logo/horizontal-logo.png"
                    alt="Strzykawa Coffee Shop & Roastery"
                    className="w-auto mx-auto"
                />
            </div>
        </div>
    );
}