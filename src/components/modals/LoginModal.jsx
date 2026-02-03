import React, { useState } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaSignInAlt, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import { useAuthStore } from '../../store/authStore.js';
import { Button } from '../atoms/Button.jsx';
import { ModalWrapper } from '../layout/ModalWrapper.jsx';

/**
 * LoginModal - Modal logowania
 * Używa wspólnego ModalWrapper
 */
const LoginModal = ({ isOpen, onClose, onSwitchToRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { login, isLoading } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!email || !password) {
            setError('Wypełnij wszystkie pola');
            return;
        }

        if (!email.includes('@')) {
            setError('Podaj prawidłowy adres e-mail');
            return;
        }

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

    return (
        <ModalWrapper
            isOpen={isOpen}
            onClose={onClose}
            title="Zaloguj się"
            icon={<FaUser className="w-5 h-5 text-accent" />}
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

                    {/* Password Help Info */}
                    <div className="text-right mt-2">
                        <p className="text-sm text-muted">
                            Problem z logowaniem?{' '}
                            <a
                                href="mailto:kontakt@strzykawa.pl?subject=Problem%20z%20logowaniem&body=Witam,%0D%0A%0D%0AMam%20problem%20z%20logowaniem%20do%20konta.%0D%0A%0D%0AMój%20adres%20e-mail:%20"
                                className="text-accent hover:text-white transition-colors duration-300 underline"
                            >
                                Napisz do nas
                            </a>
                        </p>
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
        </ModalWrapper>
    );
};

export { LoginModal };
