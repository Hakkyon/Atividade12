import './App.css';
import { useState } from 'react';
import { produtos } from './componentes/produtos.jsx';
import Login from './pages/Login.jsx';
import CriarLogin from './pages/CriarLogin.jsx';
import { Link, Routes, Route } from 'react-router-dom';

function App() {
  const [carrinho, setCarrinho] = useState({});
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);

  const adicionarAoCarrinho = (produto) => {
    console.log('clicou', produto.id, produto.nome);
    setCarrinho(prev => {
      const novo = { ...prev };
      if (novo[produto.id]) {
        novo[produto.id].quantidade += 1;
      } else {
        const { id, nome, valor, imagem } = produto;
        novo[id] = { id, nome, valor, imagem, quantidade: 1 };
      }
      return novo;
    });

    setCarrinhoAberto(true);
  };

  const calcularTotal = () =>
    Object.values(carrinho)
      .reduce((s, item) => s + item.valor * item.quantidade, 0)
      .toFixed(2);

  const temItens = Object.keys(carrinho).length > 0;

  const toggleCarrinho = () => setCarrinhoAberto(!carrinhoAberto);

  return (
    <div className={`container ${carrinhoAberto ? 'carrinho-aberto' : ''}`}>
      <nav className='navbar'> |
        <Link to="/">Produtos</Link> |
        <Link to="/login">Login</Link> | 
        <Link to="/criar-login">Criar Login</Link> |
      </nav>

      <Routes>
        <Route path="/" element={
          <>
            <div className="produtos">
              {produtos.map(produto => (
                <div key={produto.id} className="produto">
                  <img src={produto.imagem} alt={produto.nome} />
                  <h3>{produto.nome}</h3>
                  <p>R$ {produto.valor.toFixed(2)}</p>
                  <button type="button" onClick={() => adicionarAoCarrinho(produto)}>
                    Comprar
                  </button>
                </div>
              ))}
            </div>

            <button className="botao-carrinho" onClick={toggleCarrinho}>
              {carrinhoAberto ? 'Fechar Carrinho' : 'Abrir Carrinho'}
            </button>

            <aside className={`carrinho ${carrinhoAberto ? 'aberto' : ''}`}>
              <h2>Carrinho de Compras</h2>
              <button className="fechar-carrinho" onClick={toggleCarrinho}>X</button>
              {temItens ? (
                <>
                  <ul>
                    {Object.values(carrinho).map(item => (
                      <li key={item.id}>
                        <img
                          src={item.imagem}
                          alt={item.nome}
                          className='img-carrinho'
                        />
                        <p><strong>{item.nome}</strong></p>
                        <p>Quantidade: {item.quantidade}
                          <button type="button" className="botao-carrinho-add" onClick={() => adicionarAoCarrinho(item)}>
                          +
                          </button>
                        </p>
                        <p>Subtotal: R$ {(item.valor * item.quantidade).toFixed(2)}</p>
                      </li>
                    ))}
                  </ul>
                  <h3 className='total-preco'>Total: R$ {calcularTotal()}</h3>
                </>
              ) : (
                <p>O carrinho está vazio.</p>
              )}
            </aside>
          </>
        }/>

        <Route path="/login" element={<Login />} />
        <Route path="/criar-login" element={<CriarLogin />} />
      </Routes>
    </div>
  );
}

export default App;
