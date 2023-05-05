document.addEventListener("DOMContentLoaded", () => {
    const btn_darkmode = document.querySelector(".btn_darkmode");
    const container = document.querySelector(".container_btn_darkmode");
    const movimiento = document.querySelector(".movimiento");
    
    btn_darkmode.addEventListener("click", () => {
        // Obtener el ancho y el alto del contenedor del botón para activar y desactivar el darkmode
        let ancho = container.getBoundingClientRect().width;
        let alto = container.getBoundingClientRect().height;
        
        // Agregar una clase al <body> que cambia los estilos con CSS
        document.body.classList.toggle("darkmode");

        // Permite mover el botón para activar y desactivar el darkmode
        if (document.body.classList.contains("darkmode")) {
            /* Se valida la altura porque en tamaño de tablet (480px a 940px) el contenedor del botón está
            en orientación vertical y no horizontal */
            if(alto === 80){
                // Se suma el tamaño del contenedor menos el tamaño del botón para que se mueva correctamente
                movimiento.style.top = `${alto - 40}px`;
            } else {
                // Se suma el tamaño del contenedor menos el tamaño del botón para que se mueva correctamente
                movimiento.style.left = `${ancho - 40}px`;
            }

        // Si no está activo el darkmode, se vuelve el botón a su posición inicial
        } else {
            movimiento.style.left = "0";
            movimiento.style.top = "0";
        }
    });
});
    
