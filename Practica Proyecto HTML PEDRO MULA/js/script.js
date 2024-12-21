function cargarTabla() {
  const tablaSensores = document.getElementById("tablaSensores");
  tablaSensores.innerHTML = ""; 

  fetch("ws/getElements.php") 
    .then((response) => response.json()) 
    .then((data) => {
      console.log(data); 
      if (data.error) {
        Swal.fire("Error", data.error, "error");
        return;
      }
      data.forEach((sensor, index) => {
        const fila = document.createElement("tr");

        const nombre = document.createElement("td");
        nombre.textContent = sensor.nombre;

        const descripcion = document.createElement("td");
        descripcion.textContent = sensor.descripcion;

        const numeroSerie = document.createElement("td");
        numeroSerie.textContent = sensor.nserie;

        const estado = document.createElement("td");
        estado.textContent = sensor.estado === "activo" ? "Activo" : "Inactivo";

        const prioridad = document.createElement("td");
        prioridad.textContent = sensor.prioridad;

        const acciones = document.createElement("td");
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "X";
        btnEliminar.className = "btnEliminar";

        btnEliminar.onclick = () => confirmarBorrado(sensor, index);
        btnEliminar.onclick = () => {
          console.log('Eliminar elemento con nserie:', sensor.nserie);
          confirmarBorrado(sensor.nserie);
      };
        const btnModificar = document.createElement("button");
        btnModificar.textContent = "Editar";
        btnModificar.onclick = () => mostrarFormulario(sensor.nserie);

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
    })
    .catch((error) => {
      console.error("Error al cargar los elementos:", error);
      Swal.fire("Error", "Hubo un problema al cargar los elementos", "error");
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

function mostrarFormulario(nserie) {
  fetch("ws/getElementByNSerie.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nserie }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        const sensorId = data.id;

        fetch(`ws/getElements.php?id=${sensorId}`)
          .then((response) => response.json())
          .then((sensor) => {
            document.getElementById("formularioEdicion").style.display =
              "block";
            document.getElementById("nombreEdicion").value = sensor.nombre;
            document.getElementById("descripcionEdicion").value =
              sensor.descripcion;
            document.getElementById("numSerieEdicion").value = sensor.nserie;
            document.getElementById("estadoEdicion").value = sensor.estado;
            document.getElementById("prioridadEdicion").value =
              sensor.prioridad;

            document.getElementById("guardarEdicion").onclick = () =>
              guardarEdicion(sensorId);
          });
      } else {
        Swal.fire("Error", data.error || "Elemento no encontrado", "error");
      }
    })
    .catch(() =>
      Swal.fire("Error", "Hubo un problema al recuperar el elemento", "error")
    );
}

function guardarEdicion(sensorId) {
  const formData = new FormData();
  formData.append("id", sensorId);
  formData.append("nombre", document.getElementById("nombreEdicion").value);
  formData.append(
    "descripcion",
    document.getElementById("descripcionEdicion").value
  );
  formData.append("nserie", document.getElementById("numSerieEdicion").value);
  formData.append("estado", document.getElementById("estadoEdicion").value);
  formData.append(
    "prioridad",
    document.getElementById("prioridadEdicion").value
  );

  fetch("ws/modifyElements.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        Swal.fire(
          "Editado",
          "El elemento ha sido editado correctamente",
          "success"
        );
        cargarTabla();
        document.getElementById("formularioEdicion").style.display = "none";
      } else {
        Swal.fire(
          "Error",
          data.error || "Hubo un problema al editar el elemento",
          "error"
        );
      }
    })
    .catch(() =>
      Swal.fire("Error", "Error al conectar con el servidor", "error")
    );
}

function confirmarCreacion() {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "Se creará un nuevo elemento.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, crear",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      crearElemento();
    }
  });
}

function confirmarEdicion(sensor) {
  Swal.fire({
    title: "¿Deseas editar este elemento?",
    text: "Se aplicarán los cambios.",
    icon: "info",
    showCancelButton: true,
    confirmButtonText: "Sí, editar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      editarElemento(sensor);
    }
  });
}

function editarElemento(sensor) {
  const formData = new FormData();
  formData.append("id", sensor.id);
  formData.append("nombre", document.getElementById("nombreEdicion").value);
  formData.append(
    "descripcion",
    document.getElementById("descripcionEdicion").value
  );
  formData.append("numSerie", document.getElementById("numSerieEdicion").value);
  formData.append("estado", document.getElementById("estadoEdicion").value);
  formData.append(
    "prioridad",
    document.getElementById("prioridadEdicion").value
  );

  fetch("ws/modifyElements.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        Swal.fire(
          "Editado",
          "El elemento ha sido editado correctamente",
          "success"
        );
        cargarTabla();
        document.getElementById("formularioEdicion").style.display = "none";
      } else {
        Swal.fire("Error", "Hubo un problema al editar el elemento", "error");
      }
    })
    .catch(() =>
      Swal.fire("Error", "Hubo un problema al editar el elemento", "error")
    );
}

function confirmarBorrado(nserie) {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "Este elemento será eliminado.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch("ws/getElementByNSerie.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nserie }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            const sensorId = data.id;

            fetch("ws/deleteElement.php", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: sensorId }),
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.success) {
                  Swal.fire(
                    "Eliminado",
                    "El elemento ha sido eliminado correctamente",
                    "success"
                  );
                  cargarTabla();
                } else {
                  Swal.fire(
                    "Error",
                    data.error || "Hubo un problema al eliminar el elemento",
                    "error"
                  );
                }
              });
          } else {
            Swal.fire("Error", data.error || "Elemento no encontrado", "error");
          }
        })
        .catch(() =>
          Swal.fire("Error", "Error al conectar con el servidor", "error")
        );
    }
  });
}

async function cargarElementos() {
  try {
    let response = await fetch("ws/getElements.php");
    let data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error al cargar elementos:", error);
  }
}

async function borrarElemento() {
  try {
    let response = await fetch("ws/deleteElement.php", {
      method: "POST",
      body: JSON.stringify({ id: 1 }),
      headers: { "Content-Type": "application/json" },
    });
    let result = await response.json();
    console.log(result);
  } catch (error) {
    console.error("Error al borrar elemento:", error);
  }
}

function crearElemento() {
  const formData = new FormData(document.getElementById("formSensor"));

  const estado = document.querySelector('input[name="estado"]:checked');
  const prioridad = document.querySelector('input[name="prioridad"]:checked');

  if (estado) {
      formData.append('estado', estado.value);
  }
  if (prioridad) {
      formData.append('prioridad', prioridad.value);
  }

  fetch('ws/createElement.php', {
      method: 'POST',
      body: formData
  })
  .then(response => response.json()) 
  .then(data => {
      if (data.success) {
          Swal.fire("Creado", "El elemento ha sido creado correctamente", "success");
          document.getElementById("formSensor").reset(); 
      } else {
          Swal.fire("Error", data.error || "Hubo un problema al crear el elemento", "error");
      }
  })
  .catch(error => {
      Swal.fire("Error", "Hubo un problema al conectar con el servidor", "error");
  });
}



window.onload = () => {
  cargarTabla();
  document.getElementById("filtro").addEventListener("input", filtrarSensores);
};
