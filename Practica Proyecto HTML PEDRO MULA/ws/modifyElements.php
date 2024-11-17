<?php
require_once 'Connection.php';
require_once __DIR__ . '/models/Element.php';

$id = $_GET['id'] ?? null;
$data = json_decode(file_get_contents('php://input'), true);
$db = Connection::connect();
$element = new Element($db);

if ($id && $element->update($id, $data)) {
    echo json_encode(["success" => true, "message" => "Elemento actualizado"]);
} else {
    echo json_encode(["success" => false, "message" => "Error al actualizar el elemento"]);
}
