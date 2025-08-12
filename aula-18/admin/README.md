# Painel Admin - Aula 18

Este painel permite ao admin gerenciar eventos (CRUD) após login.

## Funcionalidades
- Login de admin (usuário: `admin`, senha: `1234`)
- Listar, criar, editar e excluir eventos
- Logout

## Como usar
1. Acesse `login.html` e faça login.
2. Após login, será redirecionado ao `dashboard.html`.
3. No dashboard, gerencie os eventos.

## Estrutura dos arquivos
- `login.html`, `login.js`: Tela e lógica de login
- `dashboard.html`, `dashboard.js`, `dashboard.css`: Painel de eventos
- Backend: `../backend/auth.php`, `../backend/events_crud.php`

## Dicas
- Se perder a sessão, faça login novamente.
- O banco de dados é compartilhado com as aulas anteriores.
- Para resetar o formulário, clique em "Novo Evento".
