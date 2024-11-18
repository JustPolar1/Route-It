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

    // Mapa de elementos que deben ser traducidos
    let elementsMap = {
            "tituloprincipal": ["#tituloprincipal"],
            "titulo2": ["#titulo2"],
            "titulo3": ["#titulo3"],
            "titulo4": ["#titulo4"],
            "titulo5": ["#titulo5"],
            "titulo6": ["#titulo6"],
            "titulo7": ["#titulo7"],
            "titulo8": ["#titulo8"],
            "profile_link": ["#profile_link"],
            "profile_link2": ["#profile_link2"],
            "link_configuracion": ["#link_configuracion"],
            "link_configuracion2": ["#link_configuracion2"],
            "link_cerrar_sesion": ["#link_cerrar_sesion"],
            "link_cerrar_sesion2": ["#link_cerrar_sesion2"],
        
          
            "ruta_norte": ["#ruta_norte"],
            "ruta_norte_descripcion": ["#ruta_norte_descripcion"],
            "ruta_norte_info": ["#ruta_norte_info"],
            "rutan_parada1": ["#rutan_parada1"],
            "rutan_parada2": ["#rutan_parada2"],
            "rutan_parada3": ["#rutan_parada3"],
            "rutan_parada4": ["#rutan_parada4"],
            "rutan_salida": ["#rutan_salida"],
            "rutan_regreso": ["#rutan_regreso"],
            "rutan_costo": ["#rutan_costo"],
            "showmap": ["#showmap"],

            "ruta_noreste": ["#ruta_noreste"],
            "ruta_noreste_descripcion": ["#ruta_noreste_descripcion"],
            "rutane_llegada": ["#rutane_llegada"],
            "rutane_salida": ["#rutane_salida"],
            "rutane_regreso": ["#rutane_regreso"],
            "rutane_llegada": "This route arrives at the UTCH at 6:55 am.",
            "rutane_precio": ["#rutane_precio"],
            "rutane_precio2":["#rutane_precio2"],
            "rutane_info": ["#rutane_info"],

            "rutane_parada1": ["#rutane_parada1"],
            "rutane_parada2": ["#rutane_parada2"],
            "rutane_parada3": ["#rutane_parada3"],
            "rutane_parada4": ["#rutane_parada4"],
            "rutane_parada5": ["#rutane_parada5"],
            "rutane_parada6": ["#rutane_parada6"],
            "rutane_parada7": ["#rutane_parada7"],
            "rutane_parada8": ["#rutane_parada8"],
            "rutane_parada9": ["#rutane_parada9"],
            "rutane_parada10": ["#rutane_parada10"],
            "rutane_parada11": ["#rutane_parada11"],
            "rutane_parada12": ["#rutane_parada12"],
            "showmap2": ["#showmap2"],
    
            
            "ruta_suroeste": ["#ruta_suroeste"],
            "suroesteinfo": ["#suroesteinfo"],
            "suroesteprecio": ["#suroesteprecio"],
            "suroestellegada": ["#suroestellegada"],
            "suroesteparadas": ["#suroesteparadas"],
            "suroe1": ["#suroe1"],
            "suroe2": ["#suroe2"],
            "suroe3": ["#suroe3"],
            "suroe4": ["#suroe4"],
            "showmap3": ["#showmap3"],

            "ruta_sur": ["#ruta_sur"],
            "sur_info1": ["#sur_info1"],
            "sur_info2": ["#sur_info2"],
            "rutasur_costo": ["#rutasur_costo"],
            "rutasur_desc": ["#rutasur_desc"],
            "rutasur_desc2": ["#rutasur_desc2"],
            "rutasur_parada1": ["#rutasur_parada1"],
            "rutasur_parada2": ["#rutasur_parada2"],
            "rutasur_parada3": ["#rutasur_parada3"],
            "rutasur_parada4": ["#rutasur_parada4"],
            "showmap4": ["#showmap4"],

            "rutasur_regreso": ["#rutasur_regreso"],
            "rutasur_reg-espc": ["#rutasur_reg-espc"],
            "rutasur_inicio": ["#rutasur_inicio"],
            "rutasur_reg_costo": ["#rutasur_reg_costo"],
            "rutasurreginfo": ["#rutasurreginfo"],
            "rutasur_reg_parada1": ["#rutasur_reg_parada1"],
            "rutasur_reg_parada2": ["#rutasur_reg_parada2"],
            "rutasur_reg_parada3": ["#rutasur_reg_parada3"],
            "rutasur_reg_parada4": ["#rutasur_reg_parada4"],
            "rutasur_reg_parada5": ["#rutasur_reg_parada5"],
            "rutasur_reg_parada6": ["#rutasur_reg_parada6"],

            "rutas": ["#rutas"],
            "ruta_norte_1": ["#ruta_norte_1"],
            "ruta_norte_2": ["#ruta_norte_2"],
            "ruta_sur_ida": ["#ruta_sur_ida"],
            "ruta_sur_regreso": ["#ruta_sur_regreso"],
            "quejas": ["#quejas"],

            "abouttitle": ["#abouttitle"],
            "vision2": ["#vision2"],
            "vision2text": ["#vision2text"],
            "mision2": ["#mision2"],
            "mision2text": ["#mision2text"],
            "proyect_desc": ["#proyect_desc"],
            "proyect_desctext": ["#proyect_desctext"],
            "frases2": ["#frases2"],
            "about2": ["#about2"]
            
    };
        

    // Función para actualizar el contenido
    function updateContent(language) {
        for (const [translationKey, elementIds] of Object.entries(elementsMap)) {
            // Verificar si los valores son objetos
            if (typeof elementIds === 'object' && !Array.isArray(elementIds)) {
                // Recursión para elementos anidados
                Object.values(elementIds).forEach(subElementIds => {
                    if (Array.isArray(subElementIds)) {
                        subElementIds.forEach(id => {
                            const element = document.querySelector(id);
                            if (element && translations[language] && translations[language][translationKey]) {
                                element.textContent = translations[language][translationKey];
                            } else {
                                console.warn(`No se encontró el elemento o la traducción para ${translationKey}`);
                            }
                        });
                    }
                });
            } else if (Array.isArray(elementIds)) {
                // Si es un arreglo directo de selectores
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
    }
});
