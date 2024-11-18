/**
    <option value="1">UTCh</option>
    <option value="2">Maquila</option>
 */

const orgs = document.getElementById("organizaciones");

fetch("/organizaciones").then(results => results.json())
.then(organizaciones => {
    /** Ejemplo de respuesta
    [
        {
            "organizacion_id": 1,
            "organizacion_nombre": "UTCh"
        }
    ],
    ...
     */
    organizaciones.forEach(organizacion_info => {
        const option = document.createElement('option');  // Crear un nuevo <option>
        option.value = organizacion_info.organizacion_id;      // Asignar el valor al atributo 'value'
        option.textContent = organizacion_info.organizacion_nombre; // Asignar el texto visible de la opción
    
        orgs.appendChild(option);  // Agregar la opción al <select>
    });
});