import React from 'react';
import { FaCoffee, FaUsers, FaHeart, FaFire, FaStore, FaMusic, FaSeedling } from 'react-icons/fa';
import heroImage from '../assets/hero.jpg';

/**
 * About page - historia i filozofia Strzykawy
 */
function About() {
    const milestones = [
        {
            icon: FaStore,
            title: "Skromne początki",
            description: "Mały sklepik z kawą i dwa stoliki – miejsce na szybką rozmowę przy filiżance.",
            iconColor: "text-white/70"
        },
        {
            icon: FaMusic,
            title: "Muzyka z winyli",
            description: "Przestrzeń ewoluowała – więcej stolików, znajome twarze i rozmowy przy dźwiękach winyli.",
            iconColor: "text-white/70"
        },
        {
            icon: FaUsers,
            title: "Społeczność",
            description: "Rodzą się znajomości, powstają więzi – Strzykawa staje się miejscem spotkań i wymiany myśli.",
            iconColor: "text-green-400"
        },
        {
            icon: FaFire,
            title: "Pierwsza palarnia",
            description: "Mały piecyk do palenia – nasze pierwsze kawy trafiają z własnych wypałów do filiżanek gości.",
            iconColor: "text-white/70"
        }
    ];

    const philosophy = [
        { icon: FaCoffee, text: "Dobra kawa", color: "text-accent" },
        { icon: FaMusic, text: "Dobra muzyka", color: "text-white/70" },
        { icon: FaUsers, text: "Dobre rozmowy", color: "text-green-400" },
        { icon: FaHeart, text: "Dobra społeczność", color: "text-white/70" },
    ];

    return (
        <div className="min-h-screen bg-primary pt-20">

            {/* Hero Section */}
            <div className="relative h-96 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
                    style={{ backgroundImage: `url(${heroImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 to-primary/70"></div>

                <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-3 mb-6">
                            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-muted to-white bg-clip-text text-transparent">
                                O Strzykawie
                            </h1>
                        </div>
                        <p className="text-xl text-white/90 leading-relaxed">
                            Historia małego sklepiku, który stał się sercem społeczności kawowej w Częstochowie
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">

                {/* Main Story */}
                <div className="max-w-4xl mx-auto mb-20">
                    <div className="bg-gradient-to-br from-primary-light/60 to-primary/80 backdrop-blur-sm border border-white/10 p-8 mb-12">
                        <div className="prose prose-lg text-white/90 leading-relaxed space-y-6">
                            <p className="text-xl">
                                Strzykawa zaczęła się skromnie – od małego sklepiku z kawą i dwóch stolików. Można było kupić paczkę ziaren, usiąść na chwilę i porozmawiać przy filiżance. Z czasem przestrzeń coraz bardziej przypominała kawiarnię: więcej stolików, muzyka z winyli, znajome twarze i rozmowy, które zatrzymywały na dłużej niż jedno espresso.
                            </p>

                            <p className="text-lg border-l-4 border-green-400 pl-6 bg-green-500/10 py-4">
                                Tu nie chodziło tylko o kawę – <strong className="text-white">to miejsce, w którym ludzie się poznawali, rodziły się znajomości i powstawała społeczność</strong>. Strzykawa stała się czymś więcej niż kawiarnią – miejscem spotkań i wymiany myśli.
                            </p>

                            <p className="text-lg">
                                Kiedy pojawił się pierwszy mały piecyk do palenia, kawa z własnych wypałów trafiała najpierw tylko do filiżanek gości. Później na półki, a w końcu – do pełnoprawnej palarni. Dziś, z dużym piecem i pasją do kawy specialty, Strzykawa to miejsce, w którym spotykają się tradycja, świeżość i atmosfera Częstochowy.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Timeline */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">Nasza droga</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {milestones.map((milestone, index) => {
                            const Icon = milestone.icon;
                            return (
                                <div key={index} className="text-center hover:scale-105 transition-transform duration-300">
                                    <div className="relative mb-6">
                                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-light/50 to-primary/50 border border-white/10 hover:border-white/20 transition-colors duration-300">
                                            <Icon className={`w-10 h-10 ${milestone.iconColor}`} />
                                        </div>
                                        {index < milestones.length - 1 && (
                                            <div className="hidden lg:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-white/20 to-transparent"></div>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-3">{milestone.title}</h3>
                                    <p className="text-muted/90 leading-relaxed">{milestone.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Philosophy */}
                <div className="mb-20">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-white mb-8">Nasza filozofia</h2>
                        <p className="text-xl text-muted/90 mb-12 leading-relaxed">
                            W Strzykawie wierzymy w prostotę. Nasze podejście można ująć w cztery słowa:
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                            {philosophy.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <div key={index} className="text-center hover:scale-110 transition-transform duration-300">
                                        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 border border-white/10 mb-4 hover:bg-white/20 transition-colors duration-300">
                                            <Icon className={`w-8 h-8 ${item.color}`} />
                                        </div>
                                        <p className="font-semibold text-white">{item.text}</p>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="bg-gradient-to-r from-primary-light/30 to-primary/30 border border-white/10 p-8">
                            <p className="text-2xl font-bold text-center bg-gradient-to-r from-white via-muted to-white bg-clip-text text-transparent">
                                "Dobra kawa, dobra muzyka, dobre rozmowy i dobra społeczność"
                            </p>
                        </div>
                    </div>
                </div>

                {/* Current State */}
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Dziś */}
                        <div className="bg-gradient-to-br from-primary-light/50 to-primary/50 border border-white/10 p-8 hover:shadow-lg hover:shadow-white/5 transition-all duration-300">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-accent/20 border border-accent/30">
                                    <FaSeedling className="w-6 h-6 text-accent" />
                                </div>
                                <h3 className="text-2xl font-bold text-white">Dziś</h3>
                            </div>
                            <p className="text-muted/90 leading-relaxed">
                                Strzykawa to pełnoprawna palarnia kawy specialty z wielkim piecem,
                                miejscem spotkań dla kawowej społeczności Częstochowy i pasją do
                                dzielenia się najlepszymi ziarnami z całego świata.
                            </p>
                        </div>

                        {/* Przyszłość */}
                        <div className="bg-gradient-to-br from-primary-light/50 to-primary/50 border border-white/10 p-8 hover:shadow-lg hover:shadow-white/5 transition-all duration-300">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-green-500/20 border border-green-500/30">
                                    <FaHeart className="w-6 h-6 text-green-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-white">Przyszłość</h3>
                            </div>
                            <p className="text-muted/90 leading-relaxed">
                                Chcemy pozostać tym, czym zawsze byliśmy – miejscem, gdzie ludzie
                                spotykają się przy dobrej kawie, prowadzą inspirujące rozmowy
                                i tworzą wspólnotę wokół pasji do kawy specialty.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default About;