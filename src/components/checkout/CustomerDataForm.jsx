import React from 'react';
import PropTypes from 'prop-types';

/**
 * CustomerDataForm - Formularz danych kontaktowych klienta
 * @param {Object} customerData - Dane klienta (email, phone, firstName, lastName)
 * @param {Object} errors - Błędy walidacji
 * @param {Function} onChange - Callback do aktualizacji danych
 * @param {Boolean} isAuthenticated - Czy użytkownik jest zalogowany
 */
export function CustomerDataForm({ customerData, errors, onChange, isAuthenticated }) {
    const handleChange = (field, value) => {
        onChange({ [field]: value });
    };

    return (
        <div className="space-y-4">
            {/* EMAIL */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-muted mb-2">
                    Email *
                </label>
                <input
                    type="email"
                    id="email"
                    value={customerData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    disabled={isAuthenticated}
                    className={`
                        w-full px-4 py-3
                        bg-primary border rounded-lg
                        text-white placeholder-muted
                        focus:outline-none focus:ring-2 focus:ring-accent
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${errors.email ? 'border-danger' : 'border-accent/30'}
                    `}
                    placeholder="twoj@email.pl"
                />
                {errors.email && (
                    <p className="text-danger text-sm mt-1">{errors.email}</p>
                )}
            </div>

            {/* PHONE */}
            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-muted mb-2">
                    Telefon *
                </label>
                <input
                    type="tel"
                    id="phone"
                    value={customerData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className={`
                        w-full px-4 py-3
                        bg-primary border rounded-lg
                        text-white placeholder-muted
                        focus:outline-none focus:ring-2 focus:ring-accent
                        ${errors.phone ? 'border-danger' : 'border-accent/30'}
                    `}
                    placeholder="123 456 789"
                />
                {errors.phone && (
                    <p className="text-danger text-sm mt-1">{errors.phone}</p>
                )}
            </div>

            {/* FIRST NAME */}
            <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-muted mb-2">
                    Imię *
                </label>
                <input
                    type="text"
                    id="firstName"
                    value={customerData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    disabled={isAuthenticated}
                    className={`
                        w-full px-4 py-3
                        bg-primary border rounded-lg
                        text-white placeholder-muted
                        focus:outline-none focus:ring-2 focus:ring-accent
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${errors.firstName ? 'border-danger' : 'border-accent/30'}
                    `}
                    placeholder="Jan"
                />
                {errors.firstName && (
                    <p className="text-danger text-sm mt-1">{errors.firstName}</p>
                )}
            </div>

            {/* LAST NAME */}
            <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-muted mb-2">
                    Nazwisko *
                </label>
                <input
                    type="text"
                    id="lastName"
                    value={customerData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    disabled={isAuthenticated}
                    className={`
                        w-full px-4 py-3
                        bg-primary border rounded-lg
                        text-white placeholder-muted
                        focus:outline-none focus:ring-2 focus:ring-accent
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${errors.lastName ? 'border-danger' : 'border-accent/30'}
                    `}
                    placeholder="Kowalski"
                />
                {errors.lastName && (
                    <p className="text-danger text-sm mt-1">{errors.lastName}</p>
                )}
            </div>

            {/* LOGIN HINT (jeśli nie zalogowany) */}
            {!isAuthenticated && (
                <div className="mt-4 p-4 bg-accent/10 border border-accent/30 rounded-lg">
                    <p className="text-sm text-muted">
                        Masz konto?{' '}
                        <button
                            type="button"
                            onClick={() => window.dispatchEvent(new CustomEvent('openLoginModal'))}
                            className="text-accent hover:text-accent/80 font-medium underline"
                        >
                            Zaloguj się
                        </button>
                        {' '}aby szybciej wypełnić dane.
                    </p>
                </div>
            )}
        </div>
    );
}

CustomerDataForm.propTypes = {
    customerData: PropTypes.shape({
        email: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
    }).isRequired,
    errors: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

CustomerDataForm.defaultProps = {
    errors: {},
    isAuthenticated: false,
};
