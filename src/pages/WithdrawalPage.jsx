import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { PageLayout } from '../components/layout/PageLayout.jsx';
import { SEO } from '../components/SEO.jsx';
import { Button } from '../components/atoms/Button.jsx';
import { useAuthStore } from '../store/authStore.js';
import {
    COMPANY_NAME,
    HQ_STREET,
    HQ_ZIP_CITY,
    CONTACT_EMAIL,
    CONTACT_EMAIL_HREF,
} from '../constants/contact.js';

function validate(data) {
    const errors = {};
    if (!data.firstName.trim()) errors.firstName = 'Imię jest wymagane';
    if (!data.lastName.trim()) errors.lastName = 'Nazwisko jest wymagane';
    if (!data.email.trim()) errors.email = 'Email jest wymagany';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
        errors.email = 'Podaj prawidłowy adres email';
    if (!data.orderNumber.trim()) errors.orderNumber = 'Numer zamówienia jest wymagany';
    if (!data.declaration) errors.declaration = 'Wymagana jest Twoja zgoda';
    return errors;
}

function Row({ label, value }) {
    return (
        <div className="flex justify-between gap-4">
            <span className="text-muted text-sm flex-shrink-0">{label}</span>
            <span className="text-white text-right">{value}</span>
        </div>
    );
}

