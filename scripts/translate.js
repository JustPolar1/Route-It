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
            "profile_link": ["#profile_link"],
            "profile_link2": ["#profile_link2"],
            "link_cerrar_sesion": ["#link_cerrar_sesion"],
            "link_cerrar_sesion2": ["#link_cerrar_sesion2"],
        
            "quejas": ["#quejas"],

            "abouttitle": ["#abouttitle"],
            "vision2": ["#vision2"],
            "vision2text": ["#vision2text"],
            "mision2": ["#mision2"],
            "mision2text": ["#mision2text"],
            "proyect_desc": ["#proyect_desc"],
            "proyect_desctext": ["#proyect_desctext"],
            "frases2": ["#frases2"],
            "about2": ["#about2"],

            "notrute1": ["#notrute1"],
            "notrute2": ["#notrute2"],
            "notrute3": ["#notrute3"],
            "notrute4": ["#notrute4"]
            
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
