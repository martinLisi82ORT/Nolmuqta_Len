document.addEventListener('DOMContentLoaded', function () {
    iniciarApp();
});

function iniciarApp() {
    const galeria = document.querySelector('.galeria-imagenes');
    if (galeria) {
        crearGaleria();
    } else {
        console.error("El elemento .galeria-imagenes no se ha encontrado en el DOM.");
    }

    const goTopContainer = document.querySelector('.go-top-container');
    if (goTopContainer) {
        goTopContainer.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });

        window.onscroll = function () {
            if (document.documentElement.scrollTop > 100) {
                goTopContainer.classList.add('show');
            } else {
                goTopContainer.classList.remove('show');
            }
        };
    } else {
        console.error("El elemento .go-top-container no se ha encontrado en el DOM.");
    }

    const formEmail = document.getElementById('form-email');
    if (formEmail) {
        formEmail.addEventListener('submit', sendEmail)
        formEmail.reset()
    } else {
        console.error("El formulario con el ID 'form-email' no se ha encontrado en el DOM.");
    }
}

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');

    // Verificar si el elemento .galeria-imagenes se ha seleccionado correctamente
    if (galeria) {
        for (let i = 1; i <= 24; i++) {
            const imagen = document.createElement('picture');
            imagen.innerHTML = `  
                <img loading="lazy" width="200" height="300" src="src/img/fotos/${i}.jpg" alt="imagen galeria">
            `;
            imagen.onclick = function () {
                mostrarImagen(i);
            }
            galeria.appendChild(imagen);
        }
    } else {
        console.error("El elemento .galeria-imagenes no se ha encontrado en el DOM.");
    }
}

function mostrarImagen(id) {
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
        <img loading="lazy" width="200" height="300" src="src/img/grande/${id}.jpg" alt="imagen galeria">
    `;

    // Crea el Overlay con la imagen
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick = function () {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }

    // Boton para cerrar el Modal
    const cerrarModal = document.createElement('P');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-cerrar');
    cerrarModal.onclick = function () {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }
    overlay.appendChild(cerrarModal);

    // Añadirlo al HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}

const serviceId = 'service_xm2fk17';
const templateId = 'template_m8syhsp';
const apikey = 'jGMAU4bdwDzAeysTG';

function sendEmail(event) {
    event.preventDefault()
    const formEmail = document.getElementById('form-email')        
    if (formEmail) {     
        emailjs.init(serviceId)
        emailjs.sendForm(serviceId, templateId, formEmail, apikey)
            .then(result => Swal.fire("Su mensaje se ha enviado con éxito"),
            formEmail.reset())
            .catch(error => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "No ha sido posible enviar el mensaje"
                })
            })
    } else {
        console.error("El formulario con el ID 'form-email' no se ha encontrado en el DOM.");
    }


}




