// animations.js
document.addEventListener("DOMContentLoaded", () => {
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

    // Función que observa los elementos recién creados
    function observeElements() {
        const elements = document.querySelectorAll(".perfil, .comentario, .info, .preview, .pildora_boton, .rutas, .rutas_info, .contenido");
        elements.forEach(element => {
            observer.observe(element); // Observa los elementos
        });
    }

    // Observa el DOM por cambios, como la adición de nuevos elementos
    const mutationObserver = new MutationObserver(() => {
        observeElements(); // Llamar a la función de observación cada vez que haya un cambio en el DOM
    });

    // Configura el MutationObserver para observar el contenedor de contenido
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    // Observa los elementos al cargar la página
    observeElements();
});
