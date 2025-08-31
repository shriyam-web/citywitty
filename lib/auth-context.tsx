'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'merchant' | 'franchise' | 'it' | 'user';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role?: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, name: string, role?: string) => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem('citywitty_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: string = 'user'): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Demo credentials validation
      const demoCredentials = {
        'user@demo.com': { password: 'password123', role: 'user', name: 'John Doe' },
        'admin@citywitty.com': { password: 'admin123', role: 'admin', name: 'Admin User' },
        'merchant@business.com': { password: 'merchant123', role: 'merchant', name: 'Business Owner' },
        'franchise@citywitty.com': { password: 'franchise123', role: 'franchise', name: 'Franchise Manager' },
        'it@citywitty.com': { password: 'it123', role: 'it', name: 'IT Support' }
      };
      
      const credential = demoCredentials[email as keyof typeof demoCredentials];
      if (!credential || credential.password !== password) {
        return false;
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: credential.name,
        role: credential.role as User['role'],
      };
      
      setUser(mockUser);
      localStorage.setItem('citywitty_user', JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string, role: string = 'user'): Promise<boolean> => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        role: role as User['role'],
      };
      
      setUser(mockUser);
      localStorage.setItem('citywitty_user', JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('citywitty_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}