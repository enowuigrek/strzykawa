import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBox, FaCheckCircle, FaClock, FaExclamationTriangle } from 'react-icons/fa';
import { useAuthStore } from '../store/authStore.js';
import { getCustomerOrders } from '../services/shopify/customer.js';
import { PageLayout } from '../components/layout/PageLayout.jsx';
import { PageHeader } from '../components/layout/PageHeader.jsx';
import { Spinner } from '../components/atoms/Spinner.jsx';

/**
 * Orders - Historia zamówień użytkownika
 */
export function Orders() {
    const navigate = useNavigate();
    const { isAuthenticated, getAccessToken } = useAuthStore();
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Jeśli niezalogowany, przekieruj do strony głównej
        if (!isAuthenticated) {
            navigate('/');
            return;
        }

        // Pobierz zamówienia
        fetchOrders();
    }, [isAuthenticated, navigate]);

    const fetchOrders = async () => {
        setIsLoading(true);
        setError(null);

        const accessToken = getAccessToken();
        const result = await getCustomerOrders(accessToken, 20);

        if (result.success) {
            setOrders(result.orders);
        } else {
            setError(result.error);
        }

        setIsLoading(false);
    };

    // Format daty
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pl-PL', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    // Status finansowy - polskie tłumaczenia
    const getFinancialStatusLabel = (status) => {
        const labels = {
            PAID: { text: 'Opłacone', color: 'text-success', icon: FaCheckCircle },
            PENDING: { text: 'Oczekuje', color: 'text-yellow-500', icon: FaClock },
            REFUNDED: { text: 'Zwrócone', color: 'text-muted', icon: FaExclamationTriangle },
            PARTIALLY_REFUNDED: { text: 'Częściowo zwrócone', color: 'text-muted', icon: FaExclamationTriangle }
        };
        return labels[status] || { text: status, color: 'text-muted', icon: FaClock };
    };

    // Status realizacji - polskie tłumaczenia
    const getFulfillmentStatusLabel = (status) => {
        const labels = {
            FULFILLED: { text: 'Wysłane', color: 'text-success' },
            UNFULFILLED: { text: 'W realizacji', color: 'text-yellow-500' },
            PARTIALLY_FULFILLED: { text: 'Częściowo wysłane', color: 'text-yellow-500' },
            SCHEDULED: { text: 'Zaplanowane', color: 'text-muted' }
        };
        return labels[status] || { text: status, color: 'text-muted' };
    };

    return (
        <PageLayout>
            <PageHeader
                title="Moje zamówienia"
                subtitle="Historia Twoich zakupów w Strzykawa Coffee Roastery"
            />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Loading State */}
                {isLoading && (
                    <div className="flex justify-center items-center py-20">
                        <Spinner size="lg" />
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-danger/20 border border-danger/30 text-danger p-4 mb-6">
                        <p className="font-semibold mb-1">Błąd podczas ładowania zamówień</p>
                        <p className="text-sm">{error}</p>
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && !error && orders.length === 0 && (
                    <div className="text-center py-20">
                        <FaBox className="w-16 h-16 text-muted mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">
                            Nie masz jeszcze żadnych zamówień
                        </h3>
                        <p className="text-muted mb-6">
                            Czas na pierwszą kawę ze Strzykawa!
                        </p>
                        <button
                            onClick={() => navigate('/kawy')}
                            className="
                                px-8 py-3
                                bg-accent
                                text-white
                                font-medium
                                rounded-full
                                hover:bg-accent/90
                                hover:scale-105
                                transition-all duration-200
                            "
                        >
                            Przeglądaj kawy
                        </button>
                    </div>
                )}

                {/* Orders List */}
                {!isLoading && !error && orders.length > 0 && (
                    <div className="space-y-6">
                        {orders.map((order) => {
                            const financialStatus = getFinancialStatusLabel(order.financialStatus);
                            const fulfillmentStatus = getFulfillmentStatusLabel(order.fulfillmentStatus);
                            const FinancialIcon = financialStatus.icon;

                            return (
                                <div
                                    key={order.id}
                                    className="bg-primary-light border border-white/10 p-6 hover:border-accent/30 transition-colors duration-300"
                                >
                                    {/* Header */}
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 pb-4 border-b border-white/10">
                                        <div className="mb-2 sm:mb-0">
                                            <h3 className="text-lg font-semibold text-white mb-1">
                                                Zamówienie #{order.orderNumber}
                                            </h3>
                                            <p className="text-sm text-muted">
                                                {formatDate(order.date)}
                                            </p>
                                        </div>
                                        <div className="flex flex-col sm:items-end gap-1">
                                            <div className="flex items-center gap-2">
                                                <FinancialIcon className={`w-4 h-4 ${financialStatus.color}`} />
                                                <span className={`text-sm font-semibold ${financialStatus.color}`}>
                                                    {financialStatus.text}
                                                </span>
                                            </div>
                                            <span className={`text-sm ${fulfillmentStatus.color}`}>
                                                {fulfillmentStatus.text}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Items */}
                                    <div className="mb-4 space-y-3">
                                        {order.items.map((item, index) => (
                                            <div key={index} className="flex items-start gap-4">
                                                {/* Image */}
                                                {item.image && (
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-16 h-16 object-cover bg-primary"
                                                    />
                                                )}

                                                {/* Details */}
                                                <div className="flex-1">
                                                    <h4 className="text-white font-medium mb-1">
                                                        {item.title}
                                                    </h4>
                                                    {item.variant && (
                                                        <p className="text-sm text-muted">
                                                            {item.variant}
                                                        </p>
                                                    )}
                                                    <p className="text-sm text-muted">
                                                        Ilość: {item.quantity}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Footer */}
                                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                                        <div>
                                            {order.shippingAddress && (
                                                <p className="text-sm text-muted">
                                                    Dostawa: {order.shippingAddress.city}, {order.shippingAddress.zip}
                                                </p>
                                            )}
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-muted mb-1">Razem</p>
                                            <p className="text-xl font-bold text-white">
                                                {order.totalPrice.toFixed(2)} {order.currency}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </PageLayout>
    );
}
