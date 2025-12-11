import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaBox, FaSignOutAlt } from 'react-icons/fa';
import { useAuthStore } from '../store/authStore.js';
import { PageLayout } from '../components/layout/PageLayout.jsx';
import { PageHeader } from '../components/layout/PageHeader.jsx';
import { Button } from '../components/atoms/Button.jsx';

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
        <PageLayout>
            <PageHeader
                title="Mój profil"
                subtitle="Twoje dane i historia zakupów"
            />

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

                            {/* Telefon (jeśli istnieje) */}
                            {user.phone && (
                                <div>
                                    <label className="block text-sm text-muted mb-1">
                                        Telefon
                                    </label>
                                    <p className="text-white font-medium">
                                        {user.phone}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Adres domyślny */}
                    {user.defaultAddress && (
                        <div className="bg-primary-light border border-white/10 p-6">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                                <FaMapMarkerAlt className="w-5 h-5 text-accent" />
                                <h2 className="text-xl font-semibold text-white">
                                    Adres dostawy
                                </h2>
                            </div>

                            <div className="space-y-1 text-white">
                                <p>{user.defaultAddress.address1}</p>
                                {user.defaultAddress.address2 && (
                                    <p>{user.defaultAddress.address2}</p>
                                )}
                                <p>
                                    {user.defaultAddress.zip} {user.defaultAddress.city}
                                </p>
                                {user.defaultAddress.province && (
                                    <p>{user.defaultAddress.province}</p>
                                )}
                                <p>{user.defaultAddress.country}</p>
                            </div>
                        </div>
                    )}

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
