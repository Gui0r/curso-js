<?php
// CRUD de eventos para admin
session_start();
if (!isset($_SESSION['admin'])) {
    http_response_code(401);
    echo json_encode(['erro' => 'Não autorizado']);
    exit;
}

$db = new PDO('sqlite:../../aula-17/backend/eventos.db');
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        if (isset($_GET['id'])) {
            $stmt = $db->prepare('SELECT * FROM eventos WHERE id = ?');
            $stmt->execute([$_GET['id']]);
            echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));
        } else {
            $stmt = $db->query('SELECT * FROM eventos ORDER BY data DESC');
            echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        }
        break;
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $db->prepare('INSERT INTO eventos (nome, data, local, descricao) VALUES (?, ?, ?, ?)');
        $stmt->execute([$data['nome'], $data['data'], $data['local'], $data['descricao']]);
        echo json_encode(['ok' => true]);
        break;
    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $db->prepare('UPDATE eventos SET nome=?, data=?, local=?, descricao=? WHERE id=?');
        $stmt->execute([$data['nome'], $data['data'], $data['local'], $data['descricao'], $data['id']]);
        echo json_encode(['ok' => true]);
        break;
    case 'DELETE':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $db->prepare('DELETE FROM eventos WHERE id=?');
        $stmt->execute([$data['id']]);
        echo json_encode(['ok' => true]);
        break;
}
