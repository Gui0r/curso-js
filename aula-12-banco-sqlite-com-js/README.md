# Aula 12 – Banco SQLite com JavaScript (no navegador)

## Objetivos de aprendizagem
- Entender o funcionamento do SQLite em JS (sql.js)
- Criar e consultar tabelas no navegador
- Simular persistência temporária

## Conteúdo abordado
- Uso da biblioteca sql.js via CDN
- Criação de tabelas, inserção e consulta
- Exibição de dados em `<table>`

## Recapitulação da aula anterior
- Estruturas de dados, JSON e localStorage

## Demonstração guiada
1. Carregar sql.js e criar banco em memória
2. Criar tabela de livros
3. Inserir e consultar dados
4. Exibir resultados em tabela

## Exercícios
### Exercício 1
- **Enunciado:** Crie um banco de livros (título, autor, categoria).
- **Objetivo:** Praticar comandos SQL em JS.
- **Dica:** Use `db.run` para inserir e `db.exec` para consultar.

### Exercício 2
- **Enunciado:** Permita listar livros por categoria.
- **Objetivo:** Praticar consultas com `WHERE`.
- **Dica:** Use `SELECT * FROM livros WHERE categoria = ?`.

### Exercício 3
- **Enunciado:** Exiba os resultados em uma `<table>` dinâmica.
- **Objetivo:** Praticar manipulação do DOM.
- **Dica:** Crie elementos `<tr>` e `<td>` via JS.

## Desafios opcionais
- Permitir edição e exclusão de livros
- Exportar/importar o banco em JSON

## Links de apoio
- [sql.js Docs](https://sql.js.org/)
- [MDN Table](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/table)
- [MDN JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
