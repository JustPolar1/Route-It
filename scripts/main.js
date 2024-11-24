document.addEventListener('DOMContentLoaded', () => {
    const languageSwitcher = document.getElementById("languageSwitcher");
    
    // Obtener el idioma guardado en localStorage o usar el valor del atributo lang del <html>
    const savedLang = localStorage.getItem("lang");
    const htmlElement = document.querySelector("html");
    const lang = savedLang || htmlElement.getAttribute("lang") || "es"; // Establecer el idioma por defecto
    languageSwitcher.value = lang; // Asegurar que el select esté sincronizado con el valor actual
    htmlElement.setAttribute("lang", lang); // Aplicar el idioma guardado al atributo lang del <html>

    const toggleBtn = document.getElementById('toggle-btn'); 
    const sidebar = document.getElementById('sidebar');
    const userButton = document.getElementById("usuario");
    const userMenu = document.getElementById("menu");
    
    // Escuchar cambios en el selector de idioma
    languageSwitcher.addEventListener("change", (event) => {
        const selectedLang = event.target.value; // Obtener el valor de la opción seleccionada
        const htmlElement = document.querySelector("html");
        htmlElement.setAttribute("lang", selectedLang); // Cambiar el atributo lang del <html>
    
        // Guardar el idioma seleccionado en localStorage
        localStorage.setItem("lang", selectedLang);
    
        // Recargar la página para cargar el contenido en el idioma seleccionado
        location.reload();
    });
    

    /* Habilitar en producción
    const sesion = document.cookie;

    if (!sesion){
        window.location.href = "http://localhost:3000/pages/login.html"
    }
    */
    if (toggleBtn){
        toggleBtn.addEventListener('click', function() {
            sidebar.classList.toggle('hidden'); // Alterna la visibilidad de la barra lateral
        });
    }

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
