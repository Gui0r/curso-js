# Backend Relatórios - Aula 19

Este backend fornece o endpoint para listar e exportar inscrições dos eventos.

## Endpoints
- `inscricoes_report.php`:
  - `GET`: Retorna todas as inscrições em JSON.
  - `GET ?csv=1`: Retorna todas as inscrições em formato CSV para download.

> Requer sessão admin ativa (login pelo painel admin da aula 18).

## Banco de Dados
- Usa o mesmo banco `eventos.db` das aulas anteriores.
- Tabela usada: `inscricoes` (criada na aula 16).

## Dicas de Debug
- Se der erro 401, faça login como admin.
- Veja erros do PHP no console do navegador (aba Network).
