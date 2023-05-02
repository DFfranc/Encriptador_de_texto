// Código para insertar el año actual en el footer
const yearContainer = document.querySelector(".year");

let year = new Date();
let currentYear = year.getFullYear();

yearContainer.innerHTML = currentYear;