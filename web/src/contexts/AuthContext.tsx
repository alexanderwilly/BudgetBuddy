"use client";
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { api } from '@/app/api/axios';

interface User {
    id: string;
    email: string;
    fullname: string;
    master_currency: string;
    family_group_id: string | null;
    family_role: string | null;
    is_hidden_from_family: boolean | null;
    created_at: string;

}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (user: User) => void;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const checkSession = async () => {
        try {
            const res = await api.get('/auth/me');
            if (res.data) {
                setUser(res.data);
            }
        } catch {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkSession();
    }, []);

    const login = (userData: User) => {
        setUser(userData);
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            await api.post('/auth/logout');
            setUser(null);
        } catch (error) {
            console.error('Logout failed', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
