import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout';
import { SEO } from '../components/SEO.jsx';
import { useCartStore } from '../store/cartStore';
import { useCheckoutStore } from '../store/checkoutStore';
import { useAuthStore } from '../store/authStore';
import { shopify } from '../services/shopify';
import { logger } from '../utils/logger';
import { trackBeginCheckout, trackCheckoutFormError } from '../utils/analytics';
import { FaTag, FaChevronDown, FaCheck, FaTimes, FaStickyNote } from 'react-icons/fa';

import { CAFE_ADDRESS, CAFE_HOURS } from '../constants/contact';

// Import checkout components
import { CustomerDataForm } from '../components/checkout/CustomerDataForm';
import { DeliveryMethodSelector } from '../components/checkout/DeliveryMethodSelector';
import { AddressForm } from '../components/checkout/AddressForm';
import { InPostWidget } from '../components/checkout/InPostWidget';
import { CheckoutOrderSummary } from '../components/checkout/CheckoutOrderSummary';
import { LoginModal } from '../components/modals/LoginModal';

export function CheckoutPage() {
    const navigate = useNavigate();

    // Login modal state
    const [showLoginModal, setShowLoginModal] = useState(false);

    // Dane firmy (z profilu klienta — company zawiera "Nazwa | NIP: 123")
    const [companyValue, setCompanyValue] = useState('');

    // Cart store
    const { items, getTotalItems, getTotalPrice, cart, updateNote, applyDiscountCode, removeDiscountCode, getAppliedDiscountCodes, getDiscountSavings } = useCartStore();

    // ─── Uwagi do zamówienia ─────────────────────────────────────────────────
    const [notesOpen, setNotesOpen] = useState(false);
    const [noteText, setNoteText] = useState('');
    const noteDebounceRef = useRef(null);

    // ─── Kod rabatowy ────────────────────────────────────────────────────────
    const [discountOpen, setDiscountOpen] = useState(false);
    const [discountInput, setDiscountInput] = useState('');
    const [discountStatus, setDiscountStatus] = useState(null); // null | 'applying' | 'valid' | 'invalid'
    const appliedCodes = getAppliedDiscountCodes();
    const discountSavings = getDiscountSavings();

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

    // ===== GA4: begin_checkout =====
    useEffect(() => {
        if (getTotalItems() > 0) {
            trackBeginCheckout(items, getTotalPrice());
        }
        // Uruchamiamy tylko raz przy wejściu na stronę
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ===== AUTO-FILL CUSTOMER DATA & ADDRESS IF LOGGED IN =====
    useEffect(() => {
        if (isAuthenticated && user) {
            // Fill customer data
            setCustomerData({
                email: user.email || '',
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                phone: user.phone || '',
            });

            // Fill delivery address if exists
            if (user.defaultAddress) {
                const addr = user.defaultAddress;
                setDeliveryAddress({
                    street: addr.address1 || '',
                    buildingNumber: addr.address2 || '',
                    apartmentNumber: '',
                    city: addr.city || '',
                    postalCode: addr.zip || '',
                    country: addr.country || 'Polska',
                });
                // Ustaw company (nazwa firmy + NIP) jeśli wypełnione w profilu
                setCompanyValue(addr.company || '');
            }

            logger.log('Auto-filled customer data and address from logged-in user');

            // Close login modal if open
            setShowLoginModal(false);
        }
    }, [isAuthenticated, user, setCustomerData, setDeliveryAddress]);

    // ===== NOTES: debounced save =====
    const handleNoteChange = (e) => {
        const val = e.target.value;
        setNoteText(val);
        clearTimeout(noteDebounceRef.current);
        noteDebounceRef.current = setTimeout(() => {
            updateNote(val);
        }, 800);
    };

    // ===== DISCOUNT CODE =====
    const handleApplyDiscount = async () => {
        if (!discountInput.trim()) return;
        setDiscountStatus('applying');
        const result = await applyDiscountCode(discountInput.trim());
        if (result.success && result.applicable) {
            setDiscountStatus('valid');
            setDiscountInput('');
        } else {
            setDiscountStatus('invalid');
        }
    };

    const handleRemoveDiscount = async () => {
        await removeDiscountCode();
        setDiscountStatus(null);
        setDiscountInput('');
    };

    // ===== HANDLE PAYMENT REDIRECT =====
    const handleGoToPayment = async () => {
        // Walidacja
        if (!validateAll()) {
            logger.warn('Validation failed, cannot proceed to payment');
            // GA4: checkout_form_error — pobieramy aktualne błędy ze store po walidacji
            const currentErrors = useCheckoutStore.getState().errors;
            trackCheckoutFormError(currentErrors, deliveryMethod);
            return;
        }

        logger.log('Proceeding to payment...', {
            deliveryMethod,
            customerData,
            deliveryAddress,
            paczkomatData,
        });

        try {
            // 1. PRZYGOTUJ CART ATTRIBUTES (dla Damiana w panelu admina)
            const attributes = [
                { key: 'customer_email', value: customerData.email },
                { key: 'customer_phone', value: customerData.phone },
                { key: 'customer_first_name', value: customerData.firstName },
                { key: 'customer_last_name', value: customerData.lastName },
                { key: 'delivery_method', value: deliveryMethod },
                { key: 'company', value: companyValue || '' },
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
            } else if (deliveryMethod === 'odbior') {
                attributes.push(
                    { key: 'pickup_address', value: CAFE_ADDRESS }
                );
            }

            // 2. PRZYGOTUJ BUYER IDENTITY (do auto-wypełnienia Shopify checkout)
            const buyerIdentity = {
                email: customerData.email,
                phone: customerData.phone,
            };

            // Dodaj adres dostawy w formacie Shopify MailingAddress
            if (deliveryMethod === 'kurier') {
                // Dla kuriera - normalny adres
                buyerIdentity.deliveryAddressPreferences = [
                    {
                        deliveryAddress: {
                            firstName: customerData.firstName,
                            lastName: customerData.lastName,
                            company: companyValue || '',
                            address1: deliveryAddress.street,
                            address2: `${deliveryAddress.buildingNumber}${deliveryAddress.apartmentNumber ? '/' + deliveryAddress.apartmentNumber : ''}`,
                            city: deliveryAddress.city,
                            zip: deliveryAddress.postalCode,
                            country: 'PL',
                            phone: customerData.phone,
                        },
                    },
                ];
            } else if (deliveryMethod === 'paczkomat' && paczkomatData) {
                // Dla paczkomatu - formatujemy dane paczkomatu jako adres
                const paczkomatAddress = paczkomatData.address_details || {};
                buyerIdentity.deliveryAddressPreferences = [
                    {
                        deliveryAddress: {
                            firstName: customerData.firstName,
                            lastName: customerData.lastName,
                            company: companyValue || '',
                            address1: `InPost Paczkomat ${paczkomatData.name}`,
                            address2: `${paczkomatAddress.street || ''} ${paczkomatAddress.building_number || ''}`.trim(),
                            city: paczkomatAddress.city || '',
                            zip: paczkomatAddress.post_code || '',
                            country: 'PL',
                            phone: customerData.phone,
                        },
                    },
                ];
            }

            // 3. WYŚLIJ DANE DO SHOPIFY
            logger.log('Sending cart attributes...', attributes);
            await shopify.updateCartAttributes(cart.id, attributes);

            logger.log('Updating buyer identity to pre-fill checkout...', buyerIdentity);
            await shopify.updateCartBuyerIdentity(cart.id, buyerIdentity);

            // 4. PRZEKIEROWANIE DO SHOPIFY CHECKOUT
            if (cart?.checkoutUrl) {
                logger.log('Redirecting to Shopify checkout...');
                window.location.href = cart.checkoutUrl;
            } else {
                logger.error('No checkout URL available');
            }
        } catch (error) {
            logger.error('Error updating cart:', error);
            alert('Wystąpił błąd podczas przetwarzania zamówienia. Spróbuj ponownie.');
        }
    };

    // ===== RENDER =====
    return (
        <PageLayout>
            <SEO title="Finalizacja zamówienia" noindex />
            <div className="container mx-auto px-4 py-8 md:py-12">
                <h1 className="text-3xl md:text-4xl  text-white mb-8">Finalizacja zamówienia</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* LEFT COLUMN - FORMS */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* 1. CUSTOMER DATA */}
                        <div className="bg-primary-light p-6">
                            <h2 className="text-xl  text-white mb-4">Dane kontaktowe</h2>
                            <CustomerDataForm
                                customerData={customerData}
                                errors={errors}
                                onChange={setCustomerData}
                                isAuthenticated={isAuthenticated}
                                onOpenLogin={() => setShowLoginModal(true)}
                            />
                        </div>

                        {/* 2. DELIVERY METHOD */}
                        <div className="bg-primary-light p-6">
                            <h2 className="text-xl  text-white mb-4">Metoda dostawy</h2>
                            <DeliveryMethodSelector
                                selectedMethod={deliveryMethod}
                                onChange={setDeliveryMethod}
                                subtotal={items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)}
                            />
                        </div>

                        {/* 3. ADDRESS FORM (KURIER) */}
                        {deliveryMethod === 'kurier' && (
                            <div className="bg-primary-light p-6">
                                <h2 className="text-xl  text-white mb-4">Adres dostawy</h2>
                                <AddressForm
                                    address={deliveryAddress}
                                    errors={errors}
                                    onChange={setDeliveryAddress}
                                />
                            </div>
                        )}

                        {/* 4. INPOST WIDGET (PACZKOMAT) */}
                        {deliveryMethod === 'paczkomat' && (
                            <div className="bg-primary-light p-6">
                                <h2 className="text-xl  text-white mb-4">Wybierz paczkomat</h2>
                                <InPostWidget
                                    selectedPaczkomat={paczkomatData}
                                    onSelect={setPaczkomatData}
                                    error={errors.paczkomat}
                                />
                            </div>
                        )}

                        {/* 5. ODBIÓR OSOBISTY - info o kawiarni */}
                        {deliveryMethod === 'odbior' && (
                            <div className="bg-primary-light p-6">
                                <h2 className="text-xl text-white mb-4">Dane do odbioru</h2>
                                <div className="space-y-2 text-muted text-sm">
                                    <p className="text-white font-medium">Kawiarnia Strzykawa</p>
                                    <p>{CAFE_ADDRESS}</p>
                                    <div className="pt-2 border-t border-white/10 mt-3 space-y-1">
                                        {CAFE_HOURS.map((h, i) => (
                                            <p key={i}>{h.days}: {h.hours}</p>
                                        ))}
                                    </div>
                                    <p className="pt-2 text-accent">
                                        Po złożeniu zamówienia skontaktujemy się z Tobą, gdy kawa będzie gotowa do odbioru.
                                    </p>
                                </div>
                            </div>
                        )}
                        {/* 6. KOD RABATOWY + UWAGI — collapsible */}
                        <div className="bg-primary-light divide-y divide-white/10">

                            {/* Kod rabatowy */}
                            <div>
                                <button
                                    type="button"
                                    onClick={() => setDiscountOpen(v => !v)}
                                    className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/5 transition-colors"
                                >
                                    <span className="flex items-center gap-2 text-white text-sm">
                                        <FaTag className="text-accent" size={14} />
                                        {appliedCodes.length > 0
                                            ? <><span>Kod rabatowy:</span><span className="text-success font-bold ml-1">{appliedCodes[0].code}</span></>
                                            : 'Masz kod rabatowy?'
                                        }
                                    </span>
                                    <FaChevronDown
                                        className={`text-muted transition-transform duration-200 ${discountOpen ? 'rotate-180' : ''}`}
                                        size={12}
                                    />
                                </button>

                                {discountOpen && (
                                    <div className="px-6 pb-5 pt-1 space-y-3">
                                        {/* Zastosowany kod */}
                                        {appliedCodes.length > 0 ? (
                                            <div className="flex items-center justify-between bg-success/10 border border-success/30 px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <FaCheck className="text-success" size={13} />
                                                    <span className="text-white text-sm font-bold">{appliedCodes[0].code}</span>
                                                    {discountSavings > 0 && (
                                                        <span className="text-success text-sm">
                                                            −{discountSavings.toFixed(2)} zł
                                                        </span>
                                                    )}
                                                </div>
                                                <button
                                                    onClick={handleRemoveDiscount}
                                                    className="text-muted hover:text-danger transition-colors"
                                                    title="Usuń kod"
                                                >
                                                    <FaTimes size={14} />
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        value={discountInput}
                                                        onChange={(e) => {
                                                            setDiscountInput(e.target.value.toUpperCase());
                                                            setDiscountStatus(null);
                                                        }}
                                                        onKeyDown={(e) => e.key === 'Enter' && handleApplyDiscount()}
                                                        placeholder="Wpisz kod rabatowy"
                                                        className="flex-1 bg-primary border border-white/20 text-white placeholder-muted px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={handleApplyDiscount}
                                                        disabled={!discountInput.trim() || discountStatus === 'applying'}
                                                        className="px-5 py-2.5 bg-accent text-white text-sm rounded-full hover:bg-accent/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                                                    >
                                                        {discountStatus === 'applying' ? '...' : 'Zastosuj'}
                                                    </button>
                                                </div>
                                                {discountStatus === 'invalid' && (
                                                    <p className="text-danger text-xs flex items-center gap-1">
                                                        <FaTimes size={11} /> Nieprawidłowy lub nieaktywny kod rabatowy
                                                    </p>
                                                )}
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Uwagi do zamówienia */}
                            <div>
                                <button
                                    type="button"
                                    onClick={() => setNotesOpen(v => !v)}
                                    className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/5 transition-colors"
                                >
                                    <span className="flex items-center gap-2 text-white text-sm">
                                        <FaStickyNote className="text-accent" size={14} />
                                        Uwagi do zamówienia
                                        {noteText && <span className="text-muted text-xs">(dodano)</span>}
                                    </span>
                                    <FaChevronDown
                                        className={`text-muted transition-transform duration-200 ${notesOpen ? 'rotate-180' : ''}`}
                                        size={12}
                                    />
                                </button>

                                {notesOpen && (
                                    <div className="px-6 pb-5 pt-1">
                                        <textarea
                                            value={noteText}
                                            onChange={handleNoteChange}
                                            placeholder="Np. proszę o szczególną ostrożność przy pakowaniu, alergeny, inne życzenia..."
                                            rows={3}
                                            className="w-full bg-primary border border-white/20 text-white placeholder-muted px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors resize-none"
                                        />
                                        <p className="text-xs text-muted mt-1">
                                            Uwagi zostaną przekazane bezpośrednio do realizacji zamówienia.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* RIGHT COLUMN - ORDER SUMMARY */}
                    <div className="lg:col-span-1">
                        <div className="bg-primary-light p-6 sticky top-24">
                            <h2 className="text-xl  text-white mb-4">Podsumowanie</h2>
                            <CheckoutOrderSummary
                                items={items}
                                deliveryMethod={deliveryMethod}
                                onGoToPayment={handleGoToPayment}
                                isProcessing={isProcessing}
                                isReady={isCheckoutReady()}
                                discountSavings={discountSavings}
                                appliedDiscountCodes={appliedCodes}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* LOGIN MODAL */}
            <LoginModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
            />
        </PageLayout>
    );
}
