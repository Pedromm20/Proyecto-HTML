<?php

require_once 'models/Element.php';


class Main
{

    public function run()
    {
        $nombre = $_POST['nombre'] ?? null;
        $descripcion = $_POST['descripcion'] ?? null;
        $numSerie = $_POST['numSerie'] ?? null;
        $estado = $_POST['estado'] ?? null;
        $prioridad = $_POST['prioridad'] ?? null;

        if (empty($nombre) || empty($descripcion) || empty($numSerie) || empty($estado) || empty($prioridad)) {
            return "No se han recibido todos los datos";
        }
        $element = new Element($nombre, $descripcion, $numSerie, $estado, $prioridad);

        $this->guardarElemento($element->toJSON());

        return $element->toJSON();
    }


    private function guardarElemento($data)
    {
        $file = 'elements.txt';

        $file_handle = fopen($file, 'a');
        fwrite($file_handle, $data . PHP_EOL);
        fclose($file_handle);
    }
}
$main = new Main();

echo $main->run();


