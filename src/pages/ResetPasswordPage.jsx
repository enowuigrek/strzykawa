import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaLock, FaEye, FaEyeSlash, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { useAuthStore } from '../store/authStore.js';
import { Button } from '../components/atoms/Button.jsx';
import { PageLayout } from '../components/layout/PageLayout.jsx';

/**
 * ResetPasswordPage - Strona ustawiania nowego hasła po kliknięciu linku z emaila.
 *
 * URL: /account/reset/:customerId/:token
 *
 * Shopify wysyła email z linkiem:
 *   https://[store-domain]/account/reset/[customerId]/[token]
 *
 * Rekonstruujemy ten URL i przekazujemy do mutacji customerResetByUrl.
 */
export function ResetPasswordPage() {
    const { customerId, token } = useParams();
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const { resetPassword, isLoading } = useAuthStore();

    // ─── Walidacja params ─────────────────────────────────────────────────────
    const paramsValid = customerId && token;

    // ─── Rekonstrukcja Shopify reset URL ─────────────────────────────────────
    const shopifyDomain = import.meta.env.VITE_SHOPIFY_DOMAIN;
    const resetUrl = `https://${shopifyDomain}/account/reset/${customerId}/${token}`;

    // ─── Submit ───────────────────────────────────────────────────────────────
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!newPassword || !confirmPassword) {
            setError('Wypełnij oba pola');
            return;
        }

        if (newPassword.length < 5) {
            setError('Hasło musi mieć minimum 5 znaków');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Hasła nie są identyczne');
            return;
        }

        const result = await resetPassword(resetUrl, newPassword);

        if (result.success) {
            setSuccess(true);
            // Po 2 sekundach przekieruj do profilu
            setTimeout(() => navigate('/profil'), 2000);
        } else {
            setError(result.error || 'Nie udało się zresetować hasła. Link mógł wygasnąć.');
        }
    };

    // ─── Render ───────────────────────────────────────────────────────────────
    return (
        <PageLayout>
            <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
                <div className="w-full max-w-md">
                    {/* Heading */}
                    <h1 className="text-2xl text-white font-bold mb-2 flex items-center gap-2">
                        <FaLock className="text-accent" />
                        Nowe hasło
                    </h1>
                    <p className="text-muted text-base mb-8">
                        Ustaw nowe hasło do swojego konta Strzykawa.
                    </p>

                    {/* Invalid params guard */}
                    {!paramsValid && (
                        <div className="p-4 bg-danger/10 border border-danger/30 rounded-lg text-danger flex items-start gap-3">
                            <FaExclamationTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-medium mb-1">Nieprawidłowy link</p>
                                <p className="text-sm text-danger/80">
                                    Ten link do resetowania hasła jest nieprawidłowy lub wygasł.
                                    Spróbuj ponownie z linku w emailu lub{' '}
                                    <a href="/" className="underline hover:text-white transition-colors">
                                        wróć do strony głównej
                                    </a>
                                    .
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Success state */}
                    {paramsValid && success && (
                        <div className="p-4 bg-success/10 border border-success/30 rounded-lg text-success flex items-start gap-3">
                            <FaCheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-medium mb-1">Hasło zmienione!</p>
                                <p className="text-sm text-success/80">
                                    Zostałeś automatycznie zalogowany. Za chwilę przejdziesz do profilu…
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Form */}
                    {paramsValid && !success && (
                        <form onSubmit={handleSubmit} className="bg-primary-light p-6">
                            {/* Error Message */}
                            {error && (
                                <div className="mb-4 p-3 bg-danger/10 border border-danger/30 rounded-lg text-danger text-sm flex items-center gap-2">
                                    <FaExclamationTriangle className="w-4 h-4 flex-shrink-0" />
                                    <span>{error}</span>
                                </div>
                            )}

                            {/* New Password */}
                            <div className="mb-4">
                                <label htmlFor="newPassword" className="block text-sm text-muted mb-2">
                                    Nowe hasło
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                        <FaLock className="w-4 h-4 text-muted" />
                                    </div>
                                    <input
                                        type={showNew ? 'text' : 'password'}
                                        id="newPassword"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full pl-10 pr-12 py-3 bg-primary/50 text-white placeholder-muted/70 transition-all duration-300"
                                        placeholder="Min. 5 znaków"
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNew(!showNew)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted hover:text-white transition-colors duration-300"
                                    >
                                        {showNew ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="mb-6">
                                <label htmlFor="confirmPassword" className="block text-sm text-muted mb-2">
                                    Powtórz nowe hasło
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                        <FaLock className="w-4 h-4 text-muted" />
                                    </div>
                                    <input
                                        type={showConfirm ? 'text' : 'password'}
                                        id="confirmPassword"
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

                            {/* Submit */}
                            <Button
                                type="submit"
                                disabled={isLoading}
                                loading={isLoading}
                                variant="primary"
                                size="md"
                                className="w-full"
                            >
                                {isLoading ? 'Zapisuję...' : 'Ustaw nowe hasło'}
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </PageLayout>
    );
}
