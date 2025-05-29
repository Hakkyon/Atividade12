import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.jsx';
import Login from './pages/Login.jsx';
import CriarLogin from './pages/CriarLogin.jsx';
import CriarProduto from './pages/CriarProduto.jsx';
import AtualizarProduto from './pages/AtualizarProduto.jsx';
import RemoverProduto from './pages/RemoverProduto.jsx';
import ListarProdutos from './pages/ListarProdutos.jsx';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import OrganizarProdutos from './pages/OrganizarProdutos.jsx';
import Home from './pages/Home';


function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />

          <Route path="produtos" element={<OrganizarProdutos />}>
            <Route index element={<ListarProdutos />} />
            <Route path="criar" element={
              <PrivateRoute>
                <CriarProduto />
              </PrivateRoute>
            } />
            <Route path="atualizar" element={
              <PrivateRoute>
                <AtualizarProduto />
              </PrivateRoute>
            } />
            <Route path="remover" element={
              <PrivateRoute>
                <RemoverProduto />
              </PrivateRoute>
            } />
          </Route>

          <Route path="login" element={<Login />} />
          <Route path="criar-login" element={<CriarLogin />} />
        </Route>
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);
