import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaBox, FaCheckCircle, FaClock, FaExclamationTriangle, FaChevronDown, FaTruck } from 'react-icons/fa';
import { useAuthStore } from '../store/authStore.js';
import { getCustomerOrders } from '../services/shopify/customer.js';
import { PageLayout } from '../components/layout/PageLayout.jsx';
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
    const [expandedOrders, setExpandedOrders] = useState(new Set());

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

    // Toggle expanded state for an order
    const toggleOrder = (orderId) => {
        setExpandedOrders(prev => {
            const newSet = new Set(prev);
            if (newSet.has(orderId)) {
                newSet.delete(orderId);
            } else {
                newSet.add(orderId);
            }
            return newSet;
        });
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

    const isCanceled = (order) => order.financialStatus === 'VOIDED';

    // Status finansowy - polskie tłumaczenia
    const getFinancialStatusLabel = (status) => {
        const labels = {
            PAID: { text: 'Opłacone', color: 'text-success', icon: FaCheckCircle },
            PENDING: { text: 'Oczekuje na płatność', color: 'text-muted', icon: FaClock },
            REFUNDED: { text: 'Zwrócone', color: 'text-muted', icon: FaExclamationTriangle },
            PARTIALLY_REFUNDED: { text: 'Częściowo zwrócone', color: 'text-muted', icon: FaExclamationTriangle },
            VOIDED: { text: 'Anulowane', color: 'text-muted', icon: FaExclamationTriangle }
        };
        return labels[status] || { text: status, color: 'text-muted', icon: FaClock };
    };

    // Status realizacji - polskie tłumaczenia
    const getFulfillmentStatusLabel = (status) => {
        const labels = {
            FULFILLED: { text: 'Wysłane', color: 'text-success' },
            IN_PROGRESS: { text: 'W toku', color: 'text-muted' },
            UNFULFILLED: { text: 'W realizacji', color: 'text-muted' },
            PARTIALLY_FULFILLED: { text: 'Częściowo wysłane', color: 'text-muted' },
            SCHEDULED: { text: 'Zaplanowane', color: 'text-muted' },
            READY_FOR_PICKUP: { text: 'Gotowe do odbioru', color: 'text-success' },
            ON_HOLD: { text: 'Wstrzymane', color: 'text-muted' }
        };
        return labels[status] || { text: status, color: 'text-muted' };
    };

    return (
        <PageLayout
            title="Historia zamówień"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Loading State */}
                {isLoading && (
                    <div className="flex justify-center items-center py-20">
                        <Spinner size="lg" />
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-danger/10 border border-danger p-4 mb-6">
                        <p className="text-base text-danger">{error}</p>
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && !error && orders.length === 0 && (
                    <div className="text-center py-20">
                        <FaBox className="w-16 h-16 text-muted mx-auto mb-4" />
                        <h3 className="text-xl font-medium text-white mb-2">
                            Nie masz jeszcze żadnych zamówień
                        </h3>
                        <p className="text-muted mb-6">
                            Czas na pierwsze zamówienie ze Strzykawy!
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
                    <div className="space-y-4">
                        {orders.map((order) => {
                            const canceled = isCanceled(order);
                            const financialStatus = getFinancialStatusLabel(order.financialStatus);
                            const fulfillmentStatus = getFulfillmentStatusLabel(order.fulfillmentStatus);
                            const FinancialIcon = financialStatus.icon;
                            const isExpanded = expandedOrders.has(order.id);

                            return (
                                <div
                                    key={order.id}
                                    className="bg-primary-light transition-colors duration-300"
                                >
                                    {/* Clickable Header */}
                                    <button
                                        onClick={() => toggleOrder(order.id)}
                                        className="w-full p-4 sm:p-6 flex items-center justify-between text-left"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 flex-1">
                                            {/* Order number and date */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-base sm:text-lg font-medium text-white">
                                                    Zamówienie #{order.orderNumber}
                                                </h3>
                                                <p className="text-base text-muted">
                                                    {formatDate(order.date)}
                                                </p>
                                            </div>

                                            {/* Status badges */}
                                            <div className="flex items-center gap-3 sm:gap-4">
                                                <div className="flex items-center gap-1.5">
                                                    <FinancialIcon className={`w-4 h-4 ${financialStatus.color}`} />
                                                    <span className={`text-sm font-medium ${financialStatus.color}`}>
                                                        {financialStatus.text}
                                                    </span>
                                                </div>
                                                {!canceled && (
                                                    <span className={`text-sm ${fulfillmentStatus.color}`}>
                                                        {fulfillmentStatus.text}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Total price */}
                                            <div className="text-right">
                                                <p className="text-lg text-white">
                                                    {order.totalPrice.toFixed(2)} {order.currency}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Expand arrow */}
                                        <FaChevronDown
                                            className={`
                                                w-5 h-5 text-muted ml-4 flex-shrink-0
                                                transition-transform duration-300
                                                ${isExpanded ? 'rotate-180' : ''}
                                            `}
                                        />
                                    </button>

                                    {/* Expandable Content */}
                                    <div
                                        className={`
                                            overflow-hidden transition-all duration-300 ease-in-out
                                            ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}
                                        `}
                                    >
                                        <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-0 border-t border-white/10">
                                            {/* Items */}
                                            <div className="py-4 space-y-3">
                                                {order.items.map((item, index) => (
                                                    <div key={index} className="flex items-start gap-4">
                                                        {/* Image */}
                                                        {item.image && (
                                                            item.handle ? (
                                                                <Link to={`/kawy/${item.handle}`}>
                                                                    <img
                                                                        src={item.image}
                                                                        alt={item.title}
                                                                        className="w-16 h-16 object-cover bg-primary hover:opacity-80 transition-opacity duration-200"
                                                                    />
                                                                </Link>
                                                            ) : (
                                                                <img
                                                                    src={item.image}
                                                                    alt={item.title}
                                                                    className="w-16 h-16 object-cover bg-primary"
                                                                />
                                                            )
                                                        )}

                                                        {/* Details */}
                                                        <div className="flex-1">
                                                            {item.handle ? (
                                                                <Link
                                                                    to={`/kawy/${item.handle}`}
                                                                    className="text-white font-medium mb-1 hover:text-accent transition-colors duration-200 block"
                                                                >
                                                                    {item.title}
                                                                </Link>
                                                            ) : (
                                                                <h4 className="text-white font-medium mb-1">
                                                                    {item.title}
                                                                </h4>
                                                            )}
                                                            {item.selectedOptions && item.selectedOptions.filter(opt => opt.value !== 'Default Title').length > 0 && (
                                                                <p className="text-base text-muted">
                                                                    {item.selectedOptions.filter(opt => opt.value !== 'Default Title').map(opt => opt.value).join(' / ')}
                                                                </p>
                                                            )}
                                                            <p className="text-base text-muted">
                                                                Ilość: {item.quantity}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Shipping address */}
                                            {order.shippingAddress && (
                                                <div className="pt-4 border-t border-white/10">
                                                    <p className="text-sm text-muted mb-1">Adres wysyłki</p>
                                                    <div className="text-base text-white/70 leading-relaxed">
                                                        <p>{order.shippingAddress.address1}</p>
                                                        {order.shippingAddress.address2 && (
                                                            <p>{order.shippingAddress.address2}</p>
                                                        )}
                                                        <p>{order.shippingAddress.zip} {order.shippingAddress.city}</p>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Tracking numbers */}
                                            {order.trackingInfo && order.trackingInfo.length > 0 && (
                                                <div className="pt-4 border-t border-white/10">
                                                    <p className="text-sm text-muted mb-2">Numer przesyłki</p>
                                                    <div className="space-y-2">
                                                        {order.trackingInfo.map((tracking, i) => (
                                                            <a
                                                                key={i}
                                                                href={tracking.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center gap-2 text-accent hover:text-white transition-colors duration-200 w-fit"
                                                            >
                                                                <FaTruck className="w-3.5 h-3.5 flex-shrink-0" />
                                                                <span className="text-base font-medium">{tracking.number}</span>
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

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
