import React from 'react';
import { useOutletContext } from 'react-router-dom';
  
export default function ListarProdutos() {
  const { produtos, adicionarAoCarrinho } = useOutletContext();

  return (
    <div>
      <h1>Lista de Produtos</h1>
      <ul className="produtos">
        {produtos.map((produto) => (
          <li className="produto" key={produto.id}>
            <img 
              src={produto.imagem} 
              alt={produto.nome} 
              width={100}
            />
            <h3>{produto.nome}</h3>
            <p>R$ {produto.valor.toFixed(2)}</p>
            <button onClick={() => adicionarAoCarrinho(produto)}>Comprar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
