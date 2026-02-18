import React, { useState, useEffect, useCallback } from 'react';
import {
    FaCheckCircle,
    FaClock,
    FaBox,
    FaTruck,
    FaStore,
    FaSync,
    FaSignOutAlt,
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
} from 'react-icons/fa';
import { PANEL_STORAGE_KEY, PANEL_PASSWORD, PANEL_REFRESH_INTERVAL_MS } from '@constants/panel';
import { Spinner } from '@components/atoms/Spinner';

// ===== BRAMKA HASŁEM =====

function PanelPasswordGate({ onSuccess }) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === PANEL_PASSWORD) {
            localStorage.setItem(PANEL_STORAGE_KEY, password);
            onSuccess(password);
        } else {
            setError('Nieprawidłowe hasło');
            setPassword('');
        }
    };

    return (
        <div className="min-h-screen bg-primary flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                {/* Logo */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white tracking-wider">STRZYKAWA</h1>
                    <p className="text-muted text-sm mt-1">Panel obsługi zamówień</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-primary-light p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">
                            Hasło dostępu
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError('');
                            }}
                            placeholder="Wpisz hasło..."
                            autoFocus
                            className="
                                w-full px-4 py-3
                                bg-primary border border-white/10
                                text-white placeholder-muted
                                focus:outline-none focus:border-accent/50
                                transition-colors duration-200
                            "
                        />
                        {error && <p className="text-danger text-sm mt-1">{error}</p>}
                    </div>
                    <button
                        type="submit"
                        className="
                            w-full py-3
                            bg-accent text-white font-medium
                            rounded-full
                            hover:bg-accent/90 transition-all duration-200
                        "
                    >
                        Zaloguj się
                    </button>
                </form>
            </div>
        </div>
    );
}

// ===== KARTA ZAMÓWIENIA =====

