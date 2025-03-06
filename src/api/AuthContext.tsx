"use client";

import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  cpf: string;
  fullname: string;
  password: string; // Senha codificada em base64
}

interface AuthContextType {
  user: User | null;
  login: (cpf: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Recupera o estado do usuário ao carregar a página
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);

          // Decodificar a senha de base64 antes de validar
          const decodedPassword = atob(parsedUser.password);

          // Validar usuário armazenado fazendo uma chamada à API
          try {
            const response = await fetch(
              `${API_URL}/patient/requisitions?cpf=${parsedUser.cpf}&password=${decodedPassword}`,
              {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            );

            if (response.ok) {
              // Se a validação for bem-sucedida, defina o usuário
              setUser(parsedUser);
            } else {
              // Se a validação falhar, limpe o localStorage
              localStorage.removeItem("user");
            }
          } catch (error) {
            console.error("Erro ao validar usuário:", error);
            localStorage.removeItem("user");
          }
        }
      } catch (error) {
        console.error("Erro ao recuperar usuário do localStorage:", error);
        localStorage.removeItem("user");
      } finally {
        setLoading(false); // Finaliza o carregamento após tentar recuperar o usuário
      }
    };

    loadUser();
  }, []);

  const login = async (cpf: string, password: string) => {
    try {
      // Codificar a senha em base64 antes de enviar ao localStorage
      const encodedPassword = btoa(password);

      const response = await fetch(
        `${API_URL}/patient/requisitions?cpf=${cpf}&password=${password}`, // Enviar a senha sem codificação para a API
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Credenciais inválidas");
      }

      const data = await response.json();

      const userData: User = {
        cpf: data.patient.cpf,
        fullname: data.patient.fullname,
        password: encodedPassword, // Armazenar a senha codificada em base64
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      router.push("/dashboard");
    } catch (error) {
      console.error("Erro no login:", error);
      throw new Error("CPF ou senha inválidos!");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login, 
        logout,
        isAuthenticated: !!user,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }

  return context;
};
