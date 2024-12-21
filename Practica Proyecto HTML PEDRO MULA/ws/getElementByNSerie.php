<?php
require_once 'Connection.php';
require_once __DIR__ . '/models/Element.php';

header('Content-Type: application/json');


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $db = Connection::connect();
        $element = new Element($db);

        $input = json_decode(file_get_contents("php://input"), true);
        error_log("Parámetros decodificados: " . print_r($input, true));

        $nserie = $input['nserie'] ?? null;

        if (!$nserie) {
            echo json_encode(['success' => false, 'error' => 'Número de serie no proporcionado']);
            exit;
        }

        $result = $element->getByNSerie($nserie);

        if ($result) {
            echo json_encode(['success' => true, 'id' => $result['id']]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Elemento no encontrado']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => 'Error en la base de datos: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Método no permitido']);
}
?>
