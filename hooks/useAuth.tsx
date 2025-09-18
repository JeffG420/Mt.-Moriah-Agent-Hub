import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';
import { users } from '../data/users';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (agentId: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for a logged-in user in localStorage on initial load
    try {
      const storedUser = localStorage.getItem('moriah-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('moriah-user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (agentId: string, password: string): Promise<boolean> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const foundUser = users.find(u => u.agentId.toLowerCase() === agentId.toLowerCase());
    
    if (foundUser && foundUser.password === password) {
        // Omit password before storing in state and localStorage
        const { password: _, ...userToStore } = foundUser;
        
        setUser(userToStore);
        localStorage.setItem('moriah-user', JSON.stringify(userToStore));
        navigate('/dashboard', { replace: true });
        return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('moriah-user');
    navigate('/login', { replace: true });
  };

  const value = { user, loading, login, logout };

  return (
    <AuthContext.Provider value={value}>
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