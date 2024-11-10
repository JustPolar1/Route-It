// Función que activa las animaciones cuando una sección es visible
function activarAnimacion() {
    const sections = document.querySelectorAll("section, div");

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

        // Si la sección es visible y no tiene la clase fade-in, añadir la clase
        if (isVisible && !section.classList.contains("fade-in")) {
            section.classList.add("fade-in");

            // Eliminar la clase 'fade-in' después de que la animación haya terminado
            section.addEventListener("animationend", () => {
                section.classList.remove("fade-in");
            });
        }
    });
}

// Escuchar el evento scroll para activar la función
window.addEventListener("scroll", activarAnimacion);
// Llamar a la función al cargar la página para activar animaciones visibles
activarAnimacion();