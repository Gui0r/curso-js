# Backend Estatísticas - Aula 20

Este backend fornece o endpoint para estatísticas agregadas dos eventos e inscrições.

## Endpoints
- `estatisticas.php`:
  - `GET`: Retorna total de eventos, total de inscrições e inscrições por evento (JSON).

> Requer sessão admin ativa (login pelo painel admin da aula 18).

## Banco de Dados
- Usa o mesmo banco `eventos.db` das aulas anteriores.
- Tabelas usadas: `eventos`, `inscricoes`.

## Dicas de Debug
- Se der erro 401, faça login como admin.
- Veja erros do PHP no console do navegador (aba Network).
