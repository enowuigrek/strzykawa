import React, { useState } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaSignInAlt, FaExclamationTriangle, FaCheckCircle, FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import { useAuthStore } from '../../store/authStore.js';
import { Button } from '../atoms/Button.jsx';
import { ModalWrapper } from '../layout/ModalWrapper.jsx';

/**
 * LoginModal - Modal logowania z flow resetowania hasła
 * Widoki: 'login' | 'forgotPassword' | 'resetSent'
 * Używa wspólnego ModalWrapper
 */
const LoginModal = ({ isOpen, onClose, onSwitchToRegister }) => {
    const [view, setView] = useState('login');

    // login state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [loginSuccess, setLoginSuccess] = useState('');

    // forgotPassword state
    const [forgotEmail, setForgotEmail] = useState('');
    const [forgotError, setForgotError] = useState('');

    const { login, recoverPassword, isLoading } = useAuthStore();

    // ─── Handlers ────────────────────────────────────────────────────────────

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoginError('');
        setLoginSuccess('');

        if (!email || !password) {
            setLoginError('Wypełnij wszystkie pola');
            return;
        }

        if (!email.includes('@')) {
            setLoginError('Podaj prawidłowy adres e-mail');
            return;
        }

        const result = await login(email, password);

        if (result.success) {
            setLoginSuccess('Zalogowano pomyślnie! Witaj z powrotem.');
            setTimeout(() => {
                onClose();
                setEmail('');
                setPassword('');
                setLoginSuccess('');
            }, 1500);
        } else {
            const errorMessage = result.error || 'Nieznany błąd';
            if (errorMessage.includes('Nieprawidłowy email lub hasło')) {
                setLoginError('Nieprawidłowy e-mail lub hasło. Sprawdź dane i spróbuj ponownie.');
            } else if (errorMessage.includes('dezaktywowane')) {
                setLoginError('Konto zostało dezaktywowane. Skontaktuj się z obsługą.');
            } else {
                setLoginError(errorMessage);
            }
        }
    };

    const handleForgotSubmit = async (e) => {
        e.preventDefault();
        setForgotError('');

        if (!forgotEmail) {
            setForgotError('Podaj adres e-mail');
            return;
        }

        if (!forgotEmail.includes('@')) {
            setForgotError('Podaj prawidłowy adres e-mail');
            return;
        }

        await recoverPassword(forgotEmail);
        // Always show success (don't reveal if email exists)
        setView('resetSent');
    };

    const handleSwitchToForgot = () => {
        setForgotEmail(email); // pre-fill with whatever was in login form
        setForgotError('');
        setView('forgotPassword');
    };

    const handleBackToLogin = () => {
        setForgotEmail('');
        setForgotError('');
        setView('login');
    };

    const handleClose = () => {
        // Reset everything on close
        setView('login');
        setEmail('');
        setPassword('');
        setLoginError('');
        setLoginSuccess('');
        setForgotEmail('');
        setForgotError('');
        onClose();
    };

    // ─── Modal titles per view ────────────────────────────────────────────────
    const titles = {
        login: 'Zaloguj się',
        forgotPassword: 'Resetuj hasło',
        resetSent: 'Sprawdź skrzynkę'
    };

    // ─── Render ───────────────────────────────────────────────────────────────
    return (
        <ModalWrapper
            isOpen={isOpen}
            onClose={handleClose}
            title={titles[view]}
            icon={<FaUser className="w-5 h-5 text-accent" />}
        >
            {/* ── LOGIN VIEW ── */}
            {view === 'login' && (
                <form onSubmit={handleLoginSubmit}>
                    {/* Success Message */}
                    {loginSuccess && (
                        <div className="mb-4 p-3 bg-success/10 border border-success/30 text-success text-base flex items-center gap-2 animate-fadeIn">
                            <FaCheckCircle className="w-4 h-4 flex-shrink-0" />
                            <span>{loginSuccess}</span>
                        </div>
                    )}

                    {/* Error Message */}
                    {loginError && (
                        <div className="mb-4 p-3 bg-danger/10 border border-danger/30 text-danger text-base flex items-center gap-2 animate-fadeIn">
                            <FaExclamationTriangle className="w-4 h-4 flex-shrink-0" />
                            <span>{loginError}</span>
                        </div>
                    )}

                    {/* Email Field */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-base font-medium text-muted mb-2">
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
                                className="w-full pl-10 pr-4 py-3 bg-primary-dark/50 text-white placeholder-muted/70 transition-all duration-300"
                                placeholder="twoj@email.com"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-base font-medium text-muted mb-2">
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
                                className="w-full pl-10 pr-12 py-3 bg-primary-dark/50 text-white placeholder-muted/70 transition-all duration-300"
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
                                onClick={handleSwitchToForgot}
                                className="text-sm text-accent hover:text-white transition-colors duration-300 underline"
                            >
                                Nie pamiętasz hasła?
                            </button>
                        </div>
                    </div>

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
                        <p className="text-muted text-base">
                            Nie masz konta?{' '}
                            <button
                                type="button"
                                onClick={onSwitchToRegister}
                                className="text-accent hover:text-white transition-colors duration-300 font-medium underline"
                            >
                                Zarejestruj się
                            </button>
                        </p>
                    </div>
                </form>
            )}

            {/* ── FORGOT PASSWORD VIEW ── */}
            {view === 'forgotPassword' && (
                <form onSubmit={handleForgotSubmit}>
                    <p className="text-muted text-base mb-6">
                        Podaj swój adres e-mail, a wyślemy Ci link do zresetowania hasła.
                    </p>

                    {/* Error Message */}
                    {forgotError && (
                        <div className="mb-4 p-3 bg-danger/10 border border-danger/30 text-danger text-base flex items-center gap-2 animate-fadeIn">
                            <FaExclamationTriangle className="w-4 h-4 flex-shrink-0" />
                            <span>{forgotError}</span>
                        </div>
                    )}

                    {/* Email Field */}
                    <div className="mb-6">
                        <label htmlFor="forgotEmail" className="block text-base font-medium text-muted mb-2">
                            E-mail
                        </label>
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                <FaEnvelope className="w-4 h-4 text-muted" />
                            </div>
                            <input
                                type="email"
                                id="forgotEmail"
                                value={forgotEmail}
                                onChange={(e) => setForgotEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-primary-dark/50 text-white placeholder-muted/70 transition-all duration-300"
                                placeholder="twoj@email.com"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={isLoading}
                        loading={isLoading}
                        icon={FaEnvelope}
                        variant="primary"
                        size="md"
                        className="w-full mb-4"
                    >
                        {isLoading ? 'Wysyłanie...' : 'Wyślij link'}
                    </Button>

                    {/* Back to Login */}
                    <div className="text-center">
                        <button
                            type="button"
                            onClick={handleBackToLogin}
                            className="text-accent hover:text-white transition-colors duration-300 text-sm flex items-center gap-1.5 mx-auto"
                        >
                            <FaArrowLeft className="w-3 h-3" />
                            Wróć do logowania
                        </button>
                    </div>
                </form>
            )}

            {/* ── RESET SENT VIEW ── */}
            {view === 'resetSent' && (
                <div>
                    <div className="mb-6 p-4 bg-success/10 border border-success/30 text-success flex items-start gap-3">
                        <FaCheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-medium mb-1">Link wysłany!</p>
                            <p className="text-sm text-success/80">
                                Jeśli konto z adresem <strong>{forgotEmail}</strong> istnieje,
                                otrzymasz e-mail z linkiem do resetowania hasła.
                            </p>
                        </div>
                    </div>

                    <p className="text-muted text-sm mb-6">
                        Nie widzisz wiadomości? Sprawdź folder spam lub skontaktuj się z nami na{' '}
                        <a
                            href="mailto:kontakt@strzykawa.pl"
                            className="text-accent hover:text-white transition-colors duration-300 underline"
                        >
                            kontakt@strzykawa.pl
                        </a>
                        .
                    </p>

                    {/* Back to Login */}
                    <button
                        type="button"
                        onClick={handleBackToLogin}
                        className="text-accent hover:text-white transition-colors duration-300 text-sm flex items-center gap-1.5"
                    >
                        <FaArrowLeft className="w-3 h-3" />
                        Wróć do logowania
                    </button>
                </div>
            )}
        </ModalWrapper>
    );
};

export { LoginModal };
