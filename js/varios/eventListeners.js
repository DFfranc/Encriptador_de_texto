import { entrada } from "../base/variables.js";
const aunNoTexto = document.querySelector(".no_texto");

/* Se utiza esta variable y clearTimeout() como solución al problema de que si el usuario borra muy rápido,
el valor del input no se alcanza a actualizar antes de que se ejecuten los setTimeout(), lo que hace que se 
vuelva a ocultar incluso si el input está vacío */
let timeoutId;

// Muestra el mensaje de que aún no hay texto cuando el usuario no ha ingresado nada y lo oculta cuando si 
entrada.addEventListener("input", () => {
    clearTimeout(timeoutId);

    if(entrada.value !== ""){
        aunNoTexto.style.opacity = '0';
        timeoutId = setTimeout(()=>{
            aunNoTexto.style.display = 'none';
        }, 250);
    } else {
        aunNoTexto.style.display = 'block';
        timeoutId = setTimeout(()=>{
            aunNoTexto.style.opacity = '1';
        }, 250);
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
