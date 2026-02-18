import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { logger } from '../utils/logger';

/**
 * Checkout Store - Zustand store dla procesu zamówienia
 * Obsługuje dane klienta, metodę dostawy, paczkomaty InPost
 */
export const useCheckoutStore = create(
    persist(
        (set, get) => ({
            // Dane klienta
            customerData: {
                email: '',
                phone: '',
                firstName: '',
                lastName: '',
            },

            // Metoda dostawy: 'kurier' | 'paczkomat' | 'odbior'
            deliveryMethod: 'kurier',

            // Adres dostawy (dla kuriera)
            deliveryAddress: {
                street: '',
                buildingNumber: '',
                apartmentNumber: '',
                city: '',
                postalCode: '',
                country: 'Polska',
            },

            // Dane paczkomatu InPost (jeśli wybrano paczkomat)
            paczkomatData: null,
            // Przykład: { name: 'KRA010', address: '...' }

            // Stan przetwarzania
            isProcessing: false,
            errors: {},

            // ===== ACTIONS =====

            // Ustaw dane klienta
            setCustomerData: (data) => {
                set({ customerData: { ...get().customerData, ...data } });
                logger.log('Customer data updated:', data);
            },

            // Ustaw metodę dostawy
            setDeliveryMethod: (method) => {
                set({ deliveryMethod: method });
                logger.log('Delivery method set to:', method);

                // Wyczyść dane paczkomatu jeśli zmieniono na kuriera lub odbiór osobisty
                if (method === 'kurier' || method === 'odbior') {
                    set({ paczkomatData: null });
                }
            },

            // Ustaw adres dostawy (kurier)
            setDeliveryAddress: (address) => {
                set({ deliveryAddress: { ...get().deliveryAddress, ...address } });
                logger.log('Delivery address updated:', address);
            },

            // Ustaw dane paczkomatu
            setPaczkomatData: (data) => {
                set({ paczkomatData: data });
                logger.log('Paczkomat data set:', data);
            },

            // Walidacja danych klienta
            validateCustomerData: () => {
                const { customerData } = get();
                const errors = {};

                if (!customerData.email || !customerData.email.includes('@')) {
                    errors.email = 'Podaj poprawny adres email';
                }

                // Walidacja telefonu - usuń spacje i sprawdź długość
                const phoneDigits = customerData.phone ? customerData.phone.replace(/\s+/g, '') : '';
                if (!phoneDigits || phoneDigits.length < 9) {
                    errors.phone = 'Podaj poprawny numer telefonu (min. 9 cyfr)';
                }

                if (!customerData.firstName || customerData.firstName.trim() === '') {
                    errors.firstName = 'Podaj imię';
                }

                if (!customerData.lastName || customerData.lastName.trim() === '') {
                    errors.lastName = 'Podaj nazwisko';
                }

                set({ errors });
                return Object.keys(errors).length === 0;
            },

            // Walidacja adresu dostawy (kurier)
            validateDeliveryAddress: () => {
                const { deliveryAddress } = get();
                const errors = {};

                if (!deliveryAddress.street || deliveryAddress.street.trim() === '') {
                    errors.street = 'Podaj ulicę';
                }

                if (!deliveryAddress.buildingNumber || deliveryAddress.buildingNumber.trim() === '') {
                    errors.buildingNumber = 'Podaj numer budynku';
                }

                if (!deliveryAddress.city || deliveryAddress.city.trim() === '') {
                    errors.city = 'Podaj miasto';
                }

                if (!deliveryAddress.postalCode || !/^\d{2}-\d{3}$/.test(deliveryAddress.postalCode)) {
                    errors.postalCode = 'Podaj poprawny kod pocztowy (format: 00-000)';
                }

                set({ errors: { ...get().errors, ...errors } });
                return Object.keys(errors).length === 0;
            },

            // Walidacja paczkomatu
            validatePaczkomat: () => {
                const { paczkomatData } = get();
                const errors = {};

                if (!paczkomatData || !paczkomatData.name) {
                    errors.paczkomat = 'Wybierz paczkomat InPost';
                }

                set({ errors: { ...get().errors, ...errors } });
                return Object.keys(errors).length === 0;
            },

            // Walidacja całego formularza
            validateAll: () => {
                const { deliveryMethod } = get();
                const customerValid = get().validateCustomerData();

                if (deliveryMethod === 'kurier') {
                    const addressValid = get().validateDeliveryAddress();
                    return customerValid && addressValid;
                } else if (deliveryMethod === 'paczkomat') {
                    const paczkomatValid = get().validatePaczkomat();
                    return customerValid && paczkomatValid;
                }

                return customerValid;
            },

            // Wyczyść błędy
            clearErrors: () => {
                set({ errors: {} });
            },

            // Wyczyść konkretne pole błędów
            clearFieldError: (field) => {
                const { errors } = get();
                const newErrors = { ...errors };
                delete newErrors[field];
                set({ errors: newErrors });
            },

            // Wyczyść cały checkout
            resetCheckout: () => {
                set({
                    customerData: {
                        email: '',
                        phone: '',
                        firstName: '',
                        lastName: '',
                    },
                    deliveryMethod: 'kurier',
                    deliveryAddress: {
                        street: '',
                        buildingNumber: '',
                        apartmentNumber: '',
                        city: '',
                        postalCode: '',
                        country: 'Polska',
                    },
                    paczkomatData: null,
                    isProcessing: false,
                    errors: {},
                });
                logger.log('Checkout reset');
            },

            // Ustaw stan przetwarzania
            setProcessing: (isProcessing) => {
                set({ isProcessing });
            },

            // ===== GETTERS =====

            // Pobierz pełne dane do wysłania do Shopify
            getCheckoutData: () => {
                const { customerData, deliveryMethod, deliveryAddress, paczkomatData } = get();

                const data = {
                    customer: customerData,
                    deliveryMethod,
                };

                if (deliveryMethod === 'kurier') {
                    data.address = deliveryAddress;
                } else if (deliveryMethod === 'paczkomat') {
                    data.paczkomat = paczkomatData;
                }

                return data;
            },

            // Sprawdź czy dane są wypełnione
            isCheckoutReady: () => {
                const { customerData, deliveryMethod, deliveryAddress, paczkomatData } = get();

                // Sprawdź dane klienta
                const hasCustomerData =
                    customerData.email &&
                    customerData.phone &&
                    customerData.firstName &&
                    customerData.lastName;

                if (!hasCustomerData) return false;

                // Sprawdź metodę dostawy
                if (deliveryMethod === 'kurier') {
                    return !!(
                        deliveryAddress.street &&
                        deliveryAddress.buildingNumber &&
                        deliveryAddress.city &&
                        deliveryAddress.postalCode
                    );
                } else if (deliveryMethod === 'paczkomat') {
                    return !!(paczkomatData && paczkomatData.name);
                } else if (deliveryMethod === 'odbior') {
                    // Odbiór osobisty — wystarczą dane klienta (adres kawiarni jest znany)
                    return true;
                }

                return false;
            },

            // Pobierz sformatowany adres do wyświetlenia
            getFormattedAddress: () => {
                const { deliveryMethod, deliveryAddress, paczkomatData } = get();

                if (deliveryMethod === 'kurier') {
                    const { street, buildingNumber, apartmentNumber, city, postalCode } =
                        deliveryAddress;
                    const apt = apartmentNumber ? `/${apartmentNumber}` : '';
                    return `${street} ${buildingNumber}${apt}, ${postalCode} ${city}`;
                } else if (deliveryMethod === 'paczkomat' && paczkomatData) {
                    return `Paczkomat InPost ${paczkomatData.name}: ${paczkomatData.address_details?.city || ''}`;
                } else if (deliveryMethod === 'odbior') {
                    return 'Odbiór osobisty · ul. Dąbrowskiego 4, 42-200 Częstochowa';
                }

                return '';
            },
        }),
        {
            name: 'strzykawa-checkout',
            partialize: (state) => ({
                customerData: state.customerData,
                deliveryMethod: state.deliveryMethod,
                deliveryAddress: state.deliveryAddress,
                paczkomatData: state.paczkomatData,
            }),
            version: 1,
        }
    )
);
