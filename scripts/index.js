document.addEventListener("DOMContentLoaded", () => {
    const contenido = document.querySelector(".contenido");
    const htmlElement = document.querySelector("html");

    const lang = htmlElement.getAttribute("lang") || "es";

    fetch(`/rutas?lang=${lang}`)
    .then(resultado => resultado.json())
    .then(info_rutas => {
        info_rutas.forEach(info_ruta => {
            const mapa = document.createElement("a");
            mapa.setAttribute("href", "/map");

            const boton = document.createElement("button");
            boton.classList.add("pildora_boton");

            const span = document.createElement("span");
            // Operación ternaria para cambiar el lenguaje del botón
            span.textContent = lang === "es" ? "Ver en el mapa" : "See on the map";

            const i = document.createElement("i");
            i.classList.add("fa");
            i.classList.add("fa-arrow-circle-right")

            boton.appendChild(span);
            boton.appendChild(i);

            mapa.appendChild(boton);
            
            const rutas = document.createElement("div");
            rutas.classList.add("rutas");

            const info = document.createElement("div");
            info.classList.add("info")
            
            const ruta_info = document.createElement("div");
            ruta_info.classList.add("ruta_info")
        
            const preview = document.createElement("div");
            preview.classList.add("preview")

            const img = document.createElement("img");
            img.setAttribute("src", "/assets/norte1.png");

            preview.appendChild(img);

            const descripcion_ruta = document.createElement("p");
            const nombre_ruta = document.createElement("h2");

            nombre_ruta.textContent = info_ruta["ruta_nombre"];
            descripcion_ruta.textContent = info_ruta["ruta_descripcion"];
            // Aquí van guardados las paradas
            const p = document.createElement("p");
            p.textContent = lang === "es" ? "Lista de paradas populares:" : "Popular bus stops:";
            const ol = document.createElement("ol");
            fetch("/rutas/paradas")
            .then(resultado => resultado.json())
            .then(paradas => {
                paradas_filtradas = paradas.filter(parada => parada.ruta_fk === info_ruta["ruta_id"])

                paradas_filtradas.forEach(parada => {
                    const li = document.createElement("li");

                    if (parada["parada_descripcion"] && parada["parada_descripcion"] != null) {
                        li.textContent = parada["parada_descripcion"];
                        ol.appendChild(li);
                    }
                });
            });

            if (!info_ruta["ruta_estatus"]){
                rutas.classList.add("desactivado");
            }

            ruta_info.append(nombre_ruta, descripcion_ruta, p, ol);

            info.appendChild(ruta_info);
            info.appendChild(preview);

            rutas.appendChild(info);
            rutas.appendChild(mapa);
            contenido.appendChild(rutas);
        });
    })
});