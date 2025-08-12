// Painel admin: CRUD de eventos
async function fetchEventos() {
  const r = await fetch('../backend/events_crud.php');
  return r.json();
}

function renderEventos(eventos) {
  const lista = document.getElementById('eventos-lista');
  lista.innerHTML = '';
  eventos.forEach(ev => {
    const div = document.createElement('div');
    div.className = 'evento-card';
    div.innerHTML = `
      <b>${ev.nome}</b> <small>${ev.data}</small> <br>
      <span>${ev.local}</span><br>
      <span>${ev.descricao}</span><br>
      <button onclick="editar(${ev.id})">Editar</button>
      <button onclick="excluir(${ev.id})">Excluir</button>
    `;
    lista.appendChild(div);
  });
}

async function carregar() {
  const eventos = await fetchEventos();
  renderEventos(eventos);
}

carregar();

window.editar = id => {
  fetch('../backend/events_crud.php?id=' + id)
    .then(r => r.json())
    .then(ev => {
      document.getElementById('eventoId').value = ev.id;
      document.getElementById('nome').value = ev.nome;
      document.getElementById('data').value = ev.data;
      document.getElementById('local').value = ev.local;
      document.getElementById('descricao').value = ev.descricao;
    });
};

window.excluir = id => {
  if (confirm('Excluir evento?')) {
    fetch('../backend/events_crud.php', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    }).then(() => carregar());
  }
};

document.getElementById('eventoForm').onsubmit = function(e) {
  e.preventDefault();
  const id = document.getElementById('eventoId').value;
  const nome = document.getElementById('nome').value;
  const data = document.getElementById('data').value;
  const local = document.getElementById('local').value;
  const descricao = document.getElementById('descricao').value;
  const metodo = id ? 'PUT' : 'POST';
  fetch('../backend/events_crud.php', {
    method: metodo,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, nome, data, local, descricao })
  }).then(() => {
    carregar();
    resetForm();
  });
};

function resetForm() {
  document.getElementById('eventoId').value = '';
  document.getElementById('nome').value = '';
  document.getElementById('data').value = '';
  document.getElementById('local').value = '';
  document.getElementById('descricao').value = '';
}

function logout() {
  fetch('../backend/auth.php?logout=1').then(() => window.location = 'login.html');
}
