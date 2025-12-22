import React from 'react';
import PropTypes from 'prop-types';

/**
 * CustomerDataForm - Formularz danych kontaktowych klienta
 * @param {Object} customerData - Dane klienta (email, phone, firstName, lastName)
 * @param {Object} errors - Błędy walidacji
 * @param {Function} onChange - Callback do aktualizacji danych
 * @param {Boolean} isAuthenticated - Czy użytkownik jest zalogowany
 * @param {Function} onOpenLogin - Callback do otwarcia modala logowania
 */
export function CustomerDataForm({ customerData, errors, onChange, isAuthenticated, onOpenLogin }) {
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
                        bg-primary border
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
                        bg-primary border
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
                        bg-primary border
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
                        bg-primary border
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

            {/* LOGIN OPTIONS (jeśli nie zalogowany) */}
            {!isAuthenticated && (
                <div className="mt-6 space-y-3">
                    {/* Separator */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-accent/20"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-primary-light text-muted">lub</span>
                        </div>
                    </div>

                    {/* Login button */}
                    <button
                        type="button"
                        onClick={onOpenLogin}
                        className="
                            w-full py-3 px-4
                            border-2 border-accent/30
                            text-white
                            rounded-full
                            hover:border-accent hover:bg-accent/10
                            transition-all duration-200
                        "
                    >
                        Zaloguj się aby auto-wypełnić dane
                    </button>

                    <p className="text-xs text-muted text-center">
                        Zalogowanie pozwoli zaciągnąć dane z konta (imię, email, adres)
                    </p>
                </div>
            )}

            {/* LOGGED IN INFO */}
            {isAuthenticated && (
                <div className="mt-4 p-4 bg-success/10 border border-success">
                    <p className="text-sm text-success">
                        ✓ Zalogowany - dane zostały automatycznie wypełnione
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
    onOpenLogin: PropTypes.func.isRequired,
};

CustomerDataForm.defaultProps = {
    errors: {},
    isAuthenticated: false,
};
