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

var sur_ruta = [
    L.latLng(28.635263, -106.044502), // Punto de inicio
    L.latLng(28.6266899,-106.0314196), // El primer punto es el inicio, los demás son paradas
    L.latLng(28.620831, -106.029129),
    L.latLng(28.621774, -106.046270), 
    L.latLng(28.602196,-106.101084), 
    L.latLng(28.6015419,-106.1026966),
    L.latLng(28.647509, -106.133202), // El último punto es la parada final
    L.latLng(28.642570, -106.146970) // Destino final, UTCh
]

function sur(){
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

    marcadores.push(L.marker([28.642570, -106.146970]).addTo(map).bindPopup("UTCh").openPopup())

    marcadores.push(L.marker([28.635263, -106.044502]).addTo(map).bindPopup("Inicio").openPopup())
}

function eliminar(){
    routingControl.setWaypoints([]);
    marcadores.forEach(element => {
        map.removeLayer(element);
    });
    utch_marker.openPopup();

}