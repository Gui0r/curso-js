// Carrega eventos da API e renderiza
const lista = document.getElementById('eventos-lista');
const loader = document.getElementById('loader');
const erroMsg = document.getElementById('erro-msg');

function renderEventos(eventos) {
  lista.innerHTML = '';
  if (!eventos.length) {
    lista.innerHTML = '<p>Nenhum evento encontrado.</p>';
    return;
  }
  eventos.forEach(ev => {
    const card = document.createElement('div');
    card.className = 'evento-card';
    card.innerHTML = `
      <h3>${ev.nome}</h3>
      <span class="data">${ev.data}</span>
      <span class="local">${ev.local}</span>
      <div class="desc">${ev.descricao}</div>
    `;
    lista.appendChild(card);
  });
}

function carregarEventos() {
  loader.style.display = 'block';
  erroMsg.textContent = '';
  fetch('backend/events_api.php')
    .then(r => r.json())
    .then(data => {
      renderEventos(data);
    })
    .catch(() => {
      erroMsg.textContent = 'Erro ao carregar eventos.';
    })
    .finally(() => {
      loader.style.display = 'none';
    });
}

carregarEventos();
