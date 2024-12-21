<?php
header('Content-Type: application/json');

$host = 'localhost';
$dbname = 'monfab';
$user = 'root';
$pass = '2794_Jaa';

try {
  $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
  echo json_encode(['error' => 'Error de conexión: ' . $e->getMessage()]);
  exit;
}

// Consulta para obtener los elementos
$stmt = $pdo->prepare("SELECT * FROM elementos");
$stmt->execute();
$elementos = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Verificar si se encontraron elementos
if ($elementos) {
  echo json_encode($elementos);
} else {
  echo json_encode(['error' => 'No se encontraron elementos.']);
}
?>
