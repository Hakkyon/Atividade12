import { useState } from 'react';
import './OrganizarProdutos.css';

function RemoverProduto() {
  const [id, setId] = useState('');

  const handleDelete = async () => {
    if (!id) return alert("Informe o ID");

    try {
      const res = await fetch(`http://localhost:3000/produtos/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error();
      alert('Produto removido com sucesso!');
      setId('');
      
    } catch {
      alert('Erro ao remover produto');
    }
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
