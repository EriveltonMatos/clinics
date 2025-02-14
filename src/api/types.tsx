export interface User {
    username: string;
  }
  
  export interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => boolean;
    logout: () => void;
  }