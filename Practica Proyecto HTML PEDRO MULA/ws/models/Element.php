<?php
class Element {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function create($data) {
        $query = "INSERT INTO elementos (nombre, descripcion, nserie, estado, prioridad) 
                  VALUES (:nombre, :descripcion, :nserie, :estado, :prioridad)";
        $stmt = $this->db->prepare($query);
    
        $stmt->bindValue(':nombre', $data['nombre'] ?? '');
        $stmt->bindValue(':descripcion', $data['descripcion'] ?? '');
        $stmt->bindValue(':nserie', $data['nserie'] ?? '');
        $stmt->bindValue(':estado', $data['estado'] ?? '');
        $stmt->bindValue(':prioridad', $data['prioridad'] ?? '');
    
        return $stmt->execute();
    }
    

    public function update($id, $data) {
        $query = "UPDATE elementos SET nombre = :nombre, descripcion = :descripcion, nserie = :nserie, 
            estado = :estado, prioridad = :prioridad WHERE id = :id";
        $data['id'] = $id;
        $stmt = $this->db->prepare($query);
        return $stmt->execute($data);
    }

    public function delete($id) {
        $stmt = $this->db->prepare("DELETE FROM elementos WHERE id = :id");
        return $stmt->execute(['id' => $id]);
    }

    public function getById($id) {
        $stmt = $this->db->prepare("SELECT * FROM elementos WHERE id = :id");
        $stmt->execute(['id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getAll() {
        $stmt = $this->db->query("SELECT * FROM elementos");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
