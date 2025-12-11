import React, { useState, useEffect } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaSignInAlt, FaExclamationTriangle, FaCheckCircle, FaEnvelope } from 'react-icons/fa';
import { useAuthStore } from '../../store/authStore.js';
import { recoverPassword } from '../../services/shopify/customer.js';
import { Button } from '../atoms/Button.jsx';
import { ModalHeader } from '../layout/ModalHeader.jsx';

/**
 * LoginModal - Modal logowania
 * Mobile: fullscreen z animacją z dołu
 * Desktop: wycentrowany modal
 */
const LoginModal = ({ isOpen, onClose, onSwitchToRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);

    // Password recovery
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [resetError, setResetError] = useState('');
    const [resetSuccess, setResetSuccess] = useState('');
    const [isResetting, setIsResetting] = useState(false);

    const { login, isLoading } = useAuthStore();

    useEffect(() => {
        if (isOpen) {
            // Trigger animation after mount
            setTimeout(() => setIsAnimating(true), 10);
        } else {
            setIsAnimating(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Walidacja po stronie klienta
        if (!email || !password) {
            setError('Wypełnij wszystkie pola');
            return;
        }

        if (!email.includes('@')) {
            setError('Podaj prawidłowy adres e-mail');
            return;
        }

        // Logowanie
        const result = await login(email, password);

        if (result.success) {
            setSuccess('Zalogowano pomyślnie! Witaj z powrotem.');
            setTimeout(() => {
                onClose();
                setEmail('');
                setPassword('');
                setSuccess('');
            }, 1500);
        } else {
            // Lepszy opis błędu
            const errorMessage = result.error || 'Nieznany błąd';
            if (errorMessage.includes('Nieprawidłowy email lub hasło')) {
                setError('Nieprawidłowy e-mail lub hasło. Sprawdź dane i spróbuj ponownie.');
            } else if (errorMessage.includes('dezaktywowane')) {
                setError('Konto zostało dezaktywowane. Skontaktuj się z obsługą.');
            } else {
                setError(errorMessage);
            }
        }
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setResetError('');
        setResetSuccess('');

        if (!resetEmail || !resetEmail.includes('@')) {
            setResetError('Podaj prawidłowy adres e-mail');
            return;
        }

        setIsResetting(true);
        const result = await recoverPassword(resetEmail);
        setIsResetting(false);

        if (result.success) {
            setResetSuccess(result.message);
            setTimeout(() => {
                setShowForgotPassword(false);
                setResetEmail('');
                setResetSuccess('');
            }, 4000);
        } else {
            setResetError(result.error);
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
                    title="Zaloguj się"
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
                            <div className="mb-4 p-3 bg-success/20 border border-success/30 rounded-lg text-green-300 text-sm flex items-center gap-2 animate-fadeIn">
                                <FaCheckCircle className="w-4 h-4 flex-shrink-0" />
                                <span>{success}</span>
                            </div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm flex items-center gap-2 animate-fadeIn">
                                <FaExclamationTriangle className="w-4 h-4 flex-shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        {/* Email Field */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-semibold text-muted mb-2">
                                E-mail
                            </label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                    <FaUser className="w-4 h-4 text-muted" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-primary/50 border border-white/20 text-white placeholder-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                                    placeholder="twoj@email.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-semibold text-muted mb-2">
                                Hasło
                            </label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                    <FaLock className="w-4 h-4 text-muted" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-12 py-3 bg-primary/50 border border-white/20 text-white placeholder-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                                    placeholder="Twoje hasło"
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

                            {/* Forgot Password Link */}
                            <div className="text-right mt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowForgotPassword(!showForgotPassword)}
                                    className="text-xs text-accent hover:text-white transition-colors duration-300 underline"
                                >
                                    Zapomniałeś hasła?
                                </button>
                            </div>
                        </div>

                        {/* Password Recovery Form - rozwija się gdy showForgotPassword = true */}
                        {showForgotPassword && (
                            <div className="mb-6 p-4 bg-primary/30 border border-accent/30 rounded-lg animate-fadeIn">
                                <h3 className="text-sm font-semibold text-white mb-3">Reset hasła</h3>
                                <p className="text-xs text-muted mb-4">
                                    Podaj adres e-mail, a Shopify wyśle Ci link do resetu hasła.
                                </p>

                                {/* Reset Success Message */}
                                {resetSuccess && (
                                    <div className="mb-3 p-3 bg-success/20 border border-success/30 rounded-lg text-green-300 text-sm flex items-center gap-2">
                                        <FaCheckCircle className="w-4 h-4 flex-shrink-0" />
                                        <span>{resetSuccess}</span>
                                    </div>
                                )}

                                {/* Reset Error Message */}
                                {resetError && (
                                    <div className="mb-3 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm flex items-center gap-2">
                                        <FaExclamationTriangle className="w-4 h-4 flex-shrink-0" />
                                        <span>{resetError}</span>
                                    </div>
                                )}

                                <form onSubmit={handlePasswordReset}>
                                    <div className="relative mb-3">
                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                            <FaEnvelope className="w-4 h-4 text-muted" />
                                        </div>
                                        <input
                                            type="email"
                                            value={resetEmail}
                                            onChange={(e) => setResetEmail(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 bg-primary/50 border border-white/20 text-white placeholder-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300 text-sm"
                                            placeholder="twoj@email.com"
                                            required
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={isResetting}
                                        loading={isResetting}
                                        variant="secondary"
                                        size="sm"
                                        className="w-full"
                                    >
                                        {isResetting ? 'Wysyłanie...' : 'Wyślij link do resetu'}
                                    </Button>
                                </form>
                            </div>
                        )}

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={isLoading}
                            loading={isLoading}
                            icon={FaSignInAlt}
                            variant="primary"
                            size="md"
                            className="w-full mb-4"
                        >
                            {isLoading ? 'Logowanie...' : 'Zaloguj się'}
                        </Button>

                        {/* Switch to Register */}
                        <div className="text-center">
                            <p className="text-muted text-sm">
                                Nie masz konta?{' '}
                                <button
                                    type="button"
                                    onClick={onSwitchToRegister}
                                    className="text-accent hover:text-white transition-colors duration-300 font-semibold underline"
                                >
                                    Zarejestruj się
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

export { LoginModal };