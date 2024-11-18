// Función que activa las animaciones cuando una sección es visible
function activarAnimacion() {
    const sections = document.querySelectorAll("section");

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

        // Si la sección es visible, añadir la clase 'fade-in'
        if (isVisible) {
            section.classList.add("fade-in");

            // Quitar la clase después de la animación para que pueda repetirse
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
