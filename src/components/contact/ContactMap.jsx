import React from 'react';

export function ContactMap() {
    return (
        <div className="relative h-96 lg:h-full min-h-[400px] bg-gradient-to-br from-primary-light/50 to-primary/50 overflow-hidden border border-white/10 shadow-lg">

            {/* Map Header */}
            <div className="absolute top-4 left-4 right-4 z-10">
                <div className="bg-primary-dark/90 backdrop-blur-md border border-white/20 p-3">
                    <h4 className="text-white font-semibold text-center">Lokalizacja kawiarni</h4>
                    <p className="text-muted text-xs text-center mt-1">ul. Dąbrowskiego 4, Częstochowa</p>
                </div>
            </div>

            <iframe
                title="Mapa Strzykawa - ul. Dąbrowskiego 4, Częstochowa"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.714594299478!2d19.12885711568111!3d50.8123459775864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4710a9b40cfbdb0f%3A0x123456789abcdef!2sCz%C4%99stochowa!5e0!3m2!1spl!2spl!4v1593186123456!5m2!1spl!2spl"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
            />

            {/* Map Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-primary-dark/20 via-transparent to-transparent"></div>
        </div>
    );
}