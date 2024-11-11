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

var marcadores = [];

var routingControl;
var ruta_actual = []; // Para saber los waypoints que se están usando actualmente

var ruta_norte_1 = [
    L.latLng(28.76468937404245, -106.16938378182661), // Alsuper Riberas
    L.latLng(28.70258687986386, -106.14192785268213), // Circuito universitario y Miguel el Grande
    L.latLng(28.642632, -106.146909) // UTCh, punto final
]

var ruta_norte_2 = [
    L.latLng(28.74224416257849, -106.13791303769614), // Inicio en Prieto Luján
    L.latLng(28.744635839841038, -106.13287504610011), // Anthony Quinn
    L.latLng(28.74662489997584, -106.12841291189626), // Paseo real
    L.latLng(28.737653981907993, -106.12332086962223), // Mina Casale
    L.latLng(28.738884097381824, -106.12042303329815), // Mina progreso
    L.latLng(28.73959033440291, -106.11832342831346), // Mina progreso y Av. Industrial
    L.latLng(28.73366447915171, -106.11529624207145), // Elektra Av. Industrias 
    L.latLng(28.7293389520265, -106.11349216961726), // Industrias y Dostoyevski
    L.latLng(28.7265705711264, -106.12033780365736), // Dostoyevski y Sosa Vera
    L.latLng(28.642632, -106.146909) // UTCh, punto final
]

var ruta_sur_ida = [
    // Aún faltan paradas de camión, aún no sé si voy a marcar TODAS
    L.latLng(28.62086575203181, -106.03171545445987), // Alsuper Fuentes Mares. Inicio
    L.latLng(28.626852230301544, -106.03041384077241),
    L.latLng(28.645222841283974, -106.06899465553275),
    L.latLng(28.639714254961497, -106.07456167121934), // Neri Santos
    L.latLng(28.642632, -106.146909) // UTCh, punto final
]

var ruta_sur2 = [
    L.latLng(28.635263, -106.044502), // Punto de inicio
    L.latLng(28.6266899,-106.0314196), // El primer punto es el inicio, los demás son paradas
    L.latLng(28.620831, -106.029129),
    L.latLng(28.621774, -106.046270), 
    L.latLng(28.602196,-106.101084), 
    L.latLng(28.6015419,-106.1026966),
    L.latLng(28.647509, -106.133202), // El último punto es la parada final
    L.latLng(28.642632, -106.146909) // Destino final, UTCh
]

var ruta_sur_regreso = [
    L.latLng(28.64215, -106.147051), // Punto de inicio, UTCh
    L.latLng(28.623221582883048, -106.11379527074813), // Fashion Mall
    L.latLng(28.601764, -106.102537), // Glorieta
    L.latLng(28.619668405494654, -106.05115941991217), // Fuentes Mares Vialidad CH-P
    L.latLng(28.620905095639092, -106.03170352277296), // Fuentes Mares, Nueva España
    L.latLng(28.62689755522281, -106.03041925721031), // Terminal Sur
    L.latLng(28.636038471134963, -106.04539948224136) // Pacheco y Pedro Meoqui
]

// Apartado para event listener de los botones
const botones_rutas = document.getElementById('sidebar').querySelectorAll('button');
botones_rutas.forEach(boton => {
    boton.addEventListener('click', () => {
        boton.disabled = true;
        botones_rutas.forEach(btn => {
            if (btn !== boton) {
                btn.disabled = false;
            }
        });
        mostrar_ruta(ruta_actual);
    })
});


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
/*
function eliminar(){
    routingControl.setWaypoints([]);
    marcadores.forEach(element => {
        map.removeLayer(element);
    });
    utch_marker.openPopup();

}
*/