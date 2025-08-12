# Aula 16 – Sistema de Inscrição de Usuários nos Eventos

## O QUE FOI ADICIONADO NESTA AULA
- Formulário de inscrição em cada evento (nome, e-mail)
- Validação de e-mail no frontend
- Envio via fetch() para endpoint PHP
- Backend PHP salva inscrições na tabela `inscricoes`

## Objetivos da aula
- Implementar fluxo de inscrição de usuários
- Persistir inscrições no banco
- Validar dados no frontend e backend

## Passo-a-passo para rodar localmente
1. Importe o `banco.sql` no seu banco (MySQL ou SQLite)
2. Inicie o servidor local (XAMPP/Laragon ou `php -S localhost:8000 -t backend`)
3. Abra `index.html` no navegador

## Exercícios
- Teste a inscrição com e-mails válidos e inválidos
- Tente inscrever o mesmo e-mail duas vezes (o que acontece?)
- Adapte para exibir mensagem de sucesso/erro no frontend

## Self-healing
Se fetch retornar erro 500, verifique permissões do backend, conexão com banco e formato do JSON enviado.

## Critérios de correção
- Inscrição salva no banco
- Validação de e-mail funciona
- Mensagem de status exibida

## Comando para importar banco
```sql
CREATE TABLE inscricoes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  evento_id INT NOT NULL
);
```

## Exemplo de fetch
```js
fetch('backend/inscrever.php', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ nome, email, evento_id })
})
.then(r => r.json())
.then(console.log);
```
