document.addEventListener("DOMContentLoaded", () => {
    const btn_darkmode = document.querySelector(".btn_darkmode");
    const container = document.querySelector(".container_btn_darkmode");
    const movimiento = document.querySelector(".movimiento");
    
    
    btn_darkmode.addEventListener("click", () => {
        let ancho = container.getBoundingClientRect().width;
        let alto = container.getBoundingClientRect().height;
        
        document.body.classList.toggle("darkmode");

        if (document.body.classList.contains("darkmode")) {
            if(alto === 80){
                movimiento.style.top = `${alto - 40}px`;
            } else {
                movimiento.style.left = `${ancho - 40}px`;
            }

        } else {
            movimiento.style.left = "0";
            movimiento.style.top = "0";
        }
    });
});
    
