document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll("section, .info, .preview, .pildora_boton"); // Selecciona elementos a animar

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Añadir la clase de animación cuando el elemento entra en la vista
                entry.target.classList.add("fade-in");

                // Quitar la clase cuando la animación termine, para permitir que se reactive
                entry.target.addEventListener("animationend", () => {
                    entry.target.classList.remove("fade-in");
                });
            }
        });
    }, {
        threshold: 0 // Activa la animación cuando el 10% del elemento es visible
    });

    elements.forEach(element => {
        observer.observe(element);
    });
});
