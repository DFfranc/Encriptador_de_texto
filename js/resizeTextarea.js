/** 
 * Cambia la altura del textarea según su contenido
*/
function resize(){
    const textarea = document.querySelector('.texto_entrada');

    textarea.addEventListener("input", () => {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    });
}

export { resize };
