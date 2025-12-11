import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaBox, FaSignOutAlt } from 'react-icons/fa';
import { useAuthStore } from '../store/authStore.js';
import { PageLayout } from '../components/layout/PageLayout.jsx';
import { Button } from '../components/atoms/Button.jsx';
import { EditAddressForm } from '../components/profile/EditAddressForm.jsx';
import { ChangePasswordForm } from '../components/profile/ChangePasswordForm.jsx';

/**
 * Profile - Strona profilu użytkownika
 * Dane osobowe, adres, link do zamówień
 */
export function Profile() {
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuthStore();

    // Jeśli niezalogowany, przekieruj do strony głównej
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

    return (
        <PageLayout
            title="Mój profil"
            subtitle="Twoje dane i historia zakupów"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-2xl mx-auto space-y-6">
                    {/* Dane osobowe */}
                    <div className="bg-primary-light border border-white/10 p-6">
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                            <FaUser className="w-5 h-5 text-accent" />
                            <h2 className="text-xl font-semibold text-white">
                                Dane osobowe
                            </h2>
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
                                <label className="block text-sm text-muted mb-1">
                                    E-mail
                                </label>
                                <div className="flex items-center gap-2">
                                    <FaEnvelope className="w-4 h-4 text-muted" />
                                    <p className="text-white font-medium">
                                        {user.email}
                                    </p>
                                </div>
                            </div>

                            {/* Telefon z adresu (jeśli istnieje) */}
                            {user.defaultAddress?.phone && (
                                <div>
                                    <label className="block text-sm text-muted mb-1">
                                        Telefon
                                    </label>
                                    <p className="text-white font-medium">
                                        {user.defaultAddress.phone}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Adres i kontakt - edytowalny formularz */}
                    <EditAddressForm
                        initialAddress={user.defaultAddress}
                        initialPhone={user.defaultAddress?.phone || ''}
                    />

                    {/* Zmiana hasła */}
                    <ChangePasswordForm />

                    {/* Historia zamówień */}
                    <div className="bg-primary-light border border-white/10 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <FaBox className="w-5 h-5 text-accent" />
                            <h2 className="text-xl font-semibold text-white">
                                Historia zamówień
                            </h2>
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

                    {/* Wyloguj */}
                    <div className="bg-primary-light border border-white/10 p-6">
                        <Button
                            onClick={handleLogout}
                            icon={FaSignOutAlt}
                            variant="secondary"
                            size="md"
                            className="w-full"
                        >
                            Wyloguj się
                        </Button>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
