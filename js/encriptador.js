const entrada = document.querySelector(".texto_entrada");
const salida = document.querySelector(".texto_salida");
const textoNoMensajes = document.querySelector(".no_texto");

const btn_encriptar = document.querySelector(".btn_encriptar");


function mostrarTextoNoMensajes (){
    textoNoMensajes.classList.remove('ocultar');
}

function ocultarTextoNoMensajes (){
    textoNoMensajes.classList.add('ocultar');
}

function encriptarTexto (){
    const texto = entrada.value.trim();
    const textoArray = texto.split("");
    const arrayEncriptado = [];

    const vocales = ["a", "e", "i", "o", "u"];
    const llaves = ["enter", "imes", "ai", "ober", "ufat"];

    for(let i = 0; textoArray.length > i; i++){
        let j = 0;

        for(j; vocales.length > j; j++){
            if(textoArray[i] === vocales[j]){
                arrayEncriptado[i] = llaves[j];

            } else if (arrayEncriptado[i] === undefined){
                arrayEncriptado[i] = textoArray[i];
            }
        }

        j = 0;
    }

    const textoEncriptado = arrayEncriptado.join("");
    const textoSalida = document.createElement("P");
    textoSalida.textContent = textoEncriptado;
    salida.appendChild(textoSalida);
}


/* Muestra el texto cuando el usuario no ha ingresado texto y lo oculta cuando si */
entrada.addEventListener("input", () => {
    if(entrada.value !== ""){
        ocultarTextoNoMensajes();
    } else {
        mostrarTextoNoMensajes();
    }
});

btn_encriptar.onclick = encriptarTexto;