document.addEventListener('DOMContentLoaded', () => {
    let translations = {};
    const languageSwitcher = document.getElementById('languageSwitcher');
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
    "tituloprincipal": ["#tituloprincipal"],
    "titulo2": ["#titulo2"],
    "profile_link": ["#profile_link"],
    "selectoridioma": ["#selectoridioma"],
    "esp":["esp"],
    "eng":["eng"],
    "link_configuracion": ["#link_configuracion"],
    "link_cerrar-sesion": ["#link_cerrar-sesion"],
    "rutas_camiones": ["#rutas_camiones"],
    "ruta_norte": ["#ruta_norte"],
    "ruta_norte_descripcion": ["#ruta_norte_descripcion"],
    "rutan_parada1": ["#rutan_parada1"],
    "rutan_parada2": ["#rutan_parada2"],
    "rutan_parada3": ["#rutan_parada3"],
    "rutan_parada4": ["#rutan_parada4"],
    "rutan_salida": ["#rutan_salida"],
    "rutan_regreso": ["#rutan_regreso"],
    "rutan_costo": ["#rutan_costo"],
    "ruta_noroeste": ["#ruta_noroeste"],
    "ruta_noroeste_desc": ["#ruta_noroeste_desc"],
    "rutanoe_parada1": ["#rutanoe_parada1"],
    "rutanoe_parada2": ["#rutanoe_parada2"],
    "rutanoe_parada3": ["#rutanoe_parada3"],
    "rutanoe_parada4": ["#rutanoe_parada4"],
    "rutanoe_parada5": ["#rutanoe_parada5"],
    "rutanoe_parada6": ["#rutanoe_parada6"],
    "rutanoe_parada7": ["#rutanoe_parada7"],
    "rutanoe_parada8": ["#rutanoe_parada8"],
    "rutanoe_parada9": ["#rutanoe_parada9"],
    "rutanoe_parada10": ["#rutanoe_parada10"],
    "rutanoe_parada11": ["#rutanoe_parada11"],
    "rutanoe_parada12": ["#rutanoe_parada12"],
    "rutanoe_salida": ["#rutanoe_salida"],
    "rutanoe_regreso": ["#rutanoe_regreso"],
    "rutanoe_precio": ["#rutanoe_precio"],
    "ruta_sur": ["#ruta_sur"],
    "sur_info1": ["#sur_info1"],
    "sur_info2": ["#sur_info2"],
    "rutasur_desc": ["#rutasur_desc"],
    "rutasur_desc2": ["#rutasur_desc2"],
    "rutasur_parada1": ["#rutasur_parada1"],
    "rutasur_parada2": ["#rutasur_parada2"],
    "rutasur_parada3": ["#rutasur_parada3"],
    "rutasur_parada4": ["#rutasur_parada4"],
    "rutasur_costo": ["#rutasur_costo"],
    "rutasur_regreso": ["#rutasur_regreso"],
    "rutasur_reg-espc": ["#rutasur_reg-espc"],
    "rutasur_reg-parada1": ["#rutasur_reg-parada1"],
    "rutasur_reg-parada2": ["#rutasur_reg-parada2"],
    "rutasur_reg-parada3": ["#rutasur_reg-parada3"],
    "rutasur_reg-parada4": ["#rutasur_reg-parada4"],
    "rutasur_reg-parada5": ["#rutasur_reg-parada5"],
    "rutasur_reg-parada6": ["#rutasur_reg-parada6"],
    "rutasur_inicio": ["#rutasur_inicio"],
    "rutasur_costo_reg": ["#rutasur_costo_reg"]
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