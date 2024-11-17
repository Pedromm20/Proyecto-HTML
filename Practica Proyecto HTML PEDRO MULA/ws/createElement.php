<?php
require_once 'Connection.php';
require_once __DIR__ . '/models/Element.php';

$db = Connection::connect();
$element = new Element($db);
$data = json_decode(file_get_contents('php://input'), true);

$response = $element->create($data)
    ? ["success" => true, "message" => "Elemento creado"]
    : ["success" => false, "message" => "Error al crear el elemento"];

echo json_encode($response);
