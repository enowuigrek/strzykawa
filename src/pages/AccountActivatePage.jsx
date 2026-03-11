import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaUserCheck, FaLock, FaEye, FaEyeSlash, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { useAuthStore } from '../store/authStore.js';
import { Button } from '../components/atoms/Button.jsx';
import { PageLayout } from '../components/layout/PageLayout.jsx';

/**
 * AccountActivatePage - Aktywacja konta przez link z emaila zaproszenia.
 *
 * URL: /account/activate/:customerId/:token
 *
 * Shopify wysyła email z linkiem:
 *   https://[store-domain]/account/activate/[customerId]/[token]
 *
 * Szablon emaila w Shopify musi być zmieniony na:
 *   https://strzykawa.com/account/activate/[customerId]/[token]
 */
export function AccountActivatePage() {
    const { customerId, token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const { activateAccount, isLoading } = useAuthStore();

    const paramsValid = customerId && token;
    const shopifyDomain = import.meta.env.VITE_SHOPIFY_DOMAIN;
    const activationUrl = `https://${shopifyDomain}/account/activate/${customerId}/${token}`;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!password || !confirmPassword) {
            setError('Wypełnij oba pola');
            return;
        }

        if (password.length < 5) {
            setError('Hasło musi mieć minimum 5 znaków');
            return;
        }

        if (password !== confirmPassword) {
            setError('Hasła nie są identyczne');
            return;
        }

        const result = await activateAccount(activationUrl, password);

        if (result.success) {
            setSuccess(true);
            setTimeout(() => navigate('/profil'), 2000);
        } else {
            setError(result.error || 'Nie udało się aktywować konta. Link mógł wygasnąć.');
        }
    };

    return (
        <PageLayout>
            <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
                <div className="w-full max-w-md">
                    <h1 className="text-2xl text-white font-normal mb-2 flex items-center gap-2">
                        <FaUserCheck className="text-accent" />
                        Aktywacja konta
                    </h1>
                    <p className="text-muted text-base mb-8">
                        Ustaw hasło, aby aktywować swoje konto Strzykawa.
                    </p>

                    {!paramsValid && (
                        <div className="p-4 bg-danger/10 border border-danger/30 text-danger flex items-start gap-3">
                            <FaExclamationTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-medium mb-1">Nieprawidłowy link</p>
                                <p className="text-sm text-danger/80">
                                    Ten link aktywacyjny jest nieprawidłowy lub wygasł.{' '}
                                    <a href="/" className="underline hover:text-white transition-colors">
                                        Wróć do strony głównej
                                    </a>
                                    .
                                </p>
                            </div>
                        </div>
                    )}

                    {paramsValid && success && (
                        <div className="p-4 bg-success/10 border border-success/30 text-success flex items-start gap-3">
                            <FaCheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-medium mb-1">Konto aktywowane!</p>
                                <p className="text-sm text-success/80">
                                    Zostałeś automatycznie zalogowany. Za chwilę przejdziesz do profilu…
                                </p>
                            </div>
                        </div>
                    )}

                    {paramsValid && !success && (
                        <form onSubmit={handleSubmit} className="bg-primary-light p-6">
                            {error && (
                                <div className="mb-4 p-3 bg-danger/10 border border-danger/30 text-danger text-sm flex items-center gap-2">
                                    <FaExclamationTriangle className="w-4 h-4 flex-shrink-0" />
                                    <span>{error}</span>
                                </div>
                            )}

                            <div className="mb-4">
                                <label htmlFor="activatePassword" className="block text-sm text-muted mb-2">
                                    Hasło
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                        <FaLock className="w-4 h-4 text-muted" />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="activatePassword"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-10 pr-12 py-3 bg-primary/50 text-white placeholder-muted/70 transition-all duration-300"
                                        placeholder="Min. 5 znaków"
                                        disabled={isLoading}
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

                            <div className="mb-6">
                                <label htmlFor="activateConfirmPassword" className="block text-sm text-muted mb-2">
                                    Powtórz hasło
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                        <FaLock className="w-4 h-4 text-muted" />
                                    </div>
                                    <input
                                        type={showConfirm ? 'text' : 'password'}
                                        id="activateConfirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full pl-10 pr-12 py-3 bg-primary/50 text-white placeholder-muted/70 transition-all duration-300"
                                        placeholder="Powtórz hasło"
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirm(!showConfirm)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted hover:text-white transition-colors duration-300"
                                    >
                                        {showConfirm ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                loading={isLoading}
                                variant="primary"
                                size="md"
                                className="w-full"
                            >
                                {isLoading ? 'Aktywuję...' : 'Aktywuj konto'}
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </PageLayout>
    );
}
