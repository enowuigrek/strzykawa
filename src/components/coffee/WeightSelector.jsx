import React, { useState } from 'react';

const weightOptions = [
    { value: '250g', price: 49 },
    { value: '1kg', price: 180 }
];

export function WeightSelector({ onWeightChange, onPriceChange }) {
    const [selectedWeight, setSelectedWeight] = useState('250g');

    const handleWeightChange = (weight) => {
        setSelectedWeight(weight);
        const option = weightOptions.find(opt => opt.value === weight);
        if (option) {
            onWeightChange?.(weight);
            onPriceChange?.(option.price);
        }
    };

    return (
        <div className="inline-flex bg-white/10 border border-white/20 rounded-full overflow-hidden">
            {weightOptions.map((option, index) => (
                <React.Fragment key={option.value}>
                    <button
                        onClick={() => handleWeightChange(option.value)}
                        className={`px-3 py-1 text-xs font-medium transition-all duration-300 ${
                            selectedWeight === option.value
                                ? 'bg-accent text-white'
                                : 'text-muted hover:text-white hover:bg-white/10'
                        }`}
                    >
                        {option.value}
                    </button>
                    {index < weightOptions.length - 1 && (
                        <div className="w-px bg-white/20"></div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}