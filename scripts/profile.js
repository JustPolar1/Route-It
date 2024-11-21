/** Crear la siguiente estructura
        <div class="contenido">
            <div class="perfil">
                <div id="foto">
                    <img src="user.jpg">
                </div>
                <h2>Avril Alexa Caraveo Veleta</h2>
            </div>
            <!--Solo Si tiene una-->
            <h2>Ruta Preferida</h2>
            <div class="rutas">
                <div class="info">
                    <div class="ruta_info">
                        <h2>Ruta Norte</h2>
                    </div>
                </div>
                <a href="/map">
                    <button class="pildora_boton">
                        <span>Ver en el mapa</span><i class="fa fa-arrow-circle-right"></i>
                    </button>
                </a>
            </div>
            <h2>Tus comentarios</h2>
            <div class="comentario">
                <h3>Ruta Norte (7 de octubre del 2024)</h3>
                <p>La otra vez casi me caigo porque había un agujero en el camión</p>
            </div>
            <div class="comentario">
                <h3>Ruta Sur (26 de septiembre del 2024)</h3>
                <p>El camión estaba demasiado lleno, tanto que me dejaron y tuve que venirme en un camión urbano</p>
            </div>
        </div>
 */
document.addEventListener("DOMContentLoaded", () => {
    const htmlElement = document.querySelector("html");    
    const lang = htmlElement.getAttribute("lang") || "es";
        
    const contenido = document.querySelector(".contenido");
    const perfil = document.querySelector(".perfil");
    const foto = document.getElementById("foto");
    const ruta_info = document.querySelector(".ruta_info");
    const rutas = document.querySelector(".rutas");
    fetch("/perfil/info")
      .then(results => results.json())  // Asegúrate de devolver la promesa de json
      .then(perfil_info => {
          if (!perfil_info){
              window.location.href = "/";  // Redirige si no hay perfil
              return;
          }
          // Resto del código para manejar la información del perfil
          const img = document.createElement("img");
          img.setAttribute("src", "/assets/user.jpg");
    
          perfil_info = perfil_info[0];  // Accede a la información del primer usuario
    
          const nombre = perfil_info["perfil_nombre"];
          const h2 = document.createElement("h2");
          h2.textContent = nombre;
    
          // Ensamblar el perfil
          foto.append(img);
          perfil.append(foto);
          perfil.append(h2);
    
          // Manejar la ruta preferida
          const { ruta_preferida_fk } = perfil_info;
          const ruta_preferida_fk_nombre = document.createElement("h2");
          
          if (ruta_preferida_fk) {
              fetch(`/rutas/?ruta_id=${ruta_preferida_fk}&lang=${lang}`)
                  .then(results => results.json())
                  .then(ruta_preferida_fk_info => {
                      const { ruta_nombre } = ruta_preferida_fk_info[0];
                      ruta_preferida_fk_nombre.textContent = ruta_nombre;
                      ruta_info.append(ruta_preferida_fk_nombre);
    
                      // Añadir botón para ver en el mapa
                      const mapa = document.createElement("a");
                      mapa.setAttribute("href", "/map");
    
                      const boton = document.createElement("button");
                      boton.classList.add("pildora_boton");
    
                      const span = document.createElement("span");
                      span.textContent = "Ver en el mapa";
    
                      const i = document.createElement("i");
                      i.classList.add("fa", "fa-arrow-circle-right");
    
                      boton.appendChild(span);
                      boton.appendChild(i);
    
                      mapa.appendChild(boton);
                      rutas.append(mapa);
                  });
          } else {
              ruta_preferida_fk_nombre.textContent = "Sin ruta preferida";
              ruta_info.append(ruta_preferida_fk_nombre);
          }
      });
    
    
    fetch("/queja/user")
    .then(results => results.json())
    .then(queja_info => {
        /** Ejemplo
        [
            {
                "comentario_id": 5,
                "comentario": "Llegó demasiado temprano y muchas veces llega muy tarde, al final se me pasó, sean más consistentes con sus horarios",
                "perfil_fk": 4,
                "ruta_fk": 2
            },
            ...
        ]
         */
    
        if (queja_info.length === 0){
            console.log("hola");
            const titulo = document.createElement("h2");
            titulo.textContent = "No has puesto ningún comentario";
    
            const divComentario = document.createElement("div");
            divComentario.classList.add("comentario");
            divComentario.appendChild(titulo); // Añadir el título al div
    
            contenido.append(divComentario);
        }
        else {
            queja_info.forEach(queja_detalles => {
                // Crear el contenedor <div>
                const divComentario = document.createElement("div");
                divComentario.className = "comentario";
                // Crear el encabezado <h3>
                const titulo = document.createElement("h3");
                fetch(`/rutas/?ruta_id=${queja_detalles["ruta_fk"]}&lang=${lang}`)
                .then(results => results.json())
                .then(ruta_preferida_fk_info => {
                    console.log(ruta_preferida_fk_info);
                    const { ruta_nombre } = ruta_preferida_fk_info;
                    titulo.textContent = ruta_nombre;
                });
        
                // Crear el párrafo <p>
                const comentario = document.createElement("p");
                comentario.textContent = queja_detalles["comentario"];
        
                // Ensamblar los elementos
                divComentario.appendChild(titulo); // Añadir el título al div
                divComentario.appendChild(comentario); // Añadir el párrafo al div
        
                // Añadir al DOM (por ejemplo, al cuerpo)
                contenido.append(divComentario);
            });
        }
        // Crear el enlace <a>
        const enlace = document.createElement("a");
        enlace.href = "/queja"; // Establecer el atributo href
        enlace.id = "comentario"; // Establecer el id
        enlace.textContent = "Poner un comentario"; // Establecer el texto del enlace
    
        // Añadir al contenido
        contenido.append(enlace);
    });
});
