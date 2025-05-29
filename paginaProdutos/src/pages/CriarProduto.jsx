import { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import './OrganizarProdutos.css';

function CriarProduto() {
  const { produtos, setProdutos } = useOutletContext();
  const navigate = useNavigate();
  const [form, setForm] = useState({ id: '', nome: '', valor: '', imagem: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const novoId = produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1;

    const novoProduto = {
      id: novoId,
      nome: form.nome,
      valor: parseFloat(form.valor),
      imagem: form.imagem,
    };

    setProdutos([...produtos, novoProduto]);
    alert('Produto criado com sucesso!');
    navigate('/produtos');
  };

  return (
    <div className="criar-produto-container">
      <h2>Adicionar Produto</h2>
      <form onSubmit={handleSubmit} className="form-criar-produto">
        <div className="form-criar-produto">
          <input
            className="input-criar-produto"
            name="id"
            placeholder="Id (Número para cada produto)"
            value={form.id}
            onChange={handleChange}
            required
          />
          <input
            className="input-criar-produto"
            name="nome"
            placeholder="Nome do produto"
            value={form.nome}
            onChange={handleChange}
            required
          />
          <input
            className="input-criar-produto"
            name="valor"
            placeholder="Valor (Apenas números)"
            type="number"
            step="0.01"
            value={form.valor}
            onChange={handleChange}
            required
          />
          <input
            className="input-criar-produto"
            name="imagem"
            placeholder="URL da imagem"
            value={form.imagem}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn-criar-produto">Criar</button>
          {form.imagem && (
            <div className="preview-container">
              <p>Pré-visualização da imagem:</p>
              <img
                src={form.imagem}
                alt="Pré-visualização"
                className="preview-imagem"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default CriarProduto;
