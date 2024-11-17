<?php
class Connection {
    public static function connect() {
        try {
            return new PDO("mysql:host=localhost;dbname=monfab", "root", "2794_Jaa", [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
            ]);
        } catch (PDOException $e) {
            die(json_encode(["success" => false, "message" => "Error al conectar: " . $e->getMessage()]));
        }
    }
}
