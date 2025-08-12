<?php
// auth.php - autenticação simples de admin
session_start();
$admin_user = 'admin';
$admin_pass = '1234';

if (isset($_GET['logout'])) {
    session_destroy();
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if ($data['usuario'] === $admin_user && $data['senha'] === $admin_pass) {
        $_SESSION['admin'] = true;
        echo json_encode(['ok' => true]);
    } else {
        echo json_encode(['ok' => false, 'erro' => 'Usuário ou senha inválidos']);
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode(['logado' => isset($_SESSION['admin'])]);
    exit;
}
