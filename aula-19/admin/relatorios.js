async function carregarInscricoes() {
  const r = await fetch('../backend/inscricoes_report.php');
  const inscricoes = await r.json();
  const lista = document.getElementById('inscricoes-lista');
  lista.innerHTML = '';
  inscricoes.forEach(insc => {
    const div = document.createElement('div');
    div.className = 'inscricao-card';
    div.innerHTML = `<b>${insc.nome}</b> - ${insc.email} <br> Evento: ${insc.evento_nome} <br> Data: ${insc.data}`;
    lista.appendChild(div);
  });
}

function exportarCSV() {
  window.open('../backend/inscricoes_report.php?csv=1', '_blank');
}

carregarInscricoes();
