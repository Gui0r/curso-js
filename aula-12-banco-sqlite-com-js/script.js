// Utilitários e inicialização do banco
let db;
const tabela = document.getElementById('tabelaLivros').querySelector('tbody');
const form = document.getElementById('livroForm');

const initDB = async () => {
  try {
    const SQL = await initSqlJs({ locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}` });
    db = new SQL.Database();
    db.run('CREATE TABLE IF NOT EXISTS livros (id INT PRIMARY KEY, titulo TEXT, autor TEXT, categoria TEXT)');
    render();
  } catch (e) {
    alert('Erro ao inicializar o banco!');
  }
};

const render = () => {
  tabela.innerHTML = '';
  try {
    const res = db.exec('SELECT * FROM livros');
    if (res[0]) {
      res[0].values.forEach(livro => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${livro[1]}</td><td>${livro[2]}</td><td>${livro[3]}</td><td>
          <button onclick="excluirLivro('${livro[0]}')">Excluir</button>
        </td>`;
        tabela.appendChild(tr);
      });
    }
  } catch (e) {
    // tabela vazia
  }
};

form.onsubmit = e => {
  e.preventDefault();
  const titulo = document.getElementById('titulo').value.trim();
  const autor = document.getElementById('autor').value.trim();
  const categoria = document.getElementById('categoria').value.trim();
  if (!titulo || !autor || !categoria) return;
  const id = Math.floor(Math.random() * 1000000); // Gera um ID aleatório
  db.run('INSERT INTO livros VALUES (?, ?, ?, ?)', [id, titulo, autor, categoria]);
  render();
  form.reset();
};

function excluirLivro(id) {
  if (confirm(`Excluir o livro "${id}"?`)) {
    db.run('DELETE FROM livros WHERE id = ?', [id]);
    render();
  }
};

// Inicialização
initDB();
