# Aula 18 – Painel Administrativo

## O QUE FOI ADICIONADO NESTA AULA
- Painel admin com login simples
- CRUD de eventos (criar, editar, excluir)
- Backend PHP com autenticação e endpoints para eventos
- Sessão simples para autenticação

## Objetivos da aula
- Implementar autenticação básica
- Permitir gerenciamento de eventos via painel
- Usar métodos GET/POST/PUT/DELETE (ou _method)

## Passo-a-passo para rodar localmente
1. Importe o banco (`banco.sql`) se necessário
2. Inicie o servidor local (XAMPP/Laragon ou `php -S localhost:8000 -t backend`)
3. Acesse `admin/login.html` para logar
4. Após login, acesse `admin/dashboard.html` para gerenciar eventos

## Exercícios
- Teste login com usuário/senha fixos
- Crie, edite e exclua eventos
- Tente acessar dashboard sem login (deve redirecionar)

## Self-healing
Se não logar, confira credenciais e cookies. Se não salvar, verifique permissões do banco.

## Critérios de correção
- Login funciona
- CRUD de eventos funcional
- Código comentado

## Exemplo de login fetch
```js
fetch('../backend/auth.php', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ usuario: 'admin', senha: '1234' })
})
.then(r => r.json())
.then(console.log);
```