function OrderCard({ order, tab, onMarkPickedUp, onMarkShipped, isActionLoading }) {
    const isPending = isActionLoading === order.id;

    // Format daty
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pl-PL', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const isPickup = tab === 'odbior';

    // Określ czy akcja jest już wykonana
    const isDone = isPickup ? order.isPickedUp : order.isShipped;

    return (
        <div className={`bg-primary-light transition-all duration-300 ${isDone ? 'opacity-60' : ''}`}>
            {/* Nagłówek karty */}
            <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                {/* Numer + data */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-white font-bold text-lg">
                            #{order.orderNumber}
                        </h3>
                        {/* Status płatności */}
                        {order.isPaid ? (
                            <span className="flex items-center gap-1 px-2 py-0.5 bg-success text-white text-xs font-bold rounded-full">
                                <FaCheckCircle size={10} />
                                Opłacone
                            </span>
                        ) : (
                            <span className="flex items-center gap-1 px-2 py-0.5 bg-yellow-600 text-white text-xs font-bold rounded-full">
                                <FaClock size={10} />
                                Nieopłacone
                            </span>
                        )}
                        {/* Status (odebrane/wysłane) */}
                        {isDone && (
                            <span className="flex items-center gap-1 px-2 py-0.5 bg-accent text-white text-xs font-bold rounded-full">
                                <FaCheckCircle size={10} />
                                {isPickup ? 'Odebrane' : 'Wysłane'}
                            </span>
                        )}
                    </div>
                    <p className="text-muted text-sm mt-0.5">{formatDate(order.createdAt)}</p>
                </div>

                {/* Kwota */}
                <div className="text-right flex-shrink-0">
                    <p className="text-white font-bold text-lg">
                        {order.totalPrice.toFixed(2)} {order.currency}
                    </p>
                </div>
            </div>

            {/* Dane kontaktowe klienta */}
            <div className="px-4 sm:px-5 pb-3 flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm border-t border-white/5 pt-3">
                <div className="flex items-center gap-2 text-white font-medium">
                    <span>{order.customerFirstName} {order.customerLastName}</span>
                </div>
                {order.phone && order.phone !== '—' && (
                    <a
                        href={`tel:${order.phone}`}
                        className="flex items-center gap-2 text-accent hover:text-white transition-colors duration-200"
                    >
                        <FaPhone size={12} />
                        <span>{order.phone}</span>
                    </a>
                )}
                {order.email && (
                    <div className="flex items-center gap-2 text-muted">
                        <FaEnvelope size={12} />
                        <span className="truncate">{order.email}</span>
                    </div>
                )}
            </div>

            {/* Adres dostawy (zakładka wysyłki) */}
            {!isPickup && (
                <div className="px-4 sm:px-5 pb-3">
                    {order.paczkomatName ? (
                        <div className="flex items-start gap-2 text-sm text-muted">
                            <FaBox size={12} className="mt-0.5 flex-shrink-0 text-accent" />
                            <span>
                                Paczkomat <strong className="text-white">{order.paczkomatName}</strong>
                                {order.paczkomatCity ? ` — ${order.paczkomatCity}` : ''}
                                {order.paczkomatStreet ? `, ${order.paczkomatStreet}` : ''}
                            </span>
                        </div>
                    ) : order.shippingAddress ? (
                        <div className="flex items-start gap-2 text-sm text-muted">
                            <FaMapMarkerAlt size={12} className="mt-0.5 flex-shrink-0 text-accent" />
                            <span>{order.shippingAddress}</span>
                        </div>
                    ) : null}
                </div>
            )}

            {/* Produkty */}
            <div className="px-4 sm:px-5 pb-4 border-t border-white/5 pt-3 space-y-2">
                {order.items.map((item, index) => (
                    <div key={index} className="flex items-baseline gap-2 text-sm">
                        <span className="text-muted flex-shrink-0">×{item.quantity}</span>
                        <span className="text-white">{item.title}</span>
                        {item.variantTitle && (
                            <span className="text-muted text-xs">({item.variantTitle})</span>
                        )}
                    </div>
                ))}
            </div>

            {/* Przycisk akcji */}
            {!isDone && (
                <div className="px-4 sm:px-5 pb-4">
                    <button
                        onClick={() => isPickup ? onMarkPickedUp(order.id) : onMarkShipped(order.id)}
                        disabled={isPending}
                        className="
                            w-full py-3
                            bg-success text-white font-medium
                            rounded-full
                            hover:bg-success-dark
                            disabled:opacity-50 disabled:cursor-not-allowed
                            transition-all duration-200
                            flex items-center justify-center gap-2
                        "
                    >
                        {isPending ? (
                            <>
                                <Spinner size="sm" />
                                <span>Zapisuję...</span>
                            </>
                        ) : isPickup ? (
                            <>
                                <FaStore size={14} />
                                <span>Oznacz jako odebrane</span>
                            </>
                        ) : (
                            <>
                                <FaTruck size={14} />
                                <span>Oznacz jako wysłane</span>
                            </>
                        )}
                    </button>
                </div>
            )}

            {/* Potwierdzenie gdy gotowe */}
            {isDone && (
                <div className="px-4 sm:px-5 pb-4">
                    <div className="flex items-center justify-center gap-2 py-2 text-success text-sm font-medium">
                        <FaCheckCircle size={14} />
                        <span>{isPickup ? 'Zamówienie odebrane ✓' : 'Zamówienie wysłane ✓'}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

// ===== GŁÓWNY PANEL =====

function PanelOrders({ password, onLogout }) {
    const [tab, setTab] = useState('odbior'); // 'odbior' | 'wysylka'
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isActionLoading, setIsActionLoading] = useState(null); // id zamówienia w trakcie akcji
    const [lastRefresh, setLastRefresh] = useState(null);

    // Pobierz zamówienia
    const fetchOrders = useCallback(async () => {
        setError(null);
        try {
            const res = await fetch(`/.netlify/functions/panel-orders?tab=${tab}`, {
                headers: { Authorization: `Bearer ${password}` },
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            setOrders(data.orders || []);
            setLastRefresh(new Date());
        } catch (err) {
            setError('Błąd połączenia z serwerem: ' + err.message);
        } finally {
            setIsLoading(false);
        }
    }, [tab, password]);

    // Ładuj przy zmianie zakładki
    useEffect(() => {
        setIsLoading(true);
        setOrders([]);
        fetchOrders();
    }, [fetchOrders]);

    // Auto-odświeżanie co minutę
    useEffect(() => {
        const interval = setInterval(fetchOrders, PANEL_REFRESH_INTERVAL_MS);
        return () => clearInterval(interval);
    }, [fetchOrders]);

    // Oznacz jako odebrane
    const handleMarkPickedUp = async (orderId) => {
        setIsActionLoading(orderId);
        try {
            const res = await fetch('/.netlify/functions/panel-mark-picked-up', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${password}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderId }),
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            // Zaktualizuj lokalnie bez pełnego przeładowania
            setOrders((prev) =>
                prev.map((o) => (o.id === orderId ? { ...o, isPickedUp: true } : o))
            );
        } catch (err) {
            alert('Błąd: ' + err.message);
        } finally {
            setIsActionLoading(null);
        }
    };

    // Oznacz jako wysłane
    const handleMarkShipped = async (orderId) => {
        setIsActionLoading(orderId);
        try {
            const res = await fetch('/.netlify/functions/panel-mark-shipped', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${password}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderId }),
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            // Zaktualizuj lokalnie bez pełnego przeładowania
            setOrders((prev) =>
                prev.map((o) => (o.id === orderId ? { ...o, isShipped: true } : o))
            );
        } catch (err) {
            alert('Błąd: ' + err.message);
        } finally {
            setIsActionLoading(null);
        }
    };

    // Podział na do zrobienia i gotowe
    const pending = orders.filter((o) => (tab === 'odbior' ? !o.isPickedUp : !o.isShipped));
    const done = orders.filter((o) => (tab === 'odbior' ? o.isPickedUp : o.isShipped));

    return (
        <div className="min-h-screen bg-primary">
            {/* HEADER */}
            <div className="bg-primary-dark border-b border-white/10 sticky top-0 z-10">
                <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div>
                        <h1 className="text-white font-bold tracking-wider text-lg">STRZYKAWA</h1>
                        <p className="text-muted text-xs">Panel zamówień</p>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* Odśwież */}
                        <button
                            onClick={fetchOrders}
                            disabled={isLoading}
                            title="Odśwież"
                            className="
                                p-2 text-muted hover:text-white
                                disabled:opacity-50
                                transition-colors duration-200
                            "
                        >
                            <FaSync size={16} className={isLoading ? 'animate-spin' : ''} />
                        </button>
                        {/* Wyloguj */}
                        <button
                            onClick={onLogout}
                            title="Wyloguj"
                            className="
                                p-2 text-muted hover:text-white
                                transition-colors duration-200
                            "
                        >
                            <FaSignOutAlt size={16} />
                        </button>
                    </div>
                </div>

                {/* ZAKŁADKI */}
                <div className="max-w-2xl mx-auto px-4 flex gap-0">
                    <button
                        onClick={() => setTab('odbior')}
                        className={`
                            flex-1 flex items-center justify-center gap-2
                            py-3 text-sm font-medium
                            border-b-2 transition-all duration-200
                            ${tab === 'odbior'
                                ? 'border-success text-success'
                                : 'border-transparent text-muted hover:text-white'
                            }
                        `}
                    >
                        <FaStore size={14} />
                        Odbiór osobisty
                    </button>
                    <button
                        onClick={() => setTab('wysylka')}
                        className={`
                            flex-1 flex items-center justify-center gap-2
                            py-3 text-sm font-medium
                            border-b-2 transition-all duration-200
                            ${tab === 'wysylka'
                                ? 'border-success text-success'
                                : 'border-transparent text-muted hover:text-white'
                            }
                        `}
                    >
                        <FaTruck size={14} />
                        Wysyłka
                    </button>
                </div>
            </div>

            {/* CONTENT */}
            <div className="max-w-2xl mx-auto px-4 py-4">
                {/* Czas ostatniego odświeżenia */}
                {lastRefresh && !isLoading && (
                    <p className="text-muted text-xs text-right mb-3">
                        Ostatnia aktualizacja: {lastRefresh.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })}
                        {' · '}auto-odświeżanie co minutę
                    </p>
                )}

                {/* Loading */}
                {isLoading && (
                    <div className="flex justify-center items-center py-20">
                        <Spinner size="lg" />
                    </div>
                )}

                {/* Error */}
                {error && !isLoading && (
                    <div className="bg-danger/20 border border-danger/30 text-danger p-4 mb-4">
                        <p className="font-medium mb-1">Błąd ładowania zamówień</p>
                        <p className="text-sm">{error}</p>
                        <button
                            onClick={fetchOrders}
                            className="mt-3 px-4 py-2 bg-danger/20 hover:bg-danger/30 text-danger text-sm rounded-full transition-colors duration-200"
                        >
                            Spróbuj ponownie
                        </button>
                    </div>
                )}

                {/* Puste */}
                {!isLoading && !error && orders.length === 0 && (
                    <div className="text-center py-20">
                        {tab === 'odbior' ? (
                            <FaStore className="w-12 h-12 text-muted mx-auto mb-4" />
                        ) : (
                            <FaTruck className="w-12 h-12 text-muted mx-auto mb-4" />
                        )}
                        <p className="text-muted text-lg">
                            {tab === 'odbior'
                                ? 'Brak zamówień do odbioru'
                                : 'Brak zamówień do wysyłki'}
                        </p>
                    </div>
                )}

                {/* Do zrobienia */}
                {!isLoading && !error && pending.length > 0 && (
                    <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2">
                            <h2 className="text-white font-medium text-sm uppercase tracking-wider">
                                {tab === 'odbior' ? 'Do odbioru' : 'Do wysłania'}
                            </h2>
                            <span className="px-2 py-0.5 bg-success text-white text-xs font-bold rounded-full">
                                {pending.length}
                            </span>
                        </div>
                        <div className="space-y-3">
                            {pending.map((order) => (
                                <OrderCard
                                    key={order.id}
                                    order={order}
                                    tab={tab}
                                    onMarkPickedUp={handleMarkPickedUp}
                                    onMarkShipped={handleMarkShipped}
                                    isActionLoading={isActionLoading}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Gotowe (zwinięte) */}
                {!isLoading && !error && done.length > 0 && (
                    <div className="space-y-3">
                        <h2 className="text-muted font-medium text-sm uppercase tracking-wider">
                            {tab === 'odbior' ? 'Odebrane' : 'Wysłane'} ({done.length})
                        </h2>
                        <div className="space-y-3">
                            {done.map((order) => (
                                <OrderCard
                                    key={order.id}
                                    order={order}
                                    tab={tab}
                                    onMarkPickedUp={handleMarkPickedUp}
                                    onMarkShipped={handleMarkShipped}
                                    isActionLoading={isActionLoading}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// ===== EKSPORT GŁÓWNY =====

export function Panel() {
    const [password, setPassword] = useState(() => {
        // Sprawdź czy hasło jest już w localStorage
        return localStorage.getItem(PANEL_STORAGE_KEY) || null;
    });

    const handleLogout = () => {
        localStorage.removeItem(PANEL_STORAGE_KEY);
        setPassword(null);
    };

    if (!password || password !== PANEL_PASSWORD) {
        return <PanelPasswordGate onSuccess={(pwd) => setPassword(pwd)} />;
    }

    return <PanelOrders password={password} onLogout={handleLogout} />;
}
