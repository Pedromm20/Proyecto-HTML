<?php

require_once __DIR__ . '/../interfaces/IToJson.php';


class Element implements IToJson {

    private $nombre;
    private $descripcion;
    private $numSerie;
    private $estado;
    private $prioridad;

    public function __construct($nombre, $descripcion, $numSerie, $estado, $prioridad) {
        $this->nombre = $nombre;
        $this->descripcion = $descripcion;
        $this->numSerie = $numSerie;
        $this->estado = $estado;
        $this->prioridad = $prioridad;
    }
    // getters y setters 
    public function getNombre() {
        return $this->nombre;
    }
    public function setNombre($nombre) {
        $this->nombre = $nombre;
    }
    public function getDescripcion() {
        return $this->descripcion;
    }
    public function setDescripcion($descripcion) {
        $this->descripcion = $descripcion;
    }
    public function getNumSerie() {
        return $this->numSerie;
    }
    public function setNumSerie($numSerie) {
        $this->numSerie = $numSerie;
    }

    public function getEstado() {
        return $this->estado;
    }
    public function setEstado($estado) {
        $this->estado = $estado;
    }
    public function getPrioridad() {
        return $this->prioridad;
    }
    public function setPrioridad($prioridad) {
        $this->prioridad = $prioridad;
    }

    // metodo 

    public function toJSON() {
        return json_encode(
            array(
                'nombre' => $this->nombre,
                'descripcion' => $this->descripcion,
                'numSerie' => $this->numSerie,
                'estado' => $this->estado,
                'prioridad' => $this->prioridad
            )
            
            );
            }
        
}