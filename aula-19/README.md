# Aula 19 - Relatórios e Exportação de Inscrições

Nesta aula, você irá implementar um painel para o admin visualizar e exportar as inscrições dos eventos em formato CSV.

## Objetivos
- Listar todas as inscrições realizadas
- Permitir exportação das inscrições para CSV
- Interface didática e simples

## Estrutura sugerida
- `admin/relatorios.html`, `relatorios.js`, `relatorios.css`
- `backend/inscricoes_report.php` (retorna inscrições em JSON ou CSV)

## Dicas
- Use o banco de dados de inscrições criado na aula 16.
- Use PHP para gerar CSV (header `Content-Type: text/csv`).
- Mostre dicas de uso e debug no painel.
