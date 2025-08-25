import React from 'react';
import { FaClock, FaMapMarkerAlt, FaWifi, FaThermometerHalf } from 'react-icons/fa';

export function CafeStatusSection({ totalAvailable }) {
    const currentTime = new Date().toLocaleTimeString('pl-PL', {
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div className="bg-gradient-to-r from-primary-light/40 to-primary/40 backdrop-blur-sm border border-white/20 p-6 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">

                {/* Live Status */}
                <div className="text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                        <div className="p-3 bg-accent/20 border border-accent/30">
                            <FaClock className="w-8 h-8 text-accent" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
                                <div className="w-2 h-2 bg-green-500 animate-pulse rounded-full"></div>
                                <span className="text-green-400 text-sm font-bold ">NA ŻYWO</span>
                            </div>
                            <span className="text-muted text-xs block mt-1">Aktualizacja: {currentTime}</span>
                        </div>
                    </div>
                </div>

                {/* Footer Info */}

                    <div className="text-center">
                        <p className="text-muted/80 text-sm leading-relaxed max-w-2xl mx-auto">
                            💡 Nasza oferta zmienia się dynamicznie w ciągu dnia w zależności od dostępności ziaren i zapotrzebowania.
                        </p>
                    </div>


                {/* Location  */}
                <div className="text-center md:text-right space-y-3">
                    <div className="flex items-center justify-center md:justify-end gap-2 text-muted">
                        <FaMapMarkerAlt className="w-4 h-4 text-accent" />
                        <span className="text-sm font-medium">ul. Dąbrowskiego 4</span>
                    </div>
                </div>
            </div>
        </div>
    );
}