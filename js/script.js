// =================================
// CANVAS
// =================================

const canvas =
    document.getElementById("estrellas");

const ctx =
    canvas.getContext("2d");


let ancho;
let alto;


// =================================
// AJUSTAR CANVAS
// =================================

function ajustarCanvas() {

    ancho = window.innerWidth;

    alto = window.innerHeight;

    canvas.width = ancho;

    canvas.height = alto;
}


ajustarCanvas();


window.addEventListener(
    "resize",
    ajustarCanvas
);


// =================================
// ESTRELLAS NORMALES
// =================================

const estrellas = [];

const cantidadEstrellas = 180;


for (
    let i = 0;
    i < cantidadEstrellas;
    i++
) {

    estrellas.push({

        x:
            Math.random() * ancho,

        y:
            Math.random() * alto,

        radio:
            Math.random() * 1.4 + 0.3,

        brillo:
            Math.random(),

        velocidadBrillo:
            Math.random() *
            0.025 + 0.005,

        direccion:
            Math.random() < 0.5
            ? 1
            : -1
    });

}


// =================================
// DIBUJAR ESTRELLAS
// =================================

function dibujarEstrellas() {

    for (
        const estrella of estrellas
    ) {


        // -------------------------
        // TITILEO
        // -------------------------

        estrella.brillo +=

            estrella.velocidadBrillo
            *
            estrella.direccion;


        if (
            estrella.brillo >= 1
        ) {

            estrella.brillo = 1;

            estrella.direccion = -1;
        }


        if (
            estrella.brillo <= 0.15
        ) {

            estrella.brillo = 0.15;

            estrella.direccion = 1;
        }


        // -------------------------
        // DIBUJAR
        // -------------------------

        ctx.beginPath();


        ctx.arc(

            estrella.x,

            estrella.y,

            estrella.radio,

            0,

            Math.PI * 2
        );


        ctx.fillStyle =

            `rgba(
                255,
                255,
                255,
                ${estrella.brillo}
            )`;


        ctx.fill();
    }

}


// =================================
// ESTRELLAS FUGACES
// =================================

const estrellasFugaces = [];


// =================================
// CREAR ESTRELLA FUGAZ
// =================================

function crearEstrellaFugaz() {

    const x =
        Math.random() * ancho;


    const y =
        Math.random() * alto * 0.5;


    estrellasFugaces.push({

        x: x,

        y: y,

        velocidad:
            Math.random() * 8 + 6,

        longitud:
            Math.random() * 60 + 40,

        vida: 1
    });

}


// =================================
// DIBUJAR ESTRELLAS FUGACES
// =================================

function dibujarEstrellasFugaces() {

    for (
        let i =
            estrellasFugaces.length - 1;

        i >= 0;

        i--
    ) {


        const estrella =
            estrellasFugaces[i];


        // -------------------------
        // MOVIMIENTO
        // -------------------------

        estrella.x +=
            estrella.velocidad;


        estrella.y +=
            estrella.velocidad * 0.45;


        // -------------------------
        // DESAPARECER
        // -------------------------

        estrella.vida -=
            0.018;


        // -------------------------
        // COLA
        // -------------------------

        const gradiente =

            ctx.createLinearGradient(

                estrella.x,

                estrella.y,

                estrella.x -
                    estrella.longitud,

                estrella.y -
                    estrella.longitud * 0.45
            );


        gradiente.addColorStop(

            0,

            `rgba(
                255,
                255,
                255,
                ${estrella.vida}
            )`
        );


        gradiente.addColorStop(

            1,

            "rgba(255,255,255,0)"
        );


        ctx.beginPath();


        ctx.moveTo(

            estrella.x,

            estrella.y
        );


        ctx.lineTo(

            estrella.x -
                estrella.longitud,

            estrella.y -
                estrella.longitud * 0.45
        );


        ctx.strokeStyle =
            gradiente;


        ctx.lineWidth = 1.5;


        ctx.stroke();


        // -------------------------
        // ELIMINAR
        // -------------------------

        if (

            estrella.vida <= 0 ||

            estrella.x >
                ancho + 100 ||

            estrella.y >
                alto + 100

        ) {

            estrellasFugaces.splice(
                i,
                1
            );
        }

    }

}


// =================================
// CREAR ESTRELLAS FUGACES
// =================================

setInterval(() => {

    if (
        Math.random() < 0.7
    ) {

        crearEstrellaFugaz();
    }

}, 3500);


// =================================
// ANIMACIÓN PRINCIPAL
// =================================

function animar() {

    ctx.clearRect(

        0,

        0,

        ancho,

        alto
    );


    dibujarEstrellas();


    dibujarEstrellasFugaces();


    requestAnimationFrame(
        animar
    );
}


animar();
// =================================
// BARRA DE CARGA
// =================================

const cargaContenedor =
    document.getElementById("carga-contenedor");

const barra =
    document.getElementById("barra");

const porcentaje =
    document.getElementById("porcentaje");


boton.addEventListener("click", () => {

    // Ocultar botón
    boton.style.display = "none";

    // Mostrar barra
    cargaContenedor.style.display =
        "block";

    // Progreso
    let progreso = 0;

    const intervalo =
        setInterval(() => {

            progreso++;

            barra.style.width =
                progreso + "%";

            porcentaje.textContent =
                progreso + "%";

            if (progreso >= 100) {

                clearInterval(intervalo);

                setTimeout(() => {

                    document.querySelector(".contenedor").style.display = "none";

                }, 1000);

            }

        }, 50);

});
