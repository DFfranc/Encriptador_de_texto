import { salida, btn_copiar } from "./variables.js";
const div_btn_copiar = document.querySelector(".div_btn_copiar");

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

export function mostrarBotonCopiar(){
    btn_copiar.textContent = "Copiar";
    btn_copiar.classList.add("btn_copiar");

    div_btn_copiar.appendChild(btn_copiar);
}

export function copiarTexto(){
    navigator.clipboard.writeText(salida.textContent)
        .then(() => console.log('texto copiado en el portapapeles'))
        .catch((err) => console.log('No se pudo copiar el texto', err));
}

