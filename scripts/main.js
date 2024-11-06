document.addEventListener('DOMContentLoaded', () => {
const toggleBtn = document.getElementById('toggle-btn'); 
const sidebar = document.getElementById('sidebar');
const userButton = document.getElementById("usuario");
const userMenu = document.getElementById("menu");

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

document.getElementById('mostrarmas').addEventListener('click', function() {
 var moreContent = document.getElementById('moreContent'); 
 var button = this; 

 if (moreContent.style.display === 'none' || moreContent.style.display === '') { 
    moreContent.style.display = 'block'; 
    button.textContent = 'Mostrar menos';
 } else {
    moreContent.style.display = 'none'; button.textContent = 'Mostrar más +'; } }); 

});
