import React from 'react';
import { useScrollAnimation, scrollAnimations } from '../../../hooks/useScrollAnimation';

/**
 * TeamSection - Sekcja zespołu Strzykawy
 * Pokazuje Damiana jako założyciela/roastera i zdjęcie całego zespołu
 */
export function TeamSection({ founderImage, teamImage }) {
    const [ref, isVisible] = useScrollAnimation({ threshold: 0.15 });

    return (
        <section ref={ref} className="mt-32 mb-16">
            {/* Section Header */}
            <div className={`text-center mb-12 transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
                <h2 className="text-3xl md:text-4xl text-white mb-4">
                    Ludzie Strzykawy
                </h2>
                <p className="text-white/70 text-lg max-w-2xl mx-auto">
                    Poznaj zespół, który stoi za każdą filiżanką kawy
                </p>
            </div>

            {/* Team Grid */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                {/* Founder Card - Damian */}
                <div className={`transition-all duration-700 ease-out delay-100 ${
                    isVisible
                        ? scrollAnimations.flowLeft.visible
                        : scrollAnimations.flowLeft.hidden
                }`}>
                    <div className="bg-gradient-to-br from-primary-light/30 to-primary/20 border border-white/10 overflow-hidden group">
                        {/* Image */}
                        <div className="aspect-[4/5] overflow-hidden">
                            <img
                                src={founderImage}
                                alt="Damian - Założyciel i Head Roaster Strzykawa"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>

                        {/* Info */}
                        <div className="p-6 md:p-8">
                            <h3 className="text-2xl md:text-3xl text-white mb-2">
                                Damian
                            </h3>
                            <p className="text-accent font-medium mb-4">
                                Założyciel & Head Roaster
                            </p>
                            <p className="text-white/70 leading-relaxed">
                                Od pierwszego dnia odpowiada za każdy profil palenia.
                                Nieustannie eksperymentuje, szuka nowych smaków i dba o to,
                                by każda partia kawy była wyjątkowa.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Team Card */}
                <div className={`transition-all duration-700 ease-out delay-200 ${
                    isVisible
                        ? scrollAnimations.flowRight.visible
                        : scrollAnimations.flowRight.hidden
                }`}>
                    <div className="bg-gradient-to-br from-primary-light/30 to-primary/20 border border-white/10 overflow-hidden group">
                        {/* Image */}
                        <div className="aspect-[4/5] overflow-hidden">
                            <img
                                src={teamImage}
                                alt="Zespół Strzykawa"
                                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>

                        {/* Info */}
                        <div className="p-6 md:p-8">
                            <h3 className="text-2xl md:text-3xl text-white mb-2">
                                Nasz zespół
                            </h3>
                            <p className="text-accent font-medium mb-4">
                                Kawiarnia & Palarnia
                            </p>
                            <p className="text-white/70 leading-relaxed">
                                Razem tworzymy miejsce, gdzie kawa łączy ludzi.
                                Każdego dnia dbamy o to, byś mógł poczuć się u nas jak w domu
                                i odkrywać świat specialty coffee.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
