import { shopifyClient } from './client.js';
import { logger } from '../../utils/logger.js';

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
        logger.error('Error registering customer:', error);
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
        logger.log('Login response:', response);

        if (response.data.customerAccessTokenCreate.customerUserErrors.length > 0) {
            const error = response.data.customerAccessTokenCreate.customerUserErrors[0];
            logger.log('Login error:', error);
            return {
                success: false,
                error: translateError(error.message)
            };
        }

        const { accessToken, expiresAt } = response.data.customerAccessTokenCreate.customerAccessToken;
        logger.log('Access token received');

        // Pobierz dane klienta używając access token
        const customerData = await getCustomer(accessToken);
        logger.log('Customer data received');

        if (!customerData.success) {
            logger.error('Failed to fetch customer data');
            return {
                success: false,
                error: 'Nie udało się pobrać danych użytkownika'
            };
        }

        logger.log('Login success');
        return {
            success: true,
            accessToken,
            expiresAt,
            customer: customerData.customer
        };
    } catch (error) {
        logger.error('Error logging in customer:', error);
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
                    phone
                    company
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
        logger.error('Error fetching customer:', error);
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
                            note
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
                                            selectedOptions {
                                                name
                                                value
                                            }
                                            image {
                                                url
                                            }
                                            product {
                                                handle
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
                    selectedOptions: lineEdge.node.variant?.selectedOptions || [],
                    image: lineEdge.node.variant?.image?.url || null,
                    handle: lineEdge.node.variant?.product?.handle || null
                })),
                shippingAddress: order.shippingAddress,
                note: order.note || null
            };
        });

        return {
            success: true,
            orders
        };
    } catch (error) {
        logger.error('Error fetching customer orders:', error);
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
        logger.error('Error logging out customer:', error);
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
                phone: address.phone || '',
                company: address.company || ''
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
            logger.warn('Failed to set as default address:', error.message);
            // Nie zwracamy błędu - adres został utworzony, tylko nie jest domyślny
        }

        return { success: true };
    } catch (error) {
        logger.error('Error updating customer address:', error);
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
        logger.log('Sending password recovery email to:', email);
        const response = await shopifyClient.graphqlFetch(mutation, variables);

        if (response.data.customerRecover.customerUserErrors.length > 0) {
            const error = response.data.customerRecover.customerUserErrors[0];
            logger.error('Password recovery error:', error);
            return {
                success: false,
                error: translateError(error.message)
            };
        }

        logger.log('Password recovery email sent to:', email);
        return {
            success: true,
            message: 'Link do resetu hasła został wysłany na podany adres e-mail'
        };
    } catch (error) {
        logger.error('Error recovering password:', error);
        return {
            success: false,
            error: 'Błąd podczas wysyłania emaila. Spróbuj ponownie.'
        };
    }
}

/**
 * Zaktualizuj dane osobowe klienta (imię, nazwisko, email, telefon)
 */
export async function updateCustomerPersonalData(accessToken, { firstName, lastName, email, phone }) {
    const mutation = `
        mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
            customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
                customer {
                    id
                    firstName
                    lastName
                    email
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

    const variables = {
        customerAccessToken: accessToken,
        customer: {
            firstName,
            lastName,
            email,
            phone: phone || null,
        }
    };

    try {
        const response = await shopifyClient.graphqlFetch(mutation, variables);

        if (response.data.customerUpdate.customerUserErrors.length > 0) {
            const error = response.data.customerUpdate.customerUserErrors[0];
            return {
                success: false,
                error: translateError(error.message)
            };
        }

        return { success: true };
    } catch (error) {
        logger.error('Error updating customer personal data:', error);
        return {
            success: false,
            error: 'Błąd podczas zapisywania danych'
        };
    }
}

/**
 * Zaktualizuj numer telefonu klienta
 */
export async function updateCustomerPhone(accessToken, phone) {
    const mutation = `
        mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
            customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
                customer {
                    id
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

    const variables = {
        customerAccessToken: accessToken,
        customer: { phone: phone || null }
    };

    try {
        const response = await shopifyClient.graphqlFetch(mutation, variables);

        if (response.data.customerUpdate.customerUserErrors.length > 0) {
            const error = response.data.customerUpdate.customerUserErrors[0];
            return {
                success: false,
                error: translateError(error.message)
            };
        }

        return { success: true };
    } catch (error) {
        logger.error('Error updating customer phone:', error);
        return {
            success: false,
            error: 'Błąd podczas zapisywania numeru telefonu'
        };
    }
}

/**
 * Zmień hasło dla zalogowanego użytkownika
 */
export async function changePassword(accessToken, currentPassword, newPassword) {
    const mutation = `
        mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
            customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
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

    const variables = {
        customerAccessToken: accessToken,
        customer: {
            password: newPassword
        }
    };

    try {
        const response = await shopifyClient.graphqlFetch(mutation, variables);

        if (response.data.customerUpdate.customerUserErrors.length > 0) {
            const error = response.data.customerUpdate.customerUserErrors[0];
            logger.error('Password change error:', error);
            return {
                success: false,
                error: translateError(error.message)
            };
        }

        logger.log('Password changed successfully');
        return {
            success: true,
            message: 'Hasło zostało zmienione pomyślnie'
        };
    } catch (error) {
        logger.error('Error changing password:', error);
        return {
            success: false,
            error: 'Błąd podczas zmiany hasła. Spróbuj ponownie.'
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
