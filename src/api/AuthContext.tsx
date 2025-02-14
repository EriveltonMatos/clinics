"use client"
import { createContext, useContext, useState, ReactNode } from 'react';
import { User, AuthContextType } from './types';

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string): boolean => {
    // Aqui é onde vou precisar implementar a lógica real de autenticação
    // Este é apenas um exemplo simplificado
    if (username === "admin" && password === "123456") {
      setUser({ username });
      return true;
    }
    return false;
  };

  const logout = (): void => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
