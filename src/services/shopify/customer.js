import { shopifyClient } from './client.js';

/**
 * Shopify Customer Account API Service
 * Używa Classic Customer Accounts (działa na Shopify Basic)
 */

/**
 * Rejestracja nowego klienta
 */
export async function registerCustomer(email, password, firstName, lastName, phone = null) {
    const mutation = `
        mutation customerCreate($input: CustomerCreateInput!) {
            customerCreate(input: $input) {
                customer {
                    id
                    email
                    firstName
                    lastName
                    phone
                }
                customerUserErrors {
                    code
                    field
                    message
                }
            }
        }
    `;

    const input = {
        email,
        password,
        firstName,
        lastName,
        acceptsMarketing: false
    };

    // Dodaj telefon jeśli podany
    if (phone) {
        input.phone = phone;
    }

    const variables = {
        input
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
        console.log('✅ Login response:', response);

        if (response.data.customerAccessTokenCreate.customerUserErrors.length > 0) {
            const error = response.data.customerAccessTokenCreate.customerUserErrors[0];
            console.log('❌ Login error:', error);
            return {
                success: false,
                error: translateError(error.message)
            };
        }

        const { accessToken, expiresAt } = response.data.customerAccessTokenCreate.customerAccessToken;
        console.log('✅ Access token received:', accessToken.substring(0, 20) + '...');

        // Pobierz dane klienta używając access token
        const customerData = await getCustomer(accessToken);
        console.log('✅ Customer data received:', customerData);

        if (!customerData.success) {
            console.error('❌ Failed to fetch customer data');
            return {
                success: false,
                error: 'Nie udało się pobrać danych użytkownika'
            };
        }

        console.log('✅ Login SUCCESS, returning customer:', customerData.customer);
        return {
            success: true,
            accessToken,
            expiresAt,
            customer: customerData.customer
        };
    } catch (error) {
        console.error('❌ Error logging in customer:', error);
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
                defaultAddress {
                    address1
                    address2
                    city
                    province
                    zip
                    country
                    phone
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
 * Aktualizuj adres klienta (tworzy nowy adres i ustawia jako domyślny)
 */
export async function updateCustomerAddress(accessToken, address) {
    try {
        // KROK 1: Utwórz nowy adres
        const createMutation = `
            mutation customerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
                customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
                    customerAddress {
                        id
                    }
                    customerUserErrors {
                        code
                        field
                        message
                    }
                }
            }
        `;

        const createVariables = {
            customerAccessToken: accessToken,
            address: {
                address1: address.address1 || '',
                address2: address.address2 || '',
                city: address.city || '',
                province: address.province || '',
                zip: address.zip || '',
                country: address.country || 'PL',
                phone: address.phone || ''
            }
        };

        const createResponse = await shopifyClient.graphqlFetch(createMutation, createVariables);

        if (createResponse.data.customerAddressCreate.customerUserErrors.length > 0) {
            const error = createResponse.data.customerAddressCreate.customerUserErrors[0];
            return {
                success: false,
                error: translateError(error.message)
            };
        }

        const newAddressId = createResponse.data.customerAddressCreate.customerAddress.id;

        // KROK 2: Ustaw nowy adres jako domyślny
        const updateDefaultMutation = `
            mutation customerDefaultAddressUpdate($customerAccessToken: String!, $addressId: ID!) {
                customerDefaultAddressUpdate(customerAccessToken: $customerAccessToken, addressId: $addressId) {
                    customer {
                        id
                    }
                    customerUserErrors {
                        code
                        field
                        message
                    }
                }
            }
        `;

        const updateDefaultVariables = {
            customerAccessToken: accessToken,
            addressId: newAddressId
        };

        const updateResponse = await shopifyClient.graphqlFetch(updateDefaultMutation, updateDefaultVariables);

        if (updateResponse.data.customerDefaultAddressUpdate.customerUserErrors.length > 0) {
            const error = updateResponse.data.customerDefaultAddressUpdate.customerUserErrors[0];
            console.warn('Failed to set as default address:', error.message);
            // Nie zwracamy błędu - adres został utworzony, tylko nie jest domyślny
        }

        return { success: true };
    } catch (error) {
        console.error('Error updating customer address:', error);
        return {
            success: false,
            error: 'Błąd podczas aktualizacji adresu'
        };
    }
}

/**
 * Wyślij email z linkiem do resetu hasła
 */
export async function recoverPassword(email) {
    const mutation = `
        mutation customerRecover($email: String!) {
            customerRecover(email: $email) {
                customerUserErrors {
                    code
                    field
                    message
                }
            }
        }
    `;

    const variables = {
        email
    };

    try {
        const response = await shopifyClient.graphqlFetch(mutation, variables);

        if (response.data.customerRecover.customerUserErrors.length > 0) {
            const error = response.data.customerRecover.customerUserErrors[0];
            return {
                success: false,
                error: translateError(error.message)
            };
        }

        return {
            success: true,
            message: 'Link do resetu hasła został wysłany na podany adres e-mail'
        };
    } catch (error) {
        console.error('Error recovering password:', error);
        return {
            success: false,
            error: 'Błąd podczas wysyłania emaila. Spróbuj ponownie.'
        };
    }
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
