import { eliminarSalida_BotonCopiar, resizeTextarea } from "../base/funciones.js";
import { entrada } from "../base/variables.js";

/* Se utiza "timeoutId" y clearTimeout() debido a la frecuencia de activación del evento "input",
haciendo que no se alcance a actualizar antes de que se ejecuten los setTimeout(), causando un comportamiento impredecible */
let timeoutId;
const aunNoTexto = document.querySelector(".no_texto");
const siTexto = document.querySelector(".si_texto");

entrada.addEventListener('input', () => {
    /* Muestra el mensaje "texto no presente" cuando el usuario no ha ingresado nada y lo cambia por el mensaje
    "texto presente cuando ya ingresó algo y viceversa.*/
    clearTimeout(timeoutId);

    if (entrada.value !== '') {
        aunNoTexto.style.opacity = '0';
        siTexto.style.opacity = '1';
    
        timeoutId = setTimeout(() => {
            // Se cambia el display también para que no ocupe espacio en el DOM cuando esta oculto el mensaje correspondiente
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

    resizeTextarea();
    eliminarSalida_BotonCopiar();
});

/* Este evento es necesario debido a que la frecuencia de disparo del evento 'input' no funciona del todo bien
para lo que se está utilizando, pero se requiere conservarlo para que la animación de la opacidad funcione bien */
entrada.addEventListener('keyup', () => {
    if (entrada.value !== '') {
        aunNoTexto.style.display = 'none';
        siTexto.style.display = 'block';
        
    } else {
        aunNoTexto.style.display = 'block';
        siTexto.style.display = 'none';
    }
});

/* Permite que el navegador muestre una alerta al momento de que el usuario quiera recargar o salir de la página
    con el motivo de advertirle que perderá el texto ingresado si lo hace. */
window.addEventListener("beforeunload", function(e) {
    e.preventDefault();
});
