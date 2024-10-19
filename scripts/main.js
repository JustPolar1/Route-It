const toggleBtn = document.getElementById('toggle-btn'); 
const sidebar = document.getElementById('sidebar');
const userButton = document.getElementById("usuario");
const userMenu = document.getElementById("menu");
const languageSwitcher = document.getElementById('languageSwitcher'); 

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

languageSwitcher.addEventListener('change', function (event) {
    const selectedLanguage = event.target.value;
    console.log('Idioma cambiado a:', selectedLanguage); 
    localStorage.setItem('language', selectedLanguage);
    loadLanguage(selectedLanguage); 
});


document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    const languageSwitcher = document.getElementById('languageSwitcher');  
    
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
});


function loadLanguage(language) {
    fetch('/scripts/content.json')  
        .then(response => response.json())
        .then(data => {
            const translations = data[language];  
            console.log('Traducciones cargadas:', translations);  // Verifica el contenido del archivo JSON

            if (!translations) {
                console.error(`No se encontraron traducciones para el idioma: ${language}`);
                return;
            }

            console.log('Elementos en el DOM:', document.getElementById('titulo2'), document.getElementById('ruta_norte'));

            const titulo2Element = document.getElementById('titulo2');
            if (titulo2Element) titulo2Element.textContent = translations.titulo2 || 'Título por defecto';

            const rutaNorteElement = document.getElementById('ruta_norte');
            if (rutaNorteElement) rutaNorteElement.textContent = translations.ruta_norte || 'Ruta Norte por defecto';

        })
        .catch(error => console.error('Error al cargar las traducciones:', error));
}



