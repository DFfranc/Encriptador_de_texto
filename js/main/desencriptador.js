import {validarEspacio, validarMayúsAcentos, mostrarAlerta} from "../base/funciones.js";
import {entrada, llaves, vocales} from '../base/variables.js';


document.addEventListener("DOMContentLoaded", () => {
    var btn_desencriptar = document.querySelector(".btn_desencriptar");
    
    /**
     * Analiza dónde se encuentran las llaves de encriptación con el fin de conocer cuáles son los caracteres
     * del String que deben ser reemplazados por las vocales correspondientes.
     * @param {*} encriptacion texto encriptado que será analizado
     * @returns posIniciales: arreglo con las posiciones en que inicia la llave de encriptación
     * @returns posFinales: arreglo con las posiciones en que termina la llave de encriptación
     */
    function analizarEncriptacion(encriptacion){
        const posIniciales = [];
        const posFinales = [];

        for(let i = 0; llaves.length > i; i++){
            // Buscar si el texto tiene al menos una coincidencia con las llave de encriptación en cuestión
            let posInicio = encriptacion.indexOf(llaves[i]);
    
            while(posInicio !== -1){
                let posFinal = posInicio + llaves[i].length; // Posición inicial + la longitud de la llave
    
                // LLenar los arreglos con las posiciones
                posIniciales.push(posInicio);
                posFinales.push(posFinal);
    
                /* Volver a buscar la misma llave pero comenzando desde una posición más allá con el fin de 
                    saber si hay más coincidencias 
                */
                posInicio = encriptacion.indexOf(llaves[i], posInicio + 1);
            }
        }
    
        // Ordenar las posiciones en orden ascendente
        posIniciales.sort((a, b) => a - b);
        posFinales.sort((a, b) => a - b);
    
        return [posIniciales, posFinales];
    }

    /**
     * Desencripta una cadena de texto ingresada por el usuario en el campo de texto
     * @param texto texto a desencriptar
     * @returns texto desencriptado
     */
    function desencriptarTexto(texto) {
        let textoEncriptado = ""; // String que contendrá las llaves de encriptación delimitadas por guiones "-"
        let arrayEncriptado = []; // Contendrá el textoEncriptado en forma de arreglo para facilitar el reemplazo de las llaves por las vocales
        let arrayDesencriptado = []; // Array con el texto descencriptado

        // Obtener las posiciones de las llaves de encriptación
        const [posIniciales, posFinales] = analizarEncriptacion(texto); 

        let posAnterior = 0; // Almacena la última posición utilizada por el método substring().

        for(let i = 0; posIniciales.length > i; i++){
            // Construir el texto encriptado delimitando las llaves por guiones "-"
            textoEncriptado += texto.substring(posAnterior, posIniciales[i]);
            textoEncriptado += "-";
            textoEncriptado += texto.substring(posIniciales[i], posFinales[i]);
            textoEncriptado += "-";
            posAnterior = posFinales[i]; // Cambiar la posición anterior por la ultima posición utilizada por substring()
        }

        // Agregar la última parte al textoEncriptado
        textoEncriptado += texto.substring(posAnterior);

        // Convertir en un arreglo el textoEncriptado separando cada elemento por guiones
        arrayEncriptado = textoEncriptado.split("-"); 
        
        /* Itera sobre el arreglo que contiene cada una de las letras y llaves del texto encriptado
           y sobre el arreglo de llaves
        - Si la letra es una llave: realiza la desencriptación según la vocal correspondiente y la agrega a un 
                                    arreglo con el texto desencriptado.
        - Si la letra no es una llave: agrega exactamente la misma letra al arreglo con el texto desencriptado.
        */
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

        /* Valida que el array con la desencriptación tenga la misma longitud que el array con el texto
            con el fin de validar que la desencriptación se haya realizado correctamente; si hubo un error
            se muestra una alerta y se retorna null.
        */
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
                validarEspacio(textoDesencriptado);

            } else {
                mostrarAlerta('error', 'Error', 'El texto no puede contener mayúsculas ni acentos');
            }
        } else {
            mostrarAlerta('error', 'Error', 'Prueba a ingresar algo de texto antes de desencriptar');
        }
    }

    btn_desencriptar.addEventListener("click", desencriptar);
});