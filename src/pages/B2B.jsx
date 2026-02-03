import React, { useState } from 'react';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { Button } from '../components/atoms/Button';
import { PageLayout } from '../components/layout/PageLayout.jsx';

const initialFormData = {
    name: '',
    email: '',
    phone: '',
    company: '',
    nip: '',
    message: '',
};

function validateForm(data) {
    const errors = {};

    if (!data.name.trim()) {
        errors.name = 'Imię jest wymagane';
    } else if (data.name.trim().length < 2) {
        errors.name = 'Imię musi mieć min. 2 znaki';
    }

    if (!data.email.trim()) {
        errors.email = 'Email jest wymagany';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = 'Podaj prawidłowy adres email';
    }

    if (!data.phone.trim()) {
        errors.phone = 'Telefon jest wymagany';
    } else if (!/^(\+48\s?)?[\d\s-]{9,15}$/.test(data.phone.trim())) {
        errors.phone = 'Podaj prawidłowy numer telefonu';
    }

    if (!data.company.trim()) {
        errors.company = 'Nazwa firmy jest wymagana';
    } else if (data.company.trim().length < 2) {
        errors.company = 'Nazwa firmy musi mieć min. 2 znaki';
    }

    if (data.nip.trim() && !/^\d{10}$/.test(data.nip.replace(/[\s-]/g, ''))) {
        errors.nip = 'NIP musi składać się z 10 cyfr';
    }

    if (!data.message.trim()) {
        errors.message = 'Wiadomość jest wymagana';
    } else if (data.message.trim().length < 10) {
        errors.message = 'Wiadomość musi mieć min. 10 znaków';
    }

    return errors;
}

export function B2B() {
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(false);
        setSubmitError('');

        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    'form-name': 'b2b-contact',
                    ...formData,
                    nip: formData.nip || '',
                }).toString(),
            });

            if (response.ok) {
                setSuccess(true);
                setFormData(initialFormData);
            } else {
                throw new Error('Submission failed');
            }
        } catch {
            setSubmitError(
                'Wystąpił błąd. Spróbuj ponownie lub napisz na kontakt@strzykawa.com'
            );
        } finally {
            setIsLoading(false);
        }
    };

    const inputClasses = (field) => `
        w-full px-4 py-3
        bg-primary-dark/50
        text-white placeholder-muted/70
        transition-all duration-300
        ${errors[field] ? 'border border-danger' : ''}
    `;

    return (
        <PageLayout
            title="Współpraca B2B"
            description="Szukasz sprawdzonego dostawcy kawy specialty dla swojego biznesu? Wypełnij formularz, a my skontaktujemy się z Tobą."
        >
            <div className="max-w-2xl mx-auto px-4 sm:px-6">
                <div className="bg-primary-light p-6 md:p-8">
                    {/* Success message */}
                    {success && (
                        <div className="mb-6 p-4 bg-success/20 flex items-center gap-3 text-success">
                            <FaCheckCircle className="w-5 h-5 flex-shrink-0" />
                            <span>Dziękujemy za wiadomość! Skontaktujemy się wkrótce.</span>
                        </div>
                    )}

                    {/* Error message */}
                    {submitError && (
                        <div className="mb-6 p-4 bg-danger/20 flex items-center gap-3 text-danger">
                            <FaExclamationTriangle className="w-5 h-5 flex-shrink-0" />
                            <span>{submitError}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Imię */}
                    <div>
                        <label htmlFor="b2b-name" className="block text-sm font-medium text-muted mb-2">
                            Imię *
                        </label>
                        <input
                            type="text"
                            id="b2b-name"
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            className={inputClasses('name')}
                            placeholder="Jan"
                        />
                        {errors.name && <p className="text-danger text-sm mt-1">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="b2b-email" className="block text-sm font-medium text-muted mb-2">
                            Email *
                        </label>
                        <input
                            type="email"
                            id="b2b-email"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            className={inputClasses('email')}
                            placeholder="jan@firma.pl"
                        />
                        {errors.email && (
                            <p className="text-danger text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    {/* Telefon */}
                    <div>
                        <label htmlFor="b2b-phone" className="block text-sm font-medium text-muted mb-2">
                            Telefon *
                        </label>
                        <input
                            type="tel"
                            id="b2b-phone"
                            value={formData.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            className={inputClasses('phone')}
                            placeholder="123 456 789"
                        />
                        {errors.phone && (
                            <p className="text-danger text-sm mt-1">{errors.phone}</p>
                        )}
                    </div>

                    {/* Nazwa firmy */}
                    <div>
                        <label htmlFor="b2b-company" className="block text-sm font-medium text-muted mb-2">
                            Nazwa firmy *
                        </label>
                        <input
                            type="text"
                            id="b2b-company"
                            value={formData.company}
                            onChange={(e) => handleChange('company', e.target.value)}
                            className={inputClasses('company')}
                            placeholder="Nazwa Twojej firmy"
                        />
                        {errors.company && (
                            <p className="text-danger text-sm mt-1">{errors.company}</p>
                        )}
                    </div>

                    {/* NIP */}
                    <div>
                        <label htmlFor="b2b-nip" className="block text-sm font-medium text-muted mb-2">
                            NIP <span className="text-muted/60">(opcjonalne)</span>
                        </label>
                        <input
                            type="text"
                            id="b2b-nip"
                            value={formData.nip}
                            onChange={(e) => handleChange('nip', e.target.value)}
                            className={inputClasses('nip')}
                            placeholder="1234567890"
                        />
                        {errors.nip && <p className="text-danger text-sm mt-1">{errors.nip}</p>}
                    </div>

                    {/* Wiadomość */}
                    <div>
                        <label htmlFor="b2b-message" className="block text-sm font-medium text-muted mb-2">
                            Wiadomość *
                        </label>
                        <textarea
                            id="b2b-message"
                            value={formData.message}
                            onChange={(e) => handleChange('message', e.target.value)}
                            className={`${inputClasses('message')} resize-vertical min-h-[140px]`}
                            placeholder="Opisz czego szukasz - rodzaj kawy, ilości, częstotliwość dostaw..."
                        />
                        {errors.message && (
                            <p className="text-danger text-sm mt-1">{errors.message}</p>
                        )}
                    </div>

                    {/* Submit */}
                    <div className="pt-2">
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            fullWidth
                            loading={isLoading}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Wysyłanie...' : 'Wyślij wiadomość'}
                        </Button>
                    </div>
                    </form>
                </div>

                {/* Fallback contact */}
                <p className="text-center text-muted text-sm mt-8">
                    Wolisz kontakt bezpośredni?{' '}
                    <a
                        href="mailto:kontakt@strzykawa.com"
                        className="text-accent hover:text-white transition-colors"
                    >
                        kontakt@strzykawa.com
                    </a>
                </p>
            </div>
        </PageLayout>
    );
}
