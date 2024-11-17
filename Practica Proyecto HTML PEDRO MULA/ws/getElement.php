<?php
require_once 'Connection.php';
require_once __DIR__ . '/models/Element.php';

$id = $_GET['id'] ?? null;
$db = Connection::connect();
$element = new Element($db);

if ($id) {
    $result = $element->getById($id);
    echo json_encode(["success" => true, "data" => $result]);
} else {
    $result = $element->getAll();
    echo json_encode(["success" => true, "data" => $result]);
}
