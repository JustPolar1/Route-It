var map = L.map('map', {zoomControl: false}).setView([28.641874, -106.147054], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.control.zoom({
    position: 'topright' 
}).addTo(map);

// Configuración del control de enrutamiento
var routingControl = L.Routing.control({
    waypoints: [
        L.latLng(28.606896,-106.097504), 
        L.latLng(28.602196,-106.101084), 
        L.latLng(28.6015419,-106.1026966),
        L.latLng(28.647509, -106.133202), // El primer punto es el inicio, los demás son paradas
        L.latLng(28.642570, -106.146970) // Destino final, UTCh
    ],
    draggableWaypoints: false,
    routeWhileDragging: false,
    lineOptions: {
        styles: [{ color: 'blue', opacity: 0.7, weight: 5 }]
    },
    show: false
}).addTo(map);

L.marker([28.642570, -106.146970]).addTo(map).bindPopup("UTCh").openPopup()