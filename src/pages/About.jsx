import React from 'react';
import { FaCoffee, FaMusic, FaUsers, FaHeart } from 'react-icons/fa';
import { PageHeader } from '../components/PageHeader';
import { useScrollToTop } from '../hooks/useScrollToTop';

function About() {
    useScrollToTop();

    return (
        <div className="min-h-screen bg-gradient-to-b from-primary-dark to-primary pt-24 pb-16">
            <div className="container mx-auto px-4">

                {/* Header Section */}
                <PageHeader
                    icon={FaCoffee}
                    title="O Strzykawie"
                    description="Nasza historia, pasja i filozofia. Poznaj ludzi i wartości, które stoją za każdą filiżanką kawy w Strzykawie."
                />

                {/* Story Section */}
                <div className="max-w-4xl mx-auto">

                    {/* Opening Story */}
                    <div className="grid md:grid-cols-2 gap-12 mb-16 items-center">
                        <div className="space-y-6">
                            <p className="text-lg text-white/90 leading-relaxed">
                                Strzykawa zaczęła się skromnie – od małego sklepiku z kawą i dwóch stolików.
                                Można było kupić paczkę ziaren, usiąść na chwilę i porozmawiać przy filiżance.
                            </p>
                            <p className="text-lg text-white/90 leading-relaxed">
                                Z czasem przestrzeń coraz bardziej przypominała kawiarnię: więcej stolików,
                                muzyka z winyli, znajome twarze i rozmowy, które zatrzymywały na dłużej niż jedno espresso.
                            </p>
                        </div>
                        <div className="relative">
                            <div className="aspect-[4/3] bg-gradient-to-br from-primary-light to-primary border-2 border-white/10 rounded-xl overflow-hidden shadow-2xl">
                                <div className="w-full h-full bg-white/5 flex items-center justify-center">
                                    <div className="text-center text-muted">
                                        <FaCoffee className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                        <p className="text-sm">Zdjęcie: Początki Strzykawy<br />Mały sklep z kawą</p>
                                    </div>
                                </div>
                            </div>
                            {/* Decorative elements */}
                            <div className="absolute -top-6 -left-6 w-12 h-12 bg-accent/20 border border-accent/30 rounded-full"></div>
                            <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-muted/20 border border-muted/30 rounded-full"></div>
                        </div>
                    </div>

                    {/* Community Focus */}
                    <div className="text-center mb-16">
                        <div className="bg-gradient-to-r from-primary-light/30 to-primary/30 border border-white/10 rounded-2xl p-8 md:p-12">
                            <p className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-6">
                                Tu nie chodziło tylko o kawę – <span className="text-accent font-bold">to miejsce, w którym ludzie się poznawali,
                rodziły się znajomości i powstawała społeczność</span>. Strzykawa stała się czymś więcej niż kawiarnią –
                                miejscem spotkań i wymiany myśli.
                            </p>
                            <div className="flex justify-center items-center space-x-4">
                                <FaHeart className="w-6 h-6 text-red-400 animate-pulse" />
                                <span className="text-muted font-medium">Serce społeczności</span>
                                <FaHeart className="w-6 h-6 text-red-400 animate-pulse" />
                            </div>
                        </div>
                    </div>

                    {/* Evolution Story */}
                    <div className="grid md:grid-cols-2 gap-12 mb-16 items-center">
                        <div className="md:order-2 space-y-6">
                            <p className="text-lg text-white/90 leading-relaxed">
                                Kiedy pojawił się pierwszy mały piecyk do palenia, kawa z własnych wypałów trafiała
                                najpierw tylko do filiżanek gości. Później na półki, a w końcu – do pełnoprawnej palarni.
                            </p>
                            <p className="text-lg text-white/90 leading-relaxed">
                                Dziś, z dużym piecem i pasją do kawy specialty, Strzykawa to miejsce, w którym spotykają się
                                tradycja, świeżość i atmosfera Częstochowy.
                            </p>
                        </div>
                        <div className="md:order-1 relative">
                            <div className="aspect-[4/3] bg-gradient-to-br from-primary-light to-primary border-2 border-white/10 rounded-xl overflow-hidden shadow-2xl">
                                <div className="w-full h-full bg-white/5 flex items-center justify-center">
                                    <div className="text-center text-muted">
                                        <FaCoffee className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                        <p className="text-sm">Zdjęcie: Palarnia w akcji<br />Duży piec i świeże ziarna</p>
                                    </div>
                                </div>
                            </div>
                            {/* Decorative elements */}
                            <div className="absolute -top-4 -right-6 w-10 h-10 bg-muted/20 border border-muted/30 rounded-full"></div>
                            <div className="absolute -bottom-6 -left-4 w-6 h-6 bg-accent/20 border border-accent/30 rounded-full"></div>
                        </div>
                    </div>

                    {/* Photo Gallery Placeholders */}
                    <div className="mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
                            Strzykawa dziś
                        </h2>

                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                "Wnętrze kawiarni - stoliki i atmosfera",
                                "Barista przy pracy - parzenie kawy",
                                "Goście w kawiarni - społeczność"
                            ].map((placeholder, index) => (
                                <div key={index} className="relative group">
                                    <div className="aspect-square bg-gradient-to-br from-primary-light to-primary border-2 border-white/10 rounded-xl overflow-hidden shadow-xl group-hover:scale-105 transition-all duration-300">
                                        <div className="w-full h-full bg-white/5 flex items-center justify-center">
                                            <div className="text-center text-muted">
                                                <FaCoffee className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                                <p className="text-xs px-4">{placeholder}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="text-center">
                        <div className="bg-gradient-to-r from-primary-light/30 to-primary/30 border border-white/10 rounded-2xl p-8 md:p-12">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                                Zapraszamy do Strzykawy!
                            </h2>
                            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                                Przyjdź na kawę, zostań na rozmowę. Odkryj, dlaczego nasza społeczność
                                rośnie każdego dnia i dlaczego Strzykawa to więcej niż kawiarnia.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="/dostepne-w-kawiarni"
                                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-accent to-muted hover:from-muted hover:to-accent text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/25"
                                >
                                    <FaCoffee className="w-5 h-5 mr-3" />
                                    Co dziś serwujemy
                                </a>
                                <a
                                    href="/kontakt"
                                    className="inline-flex items-center px-8 py-4 bg-white/10 border border-white/20 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                                >
                                    Znajdź nas
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;