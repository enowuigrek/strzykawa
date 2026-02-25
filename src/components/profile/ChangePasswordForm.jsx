import React, { useState } from 'react';
import { FaLock, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { useAuthStore } from '../../store/authStore.js';
import { Button } from '../atoms/Button.jsx';

/**
 * ChangePasswordForm - Formularz zmiany hasła
 */
export function ChangePasswordForm() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isChanging, setIsChanging] = useState(false);

    const { changePassword } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Walidacja
        if (!currentPassword || !newPassword || !confirmPassword) {
            setError('Wypełnij wszystkie pola');
            return;
        }

        if (newPassword.length < 5) {
            setError('Nowe hasło musi mieć minimum 5 znaków');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Nowe hasła nie są identyczne');
            return;
        }

        if (currentPassword === newPassword) {
            setError('Nowe hasło musi być inne niż obecne');
            return;
        }

        // Zmień hasło
        setIsChanging(true);
        const result = await changePassword(currentPassword, newPassword);
        setIsChanging(false);

        if (result.success) {
            setSuccess('Hasło zostało zmienione pomyślnie!');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');

            // Auto-hide success message
            setTimeout(() => setSuccess(''), 4000);
        } else {
            setError(result.error || 'Błąd podczas zmiany hasła');
        }
    };

    return (
        <div className="bg-primary-light p-6">
            <h2 className="text-xl text-white mb-4 flex items-center gap-2">
                <FaLock className="text-accent" />
                Zmień hasło
            </h2>

            <form onSubmit={handleSubmit}>
                {/* Success Message */}
                {success && (
                    <div className="mb-4 p-3 bg-success/10 border border-success/30 rounded-lg text-success text-sm flex items-center gap-2">
                        <FaCheckCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{success}</span>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="mb-4 p-3 bg-danger/10 border border-danger/30 rounded-lg text-danger text-sm flex items-center gap-2">
                        <FaExclamationTriangle className="w-4 h-4 flex-shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Current Password */}
                <div className="mb-4">
                    <label htmlFor="currentPassword" className="block text-sm text-muted mb-2">
                        Obecne hasło
                    </label>
                    <input
                        type="password"
                        id="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full px-4 py-2 bg-primary/50 text-white placeholder-muted/70 transition-all duration-300"
                        placeholder="Wpisz obecne hasło"
                        disabled={isChanging}
                    />
                </div>

                {/* New Password */}
                <div className="mb-4">
                    <label htmlFor="newPassword" className="block text-sm text-muted mb-2">
                        Nowe hasło
                    </label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-2 bg-primary/50 text-white placeholder-muted/70 transition-all duration-300"
                        placeholder="Min. 5 znaków"
                        disabled={isChanging}
                    />
                </div>

                {/* Confirm Password */}
                <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block text-sm text-muted mb-2">
                        Potwierdź nowe hasło
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-2 bg-primary/50 text-white placeholder-muted/70 transition-all duration-300"
                        placeholder="Powtórz nowe hasło"
                        disabled={isChanging}
                    />
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    disabled={isChanging}
                    loading={isChanging}
                    variant="primary"
                    size="md"
                    className="w-full"
                >
                    {isChanging ? 'Zmieniam hasło...' : 'Zmień hasło'}
                </Button>
            </form>
        </div>
    );
}
