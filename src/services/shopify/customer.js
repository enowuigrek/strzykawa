import { shopifyClient } from './client.js';

/**
 * Shopify Customer Account API Service
 * Używa Classic Customer Accounts (działa na Shopify Basic)
 */

/**
 * Rejestracja nowego klienta
 */
export async function registerCustomer(email, password, firstName, lastName) {
    const mutation = `
        mutation customerCreate($input: CustomerCreateInput!) {
            customerCreate(input: $input) {
                customer {
                    id
                    email
                    firstName
                    lastName
                }
                customerUserErrors {
                    code
                    field
                    message
                }
            }
        }
    `;

    const variables = {
        input: {
            email,
            password,
            firstName,
            lastName,
            acceptsMarketing: false
        }
    };

    try {
        const response = await shopifyClient.graphqlFetch(mutation, variables);

        if (response.data.customerCreate.customerUserErrors.length > 0) {
            const error = response.data.customerCreate.customerUserErrors[0];
            return {
                success: false,
                error: translateError(error.message)
            };
        }

        const customer = response.data.customerCreate.customer;

        return {
            success: true,
            customer: {
                id: customer.id,
                email: customer.email,
                firstName: customer.firstName,
                lastName: customer.lastName
            }
        };
    } catch (error) {
        console.error('Error registering customer:', error);
        return {
            success: false,
            error: 'Błąd podczas tworzenia konta. Spróbuj ponownie.'
        };
    }
}

/**
 * Logowanie klienta - uzyskanie access token
 */
export async function loginCustomer(email, password) {
    const mutation = `
        mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
            customerAccessTokenCreate(input: $input) {
                customerAccessToken {
                    accessToken
                    expiresAt
                }
                customerUserErrors {
                    code
                    field
                    message
                }
            }
        }
    `;

    const variables = {
        input: {
            email,
            password
        }
    };

    try {
        const response = await shopifyClient.graphqlFetch(mutation, variables);

        if (response.data.customerAccessTokenCreate.customerUserErrors.length > 0) {
            const error = response.data.customerAccessTokenCreate.customerUserErrors[0];
            return {
                success: false,
                error: translateError(error.message)
            };
        }

        const { accessToken, expiresAt } = response.data.customerAccessTokenCreate.customerAccessToken;

        // Pobierz dane klienta używając access token
        const customerData = await getCustomer(accessToken);

        if (!customerData.success) {
            return {
                success: false,
                error: 'Nie udało się pobrać danych użytkownika'
            };
        }

        return {
            success: true,
            accessToken,
            expiresAt,
            customer: customerData.customer
        };
    } catch (error) {
        console.error('Error logging in customer:', error);
        return {
            success: false,
            error: 'Błąd podczas logowania. Spróbuj ponownie.'
        };
    }
}

/**
 * Pobierz dane zalogowanego klienta
 */
export async function getCustomer(accessToken) {
    const query = `
        query getCustomer($customerAccessToken: String!) {
            customer(customerAccessToken: $customerAccessToken) {
                id
                email
                firstName
                lastName
                phone
                defaultAddress {
                    address1
                    address2
                    city
                    province
                    zip
                    country
                }
            }
        }
    `;

    const variables = {
        customerAccessToken: accessToken
    };

    try {
        const response = await shopifyClient.graphqlFetch(query, variables);

        if (!response.data.customer) {
            return {
                success: false,
                error: 'Nie znaleziono klienta'
            };
        }

        return {
            success: true,
            customer: {
                id: response.data.customer.id,
                email: response.data.customer.email,
                firstName: response.data.customer.firstName,
                lastName: response.data.customer.lastName,
                phone: response.data.customer.phone,
                defaultAddress: response.data.customer.defaultAddress
            }
        };
    } catch (error) {
        console.error('Error fetching customer:', error);
        return {
            success: false,
            error: 'Błąd podczas pobierania danych klienta'
        };
    }
}

/**
 * Pobierz historię zamówień klienta
 */
export async function getCustomerOrders(accessToken, first = 10) {
    const query = `
        query getCustomerOrders($customerAccessToken: String!, $first: Int!) {
            customer(customerAccessToken: $customerAccessToken) {
                orders(first: $first, sortKey: PROCESSED_AT, reverse: true) {
                    edges {
                        node {
                            id
                            orderNumber
                            processedAt
                            financialStatus
                            fulfillmentStatus
                            totalPrice {
                                amount
                                currencyCode
                            }
                            lineItems(first: 10) {
                                edges {
                                    node {
                                        title
                                        quantity
                                        variant {
                                            title
                                            image {
                                                url
                                            }
                                        }
                                    }
                                }
                            }
                            shippingAddress {
                                address1
                                address2
                                city
                                province
                                zip
                                country
                            }
                        }
                    }
                }
            }
        }
    `;

    const variables = {
        customerAccessToken: accessToken,
        first
    };

    try {
        const response = await shopifyClient.graphqlFetch(query, variables);

        if (!response.data.customer) {
            return {
                success: false,
                error: 'Nie znaleziono klienta'
            };
        }

        const orders = response.data.customer.orders.edges.map(edge => {
            const order = edge.node;
            return {
                id: order.id,
                orderNumber: order.orderNumber,
                date: order.processedAt,
                financialStatus: order.financialStatus,
                fulfillmentStatus: order.fulfillmentStatus,
                totalPrice: parseFloat(order.totalPrice.amount),
                currency: order.totalPrice.currencyCode,
                items: order.lineItems.edges.map(lineEdge => ({
                    title: lineEdge.node.title,
                    quantity: lineEdge.node.quantity,
                    variant: lineEdge.node.variant?.title || '',
                    image: lineEdge.node.variant?.image?.url || null
                })),
                shippingAddress: order.shippingAddress
            };
        });

        return {
            success: true,
            orders
        };
    } catch (error) {
        console.error('Error fetching customer orders:', error);
        return {
            success: false,
            error: 'Błąd podczas pobierania zamówień'
        };
    }
}

/**
 * Wylogowanie - usunięcie access token
 */
export async function logoutCustomer(accessToken) {
    const mutation = `
        mutation customerAccessTokenDelete($customerAccessToken: String!) {
            customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
                deletedAccessToken
                deletedCustomerAccessTokenId
                userErrors {
                    field
                    message
                }
            }
        }
    `;

    const variables = {
        customerAccessToken: accessToken
    };

    try {
        await shopifyClient.graphqlFetch(mutation, variables);
        return { success: true };
    } catch (error) {
        console.error('Error logging out customer:', error);
        return { success: false };
    }
}

/**
 * Sprawdź czy access token jest nadal ważny
 */
export async function validateAccessToken(accessToken) {
    const result = await getCustomer(accessToken);
    return result.success;
}

/**
 * Tłumaczenie błędów Shopify na polski
 */
function translateError(errorMessage) {
    const translations = {
        'Email has already been taken': 'Ten adres e-mail jest już zarejestrowany',
        'Unidentified customer': 'Nieprawidłowy e-mail lub hasło',
        'Customer is disabled': 'Konto zostało dezaktywowane',
        'Password is too short': 'Hasło jest za krótkie (minimum 5 znaków)',
        'Email is invalid': 'Nieprawidłowy adres e-mail',
        'Password cannot be blank': 'Hasło nie może być puste',
        'Email cannot be blank': 'E-mail nie może być pusty'
    };

    return translations[errorMessage] || errorMessage;
}
