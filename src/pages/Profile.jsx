import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FaUser,
    FaBox,
    FaSignOutAlt,
    FaCheckCircle,
    FaExclamationTriangle,
    FaSave,
    FaBuilding,
} from 'react-icons/fa';
import { useAuthStore } from '../store/authStore.js';
import { PageLayout } from '../components/layout/PageLayout.jsx';
import { Button } from '../components/atoms/Button.jsx';
import { EditAddressForm } from '../components/profile/EditAddressForm.jsx';
import { ChangePasswordForm } from '../components/profile/ChangePasswordForm.jsx';
import { updateCustomerPersonalData, updateCustomerAddress, getCustomer } from '../services/shopify/customer.js';

// ===== HELPER: parsuj pole company z formatu "Nazwa | NIP: 1234567890" =====
function parseCompany(companyRaw) {
    if (!companyRaw) return { companyName: '', nip: '' };
    if (companyRaw.includes('| NIP:')) {
        const [name, nipPart] = companyRaw.split('| NIP:');
        return { companyName: name.trim(), nip: nipPart.trim() };
    }
    return { companyName: companyRaw.trim(), nip: '' };
}

/**
 * Profile - Strona profilu użytkownika
 */
export function Profile() {
    const navigate = useNavigate();
    const { user, isAuthenticated, logout, updateUser, getAccessToken } = useAuthStore();

    const [isEditing, setIsEditing] = useState(false);
    const [customerType, setCustomerType] = useState('prywatna'); // 'prywatna' | 'firma'
    const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

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

    const handleStartEdit = () => {
        const { companyName, nip } = parseCompany(user.defaultAddress?.company);
        setCustomerType(companyName ? 'firma' : 'prywatna');
        setFormData({
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            email: user.email || '',
            phone: user.phone || '',
            companyName,
            nip,
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
        if (customerType === 'firma' && !formData.companyName) {
            setError('Podaj nazwę firmy');
            return;
        }
        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            const accessToken = getAccessToken();

            // 1. Zaktualizuj dane osobowe (firstName, lastName, email, phone)
            const result = await updateCustomerPersonalData(accessToken, formData);
            if (!result.success) {
                setError(result.error || 'Błąd podczas zapisywania danych');
                return;
            }

            // 2. Jeśli firma — zapisz company do adresu domyślnego
            if (customerType === 'firma') {
                if (!user.defaultAddress) {
                    setError('Aby zapisać dane firmy, uzupełnij najpierw adres dostawy');
                    return;
                }
                const companyValue = formData.nip
                    ? `${formData.companyName} | NIP: ${formData.nip}`
                    : formData.companyName;

                await updateCustomerAddress(accessToken, {
                    ...user.defaultAddress,
                    company: companyValue,
                });
            } else if (customerType === 'prywatna' && user.defaultAddress?.company) {
                // Jeśli przełączono z firmy na osobę prywatną — wyczyść company
                await updateCustomerAddress(accessToken, {
                    ...user.defaultAddress,
                    company: '',
                });
            }

            // 3. Odśwież dane klienta w store
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

    // Odczytaj dane firmy z aktualnego profilu (dla trybu widoku)
    const { companyName: viewCompanyName, nip: viewNip } = parseCompany(user.defaultAddress?.company);

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
                                {/* Dane firmy — widoczne tylko gdy wypełnione */}
                                {viewCompanyName && (
                                    <>
                                        <div className="pt-3 border-t border-white/10">
                                            <div className="flex items-center gap-2 mb-3">
                                                <FaBuilding className="w-4 h-4 text-accent" />
                                                <span className="text-sm text-muted">Dane firmowe</span>
                                            </div>
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="block text-sm text-muted mb-1">Nazwa firmy</label>
                                                    <p className="text-white font-medium">{viewCompanyName}</p>
                                                </div>
                                                {viewNip && (
                                                    <div>
                                                        <label className="block text-sm text-muted mb-1">NIP</label>
                                                        <p className="text-white font-medium">{viewNip}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Zakładki: Osoba prywatna / Firma */}
                                <div className="flex gap-0 mb-2 border-b border-white/10">
                                    <button
                                        type="button"
                                        onClick={() => setCustomerType('prywatna')}
                                        className={`
                                            flex-1 py-2 text-sm font-medium
                                            transition-all duration-200 border-b-2 -mb-px
                                            ${customerType === 'prywatna'
                                                ? 'border-success text-success'
                                                : 'border-transparent text-muted hover:text-white'
                                            }
                                        `}
                                    >
                                        Osoba prywatna
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setCustomerType('firma')}
                                        className={`
                                            flex-1 py-2 text-sm font-medium
                                            transition-all duration-200 border-b-2 -mb-px
                                            ${customerType === 'firma'
                                                ? 'border-success text-success'
                                                : 'border-transparent text-muted hover:text-white'
                                            }
                                        `}
                                    >
                                        Firma
                                    </button>
                                </div>

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

                                {/* Pola podstawowe — zawsze widoczne */}
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

                                {/* Pola firmowe — widoczne tylko w trybie "Firma" */}
                                {customerType === 'firma' && (
                                    <div className="space-y-4 pt-2 border-t border-white/10">
                                        <div className="flex items-center gap-2 pt-1">
                                            <FaBuilding className="w-4 h-4 text-accent" />
                                            <span className="text-sm text-muted">Dane firmowe (do faktury)</span>
                                        </div>
                                        <div>
                                            <label htmlFor="companyName" className="block text-sm font-medium text-muted mb-2">
                                                Nazwa firmy <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="companyName"
                                                name="companyName"
                                                value={formData.companyName}
                                                onChange={handleChange}
                                                disabled={isLoading}
                                                className="w-full px-4 py-3 bg-primary/50 text-white placeholder-muted/70 transition-all duration-300"
                                                placeholder="Strzykawa Sp. z o.o."
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="nip" className="block text-sm font-medium text-muted mb-2">
                                                NIP
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
                                                maxLength={10}
                                            />
                                        </div>
                                        {!user.defaultAddress && (
                                            <p className="text-sm text-accent/80 flex items-start gap-2">
                                                <FaExclamationTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                                Aby zapisać dane firmy, uzupełnij najpierw adres dostawy poniżej
                                            </p>
                                        )}
                                    </div>
                                )}

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
