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

        const profileElement = document.getElementById('profile_link');
        if (profileElement) profileElement.textContent = translations[language].profile_link;

        const configElement = document.getElementById('selectoridioma');
        if (configElement) configElement.textContent = translations[language].selectoridioma;

        const selectidiomaElement = document.getElementById('link_configuracion');
        if (selectidiomaElement) selectidiomaElement.textContent = translations[language].link_configuracion;

        const logoutsesionElement = document.getElementById('link_cerrar_sesion');
        if (logoutsesionElement) logoutsesionElement.textContent = translations[language].link_cerrar_sesion;

        const BusroutesElement = document.getElementById('rutas_camiones');
        if (BusroutesElement) BusroutesElement.textContent = translations[language].rutas_camiones;

        const rutaNorteElement = document.getElementById('ruta_norte');
        if (rutaNorteElement) rutaNorteElement.textContent = translations[language].ruta_norte;

        const rutaNortdesElement = document.getElementById('ruta_norte_descripcion');
        if (rutaNortdesElement) rutaNortdesElement.textContent = translations[language].ruta_norte_descripcion;

        const rutaNp1Element = document.getElementById('rutan_parada1');
        if (rutaNp1Element) rutaNp1Element .textContent = translations[language].rutan_parada1;

        const rutaNp2Element = document.getElementById('rutan_parada2');
        if (rutaNp2Element) rutaNp2Element.textContent = translations[language].rutan_parada2;

        const rutaNp3Element = document.getElementById('rutan-parada3');
        if (rutaNp3Element) rutaNp3Element.textContent = translations[language].rutan_parada3;

        const rutaNp4Element = document.getElementById('rutan_parada4');
        if (rutaNp4Element) rutaNp4Element.textContent = translations[language].rutan_parada4;

        const rutaNSElement = document.getElementById('rutan_salida');
        if (rutaNSElement) rutaNSElement.textContent = translations[language].rutan_salida;

        const rutaNrgElement = document.getElementById('rutan_regreso');
        if (rutaNrgElement) rutaNrgElement.textContent = translations[language].rutan_regreso;

        const rutaNcostElement = document.getElementById('rutan_costo');
        if (rutaNcostElement) rutaNcostElement.textContent = translations[language].rutan_costo;

        const rutaNoeElement = document.getElementById('ruta_noroeste');
        if (rutaNoeElement ) rutaNoeElement.textContent = translations[language].ruta_noroeste;

        const rutaNoedescElement = document.getElementById('ruta_noroeste_desc');
        if (rutaNoedescElement) rutaNoedescElement.textContent = translations[language].ruta_noroeste_desc;

        const rutaNoep1Element = document.getElementById('rutanoe_parada1');
        if (rutaNoep1Element) rutaNoep1Element.textContent = translations[language].rutanoe_parada1;

        const rutaNoep2Element = document.getElementById('rutanoe_parada2');
        if (rutaNoep2Element) rutaNoep2Element.textContent = translations[language].rutanoe_parada2;

        const rutaNoep3Element = document.getElementById('rutanoe_parada3');
        if (rutaNoep3Element) rutaNoep3Element.textContent = translations[language].rutanoe_parada3;

        const rutaNoep4Element = document.getElementById('rutanoe_parada4');
        if (rutaNoep4Element) rutaNoep4Element.textContent = translations[language].rutanoe_parada4;

        const rutaNoep5Element = document.getElementById('rutanoe_parada1');
        if (rutaNoep5Element) rutaNoep5Element.textContent = translations[language].rutanoe_parada5;

        const rutaNoep6Element = document.getElementById('rutanoe_parada1');
        if (rutaNoep6Element) rutaNoep6Element.textContent = translations[language].rutanoe_parada6;

        const rutaNoep7Element = document.getElementById('rutanoe_parada7');
        if (rutaNoep7Element) rutaNoep7Element.textContent = translations[language].rutanoe_parada7;

        const rutaNoep8Element = document.getElementById('rutanoe_parada8');
        if (rutaNoep8Element) rutaNoep8Element.textContent = translations[language].rutanoe_parada8;

        const rutaNoep9Element = document.getElementById('rutanoe_parada9');
        if (rutaNoep9Element) rutaNoep9Element.textContent = translations[language].rutanoe_parada9;

        const rutaNoep10Element = document.getElementById('rutanoe_parada10');
        if (rutaNoep10Element) rutaNoep10Element.textContent = translations[language].rutanoe_parada10;

        const rutaNoep11Element = document.getElementById('rutanoe_parada11');
        if (rutaNoep11Element) rutaNoep11Element.textContent = translations[language].rutanoe_parada11;

        const rutaNoep12Element = document.getElementById('rutanoe_parada12');
        if (rutaNoep12Element) rutaNoep12Element.textContent = translations[language].rutanoe_parada12;

        const rutaNoeSAElement = document.getElementById('rutanoe_salida');
        if (rutaNoeSAElement) rutaNoeSAElement.textContent = translations[language].rutanoe_salida;

        const rutaNoeRegElement = document.getElementById('rutanoe_regreso');
        if (rutaNoeRegElement) rutaNoeRegElement.textContent = translations[language].rutanoe_regreso;

        const rutaNoecostElement = document.getElementById('rutanoe_precio');
        if (rutaNoecostElement) rutaNoecostElement.textContent = translations[language].rutanoe_precio;

        const rutaSurElement = document.getElementById('ruta_sur');
        if (rutaSurElement) rutaSurElement.textContent = translations[language].ruta_sur;

        /*
      "ruta_sur":"Ruta Sur rumbo a la UTCH",
      "sur_info1":"El primer camión de esta ruta comeinza en Alsuper Fuentes Mares",
      "sur_info2":"El segundo camion de esta ruta comienza en frente de Terminal Sur J.P.II",
      "rutasur_desc":"Ambas rutas comienzan su recorido a las 6:15Am, llegando a la UTCH a las 6:55Am",
      "rutasur_desc2":"Las paradas de estas rutas son:",
      "rutasur_parada1":"Av. Pacheco.",
      "rutasur_parada2":"C. Juarez.",
      "rutasur_parada3":"C. Neri Santos.",
      "rutasur_parada4":"Av. Independencia.",
      "rutasur_costo":"Ambas paradas tiene un costo de $15.00 pesos mx",

  
      "rutasur_regreso":"Ruta Sur de regreso de la UTCH",
      "rutasur_reg-espc":"Esta ruta de regreso de la UTCH comienza su trayecto en  la UTCH y sus paradas son:",
      "rutasur_reg-parada1":"Periférico frente a Fashion mall.",
      "rutasur_reg-parada2":"Glorieta tricentenario.",
      "rutasur_reg-parada3":"Vialidad CH-P y Fuentes Mares.",
      "rutasur_reg-parada4":"Fuentes Mares y Nva. España.",
      "rutasur_reg-parada5":"Terminar Sur.",
      "rutasur_reg-parada6":"Pacheco y Pedro Meoqui.",
      "rutasur_inicio":"Esta ruta comienza su trayecto a las 2:05Pm",
      "rutasur_costo_reg":"La ruta Sur tiene un costo de $20.00 pesos mx"*/
        
        // Agrega más elementos aquí según sea necesario
    } 
}
});