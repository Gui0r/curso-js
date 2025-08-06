// Utilitários
const getProdutos = () => JSON.parse(localStorage.getItem('produtos') || '[]');
const setProdutos = (produtos) => localStorage.setItem('produtos', JSON.stringify(produtos));

// DOM Elements
const form = document.getElementById('produtoForm');
const lista = document.getElementById('produtos');
const nomeInput = document.getElementById('nome');
const categoriaInput = document.getElementById('categoria');

// Renderiza lista de produtos
const render = () => {
  lista.innerHTML = '';
  const produtos = getProdutos();
  produtos.forEach((p, i) => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${p.nome} <small>(${p.categoria})</small></span>
      <button onclick="editar(${i})">Editar</button>
      <button onclick="excluir(${i})">Excluir</button>`;
    lista.appendChild(li);
  });
};

// Adiciona produto
form.onsubmit = e => {
  e.preventDefault();
  const nome = nomeInput.value.trim();
  const categoria = categoriaInput.value.trim();
  if (!nome || !categoria) return;
  const produtos = getProdutos();
  produtos.push({ nome, categoria });
  setProdutos(produtos);
  nomeInput.value = '';
  categoriaInput.value = '';
  render();
};

// Edita produto
window.editar = idx => {
  const produtos = getProdutos();
  const novoNome = prompt('Novo nome:', produtos[idx].nome);
  const novaCategoria = prompt('Nova categoria:', produtos[idx].categoria);
  if (novoNome && novaCategoria) {
    produtos[idx] = { nome: novoNome, categoria: novaCategoria };
    setProdutos(produtos);
    render();
  }
};

// Exclui produto
window.excluir = idx => {
  if (confirm('Excluir este produto?')) {
    const produtos = getProdutos();
    produtos.splice(idx, 1);
    setProdutos(produtos);
    render();
  }
};

// Inicialização
try {
  render();
} catch (e) {
  alert('Erro ao carregar produtos!');
}
