import React from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

export function SocialLinks() {
    const socials = [
        {
            name: 'Facebook',
            icon: FaFacebook,
            url: 'https://www.facebook.com/StrzykawaCoffeeShop',
            color: 'hover:bg-blue-600/20 hover:border-blue-500/50'
        },
        {
            name: 'Instagram',
            icon: FaInstagram,
            url: 'https://www.instagram.com/strzykawa_coffee_shop',
            color: 'hover:bg-pink-600/20 hover:border-pink-500/50'
        }
    ];

    return (
        <div className="pt-16 max-w-4xl mx-auto text-center border-t border-white/10">
            {/* Header */}
            <div className="mb-10">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    Śledź nas
                </h3>
                <p className="text-white/60 text-sm sm:text-base">
                    Bądź na bieżąco z nowościami i akcjami
                </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center justify-center gap-4 px-4">
                {socials.map((social) => {
                    const Icon = social.icon;
                    return (
                        <a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 transition-all duration-300 hover:scale-105 ${social.color}`}
                            aria-label={`Odwiedź nasz ${social.name}`}
                        >
                            <Icon className="text-white text-xl" />
                            <span className="text-white font-medium sm:inline">
                                {social.name}
                            </span>
                        </a>
                    );
                })}
            </div>

            {/* Followers Count (optional - możesz zakomentować jeśli nie chcesz) */}
            <div className="mt-6 flex items-center justify-center gap-8 text-white/50 text-sm">
                <div>
                    <span className="font-bold text-white">1,430+</span> na Facebooku
                </div>
                <div>
                    <span className="font-bold text-white">1,559+</span> na Instagramie
                </div>
            </div>
        </div>
    );
}