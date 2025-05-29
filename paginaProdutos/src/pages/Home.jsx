import React from 'react';
import { useOutletContext } from 'react-router-dom';

function Home() {
  const { produtos, adicionarAoCarrinho } = useOutletContext();

  return (
    <div className="produtos">
      {produtos.map((produto) => (
        <div className="produto" key={produto.id}>
          <img src={produto.imagem} alt={produto.nome} />
          <h3>{produto.nome}</h3>
          <p>R$ {produto.valor.toFixed(2)}</p>
          <button onClick={() => adicionarAoCarrinho(produto)}>Comprar</button>
        </div>
      ))}
    </div>
  );
}

export default Home;
