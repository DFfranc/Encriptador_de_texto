import {entrada} from './variables.js';
const salida = document.querySelector(".salida");

/**
 * Verifica si el elemento en el que se agrega la encriptación ya hay una encriptación previa, si la hay
 * elimina el texto anterior y agrega el nuevo.
 * @param texto texto encriptado que se ingresará en el elemento
 */
export function validarEspacio(texto) {
    if (salida.textContent !== "") {
        salida.textContent = "";
    }

    salida.textContent = texto;
}

/**
 * Verifica que el texto ingresado no tenga mayúsculas ni acentos
 * @param texto texto a verificar
 * @returns esValido - true si el texto no posee mayúsculas ni acentos, false si al menos una letra es 
 * mayúscula o tiene acentos
 */
export function validarMayúsAcentos(texto) {
    let esValido = true;

    // Si tiene mayúsculas o acentos
    if (/[A-ZáéíóúÁÉÍÓÚ]/.test(texto)) {
        esValido = false;
    }

    return esValido;
}


/**
 * Muestra una alerta cuando hay un error
 * @param icon icono de la alerta
 * @param title titulo de la alerta
 * @param text texto de la alerta
 */
export function mostrarAlerta(contenido) {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: contenido,
    })
}

// Si se elimina el texto del <textarea>, también se elimina la encriptación
entrada.addEventListener("input", () => {
    if (entrada.value === "" && salida.textContent !== "") {
        salida.textContent = "";
    }
});

