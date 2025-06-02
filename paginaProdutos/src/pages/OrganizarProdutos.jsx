import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import './OrganizarProdutos.css';

function OrganizarProdutos() {
  const [produtos, setProdutos] = useState([]);
  const location = useLocation();

  const adicionarAoCarrinho = (produto) => {
    console.log('Produto adicionado ao carrinho:', produto);
  };

  useEffect(() => {
    fetch('http://localhost:3000/produtos/ler')
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao carregar produtos');
        return res.json();
      })
      .then((data) => setProdutos(data))
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  return (
    <div style={{ display: 'flex', marginTop: '60px' }}>
      <aside className='organizar-produtos'>
        <h2 className='text-menu'>Organizar Produtos</h2>
        <Link to="/produtos"
          onClick={(e) => {
            if (location.pathname === '/produtos') {
              e.preventDefault();
              alert('Você já está em Produtos');
            }
          }}>
          Produtos
        </Link> __________________

        <Link to="/produtos/criar"
          onClick={(e) => {
            if (location.pathname === '/produtos/criar') {
              e.preventDefault();
              alert('Você já está em Adicionar Produtos');
            }
          }}>
          Adicionar Produto
        </Link> __________________

        <Link to="/produtos/atualizar"
          onClick={(e) => {
            if (location.pathname === '/produtos/atualizar') {
              e.preventDefault();
              alert('Você já está em Atualizar Produtos');
            }
          }}>
          Atualizar Produto
        </Link> __________________

        <Link className='organizar-produtos-remover' to="/produtos/remover"
          onClick={(e) => {
            if (location.pathname === '/produtos/remover') {
              e.preventDefault();
              alert('Você já está em Remover Produtos');
            }
          }}>
          Remover Produto
        </Link>

      </aside>

      <main>
        <Outlet context={{ produtos, setProdutos, adicionarAoCarrinho }} />
      </main>
    </div>
  );
}
export default OrganizarProdutos;