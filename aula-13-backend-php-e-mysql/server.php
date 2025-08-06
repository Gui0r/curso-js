<?php
// Configuração do banco
$host = 'localhost';
$db = 'cursojs';
$user = 'root';
$pass = '';

header('Content-Type: application/json');
try {
  $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass, [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
  ]);
} catch (Exception $e) {
  http_response_code(500);
  echo json_encode(['erro' => 'Falha na conexão']);
  exit;
}

$endpoint = $_GET['endpoint'] ?? '';
if ($endpoint === 'usuarios') {
  if (isset($_GET['id'])) {
    $stmt = $pdo->prepare('SELECT * FROM usuarios WHERE id = ?');
    $stmt->execute([$_GET['id']]);
    $res = $stmt->fetch(PDO::FETCH_ASSOC);
    echo json_encode($res ?: []);
  } else {
    $res = $pdo->query('SELECT * FROM usuarios')->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($res);
  }
  exit;
}
echo json_encode(['erro' => 'Endpoint inválido']);
