import './App.css';
import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { produtos as produtosFixos } from './componentes/produtos';

function App() {
  const [carrinho, setCarrinho] = useState({});
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    fetch('http://localhost:3000/produtos/ler')
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao carregar produtos');
        return res.json();
      })
      .then((produtosDoBanco) => {
        const idsFixos = new Set(produtosFixos.map(p => p.id));
        const apenasDoBanco = produtosDoBanco.filter(p => !idsFixos.has(p.id));
        setProdutos([...produtosFixos, ...apenasDoBanco]);
      })
      .catch((err) => {
        alert(err.message);
        setProdutos(produtosFixos);
      });
  }, []);

  const adicionarAoCarrinho = (produto) => {
    setCarrinho((prev) => {
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
      <nav className="navbar"> |
        <Link to="/"
          onClick={(e) => {
            if (location.pathname === '/') {
              e.preventDefault();
              alert('Você já está na Home');
            }
          }}>
          Home
        </Link> |

        <Link to="/produtos"
          onClick={(e) => {
            if (location.pathname === '/produtos') {
              e.preventDefault();
              alert('Você já está em Produtos');
            }
          }}>
          Produtos
        </Link> |

        {!user && (
          <>
            <Link to="/criar-login"
              onClick={(e) => {
                if (location.pathname === '/criar-login') {
                  e.preventDefault();
                  alert('Você já está se cadastrando');
                }
              }}>
              Cadastrar-se
            </Link> |
          </>
        )}

        {user && (
          <>
            <span>Bem-vindo, {user.email}</span> |
            <button onClick={logout} className="botao-logout">Sair</button> |
          </>
        )}
      </nav>

      <Outlet context={{ produtos, setProdutos, adicionarAoCarrinho }} />

      <button className="botao-carrinho" onClick={toggleCarrinho}>
        {carrinhoAberto ? 'Fechar Carrinho' : 'Abrir Carrinho'}
      </button>

      <aside className={`carrinho ${carrinhoAberto ? 'aberto' : ''}`}>
        <h2>Carrinho de Compras</h2>
        <button className="fechar-carrinho" onClick={toggleCarrinho}>X</button>
        {temItens ? (
          <>
            <ul>
              {Object.values(carrinho).map((item) => (
                <li key={item.id}>
                  <img src={item.imagem} alt={item.nome} className="img-carrinho" />
                  <p><strong>{item.nome}</strong></p>
                  <p>
                    Quantidade: {item.quantidade}
                    <button className='botao-carrinho-add' onClick={() => adicionarAoCarrinho(item)}>+</button>
                  </p>
                  <p>Subtotal: R$ {(item.valor * item.quantidade).toFixed(2)}</p>
                </li>
              ))}
            </ul>
            <h3 className="total-preco">Total: R$ {calcularTotal()}</h3>
          </>
        ) : (
          <p>O carrinho está vazio.</p>
        )}
      </aside>
    </div>
  );
}

export default App;