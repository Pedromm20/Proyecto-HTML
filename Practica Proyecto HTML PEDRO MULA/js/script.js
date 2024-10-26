const sensores = [
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
    descripcion: "Detecta gases toxicos",
    numeroSerie: "23456",
    estado: true,
    prioridad: "media",
  },
  {
    nombre: "Prelightlight",
    descripcion: "Detecta gases poco toxicos",
    numeroSerie: "34567",
    estado: true,
    prioridad: "alta",
  },
  {
    nombre: "Gasttier",
    descripcion: "Detecta gases poco toxicos y es bonito",
    numeroSerie: "45678",
    estado: true,
    prioridad: "media",
  },
];

function cargarTabla() {
  const tablaSensores = document.getElementById("tablaSensores");
  tablaSensores.innerHTML = "";

  sensores.forEach((sensor) => {
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
      fila.remove();
    };

    fila.appendChild(nombre);
    fila.appendChild(descripcion);
    fila.appendChild(numeroSerie);
    fila.appendChild(estado);
    fila.appendChild(prioridad);
    fila.appendChild(acciones);
    acciones.appendChild(btnEliminar);

    tablaSensores.appendChild(fila);
  });
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
