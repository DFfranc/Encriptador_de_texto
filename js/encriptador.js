document.addEventListener("DOMContentLoaded", () => {
    const entrada = document.querySelector(".texto_entrada");
    const encriptacion = document.querySelector(".encriptacion");
    const btn_encriptar = document.querySelector(".btn_encriptar");

    /**
     * Verifica si el elemento en el que se agrega la encriptación ya hay una encriptación previa, si la hay
     * elimina el texto anterior y agrega el nuevo.
     * @param texto texto encriptado que se ingresará en el elemento
     */
    function validarEspacio(texto) {
        if (encriptacion.textContent !== "") {
            encriptacion.textContent = "";
        }

        encriptacion.textContent = texto;
    }

    /**
     * Verifica que el texto ingresado no tenga mayúsculas ni acentos
     * @param texto texto a verificar
     * @returns esValido - true si el texto no posee mayúsculas ni acentos, false si al menos una letra es 
     * mayúscula o tiene acentos
     */
    function validarMayúsAcentos(texto) {
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
    function mostrarAlerta(contenido) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: contenido,
        })
    }

    /**
     * Encripta una cadena de texto ingresada por el usuario
     * @param texto texto a encriptar
     * @returns texto encriptado
     */
    function encriptarTexto(texto) {
        const textoArray = texto.split(""); // Obtener un arreglo donde cada índice es una letra
        const arrayEncriptado = [];

        const vocales = ["a", "e", "i", "o", "u"];
        const llaves = ["enter", "imes", "ai", "ober", "ufat"]; // Cada llave representa su respectiva vocal

        /* Itera sobre el arreglo que contiene cada una de las letras del texto y sobre el arreglo de vocales
        - Si la letra es una vocal: realiza la encriptación según la llave correspondiente y la agrega a un arreglo
                                    con el texto encriptado.
        - Si la letra no es una vocal: agrega exactamente la misma letra al arreglo con el texto encriptado.
        */
        for (let i = 0; textoArray.length > i; i++) {
            for (let j = 0; vocales.length > j; j++) {
                if (textoArray[i] === vocales[j]) {
                    arrayEncriptado[i] = llaves[j];

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

    // Si se elimina el texto del <textarea>, también se elimina la encriptación
    entrada.addEventListener("input", () => {
        if (entrada.value === "" && encriptacion.textContent !== "") {
            encriptacion.textContent = "";
        }
    });

    btn_encriptar.addEventListener("click", encriptar);
});