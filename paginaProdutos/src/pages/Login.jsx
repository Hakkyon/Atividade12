import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const handleLogin = (e) => {e.preventDefault();login(email, senha);};
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input 
          type="text" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input 
          type="password" 
          placeholder="Senha" 
          value={senha} 
          onChange={(e) => setSenha(e.target.value)} 
          required
        />
        <button type="submit">Entrar</button>
      </form>
      <p>
        <Link to="/criar-login">Crie sua conta aqui</Link>
      </p>
    </div>
  );
}

export default Login;
