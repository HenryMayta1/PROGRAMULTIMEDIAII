// Escena, cámara y renderizador
const escena = new THREE.Scene();
const camara = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderizador = new THREE.WebGLRenderer();
renderizador.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderizador.domElement);

// Material para el cono (color sólido naranja)
const materialNaranja = new THREE.MeshBasicMaterial({ color: 0xFFA500 }); // Naranja para el cuerpo del cono

// Crear un cono para el cuerpo
const cono = new THREE.ConeGeometry(1, 2, 32); // Radio, altura, segmentos

// Crear el Mesh para el cono con el material naranja
const conoMesh = new THREE.Mesh(cono, materialNaranja);

// Posicionar el cono
conoMesh.position.y = 0;  // Centramos el cono en el eje Y
escena.add(conoMesh);

// Posicionar la cámara
camara.position.z = 6;

// Variables para mover el cono de izquierda a derecha
let velocidad = 0.05;
let direccion = 1; // Dirección inicial (1 es hacia la derecha, -1 hacia la izquierda)
let limite = 2;  // El límite para el movimiento (cuando llega a este valor, cambia de dirección)

// Ciclo de cambio de color del cono
let estadoColor = "rojo";  // Inicia con el color rojo

function cambiarColor() {
    // Cambiar el color del cono según el estado
    if (estadoColor === "rojo") {
        conoMesh.material.color.set(0xFF0000);  // Rojo
        estadoColor = "verde";  // El próximo color será verde
    } else if (estadoColor === "verde") {
        conoMesh.material.color.set(0x00FF00);  // Verde
        estadoColor = "amarillo";  // El próximo color será amarillo
    } else if (estadoColor === "amarillo") {
        conoMesh.material.color.set(0xFFFF00);  // Amarillo
        estadoColor = "rojo";  // El próximo color será rojo
    }
}

// Actualizar el color del cono cada 3 segundos
setInterval(cambiarColor, 3000);

// Animación del cono con movimiento de izquierda a derecha
function animacion() {
    requestAnimationFrame(animacion);
    
    // Mover el cono de izquierda a derecha
    conoMesh.position.x += velocidad * direccion;

    // Cambiar dirección al alcanzar el límite
    if (conoMesh.position.x >= limite || conoMesh.position.x <= -limite) {
        direccion *= -1;  // Cambiar la dirección
    }

    // Rotar el cono para darle un efecto dinámico
    conoMesh.rotation.x += 0.01;
    conoMesh.rotation.y += 0.01;

    // Renderizar la escena
    renderizador.render(escena, camara);
}

animacion();

// Ajustar el tamaño de la ventana al cambiar su tamaño
window.addEventListener('resize', () => {
    camara.aspect = window.innerWidth / window.innerHeight;
    camara.updateProjectionMatrix();
    renderizador.setSize(window.innerWidth, window.innerHeight);
});
