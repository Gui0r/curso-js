// Lista de eventos estática (simulação)
const eventos = [
  {
    id: 1,
    nome: 'Workshop de JavaScript',
    data: '2025-09-10',
    local: 'Auditório Central',
    descricao: 'Aprenda JS moderno com exemplos práticos.'
  },
  {
    id: 2,
    nome: 'Encontro de Frontend',
    data: '2025-09-15',
    local: 'Sala 101',
    descricao: 'Discussão sobre tendências em HTML, CSS e JS.'
  },
  {
    id: 3,
    nome: 'Palestra: Banco de Dados',
    data: '2025-09-20',
    local: 'Online',
    descricao: 'Conceitos de SQL, NoSQL e integração com web.'
  }
];

// Função para animar entrada dos cards
function fadeInList() {
  const cards = document.querySelectorAll('.evento-card');
  cards.forEach((card, i) => {
    setTimeout(() => card.classList.add('animate'), i * 120);
  });
}

// Renderiza eventos
function renderEventos() {
  const lista = document.getElementById('eventos-lista');
  lista.innerHTML = '';
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
  fadeInList();
}

// Inicialização
renderEventos();
