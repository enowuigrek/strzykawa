import React from 'react';
import { FaCoffee, FaHeart, FaSearch, FaCheck, FaTimes, FaShoppingCart } from 'react-icons/fa';
import { Section } from '../helpers';
import { Button } from '../../atoms/Button';
import { FEEDBACK_DURATION } from '../../../constants/timings';

export function ButtonsSection({ showSuccess, onSuccessDemo }) {
    return (
        <Section id="buttons" title="Przyciski">
            <div className="space-y-8">
                <div>
                    <h3 className="text-xl text-accent mb-4">Variants:</h3>
                    <div className="flex flex-wrap gap-4">
                        <Button variant="primary" leftIcon={FaCoffee}>Primary</Button>
                        <Button variant="secondary" leftIcon={FaHeart}>Secondary</Button>
                        <Button variant="ghost" leftIcon={FaSearch}>Ghost</Button>
                        <Button variant="success" leftIcon={FaCheck}>Success</Button>
                        <Button variant="danger" leftIcon={FaTimes}>Danger</Button>
                    </div>
                </div>
                <div>
                    <h3 className="text-xl text-accent mb-4">Sizes:</h3>
                    <div className="flex flex-wrap items-center gap-4">
                        <Button size="sm">Small (sm)</Button>
                        <Button size="md">Medium (md)</Button>
                        <Button size="lg">Large (lg)</Button>
                    </div>
                </div>
                <div>
                    <h3 className="text-xl text-accent mb-4">States:</h3>
                    <div className="flex flex-wrap gap-4">
                        <Button>Normal</Button>
                        <Button loading>Loading...</Button>
                        <Button disabled>Disabled</Button>
                    </div>
                </div>
                <div>
                    <h3 className="text-xl text-accent mb-4">Full Width:</h3>
                    <Button variant="primary" fullWidth leftIcon={FaShoppingCart}>
                        Dodaj do koszyka
                    </Button>
                </div>
                <div>
                    <h3 className="text-xl text-accent mb-4">Success Animation:</h3>
                    <Button
                        variant={showSuccess ? 'success' : 'primary'}
                        onClick={onSuccessDemo}
                        leftIcon={showSuccess ? FaCheck : FaShoppingCart}
                    >
                        {showSuccess ? 'Dodano!' : 'Kliknij aby dodac'}
                    </Button>
                    <p className="text-muted text-sm mt-2">Animacja trwa {FEEDBACK_DURATION.SUCCESS}ms</p>
                </div>
            </div>
        </Section>
    );
}
