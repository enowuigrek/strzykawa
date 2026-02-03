import React from 'react';
import PropTypes from 'prop-types';

/**
 * AddressForm - Formularz adresu dostawy (dla kuriera)
 * @param {Object} address - Obiekt z adresem
 * @param {Object} errors - Błędy walidacji
 * @param {Function} onChange - Callback do aktualizacji adresu
 */
export function AddressForm({ address, errors, onChange }) {
    const handleChange = (field, value) => {
        onChange({ [field]: value });
    };

    return (
        <div className="space-y-4">
            {/* STREET */}
            <div>
                <label htmlFor="street" className="block text-sm font-medium text-muted mb-2">
                    Ulica *
                </label>
                <input
                    type="text"
                    id="street"
                    value={address.street}
                    onChange={(e) => handleChange('street', e.target.value)}
                    className={`
                        w-full px-4 py-3
                        bg-primary
                        text-white placeholder-muted
                        focus:outline-none focus:ring-2 focus:ring-accent
                        ${errors.street ? 'border border-danger' : ''}
                    `}
                    placeholder="Krakowska"
                />
                {errors.street && <p className="text-danger text-sm mt-1">{errors.street}</p>}
            </div>

            {/* BUILDING & APARTMENT NUMBER */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="buildingNumber" className="block text-sm font-medium text-muted mb-2">
                        Nr budynku *
                    </label>
                    <input
                        type="text"
                        id="buildingNumber"
                        value={address.buildingNumber}
                        onChange={(e) => handleChange('buildingNumber', e.target.value)}
                        className={`
                            w-full px-4 py-3
                            bg-primary
                            text-white placeholder-muted
                            focus:outline-none focus:ring-2 focus:ring-accent
                            ${errors.buildingNumber ? 'border border-danger' : ''}
                        `}
                        placeholder="12"
                    />
                    {errors.buildingNumber && (
                        <p className="text-danger text-sm mt-1">{errors.buildingNumber}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="apartmentNumber" className="block text-sm font-medium text-muted mb-2">
                        Nr lokalu
                    </label>
                    <input
                        type="text"
                        id="apartmentNumber"
                        value={address.apartmentNumber}
                        onChange={(e) => handleChange('apartmentNumber', e.target.value)}
                        className="
                            w-full px-4 py-3
                            bg-primary
                            text-white placeholder-muted
                            focus:outline-none focus:ring-2 focus:ring-accent
                        "
                        placeholder="5"
                    />
                </div>
            </div>

            {/* POSTAL CODE & CITY */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-muted mb-2">
                        Kod pocztowy *
                    </label>
                    <input
                        type="text"
                        id="postalCode"
                        value={address.postalCode}
                        onChange={(e) => handleChange('postalCode', e.target.value)}
                        className={`
                            w-full px-4 py-3
                            bg-primary
                            text-white placeholder-muted
                            focus:outline-none focus:ring-2 focus:ring-accent
                            ${errors.postalCode ? 'border border-danger' : ''}
                        `}
                        placeholder="00-000"
                    />
                    {errors.postalCode && (
                        <p className="text-danger text-sm mt-1">{errors.postalCode}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="city" className="block text-sm font-medium text-muted mb-2">
                        Miasto *
                    </label>
                    <input
                        type="text"
                        id="city"
                        value={address.city}
                        onChange={(e) => handleChange('city', e.target.value)}
                        className={`
                            w-full px-4 py-3
                            bg-primary
                            text-white placeholder-muted
                            focus:outline-none focus:ring-2 focus:ring-accent
                            ${errors.city ? 'border border-danger' : ''}
                        `}
                        placeholder="Częstochowa"
                    />
                    {errors.city && <p className="text-danger text-sm mt-1">{errors.city}</p>}
                </div>
            </div>

            {/* COUNTRY (disabled - always Poland) */}
            <div>
                <label htmlFor="country" className="block text-sm font-medium text-muted mb-2">
                    Kraj
                </label>
                <input
                    type="text"
                    id="country"
                    value={address.country}
                    disabled
                    className="
                        w-full px-4 py-3
                        bg-primary
                        text-white placeholder-muted
                        opacity-50 cursor-not-allowed
                    "
                />
            </div>
        </div>
    );
}

AddressForm.propTypes = {
    address: PropTypes.shape({
        street: PropTypes.string.isRequired,
        buildingNumber: PropTypes.string.isRequired,
        apartmentNumber: PropTypes.string,
        city: PropTypes.string.isRequired,
        postalCode: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
    }).isRequired,
    errors: PropTypes.object,
    onChange: PropTypes.func.isRequired,
};

AddressForm.defaultProps = {
    errors: {},
};
