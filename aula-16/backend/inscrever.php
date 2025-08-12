<?php
// Configuração do banco (ajuste para seu ambiente)
$host = 'localhost';
$db = 'cursojs';
$user = 'root';
$pass = '';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header('Access-Control-Allow-Methods: POST, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type');
  exit;
}
try {
  $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
} catch (Exception $e) {
  http_response_code(500);
  echo json_encode(['erro' => 'Falha na conexão']);
  exit;
}
$data = json_decode(file_get_contents('php://input'), true);
if (!isset($data['nome'], $data['email'], $data['evento_id'])) {
  echo json_encode(['erro' => 'Dados incompletos']);
  exit;
}
if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
  echo json_encode(['erro' => 'E-mail inválido']);
  exit;
}
$stmt = $pdo->prepare('INSERT INTO inscricoes (nome, email, evento_id) VALUES (?, ?, ?)');
try {
  $stmt->execute([$data['nome'], $data['email'], $data['evento_id']]);
  echo json_encode(['ok' => true]);
} catch (Exception $e) {
  echo json_encode(['erro' => 'Erro ao salvar inscrição']);
}
