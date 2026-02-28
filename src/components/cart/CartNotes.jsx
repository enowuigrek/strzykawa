import React, { useState, useEffect } from 'react';
import { FaStickyNote, FaCheck, FaChevronUp } from 'react-icons/fa';

const MAX_CHARS = 500;

/**
 * CartNotes - Panel uwag do zamówienia
 *
 * Umieszczony nad ShippingProgress. Trigger na dole, panel
 * rozsuwa się ku górze (flex-col-reverse + max-height animation).
 */
export function CartNotes({ note, onSave, isLoading }) {
    const [isOpen, setIsOpen] = useState(false);
    const [draft, setDraft] = useState(note || '');

    useEffect(() => {
        setDraft(note || '');
    }, [note]);

    const hasNote = note && note.trim().length > 0;

    const handleOpen = () => {
        setDraft(note || '');
        setIsOpen(true);
    };

    const handleCancel = () => {
        setDraft(note || '');
        setIsOpen(false);
    };

    const handleSave = () => {
        onSave(draft.trim());
        setIsOpen(false);
    };

    const charsLeft = MAX_CHARS - draft.length;

    return (
        <div className="flex-shrink-0 flex flex-col-reverse">

            {/* Trigger — pastylka, zawsze na dole */}
            <div className="px-4 sm:px-6 py-2.5 border-t border-white/10">
                <button
                    type="button"
                    onClick={isOpen ? handleCancel : handleOpen}
                    className={`
                        py-1 px-3 text-sm font-medium rounded-full transition-all duration-200
                        ${hasNote || isOpen
                            ? 'bg-accent text-white'
                            : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80'
                        }
                    `}
                >
                    {hasNote && !isOpen ? '✓ Uwagi' : 'Uwagi'}
                </button>
            </div>

            {/* Panel — rozsuwa się ku górze */}
            <div
                className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}
                `}
            >
                <div className="px-4 sm:px-6 pt-3 pb-1">
                    {/* Textarea */}
                    <textarea
                        value={draft}
                        onChange={(e) => {
                            if (e.target.value.length <= MAX_CHARS) {
                                setDraft(e.target.value);
                            }
                        }}
                        placeholder="Twoje uwagi"
                        rows={3}
                        className="
                            w-full px-3 py-2
                            bg-primary-dark/50 text-white text-sm
                            placeholder-muted/50
                            border-0 outline-none resize-none
                            transition-colors duration-200
                        "
                    />

                    {/* Licznik + przyciski */}
                    <div className="flex items-center justify-between mt-2 mb-2">
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={handleSave}
                                disabled={isLoading}
                                className="
                                    rounded-full px-5 py-1.5
                                    bg-accent hover:bg-accent/80
                                    text-white text-sm font-medium
                                    transition-colors duration-200
                                    disabled:opacity-50 disabled:cursor-not-allowed
                                "
                            >
                                {isLoading ? 'Zapisywanie...' : 'Zapisz'}
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                disabled={isLoading}
                                className="
                                    rounded-full px-5 py-1.5
                                    bg-white/10 hover:bg-white/20
                                    text-white text-sm font-medium
                                    transition-colors duration-200
                                    disabled:opacity-50 disabled:cursor-not-allowed
                                "
                            >
                                Anuluj
                            </button>
                        </div>
                        <span className={`text-xs ${charsLeft < 50 ? 'text-danger/80' : 'text-muted/50'}`}>
                            {charsLeft} znaków
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
