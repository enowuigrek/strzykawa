import React, { useState } from 'react';
import { FaTimes, FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuthStore } from '../store/authStore';

const LoginModal = ({ isOpen, onClose, onSwitchToRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const { login, isLoading } = useAuthStore();

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Wypełnij wszystkie pola');
            return;
        }

        const result = await login(email, password);

        if (result.success) {
            onClose();
            setEmail('');
            setPassword('');
        } else {
            setError(result.error);
        }
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                <div className="w-full max-w-md bg-primary-dark border border-white/20 shadow-2xl rounded-lg">

                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-white/10">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-accent/20 border border-accent/30 rounded">
                                <FaUser className="w-5 h-5 text-accent" />
                            </div>
                            <h2 className="text-xl font-bold text-white">Zaloguj się</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/10 transition-colors duration-300 rounded"
                        >
                            <FaTimes className="w-5 h-5 text-white" />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6">

                        {/* Error Message */}
                        {error && (
                            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded text-red-300 text-sm">
                                {error}
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
                                    className="w-full pl-10 pr-4 py-3 bg-primary/50 border border-white/20 text-white placeholder-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300 rounded"
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
                                    className="w-full pl-10 pr-12 py-3 bg-primary/50 border border-white/20 text-white placeholder-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300 rounded"
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
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 bg-gradient-to-r from-accent to-muted hover:from-muted hover:to-accent text-white font-semibold transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-accent/25 rounded-lg mb-4"
                        >
                            {isLoading ? 'Logowanie...' : 'Zaloguj się'}
                        </button>

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
        </>
    );
};

export { LoginModal };