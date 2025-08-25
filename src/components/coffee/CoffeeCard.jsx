import React, { useState } from 'react';
import { useCartStore } from '../../store/cartStore.js';
import { CoffeeCardMedia } from './CoffeeCardMedia';
import { CoffeeCardContent } from './CoffeeCardContent';
import { CoffeeCardActions } from './CoffeeCardActions';

export function CoffeeCard ({ coffee }) {
    const [overlayOpen, setOverlayOpen] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [justAdded, setJustAdded] = useState(false);

    // Cart store
    const { addCoffeeToCart, isInCart, getItemQuantity } = useCartStore();

    const toggleOverlay = () => setOverlayOpen(!overlayOpen);

    // Add to cart handler
    const handleAddToCart = async (e) => {
        e.stopPropagation(); // Prevent overlay toggle

        setIsAdding(true);

        // Add to cart
        addCoffeeToCart(coffee.id, 1);

        // Show feedback
        setTimeout(() => {
            setIsAdding(false);
            setJustAdded(true);

            // Reset feedback after 2 seconds
            setTimeout(() => setJustAdded(false), 2000);
        }, 800);
    };

    const currentQuantity = getItemQuantity(coffee.id);
    const inCart = isInCart(coffee.id);

    return (
        <article className="relative bg-gradient-to-br from-primary to-primary-light overflow-hidden border border-white/5 shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-accent/20 hover:border-white/10 flex flex-col">

            {/* Subtle top border glow effect */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>

            <CoffeeCardMedia
                coffee={coffee}
                overlayOpen={overlayOpen}
                onToggleOverlay={toggleOverlay}
                onAddToCart={handleAddToCart}
                isAdding={isAdding}
                justAdded={justAdded}
                inCart={inCart}
                currentQuantity={currentQuantity}
            />

            <div className="flex flex-col flex-1">
                <CoffeeCardContent coffee={coffee} />

                <div className="mt-auto pt-4 px-4 pb-4">
                    <CoffeeCardActions
                        onAddToCart={handleAddToCart}
                        isAdding={isAdding}
                        justAdded={justAdded}
                        inCart={inCart}
                        currentQuantity={currentQuantity}
                    />
                </div>
            </div>
        </article>
    );
}