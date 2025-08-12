# Backend Admin - Aula 18

Este backend fornece autenticação de admin e CRUD de eventos para o painel administrativo.

## Endpoints

- `auth.php`:
  - `POST`: Login admin. Envie `{ "usuario": "admin", "senha": "1234" }`.
  - `GET`: Verifica se está logado.
  - `?logout=1`: Faz logout.
- `events_crud.php`:
  - `GET`: Lista todos os eventos (ou um evento por id).
  - `POST`: Cria evento. Envie JSON `{ nome, data, local, descricao }`.
  - `PUT`: Edita evento. Envie JSON `{ id, nome, data, local, descricao }`.
  - `DELETE`: Remove evento. Envie JSON `{ id }`.

> Todos os endpoints exigem sessão admin ativa (exceto login/logout).

## Banco de Dados
Usa o mesmo banco `eventos.db` criado na aula 17. Se necessário, copie o arquivo de lá.

## Segurança
- Usuário/senha fixos para fins didáticos.
- Use prepared statements para evitar SQL Injection.

## Dicas de Debug
- Se der erro 401, faça login novamente.
- Veja erros do PHP no console do navegador (aba Network).
