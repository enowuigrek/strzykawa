import React, { useState } from 'react';
import { GiCoffeeBeans } from 'react-icons/gi';
import { TbGrain } from 'react-icons/tb';

export const weightOptions = [
    { value: '250g', price: 49 },
    { value: '1kg',  price: 180 },
];

export const formOptions = [
    { value: 'whole',  label: 'Ziarna',  icon: GiCoffeeBeans },
    { value: 'ground', label: 'Mielona', icon: TbGrain },
];

export function WeightSelector({
                                   onWeightChange,
                                   onPriceChange,
                                   onFormChange,
                                   defaultWeight = '250g',
                                   defaultForm = 'whole',
                                   size = 'sm', // 'sm' | 'md'
                                   className = '',
                               }) {
    const [selectedWeight, setSelectedWeight] = useState(defaultWeight);
    const [selectedForm, setSelectedForm] = useState(defaultForm);

    const h = size === 'md' ? 'h-[32px]' : 'h-[26px]';
    const pxForm  = size === 'md' ? 'px-3'   : 'px-2';
    const pxWeight= size === 'md' ? 'px-3.5' : 'px-3';
    const textSm  = size === 'md' ? 'text-xs' : 'text-[11px]';

    const handleWeightChange = (weight) => {
        setSelectedWeight(weight);
        const opt = weightOptions.find(o => o.value === weight);
        if (opt) {
            onWeightChange && onWeightChange(weight);
            onPriceChange && onPriceChange(opt.price);
        }
    };

    const handleFormChange = (form) => {
        setSelectedForm(form);
        onFormChange && onFormChange(form);
    };

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            {/* Forma */}
            <div role="group" aria-label="Forma kawy"
                 className={`inline-flex ${h} bg-white/10 border border-white/20 rounded-full overflow-hidden`}>
                {formOptions.map((option, idx) => {
                    const Icon = option.icon;
                    const active = selectedForm === option.value;
                    return (
                        <React.Fragment key={option.value}>
                            <button
                                type="button"
                                onClick={() => handleFormChange(option.value)}
                                aria-pressed={active}
                                aria-label={option.label}
                                title={option.label}
                                className={`${pxForm} py-1 transition-all duration-200 flex items-center ${
                                    active ? 'bg-accent text-white' : 'text-muted hover:text-white hover:bg-white/10'
                                }`}
                            >
                                <Icon className="w-4 h-4" />
                            </button>
                            {idx < formOptions.length - 1 && <div className="w-px bg-white/20" />}
                        </React.Fragment>
                    );
                })}
            </div>

            {/* Waga */}
            <div role="group" aria-label="Waga"
                 className={`inline-flex ${h} bg-white/10 border border-white/20 rounded-full overflow-hidden`}>
                {weightOptions.map((option, idx) => {
                    const active = selectedWeight === option.value;
                    return (
                        <React.Fragment key={option.value}>
                            <button
                                type="button"
                                onClick={() => handleWeightChange(option.value)}
                                aria-pressed={active}
                                className={`${pxWeight} py-1 ${textSm} font-medium transition-all duration-200 ${
                                    active ? 'bg-accent text-white' : 'text-muted hover:text-white hover:bg-white/10'
                                }`}
                            >
                                {option.value}
                            </button>
                            {idx < weightOptions.length - 1 && <div className="w-px bg-white/20" />}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
}