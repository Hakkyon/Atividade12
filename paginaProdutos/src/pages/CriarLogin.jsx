import { useNavigate } from "react-router-dom";
import React from "react";
import './Login.css';

function CriarLogin() {
  const navigate = useNavigate();
  const handleCadastro = (e) => {e.preventDefault(); navigate('/login');}

  return (
    <div className="login-container">
      <h1>Criar Login</h1>
      <form onSubmit={handleCadastro}>
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Senha" />
        <input type="password" placeholder="Confirmar Senha" />
        <button type="submit">Criar Conta</button>
      </form>
    </div>
  );
}

export default CriarLogin;