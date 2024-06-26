document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem('arrayTareas')) {
        const arrayTareas = JSON.parse(localStorage.getItem('arrayTareas'));
        pintarTareas(arrayTareas);
    }
});

const formulario = document.querySelector(".formu");

const menuTareas = document.querySelector(".menuTask");
const addtarea = document.querySelector(".addtask");
const title = document.getElementById("name");
const date = document.getElementById("date");
const priority = document.getElementById("priority");
const description = document.getElementById("description");
const save = document.querySelector(".add");
const cancel = document.querySelector(".close");




if(save){
    save.addEventListener("click", (e) => {
        e.preventDefault();

        if(title.value.trim() === ''  || date.value.trim() === '' || priority.value.trim() === ''){
            alert('Complete todos los campos');
        }else{
            guardarTarea(e);
        }
    });


}


cancel.addEventListener("click", function() {
    formulario.reset();
});

addtarea.addEventListener("click", function() {
    menuTareas.style.display = "block";
});

let isDragging = false;
let offsetX, offsetY;

menuTareas.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - menuTareas.offsetLeft;
    offsetY = e.clientY - menuTareas.offsetTop;
});

document.addEventListener("mousemove", (e) => {
    if (isDragging) {
        menuTareas.style.left = `${e.clientX - offsetX}px`;
        menuTareas.style.top = `${e.clientY - offsetY}px`;
    }
});

document.addEventListener("mouseup", () => {
    isDragging = false;
});

function pintarTareas(arrayTareasRecuperados) {
   let panel='';
   
    arrayTareasRecuperados.forEach((tarea, index) => {

        panel+=  `<div class="task">`;
            if(tarea.priority === 'Priority'){
                console.log('entra en el if icono');
                panel += `
                <img src="Imagenes/icons8-priority.svg" width="25px" alt="">
            
            `};

        panel+= `
                <h4 class="task-title">${tarea.title}</h4>
                <p class="task-date">${tarea.date}</p>
                <p class="task-priority">${tarea.priority}</p>
                <p class="task-description">${tarea.description}</p>
                <div class="editTask-deleteTask">
                <button class="edit" type="submit"><img src="Imagenes/icons8-edit.svg" width="25px" alt=""></button>
                <button class="delete" type="submit"><img src="Imagenes/icons8-basura.svg" width="25px" alt=""></button>
                </div>
            </div>
        `;
    });
    document.querySelector(".panelTareas").innerHTML = panel;
}

function guardarTarea(e) {
    e.preventDefault();
    const tarea = {
        title: title.value,
        date: date.value,
        priority: priority.value,
        description: description.value
    }
    let arrayTareasRecuperados = [];
    let mensaje='';

    if (localStorage.getItem('arrayTareas')) {
        arrayTareasRecuperados = JSON.parse(localStorage.getItem('arrayTareas'));
    }

    

    arrayTareasRecuperados.push(tarea);
    localStorage.setItem('arrayTareas', JSON.stringify(arrayTareasRecuperados));

    formulario.reset();
    pintarTareas(arrayTareasRecuperados);  // Pintar las tareas actualizadas
    mensaje='Tarea guardada correctamente';
    showToast('exito', mensaje);
}

function eliminarTarea(e) {
    const index = e.currentTarget.getAttribute('data-index');
    const arrayTareasRecuperados = JSON.parse(localStorage.getItem('arrayTareas'));
    arrayTareasRecuperados.splice(index, 1);
    localStorage.setItem('arrayTareas', JSON.stringify(arrayTareasRecuperados));
    pintarTareas(arrayTareasRecuperados);
    showToast('exito', 'Tarea eliminada correctamente');
}

function showToast(tipo, mensaje) {
    const toast = document.querySelector('.toast');
    toast.textContent = mensaje;
    toast.classList.remove('toast-error');
    toast.classList.remove('toast-confirmacion');
    toast.classList.add(`toast-${tipo}`);
    console.log(toast);
    toast.classList.add('toast-active');
    setTimeout(() => {
        toast.classList.remove('toast-active');
    }, 3000);
  }
