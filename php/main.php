<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['texto'])) {
    $texto = trim($_POST['texto']);
    if (!empty($texto)) {
        // Guardar el texto en un archivo (agrega nueva línea)
        $archivo = 'transcripcion.txt';
        if (file_put_contents($archivo, $texto . PHP_EOL, FILE_APPEND | LOCK_EX) !== false) {
            echo "Texto guardado correctamente.";
        } else {
            echo "Error al guardar el texto.";
        }
    } else {
        echo "No se recibió texto válido.";
    }
} else {
    echo "Método no permitido o texto no recibido.";
}
?>