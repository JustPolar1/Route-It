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
        const tituloElement = document.getElementById('tituloprincipal');
        if (tituloElement) tituloElement.textContent = translations[language].tituloprincipal; // asi es como se debe hacer para que aparezca el contenido

        const titulo2Element = document.getElementById('titulo2');
        if (titulo2Element) titulo2Element.textContent = translations[language].titulo2;

        const profileElement = document.getElementById('profile-link');
        if (profileElement) profileElement.textContent = translations[language].profile-link;

        const configElement = document.getElementById('selectoridioma');
        if (configElement) configElement.textContent = translations[language].selectoridioma;

        const selectidiomaElement = document.getElementById('link-configuracion');
        if (selectidiomaElement) selectidiomaElement.textContent = translations[language].link-configuracion;

        const logoutsesionElement = document.getElementById('link-cerrar-sesion');
        if (logoutsesionElement) logoutsesionElement.textContent = translations[language].link-cerrar-sesion;

        const BusroutesElement = document.getElementById('rutas-camiones');
        if (BusroutesElement) BusroutesElement.textContent = translations[language].rutas-camiones;

        const rutaNorteElement = document.getElementById('ruta_norte');
        if (rutaNorteElement) rutaNorteElement.textContent = translations[language].ruta_norte;

        const rutaNortdesElement = document.getElementById('ruta-norte-descripcion');
        if (rutaNortdesElement) rutaNortdesElement.textContent = translations[language].ruta-norte-descripcion;

        const rutaNp1Element = document.getElementById('rutan-parada1');
        if (rutaNp1Element) rutaNp1Element .textContent = translations[language].rutan-parada1;

        const rutaNp2Element = document.getElementById('rutan-parada2');
        if (rutaNp2Element) rutaNp2Element.textContent = translations[language].rutan-parada2;

        const rutaNp3Element = document.getElementById('rutan-parada3');
        if (rutaNp3Element) rutaNp3Element.textContent = translations[language].rutan-parada3;

        const rutaNp4Element = document.getElementById('rutan-parada4');
        if (rutaNp4Element) rutaNp4Element.textContent = translations[language].rutan-parada4;

        const rutaNSElement = document.getElementById('rutan-salida');
        if (rutaNSElement) rutaNSElement.textContent = translations[language].rutan-salida;

        const rutaNrgElement = document.getElementById('rutan-regreso');
        if (rutaNrgElement) rutaNrgElement.textContent = translations[language].rutan-regreso;

        const rutaNcostElement = document.getElementById('rutan-costo');
        if (rutaNcostElement) rutaNcostElement.textContent = translations[language].rutan-costo;
        
        // Agrega más elementos aquí según sea necesario
    } 
}
});