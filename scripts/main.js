document.addEventListener('DOMContentLoaded', () => {
const toggleBtn = document.getElementById('toggle-btn'); 
const sidebar = document.getElementById('sidebar');
const userButton = document.getElementById("usuario");
const userMenu = document.getElementById("menu");
const languageSwitcher = document.getElementById('languageSwitcher');
const translations = {};


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

userButton.addEventListener('click', function (event){
    event.preventDefault(); 
    console.log('idioma cambiado');
});

const savedLanguage = localStorage.getItem('language') || 'es'; // Obtener el idioma guardado (por defecto español)

// Configurar el selector de idioma
if (languageSwitcher) {
    languageSwitcher.value = savedLanguage;  
    loadLanguage(savedLanguage); 

    languageSwitcher.addEventListener('change', function (event) {
        const selectedLanguage = event.target.value;
        console.log('Idioma cambiado a:', selectedLanguage); 
        localStorage.setItem('language', selectedLanguage);
        loadLanguage(selectedLanguage); 
    });
} else {
    console.error('languageSwitcher no encontrado en el DOM.');
}

// Función para cargar el idioma
function loadLanguage(language) {
    fetch('/scripts/content.json')  
        .then(response => response.json())
        .then(data => {
            const translations = data; // Suponiendo que content.json tiene traducciones solo en inglés
            console.log('Traducciones cargadas:', translations);  

            // Actualizar contenido basado en el idioma seleccionado
            updateContent(language, translations);
        })
        .catch(error => console.error('Error al cargar las traducciones:', error));
}

// Función para actualizar el contenido de la página
function updateContent(language, translations) {
    if (language === 'en') {
        const tituloElement = document.getElementById('titulo2');
        if (tituloElement) tituloElement.textContent = translations.tituloElement;

        const rutaNorteElement = document.getElementById('ruta_norte');
        if (rutaNorteElement) rutaNorteElement.textContent = translations.ruta_norte;

        // Agrega más elementos aquí según sea necesario
    } else {
        // Contenido en español por defecto
        const tituloElement = document.getElementById('titulo2');
        if (tituloElement) tituloElement.textContent = "Página Principal"; // Ejemplo de texto en español

        const rutaNorteElement = document.getElementById('ruta_norte');
        if (rutaNorteElement) rutaNorteElement.textContent = "Ruta Norte"; // Ejemplo de texto en español

        // Agrega más elementos aquí según sea necesario
    }
}
});