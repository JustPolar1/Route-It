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
var ruta_actual; // Para saber los waypoints que se están usando actualmente

var sur_ruta = [
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
    })
});


function sur_regreso(){
    // Configuración del control de enrutamiento
    routingControl = L.Routing.control({
        waypoints: sur_ruta,
        draggableWaypoints: false,
        routeWhileDragging: false,
        lineOptions: {
            styles: [{ color: 'blue', opacity: 0.7, weight: 5 }]
        },
        show: false
    }).addTo(map);

    map.removeLayer(utch_marker);

    marcadores.push(L.marker([28.64215, -106.147051]).addTo(map).bindPopup("Inicio").openPopup())
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