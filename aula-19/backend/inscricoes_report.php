<?php
// Relatório de inscrições (JSON ou CSV)
session_start();
if (!isset($_SESSION['admin'])) {
    http_response_code(401);
    echo json_encode(['erro' => 'Não autorizado']);
    exit;
}

$db = new PDO('sqlite:../../aula-17/backend/eventos.db');
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$sql = 'SELECT i.id, i.nome, i.email, i.data, e.nome as evento_nome FROM inscricoes i JOIN eventos e ON i.evento_id = e.id ORDER BY i.data DESC';
$stmt = $db->query($sql);
$inscricoes = $stmt->fetchAll(PDO::FETCH_ASSOC);

if (isset($_GET['csv'])) {
    header('Content-Type: text/csv');
    header('Content-Disposition: attachment; filename="inscricoes.csv"');
    $out = fopen('php://output', 'w');
    fputcsv($out, array_keys($inscricoes[0]));
    foreach ($inscricoes as $row) {
        fputcsv($out, $row);
    }
    fclose($out);
    exit;
}

header('Content-Type: application/json');
echo json_encode($inscricoes);
