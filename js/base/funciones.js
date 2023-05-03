import { btn_copiar } from "./variables.js";
const containerSalida = document.querySelector(".container_salida")

/**
 * Verifica si el elemento en el que se agrega la encriptación ya hay una encriptación previa, si la hay
 * elimina el texto anterior y agrega el nuevo.
 * @param texto texto encriptado que se ingresará en el elemento
 */
export function validarEspacio(texto) {
    const salida = document.createElement("P");
    salida.classList.add("salida");

    if (salida.textContent !== "") {
        salida.textContent = "";
    }

    salida.textContent = texto;
    containerSalida.appendChild(salida);
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
 * Muestra una alerta 
 * @param icono icono de la alerta
 * @param titulo titulo de la alerta
 * @param contenido texto de la alerta
 */
export function mostrarAlerta(icono, titulo, contenido) {
    Swal.fire({
        icon: icono,
        title: titulo,
        text: contenido,
    })
}

/**
 * Crea el botón que permite copiar el texto encriptado o desencriptado, lo añade al DOM y le agrega 
 * una clase para darle estilos
 */
export function mostrarBotonCopiar(){
    btn_copiar.textContent = "Copiar";
    btn_copiar.classList.add("btn_copiar");

    containerSalida.appendChild(btn_copiar);
}

/**
 * Permite copiar el texto encriptado o desencriptado; funcionalidad pensada para el botón de copiar (mostrarBotonCopiar())
 */
export function copiarTexto(){
    /* Se selecciona aquí puesto que es un elemento generado con JavaScript y no proviene directamente del DOM,
    por lo que si selecciona fuera de este evento, es posible que se seleccione antes de que siquiera exista y
    por ende no funcione */
    const salida = document.querySelector(".salida");

    navigator.clipboard.writeText(salida.textContent)
        .then(() => console.log('texto copiado en el portapapeles'))
        .catch((err) => console.log('No se pudo copiar el texto', err));
}

