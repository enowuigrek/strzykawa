import React, { useState, useEffect } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaEnvelope, FaUserPlus } from 'react-icons/fa';
import { useAuthStore } from '../../store/authStore.js';
import { Button } from '../atoms/Button.jsx';
import { CloseButton } from '../atoms/CloseButton.jsx';

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
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
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

            {/* Modal - Fullscreen mobile, wycentrowany desktop */}
            <div
                className={`
                    fixed h-full w-full md:h-auto md:max-w-md
                    bg-primary-dark border-white/20 md:border
                    z-[200] shadow-2xl flex flex-col
                    transition-all duration-300 ease-out

                    left-0 md:left-1/2 md:top-1/2 md:-translate-x-1/2

                    ${isAnimating
                        ? 'bottom-0 translate-y-0 md:-translate-y-1/2 opacity-100'
                        : 'bottom-0 translate-y-full md:translate-y-0 md:-translate-y-1/2 opacity-0'
                    }
                `}
            >
                {/* Header */}
                <div className="px-6">
                    <div className="flex items-center justify-between py-6 border-b border-white/10">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-accent/20 border border-accent/30">
                                <FaUser className="w-5 h-5 text-accent" />
                            </div>
                            <h2 className="text-xl text-white">Utwórz konto</h2>
                        </div>
                        {/* Close button - pojawia się PO animacji */}
                        <div className={`
                            transition-opacity duration-300 delay-300
                            ${isAnimating ? 'opacity-100' : 'opacity-0'}
                        `}>
                            <CloseButton onClick={onClose} />
                        </div>
                    </div>
                </div>

                {/* Form - scrollable content */}
                <div className="flex-1 overflow-y-auto">
                    <form onSubmit={handleSubmit} className="p-6">

                        {/* Error Message */}
                        {error && (
                            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 text-red-300 text-sm">
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
        </>
    );
};

export { RegisterModal };