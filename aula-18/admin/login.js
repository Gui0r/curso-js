document.getElementById('loginForm').onsubmit = async function(e) {
  e.preventDefault();
  const usuario = document.getElementById('usuario').value.trim();
  const senha = document.getElementById('senha').value.trim();
  const msg = document.getElementById('loginMsg');
  msg.textContent = 'Enviando...';
  try {
    const resp = await fetch('../backend/auth.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, senha })
    });
    const data = await resp.json();
    if (data.ok) {
      window.location = 'dashboard.html';
    } else {
      msg.textContent = data.erro || 'Login inválido';
    }
  } catch {
    msg.textContent = 'Erro de conexão.';
  }
};
