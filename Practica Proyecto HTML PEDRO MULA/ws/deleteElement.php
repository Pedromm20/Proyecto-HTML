<?php
require_once 'Connection.php';
require_once __DIR__ . '/models/Element.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $db = Connection::connect();
        $element = new Element($db);

        $input = json_decode(file_get_contents("php://input"), true);
        $id = $input['id'] ?? null;

        if (!$id) {
            echo json_encode(['success' => false, 'error' => 'ID no proporcionado']);
            exit;
        }

        $success = $element->delete($id);

        echo json_encode(['success' => $success]);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => 'Error en la base de datos: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Método no permitido']);
}
?>
