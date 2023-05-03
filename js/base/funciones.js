import { btn_copiar } from "./variables.js";
const containerSalida = document.querySelector(".container_salida");
const containerBtnCopiar = document.querySelector('.container_btn_copiar');

/**
 * Verifica si el elemento en el que se agrega la encriptación ya hay una encriptación o descencriptacion previa,
 * si la hay elimina el elemento anterior y agrega el nuevo.
 * @param texto texto encriptado que se ingresará en el elemento
 */
export function validarEspacio(texto) {
    const salida = document.createElement("P");
    salida.classList.add("salida");
    salida.textContent = texto;

    // Validar si hay un elemento previo y eliminarlo en caso de que si
    containerSalida.querySelector(".salida")?.remove();

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

    containerBtnCopiar.appendChild(btn_copiar);
}

/**
 * Permite copiar el texto encriptado o desencriptado; funcionalidad pensada para el botón de copiar (mostrarBotonCopiar())
 */
export function copiarTexto(){
    /* Se selecciona aquí puesto que es un elemento generado con JavaScript y no proviene directamente del DOM,
    por lo que si selecciona fuera de este evento, es posible que se seleccione antes de que siquiera exista y
    por ende no funcione */
    const salida = document.querySelector(".salida");

    // Crear el contenedor para el aviso de ¡copiado! ("DIV") y el texto que lo contendrá ("P")
    const containerAviso = document.createElement("DIV");
    const textoAviso = document.createElement("P");

    textoAviso.textContent = "¡Copiado!";
    textoAviso.classList.add("texto_aviso")
    containerAviso.classList.add("aviso_copiado");

    // Validar si hay un elemento previo y eliminarlo en caso de que si
    containerBtnCopiar.querySelector(".aviso_copiado")?.remove();

    navigator.clipboard.writeText(salida.textContent)
        .then(function () {
            // Agregar los elementos al DOM
            containerBtnCopiar.append(containerAviso);
            containerAviso.append(textoAviso);

            // Animación de aparecer y desaparecer
            setTimeout(()=>{
                containerAviso.classList.add("mostrar");
            }, 50);

            setTimeout(()=>{
                containerAviso.classList.remove("mostrar");
            }, 1000);
        })
        .catch((err) => console.log('No se pudo copiar el texto', err));
}

