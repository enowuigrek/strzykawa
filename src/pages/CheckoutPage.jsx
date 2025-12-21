import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout';
import { useCartStore } from '../store/cartStore';
import { useCheckoutStore } from '../store/checkoutStore';
import { useAuthStore } from '../store/authStore';
import { shopify } from '../services/shopify';
import { logger } from '../utils/logger';

// Import checkout components (będą utworzone później)
import { CustomerDataForm } from '../components/checkout/CustomerDataForm';
import { DeliveryMethodSelector } from '../components/checkout/DeliveryMethodSelector';
import { AddressForm } from '../components/checkout/AddressForm';
import { InPostWidget } from '../components/checkout/InPostWidget';
import { CheckoutOrderSummary } from '../components/checkout/CheckoutOrderSummary';

export function CheckoutPage() {
    const navigate = useNavigate();

    // Cart store
    const { items, getTotalItems, cart } = useCartStore();

    // Checkout store
    const {
        customerData,
        deliveryMethod,
        deliveryAddress,
        paczkomatData,
        isProcessing,
        errors,
        setCustomerData,
        setDeliveryMethod,
        setDeliveryAddress,
        setPaczkomatData,
        validateAll,
        isCheckoutReady,
    } = useCheckoutStore();

    // Auth store (do auto-fill danych jeśli zalogowany)
    const { user, isAuthenticated } = useAuthStore();

    // ===== REDIRECT IF CART IS EMPTY =====
    useEffect(() => {
        if (getTotalItems() === 0) {
            logger.warn('Cart is empty, redirecting to /coffees');
            navigate('/coffees');
        }
    }, [getTotalItems, navigate]);

    // ===== AUTO-FILL CUSTOMER DATA IF LOGGED IN =====
    useEffect(() => {
        if (isAuthenticated && user) {
            setCustomerData({
                email: user.email || '',
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                phone: user.phone || '',
            });
            logger.log('Auto-filled customer data from logged-in user');
        }
    }, [isAuthenticated, user, setCustomerData]);

    // ===== HANDLE PAYMENT REDIRECT =====
    const handleGoToPayment = async () => {
        // Walidacja
        if (!validateAll()) {
            logger.warn('Validation failed, cannot proceed to payment');
            return;
        }

        logger.log('Proceeding to payment...', {
            deliveryMethod,
            customerData,
            deliveryAddress,
            paczkomatData,
        });

        try {
            // Przygotuj attributes do wysłania do Shopify
            const attributes = [
                { key: 'customer_email', value: customerData.email },
                { key: 'customer_phone', value: customerData.phone },
                { key: 'customer_first_name', value: customerData.firstName },
                { key: 'customer_last_name', value: customerData.lastName },
                { key: 'delivery_method', value: deliveryMethod },
            ];

            // Dodaj dane w zależności od metody dostawy
            if (deliveryMethod === 'kurier') {
                attributes.push(
                    { key: 'delivery_street', value: deliveryAddress.street },
                    { key: 'delivery_building', value: deliveryAddress.buildingNumber },
                    { key: 'delivery_apartment', value: deliveryAddress.apartmentNumber || '' },
                    { key: 'delivery_city', value: deliveryAddress.city },
                    { key: 'delivery_postal_code', value: deliveryAddress.postalCode },
                    { key: 'delivery_country', value: deliveryAddress.country }
                );
            } else if (deliveryMethod === 'paczkomat' && paczkomatData) {
                attributes.push(
                    { key: 'paczkomat_name', value: paczkomatData.name },
                    { key: 'paczkomat_city', value: paczkomatData.address_details?.city || '' },
                    { key: 'paczkomat_street', value: paczkomatData.address_details?.street || '' },
                    { key: 'paczkomat_building', value: paczkomatData.address_details?.building_number || '' },
                    { key: 'paczkomat_postal_code', value: paczkomatData.address_details?.post_code || '' }
                );
            }

            // Wyślij attributes do Shopify
            logger.log('Sending delivery data to Shopify...', attributes);
            await shopify.updateCartAttributes(cart.id, attributes);

            // Przekierowanie do Shopify checkout
            if (cart?.checkoutUrl) {
                window.location.href = cart.checkoutUrl;
            } else {
                logger.error('No checkout URL available');
            }
        } catch (error) {
            logger.error('Error updating cart attributes:', error);
            alert('Wystąpił błąd podczas przetwarzania zamówienia. Spróbuj ponownie.');
        }
    };

    // ===== RENDER =====
    return (
        <PageLayout>
            <div className="container mx-auto px-4 py-8 md:py-12">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Finalizacja zamówienia</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* LEFT COLUMN - FORMS */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* 1. CUSTOMER DATA */}
                        <div className="bg-primary-light p-6 rounded-lg">
                            <h2 className="text-xl font-semibold text-white mb-4">Dane kontaktowe</h2>
                            <CustomerDataForm
                                customerData={customerData}
                                errors={errors}
                                onChange={setCustomerData}
                                isAuthenticated={isAuthenticated}
                            />
                        </div>

                        {/* 2. DELIVERY METHOD */}
                        <div className="bg-primary-light p-6 rounded-lg">
                            <h2 className="text-xl font-semibold text-white mb-4">Metoda dostawy</h2>
                            <DeliveryMethodSelector
                                selectedMethod={deliveryMethod}
                                onChange={setDeliveryMethod}
                            />
                        </div>

                        {/* 3. ADDRESS FORM (KURIER) */}
                        {deliveryMethod === 'kurier' && (
                            <div className="bg-primary-light p-6 rounded-lg">
                                <h2 className="text-xl font-semibold text-white mb-4">Adres dostawy</h2>
                                <AddressForm
                                    address={deliveryAddress}
                                    errors={errors}
                                    onChange={setDeliveryAddress}
                                />
                            </div>
                        )}

                        {/* 4. INPOST WIDGET (PACZKOMAT) */}
                        {deliveryMethod === 'paczkomat' && (
                            <div className="bg-primary-light p-6 rounded-lg">
                                <h2 className="text-xl font-semibold text-white mb-4">Wybierz paczkomat</h2>
                                <InPostWidget
                                    selectedPaczkomat={paczkomatData}
                                    onSelect={setPaczkomatData}
                                    error={errors.paczkomat}
                                />
                            </div>
                        )}
                    </div>

                    {/* RIGHT COLUMN - ORDER SUMMARY */}
                    <div className="lg:col-span-1">
                        <div className="bg-primary-light p-6 rounded-lg sticky top-24">
                            <h2 className="text-xl font-semibold text-white mb-4">Podsumowanie</h2>
                            <CheckoutOrderSummary
                                items={items}
                                deliveryMethod={deliveryMethod}
                                onGoToPayment={handleGoToPayment}
                                isProcessing={isProcessing}
                                isReady={isCheckoutReady()}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
