import React, { useState } from 'react';
import { FaTimes, FaUser, FaLock, FaEye, FaEyeSlash, FaEnvelope, FaUserPlus } from 'react-icons/fa';
import { useAuthStore } from '../store/authStore';
import { UniversalButton } from './UniversalButton';

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');

    const { register, isLoading } = useAuthStore();

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

        // Validation
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
            setError('Wypełnij wszystkie pola');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Hasła nie są identyczne');
            return;
        }

        if (formData.password.length < 6) {
            setError('Hasło musi mieć minimum 6 znaków');
            return;
        }

        const result = await register(
            formData.email,
            formData.password,
            formData.firstName,
            formData.lastName
        );

        if (result.success) {
            onClose();
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
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
                <div className="w-full max-w-md bg-primary-dark border border-white/20 shadow-2xl rounded-lg max-h-[90vh] overflow-y-auto">

                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-white/10">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-accent/20 border border-accent/30 rounded">
                                <FaUser className="w-5 h-5 text-accent" />
                            </div>
                            <h2 className="text-xl font-bold text-white">Utwórz konto</h2>
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
                                    className="w-full px-4 py-3 bg-primary/50 border border-white/20 text-white placeholder-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300 rounded"
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
                                    className="w-full px-4 py-3 bg-primary/50 border border-white/20 text-white placeholder-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300 rounded"
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
                                    className="w-full pl-10 pr-4 py-3 bg-primary/50 border border-white/20 text-white placeholder-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300 rounded"
                                    placeholder="twoj@email.com"
                                    required
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
                                    className="w-full pl-10 pr-12 py-3 bg-primary/50 border border-white/20 text-white placeholder-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300 rounded"
                                    placeholder="Minimum 6 znaków"
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
                                    className="w-full pl-10 pr-12 py-3 bg-primary/50 border border-white/20 text-white placeholder-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300 rounded"
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
                        <UniversalButton
                            type="submit"
                            disabled={isLoading}
                            loading={isLoading}
                            icon={FaUserPlus}
                            variant="primary"
                            size="md"
                            className="w-full mb-4"
                        >
                            {isLoading ? 'Tworzenie konta...' : 'Utwórz konto'}
                        </UniversalButton>

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
        </>
    );
};

export { RegisterModal };