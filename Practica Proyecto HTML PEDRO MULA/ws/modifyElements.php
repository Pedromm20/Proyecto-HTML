<?php
require_once 'Connection.php';
require_once __DIR__ . '/models/Element.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $db = Connection::connect();
        $element = new Element($db);

        // Validar datos recibidos
        $id = $_POST['id'] ?? null;
        $nombre = $_POST['nombre'] ?? null;
        $descripcion = $_POST['descripcion'] ?? null;
        $nserie = $_POST['nserie'] ?? null;
        $estado = $_POST['estado'] ?? null;
        $prioridad = $_POST['prioridad'] ?? null;

        if (!$id || !$nombre || !$descripcion || !$nserie || !$estado || !$prioridad) {
            echo json_encode(['success' => false, 'error' => 'Todos los campos son obligatorios']);
            exit;
        }

        $data = [
            'nombre' => $nombre,
            'descripcion' => $descripcion,
            'nserie' => $nserie,
            'estado' => $estado,
            'prioridad' => $prioridad
        ];

        $success = $element->update($id, $data);

        echo json_encode(['success' => $success]);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => 'Error en la base de datos: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Método no permitido']);
}
?>
