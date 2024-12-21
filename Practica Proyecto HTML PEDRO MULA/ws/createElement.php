<?php
require_once 'Connection.php';
require_once __DIR__ . '/models/Element.php';

header('Content-Type: application/json');

$db = Connection::connect();
$element = new Element($db);

file_put_contents('php://stderr', print_r($_POST, true)); 

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    $data = [
        'nombre' => $_POST['nombre'] ?? '',
        'descripcion' => $_POST['descripcion'] ?? '',
        'nserie' => $_POST['numero_serie'] ?? '',
        'estado' => $_POST['estado'] ?? '',
        'prioridad' => $_POST['prioridad'] ?? ''
    ];
}

if (empty($data['nombre']) || empty($data['descripcion']) || empty($data['nserie']) || empty($data['estado']) || empty($data['prioridad'])) {
    echo json_encode(["success" => false, "message" => "Faltan datos obligatorios"]);
    exit();
}

$response = $element->create($data);

if ($response) {
    echo json_encode(["success" => true, "message" => "Elemento creado correctamente"]);
} else {
    echo json_encode(["success" => false, "message" => "Error inesperado al crear el elemento"]);
}
?>
