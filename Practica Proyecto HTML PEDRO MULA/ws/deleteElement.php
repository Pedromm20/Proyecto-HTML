<?php
require_once 'Connection.php';
require_once __DIR__ . '/models/Element.php';

$id = $_GET['id'] ?? null;
$db = Connection::connect();
$element = new Element($db);

if ($id && $element->delete($id)) {
    echo json_encode(["success" => true, "message" => "Elemento eliminado"]);
} else {
    echo json_encode(["success" => false, "message" => "Error al eliminar el elemento"]);
}
