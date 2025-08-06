// Busca e exibição de usuários
const tabela = document.getElementById('tabelaUsuarios').querySelector('tbody');
const buscaInput = document.getElementById('busca');

function renderUsuarios(usuarios) {
  tabela.innerHTML = '';
  usuarios.forEach(u => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${u.id}</td><td>${u.nome}</td>`;
    tabela.appendChild(tr);
  });
}

function buscar() {
  fetch('http://localhost/curso-js/aula-13-backend-php-e-mysql/server.php?endpoint=usuarios')
    .then(r => r.json())
    .then(data => {
      let usuarios = data;
      const termo = buscaInput.value.trim().toLowerCase();
      if (termo) {
        usuarios = usuarios.filter(u => u.nome.toLowerCase().includes(termo));
      }
      renderUsuarios(usuarios);
    })
    .catch(() => alert('Erro ao buscar usuários!'));
}

// Inicialização
buscar();
