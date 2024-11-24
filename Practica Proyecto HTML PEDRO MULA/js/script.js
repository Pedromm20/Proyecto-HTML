let sensores = [
  {
    nombre: "Safecurity",
    descripcion: "Apto para detectar intrusos",
    numeroSerie: "12345",
    estado: true,
    prioridad: "alta",
  },
  {
    nombre: "Prettier",
    descripcion: "Muy bonito y barato",
    numeroSerie: "67890",
    estado: false,
    prioridad: "baja",
  },
  {
    nombre: "Gaslight",
    descripcion: "Detecta gases tóxicos",
    numeroSerie: "23456",
    estado: true,
    prioridad: "media",
  },
  {
    nombre: "Prelightlight",
    descripcion: "Detecta gases poco tóxicos",
    numeroSerie: "34567",
    estado: true,
    prioridad: "alta",
  },
  {
    nombre: "Gasttier",
    descripcion: "Detecta gases poco tóxicos y es bonito",
    numeroSerie: "45678",
    estado: true,
    prioridad: "media",
  },
];

function cargarTabla() {
  const tablaSensores = document.getElementById("tablaSensores");
  tablaSensores.innerHTML = "";

  sensores.forEach((sensor, index) => {
    const fila = document.createElement("tr");

    const nombre = document.createElement("td");
    nombre.textContent = sensor.nombre;

    const descripcion = document.createElement("td");
    descripcion.textContent = sensor.descripcion;

    const numeroSerie = document.createElement("td");
    numeroSerie.textContent = sensor.numeroSerie;

    const estado = document.createElement("td");
    estado.textContent = sensor.estado ? "Activo" : "Inactivo";

    const prioridad = document.createElement("td");
    prioridad.textContent = sensor.prioridad;

    const acciones = document.createElement("td");
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "X";
    btnEliminar.className = "btnEliminar";

    btnEliminar.onclick = () => {
      sensores.splice(index, 1);
      cargarTabla();
    };

    const btnModificar = document.createElement("button");
    btnModificar.textContent = "Editar";
    btnModificar.onclick = () => mostrarFormulario(sensor);

    acciones.appendChild(btnEliminar);
    acciones.appendChild(btnModificar);

    fila.appendChild(nombre);
    fila.appendChild(descripcion);
    fila.appendChild(numeroSerie);
    fila.appendChild(estado);
    fila.appendChild(prioridad);
    fila.appendChild(acciones);

    tablaSensores.appendChild(fila);
  });
}

function mostrarFormulario(sensor) {
  document.getElementById("formularioEdicion").style.display = "block";

  document.getElementById("nombreEdicion").value = sensor.nombre;
  document.getElementById("descripcionEdicion").value = sensor.descripcion;
  document.getElementById("numSerieEdicion").value = sensor.numeroSerie;
  document.getElementById("estadoEdicion").value = sensor.estado ? "true" : "false";
  document.getElementById("prioridadEdicion").value = sensor.prioridad;

  document.getElementById("guardarEdicion").onclick = () => guardarEdicion(sensor);
}

function guardarEdicion(sensor) {
  sensor.nombre = document.getElementById("nombreEdicion").value;
  sensor.descripcion = document.getElementById("descripcionEdicion").value;
  sensor.numeroSerie = document.getElementById("numSerieEdicion").value;
  sensor.estado = document.getElementById("estadoEdicion").value === "true";
  sensor.prioridad = document.getElementById("prioridadEdicion").value;

  cargarTabla();
  document.getElementById("formularioEdicion").style.display = "none";
}

function filtrarSensores() {
  const inputFiltro = document.getElementById("filtro");
  const textoFiltrado = inputFiltro.value.toLowerCase();
  const filas = document.querySelectorAll("#tablaSensores tr");

  if (textoFiltrado.length >= 3) {
    filas.forEach((fila) => {
      const celdas = fila.getElementsByTagName("td");
      const nombres = celdas[0].textContent.toLowerCase();
      const descripcion = celdas[1].textContent.toLowerCase();

      if (
        nombres.includes(textoFiltrado) ||
        descripcion.includes(textoFiltrado)
      ) {
        fila.style.display = "";
      } else {
        fila.style.display = "none";
      }
    });
  }
}

window.onload = () => {
  cargarTabla();
  document.getElementById("filtro").addEventListener("input", filtrarSensores);
};
