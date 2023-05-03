// import { btn_copiar } from "./variables.js";
const containerSalida = document.querySelector(".container_salida");
const containerBtnCopiar = document.querySelector('.container_btn_copiar');
const aunNoTexto = document.querySelector(".no_texto");
const siTexto = document.querySelector(".si_texto");

/**
 * Agrega el resultado de la encriptación o desencriptación al DOM
 * @param texto texto encriptado que se ingresará en el elemento
 */
export function insertarSalida(texto) {
    const salida = document.createElement("P");
    salida.classList.add("salida");
    salida.textContent = texto;

    // Validar si hay un elemento previo y eliminarlo en caso de que si
    containerSalida.querySelector(".salida")?.remove();

    // Ocultar los mensajes "texto presente" y "texto no presente" cuando hay una encriptación o desencriptación
    aunNoTexto.style.display = "none";
    siTexto.style.display = "none";

    containerSalida.appendChild(salida);
    setTimeout(()=>{
        salida.style.opacity = "1";
    }, 100);
}


/**
 * Crea el botón que permite copiar el texto encriptado o desencriptado, lo añade al DOM y le agrega 
 * una clase para darle estilos
 */
export function insertarBotonCopiar(){
    const btn_copiar = document.createElement('BUTTON');
    btn_copiar.textContent = "Copiar";
    btn_copiar.classList.add("btn_copiar");

    containerBtnCopiar.querySelector(".btn_copiar")?.remove();

    // Permite copiar el texto encriptado o desencriptado al dar click en el botón de copiar
    btn_copiar.addEventListener("click", copiarTexto);
    
    containerBtnCopiar.appendChild(btn_copiar);
    btn_copiar.classList.add("animated");

    setTimeout(()=>{
        btn_copiar.classList.remove("animated");
    }, 300);
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
 * Permite copiar el texto encriptado o desencriptado; funcionalidad pensada para el botón de copiar (insertarBotonCopiar())
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

