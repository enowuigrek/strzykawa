import React, { useState } from 'react';
import { FaPhone, FaMapMarkerAlt, FaCheckCircle, FaExclamationTriangle, FaSave } from 'react-icons/fa';
import { useAuthStore } from '../../store/authStore.js';
import { updateCustomerAddress, getCustomer } from '../../services/shopify/customer.js';
import { Button } from '../atoms/Button.jsx';

/**
 * EditAddressForm - Formularz edycji adresu i telefonu
 */
export function EditAddressForm({ initialAddress = null, initialPhone = '' }) {
    const { getAccessToken, user, updateUser } = useAuthStore();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        phone: initialPhone || '',
        address1: initialAddress?.address1 || '',
        address2: initialAddress?.address2 || '',
        city: initialAddress?.city || '',
        province: initialAddress?.province || '',
        zip: initialAddress?.zip || '',
        country: initialAddress?.country || 'PL'
    });

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        // Walidacja
        if (!formData.phone && !formData.address1 && !formData.city && !formData.zip) {
            setError('Wypełnij przynajmniej telefon lub adres');
            setIsLoading(false);
            return;
        }

        try {
            const accessToken = getAccessToken();

            // Zapisz adres w Shopify
            const result = await updateCustomerAddress(accessToken, formData);

            if (result.success) {
                // Odśwież dane użytkownika
                const customerData = await getCustomer(accessToken);

                if (customerData.success) {
                    // Zaktualizuj dane w authStore
                    updateUser(customerData.customer);
                    setSuccess('Dane zapisane pomyślnie!');
                    setTimeout(() => {
                        setIsEditing(false);
                        setSuccess('');
                    }, 2000);
                } else {
                    setSuccess('Dane zapisane! Odśwież stronę aby zobaczyć zmiany.');
                }
            } else {
                setError(result.error || 'Błąd podczas zapisywania danych');
            }
        } catch (err) {
            setError('Błąd podczas zapisywania danych');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isEditing) {
        return (
            <div className="bg-primary-light  p-6">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <FaMapMarkerAlt className="w-5 h-5 text-accent" />
                        <h2 className="text-xl font-semibold text-white">
                            Adres i kontakt
                        </h2>
                    </div>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-accent text-white text-sm font-medium rounded-full hover:bg-accent/90 transition-all duration-200"
                    >
                        Edytuj
                    </button>
                </div>

                <div className="space-y-4">
                    {/* Telefon */}
                    <div>
                        <label className="block text-sm text-muted mb-1">
                            Telefon
                        </label>
                        <div className="flex items-center gap-2">
                            <FaPhone className="w-4 h-4 text-muted" />
                            <p className="text-white font-medium">
                                {formData.phone || <span className="text-muted">Nie podano</span>}
                            </p>
                        </div>
                    </div>

                    {/* Adres */}
                    {(formData.address1 || formData.city) && (
                        <div>
                            <label className="block text-sm text-muted mb-1">
                                Adres dostawy
                            </label>
                            <div className="text-white space-y-1">
                                {(formData.address1 || formData.address2) && (
                                    <p>
                                        {formData.address1}
                                        {formData.address1 && formData.address2 && ' '}
                                        {formData.address2}
                                    </p>
                                )}
                                {(formData.zip || formData.city) && (
                                    <p>
                                        {formData.zip && `${formData.zip} `}
                                        {formData.city}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {!formData.address1 && !formData.city && (
                        <p className="text-muted text-sm">
                            Dodaj adres dostawy, aby przyspieszyć przyszłe zakupy
                        </p>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-primary-light  p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <FaMapMarkerAlt className="w-5 h-5 text-accent" />
                <h2 className="text-xl font-semibold text-white">
                    Edytuj adres i kontakt
                </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Success Message */}
                {success && (
                    <div className="p-3 bg-success/20 border border-success/30 text-green-300 text-sm flex items-center gap-2">
                        <FaCheckCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{success}</span>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="p-3 bg-red-500/20 border border-red-500/30 text-red-300 text-sm flex items-center gap-2">
                        <FaExclamationTriangle className="w-4 h-4 flex-shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Telefon */}
                <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-muted mb-2">
                        Telefon
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-primary/50 border border-white/20 text-white placeholder-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                        placeholder="+48 123 456 789"
                    />
                </div>

                {/* Ulica */}
                <div>
                    <label htmlFor="address1" className="block text-sm font-semibold text-muted mb-2">
                        Ulica i numer
                    </label>
                    <input
                        type="text"
                        id="address1"
                        name="address1"
                        value={formData.address1}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-primary/50 border border-white/20 text-white placeholder-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                        placeholder="ul. Przykładowa 123"
                    />
                </div>

                {/* Mieszkanie (opcjonalne) */}
                <div>
                    <label htmlFor="address2" className="block text-sm font-semibold text-muted mb-2">
                        Mieszkanie <span className="text-xs text-muted/70">(opcjonalnie)</span>
                    </label>
                    <input
                        type="text"
                        id="address2"
                        name="address2"
                        value={formData.address2}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-primary/50 border border-white/20 text-white placeholder-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                        placeholder="m. 45"
                    />
                </div>

                {/* Miasto i Kod pocztowy */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="zip" className="block text-sm font-semibold text-muted mb-2">
                            Kod pocztowy
                        </label>
                        <input
                            type="text"
                            id="zip"
                            name="zip"
                            value={formData.zip}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-primary/50 border border-white/20 text-white placeholder-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                            placeholder="00-000"
                        />
                    </div>
                    <div>
                        <label htmlFor="city" className="block text-sm font-semibold text-muted mb-2">
                            Miasto
                        </label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-primary/50 border border-white/20 text-white placeholder-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                            placeholder="Warszawa"
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                    <Button
                        type="submit"
                        disabled={isLoading}
                        loading={isLoading}
                        icon={FaSave}
                        variant="primary"
                        size="md"
                        className="flex-1"
                    >
                        {isLoading ? 'Zapisywanie...' : 'Zapisz'}
                    </Button>
                    <button
                        type="button"
                        onClick={() => {
                            setIsEditing(false);
                            setError('');
                            setSuccess('');
                            // Reset form to initial values
                            setFormData({
                                phone: initialPhone || '',
                                address1: initialAddress?.address1 || '',
                                address2: initialAddress?.address2 || '',
                                city: initialAddress?.city || '',
                                province: initialAddress?.province || '',
                                zip: initialAddress?.zip || '',
                                country: initialAddress?.country || 'PL'
                            });
                        }}
                        className="px-6 py-3 bg-primary border border-white/20 text-white font-medium rounded-full hover:bg-white/10 transition-all duration-200"
                    >
                        Anuluj
                    </button>
                </div>
            </form>
        </div>
    );
}
