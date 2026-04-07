import React, { useState } from 'react';
import {
    FaMapMarkerAlt,
    FaCheckCircle,
    FaExclamationTriangle,
    FaSave,
    FaStar,
    FaTrash,
} from 'react-icons/fa';
import { useAuthStore } from '../../store/authStore.js';
import {
    updateCustomerAddress,
    deleteCustomerAddress,
    setDefaultCustomerAddress,
    getCustomer,
} from '../../services/shopify/customer.js';
import { Button } from '../atoms/Button.jsx';

/**
 * EditAddressForm - Zarządzanie adresami klienta
 *
 * - Wyświetla domyślny adres
 * - Lista wszystkich zapisanych adresów (z usuwaniem i ustawianiem domyślnego)
 * - Edycja domyślnego adresu (update, nie create)
 */
export function EditAddressForm({ initialAddress = null }) {
    const { user, getAccessToken, updateUser } = useAuthStore();
    const addresses = user?.addresses || [];
    const defaultAddressId = initialAddress?.id || null;

    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [settingDefaultId, setSettingDefaultId] = useState(null);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        address1: initialAddress?.address1 || '',
        address2: initialAddress?.address2 || '',
        city: initialAddress?.city || '',
        province: initialAddress?.province || '',
        zip: initialAddress?.zip || '',
        country: initialAddress?.country || 'PL',
        phone: initialAddress?.phone || '',
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        setError('');
        setSuccess('');
    };

    const refreshUser = async () => {
        const accessToken = getAccessToken();
        const customerData = await getCustomer(accessToken);
        if (customerData.success) {
            updateUser(customerData.customer);
        }
    };

    // ── Zapisz adres (update istniejącego lub create nowego) ─────────────
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        if (!formData.address1 && !formData.city && !formData.zip) {
            setError('Wypełnij przynajmniej adres');
            setIsLoading(false);
            return;
        }

        try {
            const accessToken = getAccessToken();

            // Przekaż id jeśli edytujemy istniejący adres
            const result = await updateCustomerAddress(accessToken, {
                ...formData,
                id: defaultAddressId,
            });

            if (result.success) {
                await refreshUser();
                setSuccess('Adres zapisany!');
                setTimeout(() => {
                    setIsEditing(false);
                    setSuccess('');
                }, 2000);
            } else {
                setError(result.error || 'Błąd podczas zapisywania');
            }
        } catch {
            setError('Błąd podczas zapisywania');
        } finally {
            setIsLoading(false);
        }
    };

    // ── Usuń adres ───────────────────────────────────────────────────────
    const handleDelete = async (addressId) => {
        if (addressId === defaultAddressId) {
            setError('Nie możesz usunąć domyślnego adresu. Najpierw ustaw inny jako domyślny.');
            return;
        }

        setDeletingId(addressId);
        setError('');
        setSuccess('');

        try {
            const accessToken = getAccessToken();
            const result = await deleteCustomerAddress(accessToken, addressId);

            if (result.success) {
                await refreshUser();
                setSuccess('Adres usunięty');
                setTimeout(() => setSuccess(''), 2000);
            } else {
                setError(result.error || 'Nie udało się usunąć adresu');
            }
        } catch {
            setError('Błąd podczas usuwania adresu');
        } finally {
            setDeletingId(null);
        }
    };

    // ── Ustaw jako domyślny ──────────────────────────────────────────────
    const handleSetDefault = async (addressId) => {
        setSettingDefaultId(addressId);
        setError('');
        setSuccess('');

        try {
            const accessToken = getAccessToken();
            const result = await setDefaultCustomerAddress(accessToken, addressId);

            if (result.success) {
                await refreshUser();
                setSuccess('Adres domyślny zmieniony');
                setTimeout(() => setSuccess(''), 2000);
            } else {
                setError(result.error || 'Nie udało się zmienić domyślnego adresu');
            }
        } catch {
            setError('Błąd podczas zmiany domyślnego adresu');
        } finally {
            setSettingDefaultId(null);
        }
    };

    // ── Format adresu do wyświetlenia ────────────────────────────────────
    const formatAddress = (addr) => {
        const parts = [];
        if (addr.address1) parts.push(addr.address1);
        if (addr.address2) parts.push(addr.address2);
        const cityLine = [addr.zip, addr.city].filter(Boolean).join(' ');
        if (cityLine) parts.push(cityLine);
        return parts;
    };

    // Inne adresy (bez domyślnego)
    const otherAddresses = addresses.filter((a) => a.id !== defaultAddressId);

    // ════════════════════════════════════════════════════════════════════
    // WIDOK: Podgląd
    // ════════════════════════════════════════════════════════════════════
    if (!isEditing) {
        return (
            <div className="bg-primary-light p-6">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <FaMapMarkerAlt className="w-5 h-5 text-accent" />
                        <h2 className="text-xl text-white">Adresy dostawy</h2>
                    </div>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-accent text-white text-sm font-medium rounded-full hover:bg-accent/90 transition-all duration-200"
                    >
                        Edytuj
                    </button>
                </div>

                {/* Komunikaty */}
                {success && (
                    <div className="mb-4 p-3 bg-success/10 border border-success/30 text-success text-sm flex items-center gap-2">
                        <FaCheckCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{success}</span>
                    </div>
                )}
                {error && (
                    <div className="mb-4 p-3 bg-danger/10 border border-danger/30 text-danger text-sm flex items-center gap-2">
                        <FaExclamationTriangle className="w-4 h-4 flex-shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                <div className="space-y-4">
                    {/* Domyślny adres */}
                    {initialAddress && (formData.address1 || formData.city) ? (
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <label className="block text-sm text-muted">Adres domyślny</label>
                                <span className="px-2 py-0.5 bg-success text-white text-xs font-bold rounded-full">
                                    domyślny
                                </span>
                            </div>
                            <div className="text-white space-y-1">
                                {formatAddress(formData).map((line, i) => (
                                    <p key={i}>{line}</p>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p className="text-muted text-sm">
                            Dodaj adres dostawy, aby przyspieszyć przyszłe zakupy
                        </p>
                    )}

                    {/* Lista innych adresów */}
                    {otherAddresses.length > 0 && (
                        <div className="pt-4 border-t border-white/10">
                            <label className="block text-sm text-muted mb-3">
                                Inne zapisane adresy ({otherAddresses.length})
                            </label>
                            <div className="space-y-3">
                                {otherAddresses.map((addr) => (
                                    <div
                                        key={addr.id}
                                        className="flex items-start justify-between gap-3 p-3 bg-primary/40"
                                    >
                                        <div className="text-white/80 text-sm space-y-0.5 min-w-0">
                                            {addr.company && (
                                                <p className="text-muted text-xs">NIP: {addr.company}</p>
                                            )}
                                            {formatAddress(addr).map((line, i) => (
                                                <p key={i}>{line}</p>
                                            ))}
                                        </div>
                                        <div className="flex gap-2 flex-shrink-0">
                                            <button
                                                type="button"
                                                onClick={() => handleSetDefault(addr.id)}
                                                disabled={settingDefaultId === addr.id}
                                                title="Ustaw jako domyślny"
                                                className="p-2 text-muted hover:text-success transition-colors disabled:opacity-50"
                                            >
                                                <FaStar className="w-3.5 h-3.5" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(addr.id)}
                                                disabled={deletingId === addr.id}
                                                title="Usuń adres"
                                                className="p-2 text-muted hover:text-danger transition-colors disabled:opacity-50"
                                            >
                                                <FaTrash className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // ════════════════════════════════════════════════════════════════════
    // WIDOK: Edycja
    // ════════════════════════════════════════════════════════════════════
    return (
        <div className="bg-primary-light p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <FaMapMarkerAlt className="w-5 h-5 text-accent" />
                <h2 className="text-xl text-white">Edytuj adres domyślny</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {success && (
                    <div className="p-3 bg-success/10 border border-success/30 text-success text-sm flex items-center gap-2">
                        <FaCheckCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{success}</span>
                    </div>
                )}
                {error && (
                    <div className="p-3 bg-danger/10 border border-danger/30 text-danger text-sm flex items-center gap-2">
                        <FaExclamationTriangle className="w-4 h-4 flex-shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Ulica */}
                <div>
                    <label htmlFor="address1" className="block text-sm font-medium text-muted mb-2">
                        Ulica i numer
                    </label>
                    <input
                        type="text"
                        id="address1"
                        name="address1"
                        value={formData.address1}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-primary/50 text-white placeholder-muted/70 transition-all duration-300"
                        placeholder="ul. Przykładowa 123"
                    />
                </div>

                {/* Mieszkanie */}
                <div>
                    <label htmlFor="address2" className="block text-sm font-medium text-muted mb-2">
                        Mieszkanie <span className="text-xs text-muted/70">(opcjonalnie)</span>
                    </label>
                    <input
                        type="text"
                        id="address2"
                        name="address2"
                        value={formData.address2}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-primary/50 text-white placeholder-muted/70 transition-all duration-300"
                        placeholder="m. 45"
                    />
                </div>

                {/* Kod pocztowy + Miasto */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="zip" className="block text-sm font-medium text-muted mb-2">
                            Kod pocztowy
                        </label>
                        <input
                            type="text"
                            id="zip"
                            name="zip"
                            value={formData.zip}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-primary/50 text-white placeholder-muted/70 transition-all duration-300"
                            placeholder="00-000"
                        />
                    </div>
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-muted mb-2">
                            Miasto
                        </label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-primary/50 text-white placeholder-muted/70 transition-all duration-300"
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
                            setFormData({
                                address1: initialAddress?.address1 || '',
                                address2: initialAddress?.address2 || '',
                                city: initialAddress?.city || '',
                                province: initialAddress?.province || '',
                                zip: initialAddress?.zip || '',
                                country: initialAddress?.country || 'PL',
                                phone: initialAddress?.phone || '',
                            });
                        }}
                        className="px-6 py-3 bg-white/5 text-white font-medium rounded-full hover:bg-white/10 transition-all duration-200"
                    >
                        Anuluj
                    </button>
                </div>
            </form>
        </div>
    );
}
