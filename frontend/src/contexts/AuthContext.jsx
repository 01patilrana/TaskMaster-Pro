import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

// Demo users for testing without a backend
const DEMO_USERS = [
  { id: '1', email: 'demo@taskmaster.com', password: 'demo123' },
  { id: '2', email: 'admin@taskmaster.com', password: 'admin123' },
];

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('demoUser');
    return stored ? JSON.parse(stored) : null;
  });
  const [loading] = useState(false);

  const login = async (email, password) => {
    const found = DEMO_USERS.find(u => u.email === email && u.password === password);
    if (!found) {
      throw new Error('Invalid credentials. Use demo@taskmaster.com / demo123');
    }
    const userData = { id: found.id, email: found.email };
    localStorage.setItem('demoUser', JSON.stringify(userData));
    setUser(userData);
    return { user: userData };
  };

  const register = async (email, password) => {
    if (DEMO_USERS.find(u => u.email === email)) {
      throw new Error('User already exists');
    }
    const userData = { id: String(Date.now()), email };
    localStorage.setItem('demoUser', JSON.stringify(userData));
    setUser(userData);
    return { user: userData };
  };

  const logout = () => {
    localStorage.removeItem('demoUser');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
