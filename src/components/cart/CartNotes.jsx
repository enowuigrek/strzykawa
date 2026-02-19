import React, { useState, useEffect } from 'react';
import { FaStickyNote, FaCheck, FaChevronDown } from 'react-icons/fa';

const MAX_CHARS = 500;

/**
 * CartNotes - Panel uwag do zamówienia w koszyku
 *
 * UX: dyskretny przycisk na dole listy produktów. Po kliknięciu
 * pojawia się (animacja max-height) panel z textarea, licznikiem
 * znaków i przyciskami Zapisz / Anuluj.
 *
 * Props:
 *   note       {string}   - aktualna wartość uwag (tylko tekst klienta, bez danych firmy)
 *   onSave     {function} - (text: string) => void — wywoływana po kliknięciu Zapisz
 *   isLoading  {boolean}  - blokuje przyciski podczas zapisu
 */
export function CartNotes({ note, onSave, isLoading }) {
    const [isOpen, setIsOpen] = useState(false);
    const [draft, setDraft] = useState(note || '');

    // Synchronizuj draft gdy zewnętrzna wartość note się zmieni
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
        <div className="px-4 sm:px-6 lg:px-8 pb-3">
            {/* Trigger — dyskretny przycisk */}
            {!isOpen && (
                <button
                    type="button"
                    onClick={handleOpen}
                    className={`
                        flex items-center gap-2 text-sm transition-all duration-200
                        ${hasNote
                            ? 'px-3 py-1 rounded-full bg-success/20 text-success font-medium hover:bg-success/30'
                            : 'text-muted/70 hover:text-white'
                        }
                    `}
                >
                    {hasNote ? (
                        <>
                            <FaCheck className="w-3 h-3 flex-shrink-0" />
                            Uwagi dodane ✓
                        </>
                    ) : (
                        <>
                            <FaStickyNote className="w-3 h-3 flex-shrink-0" />
                            Dodaj uwagi do zamówienia
                            <FaChevronDown className="w-3 h-3 flex-shrink-0" />
                        </>
                    )}
                </button>
            )}

            {/* Panel — animacja max-height */}
            <div
                className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}
                `}
            >
                <div className="pt-1 pb-2">
                    {/* Nagłówek panelu */}
                    <div className="flex items-center gap-2 mb-2">
                        <FaStickyNote className="w-3.5 h-3.5 text-muted flex-shrink-0" />
                        <span className="text-sm font-medium text-muted">Uwagi do zamówienia</span>
                    </div>

                    {/* Textarea */}
                    <textarea
                        value={draft}
                        onChange={(e) => {
                            if (e.target.value.length <= MAX_CHARS) {
                                setDraft(e.target.value);
                            }
                        }}
                        placeholder="Np. zadzwoń przed dostawą, zostaw przy drzwiach..."
                        rows={3}
                        className="
                            w-full px-3 py-2
                            bg-primary-dark/50 text-white text-sm
                            placeholder-muted/50
                            border border-white/10 focus:border-accent/50
                            outline-none resize-none
                            transition-colors duration-200
                        "
                    />

                    {/* Licznik znaków */}
                    <div className="flex justify-end mb-3">
                        <span className={`text-xs ${charsLeft < 50 ? 'text-danger/80' : 'text-muted/50'}`}>
                            {charsLeft} znaków pozostało
                        </span>
                    </div>

                    {/* Przyciski */}
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={isLoading}
                            className="
                                rounded-full px-5 py-1.5
                                bg-success hover:bg-success-dark
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
                </div>
            </div>
        </div>
    );
}
