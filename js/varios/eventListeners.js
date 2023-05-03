import { entrada } from "../base/variables.js";
const aunNoTexto = document.querySelector(".no_texto");
const siTexto = document.querySelector(".si_texto");

/* Se utiza esta variable y clearTimeout() como solución al problema de que si el usuario borra muy rápido,
el valor del input no se alcanza a actualizar antes de que se ejecuten los setTimeout(), lo que hace que se 
vuelva a ocultar incluso si el input está vacío */
let timeoutId;

/* Muestra el mensaje "aún no hay texto" cuando el usuario no ha ingresado nada. 
    Sin embargo al momento de que el usuario ingrese texto, el mensaje "aún no hay texto" se elimina y aparece
    el mensaje "ya hay texto"; así mismo cuando el usuario elimina el texto, se elimina el mensaje "ya hay texto"
    y se agrega el mensaje "aún no hay texto" */
entrada.addEventListener('input', () => {
    clearTimeout(timeoutId);

    if (entrada.value !== '') {
        aunNoTexto.style.opacity = '0';
        siTexto.style.opacity = '1';
    
        timeoutId = setTimeout(() => {
            aunNoTexto.style.display = 'none';
            siTexto.style.display = 'block';
        }, 300);

    } else {
        aunNoTexto.style.display = 'block';
        siTexto.style.display = 'none';

        timeoutId = setTimeout(() => {
            aunNoTexto.style.opacity = '1';
        }, 300);
    }
});

/* Este evento es necesario debido a que la frecuencia de disparo del evento 'input' no funciona del todo bien
para lo que se está utilizando, pero es necesario conservarlo para que la animación de la opacidad funcione bien */
entrada.addEventListener('keyup', () => {
    if (entrada.value !== '') {
        aunNoTexto.style.display = 'none';
        siTexto.style.display = 'block';
        
    } else {
        aunNoTexto.style.display = 'block';
        siTexto.style.display = 'none';
    }
});


// Cambia la altura del textarea según su contenido
entrada.addEventListener("input", () => {
    entrada.style.height = 'auto';
    entrada.style.height = `${entrada.scrollHeight}px`;
});

/* Permite que el navegador muestre una alerta al momento de que el usuario quiera recargar o salir de la página
    con el motivo de advertirle que perderá el texto ingresado si lo hace.
*/
window.addEventListener("beforeunload", function(e) {
    e.preventDefault();
});

// Elimina la encriptación o desencriptación y el botón de copiar cuando el <textarea> presenta cambios
entrada.addEventListener("input", () => {
    /* Se selecciona aquí puesto que es un elemento generado con JavaScript y no proviene directamente del DOM,
    por lo que si selecciona fuera de este evento, es posible que se seleccione antes de que siquiera exista y
    por ende no funcione */
    const salida = document.querySelector(".salida"); 
    const btn_copiar = document.querySelector(".btn_copiar");

    if (salida !== null) {
        salida.remove();
        btn_copiar.remove();
    }
});

