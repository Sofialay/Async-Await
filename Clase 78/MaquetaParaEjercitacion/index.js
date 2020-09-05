const usersUrl = "https://5f518d325e98480016123ada.mockapi.io/api/v1/users";
const jobsUrl = "https://5f518d325e98480016123ada.mockapi.io/api/v1/jobs";

let jobs = [];
const createUserHtml = (user) => {
    const tbody = document.querySelector("#append-here");
    const fila = document.createElement("tr");
    const tdId = document.createElement("td");
    const tdNombre = document.createElement("td") 
    const tdAvatar = document.createElement("td");
    const avatarImg = document.createElement("img");
    const tdPosicion = document.createElement("td");
    const tdFecha = document.createElement("td");
    const tdBoton = document.createElement("td");
    const boton = document.createElement("button");
    boton.type = "button";
    boton.innerText = "Eliminar";
    tdId.innerText = user.id;
    tdNombre.innerText = user.name;
    avatarImg.src = user.avatar;
    const posicion = jobs.find(job => job.id == user.jobId);
    tdPosicion.innerText = posicion.name;
    tdFecha.innerText = user.createdAt;

    fila.appendChild(tdId);
    fila.appendChild(tdNombre);
    tdAvatar.appendChild(avatarImg);
    fila.appendChild(tdAvatar);
    fila.appendChild(tdPosicion);
    fila.appendChild(tdFecha);
    tdBoton.appendChild(boton);
    fila.appendChild(tdBoton);
    tbody.appendChild(fila);
}

const cargarAPI = async (p1, p2) => {
    try {
        const res = await Promise.all([p1, p2])
        const users = res[0].data;
        jobs = res[1].data;
        users.forEach(user => createUserHtml(user));
        const selectOp = document.querySelector("#select-jobs")
        jobs.forEach(job => {
            const option = document.createElement('option');
            option.value = job.name;
            option.innerText = job.name;
            selectOp.appendChild(option);
        });
    }catch (err) {
        console.error(err);
    }
}

const agregarNuevoUsuario = async () => {
    const inputName = document.querySelector("#input-name");
    const inputAvatar = document.querySelector("#input-avatar");
    try {
        const nuevoUser = {
            name: inputName.value,
            avatar: inputAvatar.value
        }
        const res = await axios.post(usersUrl, nuevoUser);
        const nuevoUsuario = res.data;
        createUserHtml(nuevoUsuario);
    } catch(err) {
    console.error(err);
    }
}

const abrirForm = event => {
    const formMostrar = document.querySelector("#form-modal");
    formMostrar.style.display = "block";
}

const load = () => {
    const p1 = axios.get(usersUrl);
    const p2 = axios.get(jobsUrl);
    cargarAPI(p1, p2);
    document.querySelector("#add-user-btn").addEventListener("click", abrirForm)
    document.querySelector("#cerrar-form").addEventListener("click", () => {
        const formMostrar = document.querySelector("#form-modal");
        formMostrar.style.display = "none";
    });
    document.querySelector("#guardar-form").addEventListener("click", agregarNuevoUsuario)
}