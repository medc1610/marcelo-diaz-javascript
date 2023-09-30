
function generarTabla() {
    const numAlumnos = parseInt(document.getElementById('alumnos').value);
    const tablaContainer = document.getElementById('tabla-container');
    let tablaHTML = '<table>';
    tablaHTML += '<tr><th>Nombre</th><th>Nota</th></tr>';
    for (let i = 0; i < numAlumnos; i++) {
        tablaHTML += `<tr>
                        <td><input type="text" class="nombre" placeholder="Nombre"></td>
                        <td><input type="number" class="nota" min="1" max="7" placeholder="Nota"></td>
                      </tr>`;
    }
    tablaHTML += '</table>';
    tablaContainer.innerHTML = tablaHTML;
}

function verificarNotas() {
    const aprobados = [];
    const reprobados = [];
    const alumnosRows = document.querySelectorAll('#tabla-container .nombre');
    const notasRows = document.querySelectorAll('#tabla-container .nota');

    for (let i = 0; i < alumnosRows.length; i++) {
        const nombre = alumnosRows[i].value;
        const nota = parseInt(notasRows[i].value);

        if (nombre && nota) {

           while (nota < 1 || nota > 7) {
                alert('La nota debe estar entre 1 y 7');
                notasRows[i].value = '';
                notasRows[i].focus();
                return;
            }
           
            if (nota >= 4) {
                aprobados.push({nombre, nota});
            } else {
                reprobados.push({nombre, nota});
            }
        }
    }

    localStorage.setItem('aprobados', JSON.stringify(aprobados));
    localStorage.setItem('reprobados', JSON.stringify(reprobados));

    mostrarAprobados();
    mostrarReprobados();
}

function mostrarAprobados() {
    const tituloAprobados = document.getElementById('aprobadosTitulo');  
    const aprobadosContainer = document.getElementById('aprobados');
    const aprobadosData = JSON.parse(localStorage.getItem('aprobados')) || [];
    let aprobadosHTML = 'Alumnos Aprobados';
    if (aprobadosData.length === 0) {                
        aprobadosHTML += '<h6>No hay alumnos aprobados</h6>';
        tituloAprobados.innerHTML = aprobadosHTML;
    } else {   
        tituloAprobados.innerHTML = aprobadosHTML;     
        let tablaHTML = '<tr><th>Nombre</th><th>Nota</th></tr>';
        aprobadosData.forEach(alumno => {
            tablaHTML += `<tr><td>${alumno.nombre}</td><td>${alumno.nota}</td></tr>`;
        });   
        aprobadosContainer.innerHTML = tablaHTML;
    }
    
}

function mostrarReprobados() {
    const tituloReprobados = document.getElementById('reprobadosTitulo');    
    const reprobadosContainer = document.getElementById('reprobados');
    const reprobadosData = JSON.parse(localStorage.getItem('reprobados')) || [];
    let reprobadosHTML = 'Alumnos Reprobados';
    if (reprobadosData.length === 0) {        
        reprobadosHTML += '<h6>No hay alumnos reprobados</h6>';
        tituloReprobados.innerHTML = reprobadosHTML;
    } else{
        tituloReprobados.innerHTML = reprobadosHTML;        
        let tablaHTML = '<tr><th>Nombre</th><th>Nota</th></tr>';
        reprobadosData.forEach(alumno => {
            tablaHTML += `<tr><td>${alumno.nombre}</td><td>${alumno.nota}</td></tr>`;
        });        
        reprobadosContainer.innerHTML = tablaHTML;
    }
   
}