import React from 'react';
import { FaMapMarkerAlt, FaFire, FaExternalLinkAlt, FaFacebookF, FaInstagram } from 'react-icons/fa';

export function RoasteryLocation() {
    const openGoogleMaps = () => {
        const address = encodeURIComponent('ul. Mstowska 1C, 42-242 Rędziny');
        window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
                {/*<div className="p-3 bg-accent/20">*/}
                {/*    /!*<FaFire className="w-6 h-6 text-muted" />*!/*/}
                {/*</div>*/}
                <div>
                    <h3 className="text-2xl font-bold text-white">Palarnia</h3>
                </div>
            </div>

            <div className="space-y-4">
                {/* Adres palarni */}
                <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="w-4 h-4 text-muted mt-1 flex-shrink-0" />
                    <div className="flex-1">
                        <div className="font-semibold text-white">ul. Mstowska 1C</div>
                        <div className="text-muted">42-242 Rędziny</div>
                    </div>
                </div>

                {/* Info o palarni */}
                <div className="space-y-3">
                    <p className="text-sm text-white/80">
                        W palarni organizujemy wydarzenia i spotkania. Śledź nasze media społecznościowe, aby być na bieżąco.
                    </p>

                    {/* Social media links */}
                    <div className="flex items-center gap-3">
                        <a
                            href="https://www.facebook.com/StrzykawaCoffeeShop/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-white/70 hover:text-blue-500 transition-colors text-sm"
                            aria-label="Facebook"
                        >
                            <FaFacebookF className="w-4 h-4" />
                            <span>Facebook</span>
                        </a>
                        <a
                            href="https://www.instagram.com/strzykawa_coffee_shop/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-white/70 hover:text-pink-500 transition-colors text-sm"
                            aria-label="Instagram"
                        >
                            <FaInstagram className="w-4 h-4" />
                            <span>Instagram</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}