<?php
// Estatísticas agregadas para o painel admin
session_start();
if (!isset($_SESSION['admin'])) {
    http_response_code(401);
    echo json_encode(['erro' => 'Não autorizado']);
    exit;
}

$db = new PDO('sqlite:../../aula-17/backend/eventos.db');
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Total de eventos
$total_eventos = $db->query('SELECT COUNT(*) FROM eventos')->fetchColumn();
// Total de inscrições
$total_inscricoes = $db->query('SELECT COUNT(*) FROM inscricoes')->fetchColumn();
// Inscrições por evento
$sql = 'SELECT e.nome, COUNT(i.id) as inscricoes FROM eventos e LEFT JOIN inscricoes i ON e.id = i.evento_id GROUP BY e.id ORDER BY e.data DESC';
$eventos = $db->query($sql)->fetchAll(PDO::FETCH_ASSOC);

header('Content-Type: application/json');
echo json_encode([
    'total_eventos' => $total_eventos,
    'total_inscricoes' => $total_inscricoes,
    'eventos' => $eventos
]);
