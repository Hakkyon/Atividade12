import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { produtos } from '../componentes/produtos';
import './OrganizarProdutos.css'


function OrganizarProdutos() {
  const adicionarAoCarrinho = (produto) => {
    console.log('Produto adicionado ao carrinho:', produto);
  };

  const location = useLocation();

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
        <Outlet context={{ produtos, adicionarAoCarrinho }} />
      </main>
    </div>
  );
}
export default OrganizarProdutos;