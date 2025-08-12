// Lista de eventos (simulação)
const eventos = [
  { id: 1, nome: 'Workshop de JavaScript', data: '2025-09-10', local: 'Auditório Central', descricao: 'Aprenda JS moderno com exemplos práticos.' },
  { id: 2, nome: 'Encontro de Frontend', data: '2025-09-15', local: 'Sala 101', descricao: 'Discussão sobre tendências em HTML, CSS e JS.' },
  { id: 3, nome: 'Palestra: Banco de Dados', data: '2025-09-20', local: 'Online', descricao: 'Conceitos de SQL, NoSQL e integração com web.' }
];

// Validação de e-mail simples
function validarEmail(email) {
  return /^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(email);
}

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
      <form class="inscricao-form">
        <input type="text" name="nome" placeholder="Seu nome" required>
        <input type="email" name="email" placeholder="Seu e-mail" required>
        <button type="submit">Inscrever-se</button>
        <div class="status-msg"></div>
      </form>
    `;
    // Lógica de inscrição
    const form = card.querySelector('.inscricao-form');
    const statusMsg = card.querySelector('.status-msg');
    form.onsubmit = async e => {
      e.preventDefault();
      const nome = form.nome.value.trim();
      const email = form.email.value.trim();
      if (!validarEmail(email)) {
        statusMsg.textContent = 'E-mail inválido!';
        statusMsg.className = 'status-msg error';
        return;
      }
      statusMsg.textContent = 'Enviando...';
      statusMsg.className = 'status-msg';
      try {
        const resp = await fetch('backend/inscrever.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome, email, evento_id: ev.id })
        });
        const data = await resp.json();
        if (data.ok) {
          statusMsg.textContent = 'Inscrição realizada com sucesso!';
          statusMsg.className = 'status-msg';
          form.reset();
        } else {
          statusMsg.textContent = data.erro || 'Erro ao inscrever.';
          statusMsg.className = 'status-msg error';
        }
      } catch {
        statusMsg.textContent = 'Erro de conexão.';
        statusMsg.className = 'status-msg error';
      }
    };
    lista.appendChild(card);
  });
}

renderEventos();
