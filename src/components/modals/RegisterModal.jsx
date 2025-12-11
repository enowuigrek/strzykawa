import React, { useState, useEffect } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaEnvelope, FaUserPlus, FaExclamationTriangle, FaCheckCircle, FaPhone } from 'react-icons/fa';
import { useAuthStore } from '../../store/authStore.js';
import { Button } from '../atoms/Button.jsx';
import { ModalHeader } from '../layout/ModalHeader.jsx';

/**
 * RegisterModal - Modal rejestracji
 * Mobile: fullscreen z animacją z dołu
 * Desktop: wycentrowany modal
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
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);

    const { register, isLoading } = useAuthStore();

    useEffect(() => {
        if (isOpen) {
            // Trigger animation after mount
            setTimeout(() => setIsAnimating(true), 10);
        } else {
            setIsAnimating(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Walidacja po stronie klienta
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
            setError('Wypełnij wszystkie pola');
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

        // Rejestracja
        const result = await register(
            formData.email,
            formData.password,
            formData.firstName,
            formData.lastName,
            formData.phone || null
        );

        if (result.success) {
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
                setSuccess('');
            }, 2000);
        } else {
            // Lepszy opis błędu
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
        <>
            {/* Backdrop - z animacją fade-in i blur + przyciemnienie */}
            <div
                className={`
                    fixed inset-0 bg-black/70 z-[190]
                    backdrop-blur-md
                    transition-all duration-300 ease-out
                    ${isAnimating ? 'opacity-100' : 'opacity-0'}
                `}
                onClick={onClose}
            />

            {/* Modal - Wysokość dopasowana do zawartości */}
            <div
                className={`
                    fixed w-full md:max-w-md
                    bg-primary-dark border-white/20 md:border
                    z-[200] shadow-2xl flex flex-col
                    transition-all duration-300 ease-out
                    max-h-[85vh] overflow-y-auto

                    left-0 md:left-1/2 md:top-1/2 md:-translate-x-1/2

                    ${isAnimating
                        ? 'bottom-0 translate-y-0 md:-translate-y-1/2 opacity-100'
                        : 'bottom-0 translate-y-full md:translate-y-0 md:-translate-y-1/2 opacity-0'
                    }
                `}
            >
                {/* Header */}
                <ModalHeader
                    title="Utwórz konto"
                    icon={<FaUser className="w-5 h-5 text-accent" />}
                    onClose={onClose}
                    isAnimating={isAnimating}
                />

                {/* Form - scrollable content */}
                <div className="flex-shrink-0">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
                        <form onSubmit={handleSubmit}>

                        {/* Success Message */}
                        {success && (
                            <div className="mb-4 p-3 bg-success/20 border border-success/30 text-green-300 text-sm flex items-center gap-2 animate-fadeIn">
                                <FaCheckCircle className="w-4 h-4 flex-shrink-0" />
                                <span>{success}</span>
                            </div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 text-red-300 text-sm flex items-center gap-2 animate-fadeIn">
                                <FaExclamationTriangle className="w-4 h-4 flex-shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        {/* Name Fields */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-semibold text-muted mb-2">
                                    Imię
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-primary/50 border border-white/20 text-white placeholder-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                                    placeholder="Jan"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-semibold text-muted mb-2">
                                    Nazwisko
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-primary/50 border border-white/20 text-white placeholder-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                                    placeholder="Kowalski"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="mb-4">
                            <label htmlFor="registerEmail" className="block text-sm font-semibold text-muted mb-2">
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
                                    className="w-full pl-10 pr-4 py-3 bg-primary/50 border border-white/20 text-white placeholder-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                                    placeholder="twoj@email.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Phone Field */}
                        <div className="mb-4">
                            <label htmlFor="registerPhone" className="block text-sm font-semibold text-muted mb-2">
                                Telefon <span className="text-xs text-muted/70">(opcjonalnie)</span>
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
                                    className="w-full pl-10 pr-4 py-3 bg-primary/50 border border-white/20 text-white placeholder-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                                    placeholder="+48 123 456 789"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="mb-4">
                            <label htmlFor="registerPassword" className="block text-sm font-semibold text-muted mb-2">
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
                                    className="w-full pl-10 pr-12 py-3 bg-primary/50 border border-white/20 text-white placeholder-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
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
                        <div className="mb-6">
                            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-muted mb-2">
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
                                    className="w-full pl-10 pr-12 py-3 bg-primary/50 border border-white/20 text-white placeholder-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
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
                            <p className="text-muted text-sm">
                                Masz już konto?{' '}
                                <button
                                    type="button"
                                    onClick={onSwitchToLogin}
                                    className="text-accent hover:text-white transition-colors duration-300 font-semibold underline"
                                >
                                    Zaloguj się
                                </button>
                            </p>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export { RegisterModal };