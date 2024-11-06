document.addEventListener('DOMContentLoaded', () => {
const toggleBtn = document.getElementById('toggle-btn'); 
const sidebar = document.getElementById('sidebar');
const userButton = document.getElementById("usuario");
const userMenu = document.getElementById("menu");
var buttons = document.querySelectorAll('.mostrarmas'); 

toggleBtn.addEventListener('click', function() {
    sidebar.classList.toggle('hidden'); // Alterna la visibilidad de la barra lateral
});

userButton.addEventListener('click', function(event) {
    event.stopPropagation(); // Prevenir que el evento se propague
    userMenu.style.display = (userMenu.style.display === 'flex') ? 'none' : 'block'; // Alternar menú
});


window.addEventListener('click', function(event) {
    if (!userButton.contains(event.target)) {
        userMenu.style.display = 'none'; 
    }
});

buttons.forEach(function(button) { 
    button.addEventListener('click', function() { 
    var moreContent = this.previousElementSibling; 

    if (moreContent.style.display === 'none') { 
        moreContent.style.display = 'block'; 
        this.textContent = 'Mostrar menos'; 
    } else { 
        moreContent.style.display = 'none'; 
        this.textContent = 'Mostrar más'; } })
    });

});


window.onload = function () {
    // Variables
    const IMAGENES = [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeUlNqH7GkNGP9wSC8xenCgiNH1aGXLFDcKQ&s">FL2H2oAAr0PwWQ&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQapgxGXx5PPQOi7QohQQ_PVC_DE78hs3mRog&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvkRdGzPe6se3O_hh4OYZ-FL2H2oAAr0PwWQ&s>'
    ];

    const TIEMPO_INTERVALO_MILESIMAS_SEG = 1000;
    let posicionActual = 0;
    let $botonRetroceder = document.querySelector('#retroceder');
    let $botonAvanzar = document.querySelector('#avanzar');
    let $imagen = document.querySelector('#imagen')
    let intervalo; 


function pasarFoto() {
    if(posicionActual >= IMAGENES.length - 1) {
        posicionActual = 0;
    } else {
        posicionActual++;
    }
    renderizarImagen();
}

function retrocederFoto() {
    if(posicionActual <= 0) {
        posicionActual = IMAGENES.length - 1;
    } else {
        posicionActual--;
    }
    renderizarImagen();
}

function renderizarImagen () {
    $imagen.style.backgroundImage = `url(${IMAGENES[posicionActual]})`;
}

$botonAvanzar.addEventListener('click', pasarFoto);
$botonRetroceder.addEventListener('click', retrocederFoto);

 // Iniciar
renderizarImagen();
};