export function WithdrawalPage() {
    const { search } = useLocation();
    const user = useAuthStore((state) => state.user);

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        orderNumber: '',
        productName: '',
        declaration: false,
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [submittedDate] = useState(
        new Date().toLocaleDateString('pl-PL', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })
    );

    // Pre-fill from URL params (from Orders page) and logged-in user
    useEffect(() => {
        const params = new URLSearchParams(search);
        const updates = {};
        if (params.get('zamowienie')) updates.orderNumber = params.get('zamowienie');
        if (params.get('produkt'))
            updates.productName = decodeURIComponent(params.get('produkt'));
        if (params.get('email')) updates.email = decodeURIComponent(params.get('email'));
        if (user) {
            if (!updates.email) updates.email = user.email || '';
            if (user.firstName) updates.firstName = user.firstName;
            if (user.lastName) updates.lastName = user.lastName;
        }
        if (Object.keys(updates).length > 0) {
            setFormData((prev) => ({ ...prev, ...updates }));
        }
    }, [search, user]);

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
    };

    const handleStep1 = (e) => {
        e.preventDefault();
        const errs = validate(formData);
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }
        setStep(2);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleConfirm = async () => {
        setIsLoading(true);
        setSubmitError('');

        const autoresponseText = [
            `Szanowny/a ${formData.firstName},`,
            '',
            'Potwierdzamy przyjęcie Twojego oświadczenia o odstąpieniu od umowy.',
            '',
            `Numer zamówienia: #${formData.orderNumber}`,
            formData.productName ? `Produkt: ${formData.productName}` : '',
            `Data złożenia: ${submittedDate}`,
            '',
            'Prosimy o odesłanie towaru w ciągu 14 dni od daty złożenia oświadczenia na adres:',
            `${COMPANY_NAME}`,
            `${HQ_STREET}`,
            `${HQ_ZIP_CITY}`,
            '',
            'Zwrot środków nastąpi w ciągu 14 dni od otrzymania towaru przez nas.',
            '',
            'Z poważaniem,',
            'Strzykawa',
            CONTACT_EMAIL,
        ]
            .filter((line) => line !== null)
            .join('\n');

        try {
            const response = await fetch('https://formsubmit.co/ajax/kontakt@strzykawa.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    _subject: `Odstąpienie od umowy — zamówienie #${formData.orderNumber}`,
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    _replyto: formData.email,
                    _autoresponse: autoresponseText,
                    'Numer zamówienia': `#${formData.orderNumber}`,
                    Produkt: formData.productName || '—',
                    'Data złożenia': submittedDate,
                }),
            });

            const data = await response.json();
            if (data.success === 'true' || data.success === true) {
                setStep(3);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                throw new Error('Submission failed');
            }
        } catch {
            setSubmitError(
                `Wystąpił błąd podczas wysyłania. Spróbuj ponownie lub skontaktuj się bezpośrednio: ${CONTACT_EMAIL}`
            );
        } finally {
            setIsLoading(false);
        }
    };

    const inputClasses = (field) =>
        `w-full px-4 py-3 bg-primary-dark/50 text-white placeholder-muted/70 transition-all duration-300${errors[field] ? ' border border-danger' : ''}`;

    return (
        <PageLayout title="Odstąpienie od umowy">
            <SEO
                title="Odstąpienie od umowy — Strzykawa"
                description="Formularz odstąpienia od umowy. Skorzystaj z przysługującego Ci prawa do zwrotu w ciągu 14 dni od zakupu."
                noindex
            />

            <div className="max-w-2xl mx-auto px-4 sm:px-6">

                {/* Krok 1 — formularz */}
                {step === 1 && (
                    <div className="bg-primary-light p-6 md:p-8">
                        <p className="text-muted text-base mb-6 leading-relaxed">
                            Zgodnie z art. 27 ustawy o prawach konsumenta przysługuje Ci prawo do
                            odstąpienia od umowy w ciągu{' '}
                            <strong className="text-white">14 dni</strong> od otrzymania towaru bez
                            podania przyczyny.
                        </p>

                        <form onSubmit={handleStep1} className="space-y-5">
                            {/* Imię + Nazwisko */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label
                                        htmlFor="wd-firstName"
                                        className="block text-sm font-medium text-muted mb-2"
                                    >
                                        Imię *
                                    </label>
                                    <input
                                        id="wd-firstName"
                                        type="text"
                                        value={formData.firstName}
                                        onChange={(e) => handleChange('firstName', e.target.value)}
                                        className={inputClasses('firstName')}
                                        placeholder="Jan"
                                    />
                                    {errors.firstName && (
                                        <p className="text-danger text-sm mt-1">{errors.firstName}</p>
                                    )}
                                </div>
                                <div>
                                    <label
                                        htmlFor="wd-lastName"
                                        className="block text-sm font-medium text-muted mb-2"
                                    >
                                        Nazwisko *
                                    </label>
                                    <input
                                        id="wd-lastName"
                                        type="text"
                                        value={formData.lastName}
                                        onChange={(e) => handleChange('lastName', e.target.value)}
                                        className={inputClasses('lastName')}
                                        placeholder="Kowalski"
                                    />
                                    {errors.lastName && (
                                        <p className="text-danger text-sm mt-1">{errors.lastName}</p>
                                    )}
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="wd-email"
                                    className="block text-sm font-medium text-muted mb-2"
                                >
                                    Adres e-mail *
                                </label>
                                <input
                                    id="wd-email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    className={inputClasses('email')}
                                    placeholder="jan@email.pl"
                                />
                                {errors.email && (
                                    <p className="text-danger text-sm mt-1">{errors.email}</p>
                                )}
                            </div>

                            {/* Numer zamówienia */}
                            <div>
                                <label
                                    htmlFor="wd-order"
                                    className="block text-sm font-medium text-muted mb-2"
                                >
                                    Numer zamówienia *
                                </label>
                                <input
                                    id="wd-order"
                                    type="text"
                                    value={formData.orderNumber}
                                    onChange={(e) => handleChange('orderNumber', e.target.value)}
                                    className={inputClasses('orderNumber')}
                                    placeholder="np. 1001"
                                />
                                {errors.orderNumber && (
                                    <p className="text-danger text-sm mt-1">{errors.orderNumber}</p>
                                )}
                            </div>

                            {/* Produkt */}
                            <div>
                                <label
                                    htmlFor="wd-product"
                                    className="block text-sm font-medium text-muted mb-2"
                                >
                                    Nazwa produktu{' '}
                                    <span className="text-muted/60">(opcjonalne)</span>
                                </label>
                                <input
                                    id="wd-product"
                                    type="text"
                                    value={formData.productName}
                                    onChange={(e) => handleChange('productName', e.target.value)}
                                    className={inputClasses('productName')}
                                    placeholder="np. nazwa kawy lub produktu"
                                />
                            </div>

                            {/* Oświadczenie */}
                            <div>
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.declaration}
                                        onChange={(e) =>
                                            handleChange('declaration', e.target.checked)
                                        }
                                        className="mt-0.5 flex-shrink-0 w-4 h-4 accent-accent"
                                    />
                                    <span className="text-sm text-white/70 leading-relaxed">
                                        Oświadczam, że chcę odstąpić od umowy sprzedaży. Rozumiem, że
                                        zwrot towaru musi nastąpić w ciągu 14 dni od złożenia
                                        oświadczenia, a zwrot środków nastąpi w ciągu 14 dni od
                                        otrzymania towaru przez sprzedawcę. *
                                    </span>
                                </label>
                                {errors.declaration && (
                                    <p className="text-danger text-sm mt-1">{errors.declaration}</p>
                                )}
                            </div>

                            <div className="pt-2">
                                <Button type="submit" variant="primary" size="lg" fullWidth>
                                    Dalej
                                </Button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Krok 2 — potwierdzenie */}
                {step === 2 && (
                    <div className="bg-primary-light p-6 md:p-8">
                        <h2 className="text-xl font-medium text-white mb-2">
                            Sprawdź dane i potwierdź
                        </h2>
                        <p className="text-muted text-base mb-6">
                            To ostatni krok. Po potwierdzeniu wyślemy Ci e-mail z potwierdzeniem.
                        </p>

                        <div className="bg-primary-dark/50 p-5 space-y-3 mb-6">
                            <Row
                                label="Imię i nazwisko"
                                value={`${formData.firstName} ${formData.lastName}`}
                            />
                            <Row label="E-mail" value={formData.email} />
                            <Row label="Numer zamówienia" value={`#${formData.orderNumber}`} />
                            {formData.productName && (
                                <Row label="Produkt" value={formData.productName} />
                            )}
                            <div className="border-t border-white/10 pt-3">
                                <Row label="Data złożenia" value={submittedDate} />
                            </div>
                        </div>

                        {submitError && (
                            <div className="mb-4 p-4 bg-danger/20 flex items-center gap-3 text-danger">
                                <FaExclamationTriangle className="w-5 h-5 flex-shrink-0" />
                                <span>{submitError}</span>
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={() => setStep(1)}
                                className="flex-1 px-6 py-3 border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-all duration-200 rounded-full font-medium"
                            >
                                ← Wróć i edytuj
                            </button>
                            <Button
                                onClick={handleConfirm}
                                variant="primary"
                                size="lg"
                                loading={isLoading}
                                disabled={isLoading}
                                className="flex-1"
                            >
                                {isLoading ? 'Wysyłanie...' : 'Potwierdzam odstąpienie'}
                            </Button>
                        </div>
                    </div>
                )}

                {/* Krok 3 — sukces */}
                {step === 3 && (
                    <div className="bg-primary-light p-6 md:p-8 text-center">
                        <FaCheckCircle className="w-16 h-16 text-success mx-auto mb-6" />
                        <h2 className="text-2xl font-medium text-white mb-3">
                            Oświadczenie przyjęte
                        </h2>
                        <p className="text-white/70 text-base mb-2">
                            Potwierdzenie zostało wysłane na{' '}
                            <strong className="text-white">{formData.email}</strong>.
                        </p>
                        <p className="text-muted text-sm mb-8 leading-relaxed">
                            Prosimy o odesłanie towaru w ciągu{' '}
                            <strong className="text-white/70">14 dni</strong> na adres:{' '}
                            <span className="text-white/70">
                                {COMPANY_NAME}, {HQ_STREET}, {HQ_ZIP_CITY}
                            </span>
                        </p>
                        <a
                            href="/kawy"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-white rounded-full hover:bg-accent/90 hover:scale-105 transition-all duration-200 font-medium"
                        >
                            Wróć do sklepu
                        </a>
                    </div>
                )}

                {step !== 3 && (
                    <p className="text-center text-muted text-sm mt-8">
                        Masz pytania?{' '}
                        <a
                            href={CONTACT_EMAIL_HREF}
                            className="text-accent hover:text-white transition-colors"
                        >
                            {CONTACT_EMAIL}
                        </a>
                    </p>
                )}
            </div>
        </PageLayout>
    );
}
