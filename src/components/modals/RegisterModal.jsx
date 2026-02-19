import React, { useState } from 'react';
import {
    FaUser, FaLock, FaEye, FaEyeSlash, FaEnvelope,
    FaUserPlus, FaExclamationTriangle, FaCheckCircle,
    FaPhone, FaBuilding, FaChevronDown, FaChevronUp
} from 'react-icons/fa';
import { useAuthStore } from '../../store/authStore.js';
import { updateCustomerAddress } from '../../services/shopify/customer.js';
import { Button } from '../atoms/Button.jsx';
import { ModalWrapper } from '../layout/ModalWrapper.jsx';

/**
 * RegisterModal - Modal rejestracji
 * Używa wspólnego ModalWrapper
 */
const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [companyData, setCompanyData] = useState({
        companyName: '',
        nip: '',
        companyAddress: ''
    });
    const [showCompany, setShowCompany] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { register, isLoading } = useAuthStore();

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleCompanyChange = (e) => {
        setCompanyData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
            setError('Wypełnij wszystkie wymagane pola');
            return;
        }

        if (!formData.email.includes('@')) {
            setError('Podaj prawidłowy adres e-mail');
            return;
        }

        if (formData.password.length < 5) {
            setError('Hasło musi mieć minimum 5 znaków');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Hasła nie są identyczne. Sprawdź ponownie.');
            return;
        }

        const result = await register(
            formData.email,
            formData.password,
            formData.firstName,
            formData.lastName,
            formData.phone || null
        );

        if (result.success) {
            // Jeśli podano dane firmowe — zapisz je w profilu klienta
            if (showCompany && companyData.companyName.trim()) {
                try {
                    const accessToken = useAuthStore.getState().accessToken;
                    if (accessToken) {
                        const companyValue = companyData.nip.trim()
                            ? `${companyData.companyName.trim()} | NIP: ${companyData.nip.trim()}`
                            : companyData.companyName.trim();

                        await updateCustomerAddress(accessToken, {
                            address1: companyData.companyAddress.trim() || '',
                            address2: '',
                            city: '',
                            province: '',
                            zip: '',
                            country: 'PL',
                            phone: formData.phone || '',
                            company: companyValue
                        });
                    }
                } catch {
                    // Błąd zapisu firmy nie blokuje rejestracji
                }
            }

            setSuccess('✓ Konto utworzone! Logowanie...');
            setTimeout(() => {
                onClose();
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    password: '',
                    confirmPassword: ''
                });
                setCompanyData({ companyName: '', nip: '', companyAddress: '' });
                setShowCompany(false);
                setSuccess('');
            }, 2000);
        } else {
            const errorMessage = result.error || 'Nieznany błąd';
            if (errorMessage.includes('już zarejestrowany')) {
                setError('Konto z tym adresem e-mail już istnieje. Zaloguj się.');
            } else if (errorMessage.includes('za krótkie')) {
                setError('Hasło jest za krótkie (minimum 5 znaków)');
            } else if (errorMessage.includes('nieprawidłowy')) {
                setError('Nieprawidłowy adres e-mail. Sprawdź format.');
            } else if (errorMessage.includes('limit')) {
                setError('Przekroczono limit tworzenia kont. Spróbuj ponownie za kilka minut.');
            } else {
                setError(errorMessage);
            }
        }
    };

    return (
        <ModalWrapper
            isOpen={isOpen}
            onClose={onClose}
            title="Utwórz konto"
            icon={<FaUser className="w-5 h-5 text-accent" />}
            maxHeight="90vh"
        >
            <form onSubmit={handleSubmit}>
                {/* Success Message */}
                {success && (
                    <div className="mb-4 p-3 bg-success/20 border border-success/30 rounded-lg text-green-300 text-base flex items-center gap-2 animate-fadeIn">
                        <FaCheckCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{success}</span>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-base flex items-center gap-2 animate-fadeIn">
                        <FaExclamationTriangle className="w-4 h-4 flex-shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label htmlFor="firstName" className="block text-base font-medium text-muted mb-2">
                            Imię
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-primary-dark/50 text-white placeholder-muted/70 transition-all duration-300"
                            placeholder="Jan"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-base font-medium text-muted mb-2">
                            Nazwisko
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-primary-dark/50 text-white placeholder-muted/70 transition-all duration-300"
                            placeholder="Kowalski"
                            required
                        />
                    </div>
                </div>

                {/* Email Field */}
                <div className="mb-4">
                    <label htmlFor="registerEmail" className="block text-base font-medium text-muted mb-2">
                        E-mail
                    </label>
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <FaEnvelope className="w-4 h-4 text-muted" />
                        </div>
                        <input
                            type="email"
                            id="registerEmail"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 bg-primary-dark/50 text-white placeholder-muted/70 transition-all duration-300"
                            placeholder="twoj@email.com"
                            required
                        />
                    </div>
                </div>

                {/* Phone Field */}
                <div className="mb-4">
                    <label htmlFor="registerPhone" className="block text-base font-medium text-muted mb-2">
                        Telefon <span className="text-sm text-muted/70">(opcjonalnie)</span>
                    </label>
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <FaPhone className="w-4 h-4 text-muted" />
                        </div>
                        <input
                            type="tel"
                            id="registerPhone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 bg-primary-dark/50 text-white placeholder-muted/70 transition-all duration-300"
                            placeholder="+48 123 456 789"
                        />
                    </div>
                </div>

                {/* Password Field */}
                <div className="mb-4">
                    <label htmlFor="registerPassword" className="block text-base font-medium text-muted mb-2">
                        Hasło
                    </label>
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <FaLock className="w-4 h-4 text-muted" />
                        </div>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="registerPassword"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full pl-10 pr-12 py-3 bg-primary-dark/50 text-white placeholder-muted/70 transition-all duration-300"
                            placeholder="Minimum 5 znaków"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted hover:text-white transition-colors duration-300"
                        >
                            {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                {/* Confirm Password Field */}
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-base font-medium text-muted mb-2">
                        Powtórz hasło
                    </label>
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <FaLock className="w-4 h-4 text-muted" />
                        </div>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full pl-10 pr-12 py-3 bg-primary-dark/50 text-white placeholder-muted/70 transition-all duration-300"
                            placeholder="Powtórz hasło"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted hover:text-white transition-colors duration-300"
                        >
                            {showConfirmPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                {/* Accordion: Dane firmowe */}
                <div className="mb-6 border-t border-white/10">
                    <button
                        type="button"
                        onClick={() => setShowCompany(!showCompany)}
                        className="w-full flex items-center justify-between py-3 text-muted hover:text-white transition-colors duration-200"
                    >
                        <span className="flex items-center gap-2 text-sm font-medium">
                            <FaBuilding className="w-4 h-4 flex-shrink-0" />
                            Dane firmowe <span className="text-muted/60">(opcjonalnie)</span>
                        </span>
                        {showCompany
                            ? <FaChevronUp className="w-3.5 h-3.5 flex-shrink-0" />
                            : <FaChevronDown className="w-3.5 h-3.5 flex-shrink-0" />
                        }
                    </button>

                    {/* Animacja rozwinięcia */}
                    <div
                        className={`
                            overflow-hidden transition-all duration-300 ease-in-out
                            ${showCompany ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}
                        `}
                    >
                        <div className="pb-2 space-y-4">
                            {/* Nazwa firmy */}
                            <div>
                                <label htmlFor="companyName" className="block text-base font-medium text-muted mb-2">
                                    Nazwa firmy
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                        <FaBuilding className="w-4 h-4 text-muted" />
                                    </div>
                                    <input
                                        type="text"
                                        id="companyName"
                                        name="companyName"
                                        value={companyData.companyName}
                                        onChange={handleCompanyChange}
                                        className="w-full pl-10 pr-4 py-3 bg-primary-dark/50 text-white placeholder-muted/70 transition-all duration-300"
                                        placeholder="Twoja Firma sp. z o.o."
                                    />
                                </div>
                            </div>

                            {/* NIP */}
                            <div>
                                <label htmlFor="nip" className="block text-base font-medium text-muted mb-2">
                                    NIP <span className="text-sm text-muted/70">(opcjonalnie)</span>
                                </label>
                                <input
                                    type="text"
                                    id="nip"
                                    name="nip"
                                    value={companyData.nip}
                                    onChange={handleCompanyChange}
                                    maxLength={10}
                                    className="w-full px-4 py-3 bg-primary-dark/50 text-white placeholder-muted/70 transition-all duration-300"
                                    placeholder="1234567890"
                                />
                            </div>

                            {/* Adres firmy */}
                            <div>
                                <label htmlFor="companyAddress" className="block text-base font-medium text-muted mb-2">
                                    Adres firmy <span className="text-sm text-muted/70">(opcjonalnie)</span>
                                </label>
                                <input
                                    type="text"
                                    id="companyAddress"
                                    name="companyAddress"
                                    value={companyData.companyAddress}
                                    onChange={handleCompanyChange}
                                    className="w-full px-4 py-3 bg-primary-dark/50 text-white placeholder-muted/70 transition-all duration-300"
                                    placeholder="ul. Dąbrowskiego 4, 42-200 Częstochowa"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    disabled={isLoading}
                    loading={isLoading}
                    icon={FaUserPlus}
                    variant="primary"
                    size="md"
                    className="w-full mb-4"
                >
                    {isLoading ? 'Tworzenie konta...' : 'Utwórz konto'}
                </Button>

                {/* Switch to Login */}
                <div className="text-center">
                    <p className="text-muted text-base">
                        Masz już konto?{' '}
                        <button
                            type="button"
                            onClick={onSwitchToLogin}
                            className="text-accent hover:text-white transition-colors duration-300 font-medium underline"
                        >
                            Zaloguj się
                        </button>
                    </p>
                </div>
            </form>
        </ModalWrapper>
    );
};

export { RegisterModal };
