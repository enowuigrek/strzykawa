import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FaUser,
    FaBox,
    FaSignOutAlt,
    FaCheckCircle,
    FaExclamationTriangle,
    FaSave,
    FaEnvelope,
} from 'react-icons/fa';
import { useAuthStore } from '../store/authStore.js';
import { PageLayout } from '../components/layout/PageLayout.jsx';
import { Button } from '../components/atoms/Button.jsx';
import { EditAddressForm } from '../components/profile/EditAddressForm.jsx';
import { ChangePasswordForm } from '../components/profile/ChangePasswordForm.jsx';
import { updateCustomerPersonalData, updateCustomerAddress, getCustomer } from '../services/shopify/customer.js';
import { SEO } from '../components/SEO.jsx';

/**
 * Profile - Strona profilu użytkownika
 */
export function Profile() {
    const navigate = useNavigate();
    const { user, isAuthenticated, logout, updateUser, getAccessToken, updateMarketing } = useAuthStore();

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const [newsletterLoading, setNewsletterLoading] = useState(false);
    const [newsletterMsg, setNewsletterMsg] = useState('');

    React.useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated || !user) {
        return null;
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleNewsletterToggle = async () => {
        if (newsletterLoading) return;
        setNewsletterLoading(true);
        setNewsletterMsg('');

        const newValue = !user.acceptsMarketing;
        const result = await updateMarketing(newValue);

        if (result.success) {
            setNewsletterMsg(newValue ? 'Zapisano do newslettera!' : 'Wypisano z newslettera.');
        } else {
            setNewsletterMsg(result.error || 'Błąd podczas zapisywania');
        }

        setNewsletterLoading(false);
        setTimeout(() => setNewsletterMsg(''), 3000);
    };

    const handleStartEdit = () => {
        setFormData({
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            email: user.email || '',
            phone: user.phone || '',
            nip: user.defaultAddress?.company || '',
        });
        setError('');
        setSuccess('');
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setError('');
        setSuccess('');
    };

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.firstName || !formData.lastName || !formData.email) {
            setError('Imię, nazwisko i e-mail są wymagane');
            return;
        }

        // Walidacja NIP (jeśli podany)
        const cleanNip = (formData.nip || '').replace(/[\s-]/g, '').trim();
        if (cleanNip && !/^\d{10}$/.test(cleanNip)) {
            setError('NIP musi składać się z 10 cyfr');
            return;
        }

        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            const accessToken = getAccessToken();

            const result = await updateCustomerPersonalData(accessToken, formData);
            if (!result.success) {
                setError(result.error || 'Błąd podczas zapisywania danych');
                return;
            }

            // Zapisz NIP do adresu (company field) jeśli się zmienił
            const currentNip = user.defaultAddress?.company || '';
            if (cleanNip !== currentNip) {
                await updateCustomerAddress(accessToken, {
                    ...user.defaultAddress,
                    company: cleanNip,
                });
            }

            // Odśwież dane klienta w store
            const customerData = await getCustomer(accessToken);
            if (customerData.success) {
                updateUser(customerData.customer);
            }

            setSuccess('Dane zapisane pomyślnie!');
            setTimeout(() => {
                setIsEditing(false);
                setSuccess('');
            }, 2000);
        } catch {
            setError('Błąd podczas zapisywania danych');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <PageLayout title="Mój profil">
            <SEO title="Mój profil" noindex />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-2xl mx-auto space-y-6">

                    {/* Historia zamówień */}
                    <div className="bg-primary-light p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <FaBox className="w-5 h-5 text-accent" />
                            <h2 className="text-xl text-white">Historia zamówień</h2>
                        </div>
                        <p className="text-muted mb-6">
                            Zobacz historię swoich zakupów i śledź status zamówień
                        </p>
                        <Button
                            onClick={() => navigate('/zamowienia')}
                            icon={FaBox}
                            variant="primary"
                            size="md"
                        >
                            Moje zamówienia
                        </Button>
                    </div>

                    {/* Dane osobowe */}
                    <div className="bg-primary-light p-6">
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                            <div className="flex items-center gap-3">
                                <FaUser className="w-5 h-5 text-accent" />
                                <h2 className="text-xl text-white">Dane osobowe</h2>
                            </div>
                            {!isEditing && (
                                <button
                                    onClick={handleStartEdit}
                                    className="px-4 py-2 bg-accent text-white text-sm font-medium rounded-full hover:bg-accent/90 transition-all duration-200"
                                >
                                    Edytuj
                                </button>
                            )}
                        </div>

                        {!isEditing ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-muted mb-1">Imię i nazwisko</label>
                                    <p className="text-white font-medium">
                                        {user.firstName} {user.lastName}
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm text-muted mb-1">E-mail</label>
                                    <p className="text-white font-medium">{user.email}</p>
                                </div>
                                <div>
                                    <label className="block text-sm text-muted mb-1">Telefon</label>
                                    <p className="text-white font-medium">
                                        {user.phone || <span className="text-muted">Nie podano</span>}
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm text-muted mb-1">NIP</label>
                                    <p className="text-white font-medium">
                                        {user.defaultAddress?.company || <span className="text-muted">Nie podano</span>}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {success && (
                                    <div className="p-3 bg-success/20 border border-success/30 text-green-300 text-sm flex items-center gap-2">
                                        <FaCheckCircle className="w-4 h-4 flex-shrink-0" />
                                        <span>{success}</span>
                                    </div>
                                )}
                                {error && (
                                    <div className="p-3 bg-danger/20 border border-danger/30 text-danger text-sm flex items-center gap-2">
                                        <FaExclamationTriangle className="w-4 h-4 flex-shrink-0" />
                                        <span>{error}</span>
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-muted mb-2">
                                            Imię
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            disabled={isLoading}
                                            className="w-full px-4 py-3 bg-primary/50 text-white placeholder-muted/70 transition-all duration-300"
                                            placeholder="Jan"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-muted mb-2">
                                            Nazwisko
                                        </label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            disabled={isLoading}
                                            className="w-full px-4 py-3 bg-primary/50 text-white placeholder-muted/70 transition-all duration-300"
                                            placeholder="Kowalski"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-muted mb-2">
                                        E-mail
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        disabled={isLoading}
                                        className="w-full px-4 py-3 bg-primary/50 text-white placeholder-muted/70 transition-all duration-300"
                                        placeholder="jan@przykład.pl"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-muted mb-2">
                                        Telefon
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        disabled={isLoading}
                                        className="w-full px-4 py-3 bg-primary/50 text-white placeholder-muted/70 transition-all duration-300"
                                        placeholder="+48 123 456 789"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="nip" className="block text-sm font-medium text-muted mb-2">
                                        NIP <span className="text-xs text-muted/70">(opcjonalnie)</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="nip"
                                        name="nip"
                                        value={formData.nip}
                                        onChange={handleChange}
                                        disabled={isLoading}
                                        className="w-full px-4 py-3 bg-primary/50 text-white placeholder-muted/70 transition-all duration-300"
                                        placeholder="1234567890"
                                        inputMode="numeric"
                                    />
                                </div>

                                <div className="flex gap-3 pt-2">
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
                                        onClick={handleCancel}
                                        className="px-6 py-3 bg-white/5 text-white font-medium rounded-full hover:bg-white/10 transition-all duration-200"
                                    >
                                        Anuluj
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>

                    {/* Newsletter */}
                    <div className="bg-primary-light p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <FaEnvelope className="w-5 h-5 text-accent" />
                            <h2 className="text-xl text-white">Newsletter</h2>
                        </div>

                        <div className="flex items-center justify-between gap-4">
                            <p className="text-muted text-sm leading-relaxed">
                                {user.acceptsMarketing
                                    ? 'Otrzymujesz od nas newsletter ze specjalnymi ofertami i nowościami.'
                                    : 'Zapisz się, żeby dostawać specjalne oferty i aktualności od Strzykawy.'}
                            </p>

                            {/* Toggle switch */}
                            <button
                                onClick={handleNewsletterToggle}
                                disabled={newsletterLoading}
                                aria-label={user.acceptsMarketing ? 'Wypisz się z newslettera' : 'Zapisz się do newslettera'}
                                className={`flex-shrink-0 relative inline-flex items-center w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none disabled:opacity-60 ${user.acceptsMarketing ? 'bg-success' : 'bg-white/15'}`}
                            >
                                <span
                                    className={`inline-block w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 ${user.acceptsMarketing ? 'translate-x-6' : 'translate-x-0.5'}`}
                                />
                            </button>
                        </div>

                        {newsletterMsg && (
                            <p className={`mt-3 text-sm flex items-center gap-2 ${newsletterMsg.includes('Błąd') ? 'text-danger' : 'text-green-400'}`}>
                                <FaCheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
                                {newsletterMsg}
                            </p>
                        )}
                    </div>

                    {/* Adres dostawy */}
                    <EditAddressForm initialAddress={user.defaultAddress} />

                    {/* Zmiana hasła */}
                    <ChangePasswordForm />

                    {/* Wyloguj */}
                    <Button
                        onClick={handleLogout}
                        icon={FaSignOutAlt}
                        variant="primary"
                        size="md"
                        className="w-full"
                    >
                        Wyloguj się
                    </Button>
                </div>
            </div>
        </PageLayout>
    );
}
