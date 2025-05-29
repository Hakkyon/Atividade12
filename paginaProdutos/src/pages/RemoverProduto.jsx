import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import './OrganizarProdutos.css'; // Importa o CSS existente

function RemoverProduto() {
  const [id, setId] = useState('');
  const { produtos, setProdutos } = useOutletContext();

  const handleDelete = () => {
    const idNum = Number(id);
    if (!produtos.find(p => p.id === idNum)) {
      alert('Produto não encontrado');
      return;
    }
    const novosProdutos = produtos.filter(produto => produto.id !== idNum);
    setProdutos(novosProdutos);
    alert('Produto removido com sucesso!');
    setId('');
  };

  return (
    <div className="criar-produto-container">
      <h2>Remover Produto</h2>
      <div className="form-criar-produto">
        <input
          className="input-criar-produto"
          type="number"
          placeholder="ID do Produto"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <button onClick={handleDelete} className="btn-criar-produto">Remover</button>
      </div>
    </div>
  );
}

export default RemoverProduto;
