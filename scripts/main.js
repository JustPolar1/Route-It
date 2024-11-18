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

