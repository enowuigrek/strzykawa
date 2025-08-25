import React from 'react';
import { FaClock, FaMapMarkerAlt, FaWifi, FaThermometerHalf } from 'react-icons/fa';

export function CafeStatusSection({ totalAvailable }) {
    const currentTime = new Date().toLocaleTimeString('pl-PL', {
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div className="bg-gradient-to-r from-primary-light/40 to-primary/40 backdrop-blur-sm border border-white/20 p-6 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Live Status */}
                <div className="text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                        <div className="relative p-3 bg-green-500/20 border border-green-500/30">
                            <FaClock className="w-6 h-6 text-green-400" />
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 animate-ping"></div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500"></div>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500/30">
                                <div className="w-2 h-2 bg-green-500 animate-pulse"></div>
                                <span className="text-green-400 text-sm font-bold">NA ŻYWO</span>
                            </div>
                            <span className="text-muted text-xs block mt-1">Aktualizacja: {currentTime}</span>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="text-center">
                    <div className="bg-accent/20 border border-accent/30 p-4 inline-block">
                        <div className="text-3xl font-bold text-white mb-1">11</div>
                        <div className="text-sm text-muted font-medium">dostępnych kaw</div>
                    </div>
                </div>

                {/* Location & Info */}
                <div className="text-center md:text-right space-y-3">
                    <div className="flex items-center justify-center md:justify-end gap-2 text-muted">
                        <FaMapMarkerAlt className="w-4 h-4 text-accent" />
                        <span className="text-sm font-medium">ul. Dąbrowskiego 4</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-end gap-4 text-xs text-muted">
                        <div className="flex items-center gap-1">
                            <FaThermometerHalf className="w-3 h-3 text-white/70" />
                            <span>65-70°C</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}