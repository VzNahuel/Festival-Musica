document.addEventListener("DOMContentLoaded", function(){
    iniciarApp();
});


function iniciarApp(){
    crearGaleria();
    scrollNav();

    navegacionFija();
}

function navegacionFija(){
    const barra = document.querySelector(".header");

    const sobreFestival = document.querySelector(".sobre-festival");

    const body = document.querySelector("body");

    window.addEventListener("scroll", function(){

        if (sobreFestival.getBoundingClientRect().top < 0){
            barra.classList.add("fijo");

            body.classList.add("scroll-body");
        }else{
            barra.classList.remove("fijo");

            body.classList.remove("scroll-body");
        }
    })
}


function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal a');

    const destino = [];

    destino.push(document.querySelector(".lineup"));
    destino.push(document.querySelector(".galeria"));
    destino.push(document.querySelector(".boletos"));

    for(let i=0; i<3; i++){
        enlaces[i].addEventListener("click", function(e){
            e.preventDefault();

            destino[i].scrollIntoView({ behavior: "smooth" });
        })
    }
    
}

function crearGaleria(){
    let galeria = document.querySelector(".galeria-imagenes");

    for(let i = 1; i<=12 ; i++){
        
        const imagen = document.createElement("PICTURE");

        imagen.innerHTML =`
        <source srcset="build/img/thumb/${i}.avif" type="image/avif">
        <source srcset="build/img/thumb/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen galeria">
        `;

        imagen.onclick = function(){
            mostrarImagen(i);
        };

        galeria.appendChild(imagen);
    }
}

function mostrarImagen(id){
    const imagen = document.createElement("PICTURE");

    imagen.innerHTML =`
    <source srcset="build/img/grande/${id}.avif" type="image/avif">
    <source srcset="build/img/grande/${id}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="imagen galeria">
    `;


    // Crea el overlay con la imagen
    const overlay = document.createElement("DIV");
    overlay.appendChild(imagen);
    overlay.classList.add("overlay");

    // Boton para cerrar el modal
    const cerrarModal = document.createElement("P");
    cerrarModal.textContent = "X";
    cerrarModal.classList.add("btn-cerrar");

    overlay.appendChild(cerrarModal);

    cerrarModal.onclick = function(){
        const body = document.querySelector("body");
        body.classList.remove("fijar-body");
        
        overlay.remove();
    }


    // Añadir overlay al HTML
    const body = document.querySelector("body");
    body.appendChild(overlay);

    // Detener scroll
    body.classList.add("fijar-body");

}

