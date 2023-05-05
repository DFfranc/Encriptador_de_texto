import { entrada, llaves } from "./variables.js";
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
    if (containerSalida.querySelector(".salida") !== null) {
        containerSalida.querySelector(".salida").remove();
    }

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

    // Validar si hay un elemento previo y eliminarlo en caso de que si
    if (containerBtnCopiar.querySelector(".btn_copiar") !== null) {
        containerBtnCopiar.querySelector(".btn_copiar").remove();
    }

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

// Crear el contenedor para el aviso de ¡copiado! ("DIV") y el texto que lo contendrá ("P")
function crearAvisoCopiado(){
    const containerAviso = document.createElement("DIV");
    const textoAviso = document.createElement("P");

    textoAviso.textContent = "¡Copiado!";

    textoAviso.classList.add("texto_aviso")
    containerAviso.classList.add("aviso_copiado");

    containerAviso.append(textoAviso);

    return containerAviso;
}

/**
 * Permite copiar el texto encriptado o desencriptado; funcionalidad pensada para el botón de copiar (insertarBotonCopiar())
 */
export function copiarTexto(){
    /* Esta selección se hace aquí puesto que es un elemento generado con JavaScript mediante eventos, lo 
    que hace que aparezca y desaparezca del DOM, haciendo necesario revisar que exista cuando se ejecute esta función */
    const salida = document.querySelector(".salida");

    // No permite que se ejecute la función si no hay una salida
    if(salida === null){
        return;
    }

    const avisoCopiado = crearAvisoCopiado();

    // Validar si hay un elemento previo y eliminarlo en caso de que si
    if (containerBtnCopiar.querySelector(".aviso_copiado") !== null) {
        containerBtnCopiar.querySelector(".aviso_copiado").remove();
    }

    navigator.clipboard.writeText(salida.textContent)
        .then(function () {
            // Agregar los elementos al DOM
            containerBtnCopiar.append(avisoCopiado);
            
            // Animación de aparecer y desaparecer
            setTimeout(()=>{
                avisoCopiado.classList.add("mostrar");
            }, 50);

            setTimeout(()=>{
                avisoCopiado.classList.remove("mostrar");
            }, 1000);
        })
        .catch((err) => console.log('No se pudo copiar el texto', err));
}

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
            saber si hay más coincidencias */
            posInicio = encriptacion.indexOf(llaves[i], posInicio + 1);
        }
    }

    // Ordenar las posiciones en orden ascendente
    posIniciales.sort((a, b) => a - b);
    posFinales.sort((a, b) => a - b);

    return [posIniciales, posFinales];
}

/**
 * Separa las llaves de encriptación de un texto encriptado deliminatandolas por guiones con el fin de facilitar la descenriptación 
 * @param {*} encriptacion texto encriptado 
 * @returns arreglo con las llaves de encriptación delimitadas por guiones
 */
export function separarLlavesEncriptacion(encriptacion){
    let textoEncriptado = ""; // String que contendrá las llaves de encriptación delimitadas por guiones "-"
    let arrayEncriptado = []; // Contendrá el textoEncriptado en forma de arreglo para facilitar el reemplazo de las llaves por las vocales

    // Obtener las posiciones de las llaves de encriptación
    const [posIniciales, posFinales] = analizarEncriptacion(encriptacion); 

    let posAnterior = 0; // Almacena la última posición utilizada por el método substring().

    for(let i = 0; posIniciales.length > i; i++){
        // Construir el texto encriptado delimitando las llaves por guiones "-"
        textoEncriptado += encriptacion.substring(posAnterior, posIniciales[i]);
        textoEncriptado += "-";
        textoEncriptado += encriptacion.substring(posIniciales[i], posFinales[i]);
        textoEncriptado += "-";
        posAnterior = posFinales[i]; // Cambiar la posición anterior por la ultima posición utilizada por substring()
    }

    // Agregar la última parte al textoEncriptado
    textoEncriptado += encriptacion.substring(posAnterior);

    // Convertir en un arreglo el textoEncriptado separando cada elemento por guiones
    arrayEncriptado = textoEncriptado.split("-"); 

    return arrayEncriptado;
}

/**
 * Cambia la altura del textarea según su contenido
 */
export function resizeTextarea(){
    entrada.style.height = 'auto';
    entrada.style.height = `${entrada.scrollHeight}px`;
}

/**
 * Elimina el mensaje encriptado o desencriptado y el botón para copiar el mensaje
 */
export function eliminarSalida_BotonCopiar(){
    /* Estas selecciones se hacen aquí puesto que son elementos generados con JavaScript mediante eventos, lo 
    que hace que aparezcan y desaparezcan del DOM, haciendo necesario revisar que existan cuando se ejecute este evento */
    const salida = document.querySelector(".salida"); 
    const btn_copiar = document.querySelector(".btn_copiar");

    // Elimina la encriptación o desencriptación y el botón de copiar cuando el <textarea> presenta cambios
    if (salida !== null) {
        salida.remove();
        btn_copiar.remove();
    }
}