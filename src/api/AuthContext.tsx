"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

// Tipagem dos dados do usuário e do contexto de autenticação
interface User {
  username: any;
  cpf: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (cpf: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Criando o contexto
const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

// URL base da API
const API_BASE_URL = "http://130.11.0.35:8080/health-service";

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  // Verifica se há usuário salvo no localStorage ao carregar a aplicação
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Função de login real com chamada à API
  const login = async (cpf: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/patient/requisitions`, {
        params: { cpf, password },
      });

      if (response.status === 200) {
        const userData: User = {
          cpf, token: "fakeToken123",
          username: undefined
        }; // Backend não forneceu token, então pode precisar de ajuste
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        return true;
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
    return false;
  };

  // Função de logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar a autenticação
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};