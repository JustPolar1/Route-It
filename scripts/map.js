var map = L.map('map', {zoomControl: false}).setView([28.641874, -106.147054], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.control.zoom({
    position: 'topright' 
}).addTo(map);

var utch_marker = L.marker([28.642570, -106.146970]).addTo(map).bindPopup("UTCh");

utch_marker.openPopup();
var routingControl;
function mostrar_ruta(ruta){
    if (routingControl){
        map.removeControl(routingControl);
    }

    // Configuración del control de enrutamiento
    routingControl = L.Routing.control({
        waypoints: ruta,
        draggableWaypoints: false,
        routeWhileDragging: false,
        lineOptions: {
            styles: [{ color: 'blue', opacity: 0.7, weight: 5 }]
        },
        show: false
    }).addTo(map);
    
    map.removeLayer(utch_marker);
    
    routingControl._container.style.display = "none";
}
/** Quiero crear la siguiente estructura

        <div class="barra-lateral" id="sidebar">
            <ul id="rutas">
                <!--Plantilla para las rutas-->
                <li>
                    <button class="pildora ruta" onclick="ruta_actual = ruta_norte_1">Ruta Norte 1</button>
                </li>
            <footer>
                <ul>
                    <li><a href="/queja">Quejas</a></li>
                </ul>
            </footer>
        </div>
 */

const rutas_div = document.getElementById("rutas");
var ruta_actual = []; // Para saber los waypoints que se están usando actualmente
document.addEventListener("DOMContentLoaded", () => {
    const htmlElement = document.querySelector("html");
    const lang = htmlElement.getAttribute("lang") || "es";
    
    fetch("/rutas/paradas")
    .then(resultado => resultado.json())
    .then(paradas => {
        const rutas = paradas.reduce((acc, parada) => {
            const { ruta_fk, waypoint, parada_orden } = parada;
        
            if (!acc[ruta_fk]) acc[ruta_fk] = [];
        
            acc[ruta_fk].push({
                coordenada: L.latLng(waypoint.x, waypoint.y), 
                orden: parada_orden, 
            });
        
            return acc;
        }, {});
    
        console.log(rutas);
    
        Object.keys(rutas).forEach(ruta => {
            const li = document.createElement("li");
            const pildora_ruta = document.createElement("button");
            pildora_ruta.classList.add("pildora");
            pildora_ruta.classList.add("ruta");
    
            fetch(`/rutas?ruta_id=${ruta}&lang=${lang}`).then(resultado => resultado.json())
            .then(ruta_info => {
                pildora_ruta.textContent = ruta_info.ruta_nombre;  // Ya tiene el nombre en español
            });
    
            li.append(pildora_ruta);
    
            const coordenadas = rutas[ruta].map(item => item.coordenada);
    
            pildora_ruta.setAttribute("onclick", `ruta_actual = ${JSON.stringify(coordenadas)}; console.log(ruta_actual);`);
    
            pildora_ruta.addEventListener("click", () => {
                pildora_ruta.disabled = true;
                document.querySelectorAll('.pildora.ruta').forEach(btn => {
                  if (btn !== pildora_ruta) {
                    btn.disabled = false;
                  }
                });
                mostrar_ruta(ruta_actual);
              });
    
            rutas_div.appendChild(li);
        });
    })
    .then(() => {
        /** Para crear la siguiente estructura
                    <footer>
                        <ul>
                            <li><a href="/queja">Quejas</a></li>
                        </ul>
                    </footer>
         */
        const footer = document.createElement("footer");
        const ul = document.createElement("ul");
        const li = document.createElement("li");
        const a = document.createElement("a");
    
        a.setAttribute("href", "/queja");
        a.textContent = lang === "es" ? "Comentarios" : "Feedback"; // Cambiar texto dependiendo del idioma

    
        li.append(a);
        ul.append(li);
        footer.append(ul);
    
        rutas_div.appendChild(footer);
    });
});
