/** Crear la siguiente estructura
        <div class="contenido">
            <div class="perfil">
                <div id="foto">
                    <img src="https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg">
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

fetch("/queja/user")
.then(results => results.json())
.then(queja_info => {
    console.log(queja_info);
    queja_info.forEach(element => {
        console.log(element);
    });
    console.log("Estoy funcionando");
});