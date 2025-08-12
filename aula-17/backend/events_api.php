<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
$eventos = [
  [ 'id'=>1, 'nome'=>'Workshop de JavaScript', 'data'=>'2025-09-10', 'local'=>'Auditório Central', 'descricao'=>'Aprenda JS moderno com exemplos práticos.' ],
  [ 'id'=>2, 'nome'=>'Encontro de Frontend', 'data'=>'2025-09-15', 'local'=>'Sala 101', 'descricao'=>'Discussão sobre tendências em HTML, CSS e JS.' ],
  [ 'id'=>3, 'nome'=>'Palestra: Banco de Dados', 'data'=>'2025-09-20', 'local'=>'Online', 'descricao'=>'Conceitos de SQL, NoSQL e integração com web.' ]
];
echo json_encode($eventos);
