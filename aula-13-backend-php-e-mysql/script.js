// Teste de endpoint PHP
function testarUsuarios() {
  fetch('server.php?endpoint=usuarios')
    .then(r => r.json())
    .then(data => {
      const ul = document.getElementById('usuarios');
      ul.innerHTML = '';
      data.forEach(u => {
        const li = document.createElement('li');
        li.textContent = `${u.id}: ${u.nome}`;
        ul.appendChild(li);
      });
    })
    .catch(() => alert('Erro ao buscar usuários!'));
}
