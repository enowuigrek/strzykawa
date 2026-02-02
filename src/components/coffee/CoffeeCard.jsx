import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CoffeeCardMedia } from './CoffeeCardMedia';
import { CoffeeCardContent } from './CoffeeCardContent';
import { CoffeeCardActions } from './CoffeeCardActions';

/**
 * CoffeeCard - używa globalnego QuickAddModal z Header
 * QuickAdd otwarty przez global event 'openQuickAdd'
 */
export function CoffeeCard({ coffee }) {
    const [overlayOpen, setOverlayOpen] = useState(false);

    const toggleOverlay = () => setOverlayOpen(!overlayOpen);

    const openQuickAdd = () => {
        // Dispatch global event z coffee data
        window.dispatchEvent(new CustomEvent('openQuickAdd', {
            detail: { coffee }
        }));
    };

    return (
        <>
            <article className="relative bg-primary-dark/80 shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-accent/20 flex flex-col overflow-visible">

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
                        />
                    </div>
                </div>
            </article>
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