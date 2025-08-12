# Aula 17 – API para Retornar Lista de Eventos em JSON

## O QUE FOI ADICIONADO NESTA AULA
- Endpoint PHP que retorna lista de eventos em JSON
- Consumo da API via fetch() no frontend
- Renderização dinâmica dos eventos
- Loader animado e tratamento de erros

## Objetivos da aula
- Criar API REST simples em PHP
- Consumir dados via fetch() e exibir no DOM
- Tratar loading e erros

## Passo-a-passo para rodar localmente
1. Inicie o servidor local (XAMPP/Laragon ou `php -S localhost:8000 -t backend`)
2. Abra `index.html` no navegador

## Exercícios
- Teste a API via cURL e browser
- Simule erro de conexão e veja mensagem no frontend
- Adapte para exibir mensagem se lista vier vazia

## Self-healing
Se não carrega, abra network devtools e verifique CORS/URL/console.

## Critérios de correção
- API retorna JSON válido
- Frontend exibe eventos dinamicamente
- Loader aparece durante fetch

## Exemplo de fetch
```js
fetch('backend/events_api.php')
  .then(r => r.json())
  .then(console.log);
```

## Exemplo de cURL
```sh
curl http://localhost/aula-17/backend/events_api.php
```
