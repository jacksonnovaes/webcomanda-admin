import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Tipos para o contexto de autenticação
interface AuthContextType {
    isLoggedIn: boolean;
    login: (token: string) => void;
    logout: () => void;
}

// Valor padrão para o contexto de autenticação
const defaultAuthContext: AuthContextType = {
    isLoggedIn: false,
    login: () => {},
    logout: () => {}
};

// Crie o contexto com um valor padrão
const AuthContext = createContext<AuthContextType>(defaultAuthContext);

// Hook para usar o contexto de autenticação
export const useAuth = () => useContext(AuthContext);

// Tipos para o provedor de autenticação
interface AuthProviderProps {
    children: ReactNode;
}

// Provedor de Autenticação
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Verifique se o usuário está logado (por exemplo, verificando um token no localStorage)
        const token = localStorage.getItem('authToken');
        setIsLoggedIn(!!token);
    }, []);

    const login = (token: string) => {
        localStorage.setItem('authToken', token);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
