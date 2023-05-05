import {insertarSalida, validarMayúsAcentos, mostrarAlerta, insertarBotonCopiar, separarLlavesEncriptacion} from "../base/funciones.js";
import {entrada, llaves, vocales} from '../base/variables.js';

document.addEventListener("DOMContentLoaded", () => {
    var btn_desencriptar = document.querySelector(".btn_desencriptar");

    /**
     * Desencripta una cadena de texto ingresada por el usuario en el campo de texto
     * @param texto texto a desencriptar
     * @returns texto desencriptado
     */
    function desencriptarTexto(texto) {
        let arrayEncriptado = separarLlavesEncriptacion(texto); // Array con el texto encriptado
        let arrayDesencriptado = []; // Array con el texto descencriptado

        /* Itera sobre el arreglo que contiene cada una de las letras y llaves del texto encriptado y sobre el arreglo de llaves
        - Si la letra es una llave: realiza la desencriptación según la vocal correspondiente y la agrega a un arreglo con el texto desencriptado.
        - Si la letra no es una llave: agrega exactamente la misma letra al arreglo con el texto desencriptado. */
        for (let i = 0; arrayEncriptado.length > i; i++) {

            for (let j = 0; llaves.length > j; j++) {
                if (arrayEncriptado[i] === llaves[j]) {
                    arrayDesencriptado[i] = vocales[j];
                
                // Se valida que esté indefinido para evitar que se reescriba el elemento cuando ya exista una correspondencia
                } else if (arrayDesencriptado[i] === undefined) {
                    arrayDesencriptado[i] = arrayEncriptado[i];
                }
            }
        }

        /* Valida que el array con la desencriptación tenga la misma longitud que el array con el texto encriptado
            con el fin de validar que la desencriptación se haya realizado correctamente; si hubo un error
            se muestra una alerta y se retorna null.*/
        if(arrayDesencriptado.length === arrayEncriptado.length){
            const textoDesencriptado = arrayDesencriptado.join(""); // Convertir el array en un String

            return textoDesencriptado;
        } else {
            mostrarAlerta('error', 'Error', 'A ocurrido un error al desencriptar el texto');
            return null;
        }
    }

    /**
     * Función encargada de ejecutar toda la funcionalidad de desencriptar, lo que incluye validaciones, alertas
     * e inserción del texto encriptado en el HTML
     */
    function desencriptar() {
        let texto = entrada.value.trim();

        if (texto !== "") {
            if (validarMayúsAcentos(texto)) {
                const textoDesencriptado = desencriptarTexto(texto);
                insertarSalida(textoDesencriptado);
                insertarBotonCopiar();

            } else {
                mostrarAlerta('error', 'Error', 'El texto no puede contener mayúsculas ni acentos');
            }
        } else {
            mostrarAlerta('error', 'Error', 'Prueba a ingresar algo de texto antes de desencriptar');
        }
    }

    btn_desencriptar.addEventListener("click", desencriptar);
});