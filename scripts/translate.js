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
            "profile_link": ["#profile_link"],
            "link_configuracion": ["#link_configuracion"],
            "link_cerrar_sesion": ["#link_cerrar_sesion"],
        
          
            "ruta_norte": ["#ruta_norte"],
            "ruta_norte_descripcion": ["#ruta_norte_descripcion"],
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
    
            
            "nombre": ["#ruta_sur"],
            
            "info1": ["#sur_info1"],
            "info2": ["#sur_info2"],
                
                "descripcion": {
                    "desc1": ["#rutasur_desc"],
                    "desc2": ["#rutasur_desc2"]
                },
                "paradas": {
                    "parada1": ["#rutasur_parada1"],
                    "parada2": ["#rutasur_parada2"],
                    "parada3": ["#rutasur_parada3"],
                    "parada4": ["#rutasur_parada4"]
                },
                "salida": ["#rutasur_inicio"],
                "costo": ["#rutasur_costo"],
                "regreso": {
                    "costo": ["#rutasur_costo_reg"],
                    "especial": ["#rutasur_reg-espc"],
                    "paradas": {
                        "parada1": ["#rutasur_reg-parada1"],
                        "parada2": ["#rutasur_reg-parada2"],
                        "parada3": ["#rutasur_reg-parada3"],
                        "parada4": ["#rutasur_reg-parada4"],
                        "parada5": ["#rutasur_reg-parada5"],
                        "parada6": ["#rutasur_reg-parada6"]
                    }
                }
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
