import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
    loginCustomer,
    registerCustomer,
    logoutCustomer,
    validateAccessToken,
    getCustomer,
    changePassword,
    recoverPassword,
    resetPassword
} from '../services/shopify/customer.js';

export const useAuthStore = create(
    persist(
        (set, get) => ({
            // State
            user: null,
            accessToken: null,
            tokenExpiresAt: null,
            isLoading: false,
            isAuthenticated: false,

            // Actions
            login: async (email, password) => {
                set({ isLoading: true });

                try {
                    const result = await loginCustomer(email, password);

                    if (result.success) {
                        set({
                            user: result.customer,
                            accessToken: result.accessToken,
                            tokenExpiresAt: result.expiresAt,
                            isAuthenticated: true,
                            isLoading: false
                        });
                        return { success: true };
                    } else {
                        set({ isLoading: false });
                        return { success: false, error: result.error };
                    }
                } catch (error) {
                    set({ isLoading: false });
                    return { success: false, error: 'Błąd podczas logowania' };
                }
            },

            register: async (email, password, firstName, lastName, phone = null) => {
                set({ isLoading: true });

                try {
                    // 1. Najpierw utwórz konto
                    const registerResult = await registerCustomer(email, password, firstName, lastName, phone);

                    if (!registerResult.success) {
                        set({ isLoading: false });
                        return { success: false, error: registerResult.error };
                    }

                    // 2. Automatyczne logowanie po rejestracji
                    const loginResult = await loginCustomer(email, password);

                    if (loginResult.success) {
                        set({
                            user: loginResult.customer,
                            accessToken: loginResult.accessToken,
                            tokenExpiresAt: loginResult.expiresAt,
                            isAuthenticated: true,
                            isLoading: false
                        });
                        return { success: true };
                    } else {
                        set({ isLoading: false });
                        return {
                            success: false,
                            error: 'Konto utworzone, ale logowanie nie powiodło się. Spróbuj się zalogować.'
                        };
                    }
                } catch (error) {
                    set({ isLoading: false });
                    return { success: false, error: 'Błąd podczas tworzenia konta' };
                }
            },

            logout: async () => {
                const { accessToken } = get();

                // Usuń token w Shopify
                if (accessToken) {
                    await logoutCustomer(accessToken);
                }

                // Wyczyść localStorage i state
                set({
                    user: null,
                    accessToken: null,
                    tokenExpiresAt: null,
                    isAuthenticated: false,
                    isLoading: false
                });
            },

            // Sprawdź ważność tokena przy starcie aplikacji
            checkAuth: async () => {
                const { accessToken, tokenExpiresAt } = get();

                if (!accessToken) {
                    return;
                }

                // Sprawdź czy token nie wygasł
                const now = new Date().toISOString();
                if (tokenExpiresAt && now > tokenExpiresAt) {
                    // Token wygasł - wyloguj
                    get().logout();
                    return;
                }

                // Sprawdź czy token jest nadal ważny w Shopify
                const isValid = await validateAccessToken(accessToken);

                if (!isValid) {
                    // Token nieważny - wyloguj
                    get().logout();
                    return;
                }

                // Token ważny - pobierz świeże dane użytkownika
                const result = await getCustomer(accessToken);

                if (result.success) {
                    set({
                        user: result.customer,
                        isAuthenticated: true
                    });
                } else {
                    // Nie udało się pobrać danych - wyloguj
                    get().logout();
                }
            },

            // Pobierz aktualny access token (helper dla innych komponentów)
            getAccessToken: () => {
                return get().accessToken;
            },

            // Zmień hasło
            changePassword: async (currentPassword, newPassword) => {
                const { accessToken } = get();

                if (!accessToken) {
                    return { success: false, error: 'Nie jesteś zalogowany' };
                }

                set({ isLoading: true });

                try {
                    const result = await changePassword(accessToken, currentPassword, newPassword);
                    set({ isLoading: false });
                    return result;
                } catch (error) {
                    set({ isLoading: false });
                    return { success: false, error: 'Błąd podczas zmiany hasła' };
                }
            },

            // Wyślij email z linkiem do resetu hasła
            // Zawsze zwraca success: true (nie ujawniamy czy email istnieje)
            recoverPassword: async (email) => {
                set({ isLoading: true });
                try {
                    await recoverPassword(email);
                } catch (_) {
                    // ignorujemy błędy — nie ujawniamy czy email istnieje
                }
                set({ isLoading: false });
                return { success: true };
            },

            // Ustaw nowe hasło przy użyciu tokenu z emaila i auto-zaloguj
            resetPassword: async (resetUrl, newPassword) => {
                set({ isLoading: true });
                try {
                    const result = await resetPassword(resetUrl, newPassword);

                    if (result.success) {
                        set({
                            user: result.customer,
                            accessToken: result.accessToken,
                            tokenExpiresAt: result.expiresAt,
                            isAuthenticated: true,
                            isLoading: false
                        });
                        return { success: true };
                    } else {
                        set({ isLoading: false });
                        return { success: false, error: result.error };
                    }
                } catch (error) {
                    set({ isLoading: false });
                    return { success: false, error: 'Błąd podczas resetowania hasła' };
                }
            },

            // Zaktualizuj dane użytkownika (np. po edycji adresu)
            updateUser: (updatedUser) => {
                set({ user: updatedUser });
            }
        }),
        {
            name: 'strzykawa-auth',
            partialize: (state) => ({
                user: state.user,
                accessToken: state.accessToken,
                tokenExpiresAt: state.tokenExpiresAt,
                isAuthenticated: state.isAuthenticated
            })
        }
    )
);