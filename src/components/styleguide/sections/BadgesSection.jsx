import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Section } from '../helpers';
import { COUNTRY_COLORS, ROAST_TYPE_COLORS } from '../../../constants/colors';

export function BadgesSection() {
    return (
        <Section id="badges" title="Badges">
            <div className="space-y-8">
                <div>
                    <h3 className="text-xl text-accent mb-4">Count Badges (zawsze bg-success):</h3>
                    <div className="flex flex-wrap items-center gap-6">
                        <div className="flex items-center gap-2">
                            <span className="text-muted text-sm">Large:</span>
                            <span className="px-3 py-1 bg-success text-white text-sm font-bold rounded-full">3</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-muted text-sm">Small:</span>
                            <span className="px-2 py-0.5 bg-success text-white text-xs font-bold rounded-full">3</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-muted text-sm">Na ikonie:</span>
                            <div className="relative">
                                <FaShoppingCart className="w-6 h-6" />
                                <span className="absolute -top-2 -right-2 bg-success text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">3</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className="text-xl text-accent mb-4">Roast Type Badges (rounded-full):</h3>
                    <div className="flex flex-wrap gap-4">
                        <span className="w-16 h-16 rounded-full flex items-center justify-center text-xs uppercase tracking-wider text-white" style={{ backgroundColor: ROAST_TYPE_COLORS.Espresso }}>Espresso</span>
                        <span className="w-16 h-16 rounded-full flex items-center justify-center text-xs uppercase tracking-wider text-white" style={{ backgroundColor: ROAST_TYPE_COLORS.Filter }}>Przelew</span>
                    </div>
                </div>
                <div>
                    <h3 className="text-xl text-accent mb-4">Country Badges (sharp corners):</h3>
                    <div className="flex flex-wrap gap-4">
                        {Object.entries(COUNTRY_COLORS).map(([country, color]) => (
                            <span
                                key={country}
                                className="px-4 py-2 text-sm font-semibold"
                                style={{
                                    backgroundColor: color,
                                    color: ['Kolumbia'].includes(country) ? '#000' : '#fff'
                                }}
                            >
                                {country}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
}
