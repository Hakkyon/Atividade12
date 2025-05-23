import React from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';


function Login() {
  const navigate = useNavigate();
  const handleLogin = (e)=> {
    e.preventDefault();
    navigate('/login')
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Senha" />
        <button type="submit" onClick={navigate('/')}>Entrar</button>
      </form>
      <p>
      <a onClick={() => navigate('/criar-login')}>Crie sua conta aqui</a>
    </p>
    </div>
    
  );
}

export default Login;