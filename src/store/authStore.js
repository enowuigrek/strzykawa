import { create } from 'zustand';
import { LOADING_DELAY } from '../constants/timings.js';

// Mock user data for development
const mockUsers = [
    {
        id: 1,
        email: 'test@strzykawa.pl',
        password: 'haslo123',
        firstName: 'Jan',
        lastName: 'Kowalski'
    }
];

export const useAuthStore = create((set, get) => ({
    // State
    user: null,
    isLoading: false,
    isAuthenticated: false,

    // Actions
    login: async (email, password) => {
        set({ isLoading: true });

        try {
            // Mock API delay
            await new Promise(resolve => setTimeout(resolve, LOADING_DELAY.LOGIN));

            // Find user in mock data
            const user = mockUsers.find(u => u.email === email && u.password === password);

            if (user) {
                const { password: _, ...userWithoutPassword } = user;
                set({
                    user: userWithoutPassword,
                    isAuthenticated: true,
                    isLoading: false
                });
                return { success: true };
            } else {
                set({ isLoading: false });
                return { success: false, error: 'Nieprawidłowy email lub hasło' };
            }
        } catch (error) {
            set({ isLoading: false });
            return { success: false, error: 'Błąd podczas logowania' };
        }
    },

    register: async (email, password, firstName, lastName) => {
        set({ isLoading: true });

        try {
            // Mock API delay
            await new Promise(resolve => setTimeout(resolve, LOADING_DELAY.REGISTER));

            // Check if user already exists
            const existingUser = mockUsers.find(u => u.email === email);
            if (existingUser) {
                set({ isLoading: false });
                return { success: false, error: 'Użytkownik o tym emailu już istnieje' };
            }

            // Create new user
            const newUser = {
                id: mockUsers.length + 1,
                email,
                firstName,
                lastName
            };

            // Add to mock data (in real app this would be API call)
            mockUsers.push({ ...newUser, password });

            set({
                user: newUser,
                isAuthenticated: true,
                isLoading: false
            });
            return { success: true };
        } catch (error) {
            set({ isLoading: false });
            return { success: false, error: 'Błąd podczas tworzenia konta' };
        }
    },

    logout: () => {
        set({
            user: null,
            isAuthenticated: false,
            isLoading: false
        });
    },

    // Check if user is logged in on app start
    checkAuth: () => {
        // In real app, this would check localStorage/sessionStorage or make API call
        const savedUser = localStorage.getItem('strzykawa_user');
        if (savedUser) {
            try {
                const user = JSON.parse(savedUser);
                set({ user, isAuthenticated: true });
            } catch (error) {
                localStorage.removeItem('strzykawa_user');
            }
        }
    },

    // Persist user data (for development)
    persistUser: () => {
        const { user } = get();
        if (user) {
            localStorage.setItem('strzykawa_user', JSON.stringify(user));
        }
    }
}));