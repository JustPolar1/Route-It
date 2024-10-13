const toggleBtn = document.getElementById('toggle-btn');
const sidebar = document.getElementById('sidebar');

toggleBtn.addEventListener('click', function() {
    sidebar.classList.toggle('hidden'); // Alterna la visibilidad de la barra lateral
});
