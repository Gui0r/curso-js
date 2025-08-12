async function carregarEstatisticas() {
  const r = await fetch('../backend/estatisticas.php');
  const stats = await r.json();
  document.getElementById('resumo').innerHTML = `
    <b>Total de eventos:</b> ${stats.total_eventos}<br>
    <b>Total de inscrições:</b> ${stats.total_inscricoes}<br>
  `;
  // Gráfico 1: Inscrições por evento
  new Chart(document.getElementById('grafico1'), {
    type: 'bar',
    data: {
      labels: stats.eventos.map(e => e.nome),
      datasets: [{
        label: 'Inscrições por Evento',
        data: stats.eventos.map(e => e.inscricoes),
        backgroundColor: '#3498db'
      }]
    }
  });
  // Gráfico 2: Pizza de inscrições por evento
  new Chart(document.getElementById('grafico2'), {
    type: 'pie',
    data: {
      labels: stats.eventos.map(e => e.nome),
      datasets: [{
        data: stats.eventos.map(e => e.inscricoes),
        backgroundColor: ['#3498db','#e67e22','#2ecc71','#9b59b6','#e74c3c']
      }]
    }
  });
}

carregarEstatisticas();
