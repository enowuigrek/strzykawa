import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaBox,
    FaSignOutAlt,
    FaCheckCircle,
    FaExclamationTriangle,
    FaSave,
} from 'react-icons/fa';
import { useAuthStore } from '../store/authStore.js';
import { PageLayout } from '../components/layout/PageLayout.jsx';
import { Button } from '../components/atoms/Button.jsx';
import { EditAddressForm } from '../components/profile/EditAddressForm.jsx';
import { ChangePasswordForm } from '../components/profile/ChangePasswordForm.jsx';
import { updateCustomerPhone, getCustomer } from '../services/shopify/customer.js';

/**
 * Profile - Strona profilu użytkownika
 */
export function Profile() {
    const navigate = useNavigate();
    const { user, isAuthenticated, logout, updateUser, getAccessToken } = useAuthStore();

    const [isEditingPhone, setIsEditingPhone] = useState(false);
    const [phoneValue, setPhoneValue] = useState('');
    const [phoneLoading, setPhoneLoading] = useState(false);
    const [phoneSuccess, setPhoneSuccess] = useState('');
    const [phoneError, setPhoneError] = useState('');

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

    const handleEditPhone = () => {
        setPhoneValue(user.phone || '');
        setPhoneError('');
        setPhoneSuccess('');
        setIsEditingPhone(true);
    };

    const handleSavePhone = async () => {
        setPhoneLoading(true);
        setPhoneError('');
        setPhoneSuccess('');

        try {
            const accessToken = getAccessToken();
            const result = await updateCustomerPhone(accessToken, phoneValue);

            if (result.success) {
                const customerData = await getCustomer(accessToken);
                if (customerData.success) {
                    updateUser(customerData.customer);
                }
                setPhoneSuccess('Telefon zapisany!');
                setTimeout(() => {
                    setIsEditingPhone(false);
                    setPhoneSuccess('');
                }, 2000);
            } else {
                setPhoneError(result.error || 'Błąd podczas zapisywania telefonu');
            }
        } catch {
            setPhoneError('Błąd podczas zapisywania telefonu');
        } finally {
            setPhoneLoading(false);
        }
    };

    return (
        <PageLayout title="Mój profil">
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
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                            <FaUser className="w-5 h-5 text-accent" />
                            <h2 className="text-xl text-white">Dane osobowe</h2>
                        </div>

                        <div className="space-y-4">
                            {/* Imię i nazwisko */}
                            <div>
                                <label className="block text-sm text-muted mb-1">
                                    Imię i nazwisko
                                </label>
                                <p className="text-white font-medium">
                                    {user.firstName} {user.lastName}
                                </p>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm text-muted mb-1">E-mail</label>
                                <div className="flex items-center gap-2">
                                    <FaEnvelope className="w-4 h-4 text-muted" />
                                    <p className="text-white font-medium">{user.email}</p>
                                </div>
                            </div>

                            {/* Telefon — edytowalny */}
                            <div>
                                <label className="block text-sm text-muted mb-1">Telefon</label>

                                {!isEditingPhone ? (
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-2 flex-1">
                                            <FaPhone className="w-4 h-4 text-muted" />
                                            <p className="text-white font-medium">
                                                {user.phone || (
                                                    <span className="text-muted">Nie podano</span>
                                                )}
                                            </p>
                                        </div>
                                        <button
                                            onClick={handleEditPhone}
                                            className="px-3 py-1 bg-accent text-white text-sm font-medium rounded-full hover:bg-accent/90 transition-all duration-200"
                                        >
                                            Edytuj
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        {phoneSuccess && (
                                            <div className="p-3 bg-success/20 border border-success/30 text-green-300 text-sm flex items-center gap-2">
                                                <FaCheckCircle className="w-4 h-4 flex-shrink-0" />
                                                <span>{phoneSuccess}</span>
                                            </div>
                                        )}
                                        {phoneError && (
                                            <div className="p-3 bg-red-500/20 border border-red-500/30 text-red-300 text-sm flex items-center gap-2">
                                                <FaExclamationTriangle className="w-4 h-4 flex-shrink-0" />
                                                <span>{phoneError}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="tel"
                                                value={phoneValue}
                                                onChange={(e) => setPhoneValue(e.target.value)}
                                                className="flex-1 px-4 py-2 bg-primary/50 text-white placeholder-muted/70 transition-all duration-300"
                                                placeholder="+48 123 456 789"
                                                disabled={phoneLoading}
                                            />
                                            <Button
                                                onClick={handleSavePhone}
                                                disabled={phoneLoading}
                                                loading={phoneLoading}
                                                icon={FaSave}
                                                variant="primary"
                                                size="sm"
                                            >
                                                Zapisz
                                            </Button>
                                            <button
                                                onClick={() => {
                                                    setIsEditingPhone(false);
                                                    setPhoneError('');
                                                    setPhoneSuccess('');
                                                }}
                                                className="px-4 py-2 bg-white/5 text-white text-sm font-medium rounded-full hover:bg-white/10 transition-all duration-200"
                                            >
                                                Anuluj
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Adres dostawy */}
                    <EditAddressForm
                        initialAddress={user.defaultAddress}
                    />

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
