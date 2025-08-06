# Aula 13 – Backend com PHP + MySQL

## Objetivos de aprendizagem
- Conectar ao MySQL usando PDO de forma segura
- Retornar dados em formato JSON
- Criar endpoints PHP para consulta

## Conteúdo abordado
- Conexão PDO ao MySQL
- Consulta e retorno de dados como JSON
- Criação de endpoint `GET /usuarios?id=1`
- Estrutura de banco em `banco.sql`

## Recapitulação da aula anterior
- Banco SQLite em JS e manipulação de dados

## Demonstração guiada
1. Criar banco e tabela `usuarios` (banco.sql)
2. Implementar conexão PDO em `server.php`
3. Retornar lista de usuários e buscar por ID

## Exercícios
### Exercício 1
- **Enunciado:** Implemente endpoint para retornar todos os usuários.
- **Objetivo:** Praticar consulta e retorno em JSON.
- **Dica:** Use `fetchAll(PDO::FETCH_ASSOC)`.

### Exercício 2
- **Enunciado:** Implemente busca de usuário por ID via GET.
- **Objetivo:** Praticar uso de parâmetros e segurança.
- **Dica:** Use `prepare` e `bindParam`.

## Desafios opcionais
- Adicionar endpoint para inserir novo usuário
- Implementar autenticação simples

## Links de apoio
- [PDO PHP Docs](https://www.php.net/manual/pt_BR/book.pdo.php)
- [MySQL Docs](https://dev.mysql.com/doc/)
- [MDN JSON](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/JSON)
