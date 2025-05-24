import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (email, senha) => {
  const savedEmail = localStorage.getItem('userEmail');
  const savedSenha = localStorage.getItem('userSenha');

  if (email === savedEmail && senha === savedSenha) {
    setUser({ email });
    navigate('/');
  } else {
    alert('E-mail ou senha incorretos');
  }
};


  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
