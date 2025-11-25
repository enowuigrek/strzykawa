import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useCartStore } from '../../store/cartStore.js';
import { CoffeeCardMedia } from './CoffeeCardMedia';
import { CoffeeCardContent } from './CoffeeCardContent';
import { CoffeeCardActions } from './CoffeeCardActions';
import { QuickAddModal } from '../modals/QuickAddModal.jsx';
import { ANIMATION_DURATION, FEEDBACK_DURATION } from '../../constants/timings.js';

/**
 * CoffeeCard - z Quick Add Modal
 * FIXED: overflow-visible na article i wrapper dla badge
 */
export function CoffeeCard({ coffee }) {
    const [overlayOpen, setOverlayOpen] = useState(false);
    const [quickAddOpen, setQuickAddOpen] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [justAdded, setJustAdded] = useState(false);

    const { addItem } = useCartStore();

    const toggleOverlay = () => setOverlayOpen(!overlayOpen);
    const openQuickAdd = () => setQuickAddOpen(true);
    const closeQuickAdd = () => setQuickAddOpen(false);

    const handleAddToCart = async (coffee, variant, quantity) => {
        setIsAdding(true);
        await addItem(coffee, variant.id, quantity);

        setTimeout(() => {
            setIsAdding(false);
            setJustAdded(true);
            setTimeout(() => setJustAdded(false), FEEDBACK_DURATION.SUCCESS);
        }, ANIMATION_DURATION.MEDIUM);
    };

    return (
        <>
            <article className="relative bg-primary-dark/80 border border-white/5 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-accent/40 hover:shadow-accent/20 flex flex-col overflow-visible">
                {/* Subtle top border glow effect */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>

                <div className="overflow-hidden">
                    <CoffeeCardMedia
                        coffee={coffee}
                        overlayOpen={overlayOpen}
                        onToggleOverlay={toggleOverlay}
                    />
                </div>

                <div className="flex flex-col flex-1">
                    <CoffeeCardContent coffee={coffee} />

                    <div className="mt-auto px-4 pb-4 relative overflow-visible">
                        <CoffeeCardActions
                            coffee={coffee}
                            onQuickAdd={openQuickAdd}
                            isAdding={isAdding}
                            justAdded={justAdded}
                        />
                    </div>
                </div>
            </article>

            <QuickAddModal
                coffee={coffee}
                isOpen={quickAddOpen}
                onClose={closeQuickAdd}
                onAddToCart={handleAddToCart}
            />
        </>
    );
}

CoffeeCard.propTypes = {
    coffee: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string,
        shopifyHandle: PropTypes.string,
        roastType: PropTypes.string,
        availableForSale: PropTypes.bool,
        variants: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                title: PropTypes.string,
                price: PropTypes.number,
            })
        ),
    }).isRequired,
};