import {validarEspacio, validarMayúsAcentos, mostrarAlerta} from "./funciones.js";
import {entrada, llaves, vocales} from './variables.js';

document.addEventListener("DOMContentLoaded", () => {
    var btn_encriptar = document.querySelector(".btn_encriptar");

    /**
     * Encripta una cadena de texto ingresada por el usuario
     * @param texto texto a encriptar
     * @returns texto encriptado
     */
    function encriptarTexto(texto) {
        const textoArray = texto.split(""); // Obtener un arreglo donde cada índice es una letra
        const arrayEncriptado = [];

        /* Itera sobre el arreglo que contiene cada una de las letras del texto y sobre el arreglo de vocales
        - Si la letra es una vocal: realiza la encriptación según la llave correspondiente y la agrega a un arreglo
                                    con el texto encriptado.
        - Si la letra no es una vocal: agrega exactamente la misma letra al arreglo con el texto encriptado.
        */
        for (let i = 0; textoArray.length > i; i++) {
            for (let j = 0; vocales.length > j; j++) {
                if (textoArray[i] === vocales[j]) {
                    arrayEncriptado[i] = llaves[j];

                // Se valida que esté indefinido para evitar que se reescriba el elemento cuando ya exista una correspondencia
                } else if (arrayEncriptado[i] === undefined) {
                    arrayEncriptado[i] = textoArray[i];
                }
            }
        }

        /* Valida que el array con la encriptación tenga la misma longitud que el array con el texto
            con el fin de validar que la encriptación se haya realizado correctamente; si hubo un error
            se muestra una alerta y se retorna null.
        */
        if(arrayEncriptado.length === textoArray.length){
            const textoEncriptado = arrayEncriptado.join(""); // Convertir el array en un String

            return textoEncriptado;
        } else {
            mostrarAlerta('A ocurrido un error al encriptar el texto');
            return null;
        }
    }

    /**
     * Función encargada de ejecutar toda la funcionalidad de encriptar, lo que incluye validaciones, alertas
     * e inserción del texto encriptado en el HTML
     */
    function encriptar() {
        const texto = entrada.value.trim();

        if (texto !== "") {
            if (validarMayúsAcentos(texto)) {
                const textoEncriptado = encriptarTexto(texto);
                validarEspacio(textoEncriptado);

            } else {
                mostrarAlerta('El texto no puede contener mayúsculas ni acentos');
            }
        } else {
            mostrarAlerta('Prueba a ingresar algo de texto antes de encriptar');
        }
    }

    btn_encriptar.addEventListener("click", encriptar);
});