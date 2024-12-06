import React, { createContext, useContext, useState } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    if (email && password) {
      setUser({ email, name: email.split('@')[0] });
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const register = async (email: string, password: string, name: string) => {
    if (email && password && name) {
      setUser({ email, name });
    } else {
      throw new Error('Invalid registration data');
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      register,
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}