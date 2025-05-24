import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';

function CriarLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleCadastro = (e) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      alert("Senhas diferentes.");
      return;
    }

    localStorage.setItem('userEmail', email);
    localStorage.setItem('userSenha', senha);

    alert("Conta criada com sucesso!");
    navigate('/login');
  };

  return (
    <div className="login-container">
      <h1>Criar Login</h1>
      <form onSubmit={handleCadastro}>
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
        <input
          type="password"
          placeholder="Confirmar Senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          required
        />
        <button type="submit">Criar Conta</button>
      </form>
    </div>
  );
}

export default CriarLogin;
