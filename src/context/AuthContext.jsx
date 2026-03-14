import React, { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

// Mock users
const MOCK_USERS = [
  { id: 1, email: 'admin@company.com', password: 'admin123', name: 'Admin User', role: 'admin', avatar: 'AD' },
  { id: 2, email: 'leader@company.com', password: 'leader123', name: 'Tri Leader', role: 'leader', avatar: 'TR' },
  { id: 3, email: 'member@company.com', password: 'member123', name: 'Hieu Member', role: 'member', avatar: 'HI' },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = sessionStorage.getItem('auth_user');
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });
  const [error, setError] = useState('');

  const login = useCallback((email, password) => {
    setError('');
    const found = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...safeUser } = found;
      setUser(safeUser);
      sessionStorage.setItem('auth_user', JSON.stringify(safeUser));
      return { ok: true, user: safeUser };
    }
    setError('Email hoặc mật khẩu không đúng.');
    return { ok: false };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem('auth_user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, error, setError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
