// Suponiendo que el JSON con las citas bíblicas se llama biblia.json

// Esta función se ejecuta cuando la página está completamente cargada
document.addEventListener("DOMContentLoaded", function () {
    // Puedes cargar el JSON de manera asíncrona usando fetch
    fetch('biblia.json')
        .then(response => response.json())
        .then(data => {
            // Guardamos los datos en una variable para acceder a ellos posteriormente
            window.bibliaData = data;
        })
        .catch(error => console.error('Error al cargar el JSON:', error));
});

// Función para buscar la cita bíblica y mostrar el resultado
function buscarCita() {
    // Obtenemos la cita ingresada por el usuario
    var citaInput = document.getElementById("citaBiblica").value;

    // Verificamos que la variable con los datos esté definida
    if (window.bibliaData) {
        // Buscamos la cita en los datos del JSON
        var resultadoCita = buscarCitaEnJSON(citaInput);

        // Mostramos el resultado en la página
        mostrarResultado(resultadoCita);
    } else {
        console.error('Error: El JSON con las citas bíblicas no está cargado.');
    }
}

// Función para buscar la cita en el JSON
function buscarCitaEnJSON(citaInput) {
    // Obtenemos la lista de libros del JSON
    var libros = window.bibliaData.libros;

    // Buscamos la cita ingresada en los libros
    for (var i = 0; i < libros.length; i++) {
        // Obtenemos las citas del libro actual
        var citas = libros[i].citas;

        // Buscamos la cita dentro de las citas del libro actual
        for (var j = 0; j < citas.length; j++) {
            if (citas[j].referencia === citaInput) {
                return citas[j];
            }
        }
    }

    // Si la cita no se encuentra, devolvemos null
    return null;
}


// Función para mostrar el resultado en la página
function mostrarResultado(resultadoCita) {
    // Obtenemos el elemento donde se mostrará el resultado
    var resultadoElement = document.getElementById("resultado");

    // Limpiamos el contenido previo
    resultadoElement.innerHTML = '';

    // Creamos elementos HTML para mostrar la cita y la explicación
    if (resultadoCita) {
        var citaHTML = '<p><strong>' + resultadoCita.referencia + '</strong></p>';
        var textoHTML = '<p>' + resultadoCita.texto + '</p>';
        var explicacionHTML = '<p>' + resultadoCita.explicacion + '</p>';

        // Agregamos los elementos al resultadoElement
        resultadoElement.innerHTML = citaHTML + textoHTML + explicacionHTML;
    } else {
        resultadoElement.innerHTML = '<p>No se encontró la cita bíblica.</p>';
    }
}
