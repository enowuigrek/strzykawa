import React from 'react';
import { FaStar } from 'react-icons/fa';
import { HiExternalLink } from 'react-icons/hi';

export function HeroReviews() {
    const reviews = [
        {
            platform: 'TripAdvisor',
            rating: '5.0',
            stars: 5,
            count: 7,
            url: 'https://www.tripadvisor.com/Restaurant_Review-g274761-d21349569-Reviews-Strzykawa_Coffee_Shop-Czestochowa_Silesia_Province_Southern_Poland.html'
        },
        {
            platform: 'Google',
            rating: '4.8',
            stars: 5,
            count: '100+',
            url: 'https://www.google.com/maps/place/Strzykawa+-+coffee+shop/@50.8107678,19.1189851,17z/data=!4m8!3m7!1s0x4710b53c8e8c8c8f:0x8c8c8c8c8c8c8c8c!8m2!3d50.8107678!4d19.1211738!9m1!1b1!16s%2Fg%2F11g9v7v7v7'
        },
        {
            platform: 'Facebook',
            rating: '94%',
            count: 14,
            label: 'poleca',
            url: 'https://www.facebook.com/StrzykawaCoffeeShop/reviews'
        },
        {
            platform: 'Ranking',
            badge: '#1',
            subtitle: 'Palarnia w Częstochowie',
            url: 'https://panoramaczestochowy.pl/firmy/palarnia-kawy-czestochowa'
        }
    ];

    return (
        <div className="pt-16 mb-16 max-w-6xl mx-auto border-t border-white/10">
            {/* Section Header */}
            <div className="text-center mb-16">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    Co mówią o nas
                </h3>
                <p className="text-white/60 text-sm sm:text-base">
                    Opinie naszych gości
                </p>
            </div>

            {/* Reviews Grid - 4 cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4">

                {/* TripAdvisor */}
                <a
                    href={reviews[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white/10 backdrop-blur-sm border border-white/20 p-5 hover:bg-white/15 hover:scale-105 transition-all duration-300"
                >
                    <div className="flex items-center gap-2 mb-2">
                        <div className="flex text-yellow-400 text-lg">
                            {[...Array(reviews[0].stars)].map((_, i) => (
                                <FaStar key={i} />
                            ))}
                        </div>
                        <span className="text-white font-bold text-xl">{reviews[0].rating}</span>
                    </div>
                    <p className="text-white/70 text-sm mb-1">
                        {reviews[0].count} recenzji
                    </p>
                    <div className="flex items-center justify-between mt-3">
                        <p className="text-white/50 text-xs font-medium">
                            {reviews[0].platform}
                        </p>
                        <HiExternalLink className="text-white/30 group-hover:text-white/50 transition-colors text-sm" />
                    </div>
                </a>

                {/* Google Reviews */}
                <a
                    href={reviews[1].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white/10 backdrop-blur-sm border border-white/20 p-5 hover:bg-white/15 hover:scale-105 transition-all duration-300"
                >
                    <div className="flex items-center gap-2 mb-2">
                        <div className="flex text-yellow-400 text-lg">
                            {[...Array(reviews[1].stars)].map((_, i) => (
                                <FaStar key={i} />
                            ))}
                        </div>
                        <span className="text-white font-bold text-xl">{reviews[1].rating}</span>
                    </div>
                    <p className="text-white/70 text-sm mb-1">
                        {reviews[1].count} opinii
                    </p>
                    <div className="flex items-center justify-between mt-3">
                        <p className="text-white/50 text-xs font-medium">
                            {reviews[1].platform}
                        </p>
                        <HiExternalLink className="text-white/30 group-hover:text-white/50 transition-colors text-sm" />
                    </div>
                </a>

                {/* Facebook */}
                <a
                    href={reviews[2].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white/10 backdrop-blur-sm border border-white/20 p-5 hover:bg-white/15 hover:scale-105 transition-all duration-300"
                >
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-white font-bold text-2xl">{reviews[2].rating}</span>
                    </div>
                    <p className="text-white/70 text-sm mb-1">
                        {reviews[2].count} osób {reviews[2].label}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                        <p className="text-white/50 text-xs font-medium">
                            {reviews[2].platform}
                        </p>
                        <HiExternalLink className="text-white/30 group-hover:text-white/50 transition-colors text-sm" />
                    </div>
                </a>

                {/* Ranking */}
                <a
                    href={reviews[3].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white/10 backdrop-blur-sm border border-white/20 p-5 hover:bg-white/15 hover:scale-105 transition-all duration-300"
                >
                    <div className="mb-2">
                        <span className="text-yellow-400 font-bold text-3xl">{reviews[3].badge}</span>
                    </div>
                    <p className="text-white/70 text-sm mb-1">
                        {reviews[3].subtitle}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                        <p className="text-white/50 text-xs font-medium">
                            Ranking 2025
                        </p>
                        <HiExternalLink className="text-white/30 group-hover:text-white/50 transition-colors text-sm" />
                    </div>
                </a>
            </div>

            {/* Review Quote */}
            <div className="mt-10 max-w-3xl mx-auto px-4">
                <blockquote className="text-white/70 text-base sm:text-lg italic text-center leading-relaxed">
                    "The best coffee in Częstochowa. Great quality coffee.
                    The flat white was amazing."
                </blockquote>
                <p className="text-white/50 text-sm text-center mt-3">
                    — TripAdvisor Review
                </p>
            </div>
        </div>
    );
}