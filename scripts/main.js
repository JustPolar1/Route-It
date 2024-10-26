document.addEventListener('DOMContentLoaded', () => {
const toggleBtn = document.getElementById('toggle-btn'); 
const sidebar = document.getElementById('sidebar');
const userButton = document.getElementById("usuario");
const userMenu = document.getElementById("menu");
const languageSwitcher = document.getElementById('languageSwitcher');
let translations = {};


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
            translations = data; // Guardar las traducciones en el ámbito global
            console.log('Traducciones cargadas:', translations);  

            // Actualizar contenido basado en el idioma seleccionado
            updateContent(language);
        })
        .catch(error => console.error('Error al cargar las traducciones:', error));
}

let elementsMap = {
    "tituloprincipal": ["#mainTitle"],
    "titulo2": ["#subtitle"],
    "profile_link": ["#profileLink"],
    "selectoridioma": ["#languageSelector"],
    "link_configuracion": ["#settingsLink"],
    "link_cerrar-sesion": ["#logoutLink"],
    "rutas_camiones": ["#busRoutesTitle"],
    
    "ruta_norte": ["#northRouteTitle"],
    "ruta_norte-descripcion": ["#northRouteDescription"],
    "rutan_parada1": ["#northStop1"],
    "rutan_parada2": ["#northStop2"],
    "rutan_parada3": ["#northStop3"],
    "rutan_parada4": ["#northStop4"],
    "rutan_salida": ["#northDeparture"],
    "rutan_regreso": ["#northReturn"],
    "rutan_costo": ["#northCost"],
    
    "ruta_noroeste": ["#northwestRouteTitle"],
    "ruta_noroeste_desc": ["#northwestRouteDescription"],
    "rutanoe_parada1": ["#northwestStop1"],
    "rutanoe_parada2": ["#northwestStop2"],
    "rutanoe_parada3": ["#northwestStop3"],
    "rutanoe_parada4": ["#northwestStop4"],
    "rutanoe_parada5": ["#northwestStop5"],
    "rutanoe_parada6": ["#northwestStop6"],
    "rutanoe_parada7": ["#northwestStop7"],
    "rutanoe_parada8": ["#northwestStop8"],
    "rutanoe_parada9": ["#northwestStop9"],
    "rutanoe_parada10": ["#northwestStop10"],
    "rutanoe_parada11": ["#northwestStop11"],
    "rutanoe_parada12": ["#northwestStop12"],
    "rutanoe_salida": ["#northwestDeparture"],
    "rutanoe_regreso": ["#northwestReturn"],
    "rutanoe_precio": ["#northwestCost"],
    
    "ruta_sur": ["#southRouteTitle"],
    "sur_info1": ["#southInfo1"],
    "sur_info2": ["#southInfo2"],
    "rutasur_desc": ["#southRouteDescription"],
    "rutasur_desc2": ["#southRouteDescription2"],
    "rutasur_parada1": ["#southStop1"],
    "rutasur_parada2": ["#southStop2"],
    "rutasur_parada3": ["#southStop3"],
    "rutasur_parada4": ["#southStop4"],
    "rutasur_costo": ["#southCost"],

    "rutasur_regreso": ["#southReturnTitle"],
    "rutasur_reg-espc": ["#southReturnDescription"],
    "rutasur_reg-parada1": ["#southReturnStop1"],
    "rutasur_reg-parada2": ["#southReturnStop2"],
    "rutasur_reg-parada3": ["#southReturnStop3"],
    "rutasur_reg-parada4": ["#southReturnStop4"],
    "rutasur_reg-parada5": ["#southReturnStop5"],
    "rutasur_reg-parada6": ["#southReturnStop6"],
    "rutasur_inicio": ["#southReturnDeparture"],
    "rutasur_costo_reg": ["#southReturnCost"]
};


function updateContent(language) {
    for (const [translationKey, elementIds] of Object.entries(elementsMap)) {
        elementIds.forEach(id => {
            const element = document.querySelector(id);
            if (element && translations[language] && translations[language][translationKey]) {
                element.textContent = translations[language][translationKey];
            } else {
                console.warn(`No se encontró el elemento o la traducción para ${translationKey}`);
            }
        });
    }
}
});
