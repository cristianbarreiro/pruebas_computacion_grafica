import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

// Render dentro de la etiqueta div

const Contenedor = document.getElementById('render');
if (!Contenedor) {
	throw new Error("No existe el div con id='render'");
}

const Render = new THREE.WebGLRenderer({ antialias: true });
Render.setPixelRatio(window.devicePixelRatio);
Render.setSize(window.innerWidth, window.innerHeight);
Contenedor.appendChild(Render.domElement);

// Escenario
const Escenario = new THREE.Scene();
Escenario.background = new THREE.Color(0xffffff);

// Cámara
const Camara = new THREE.PerspectiveCamera(
	60,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
Camara.position.z = 5;

// Geometría (Three r180 usa BufferGeometry; THREE.Geometry ya no existe)
const Geometria = new THREE.BufferGeometry();
const posiciones = new Float32Array([
	0, 0, 0, // un punto en el origen
]);
Geometria.setAttribute('position', new THREE.BufferAttribute(posiciones, 3));

// Material del punto
const ParticulaMaterial = new THREE.PointsMaterial({
	color: 0xff0000,
	size: 0.1,
	sizeAttenuation: true,
});

// Partícula (punto)
const Particula = new THREE.Points(Geometria, ParticulaMaterial);
Escenario.add(Particula);

function animar() {
	requestAnimationFrame(animar);
	Particula.rotation.y += 0.01;
	Render.render(Escenario, Camara);
}
animar();

window.addEventListener('resize', () => {
	Camara.aspect = window.innerWidth / window.innerHeight;
	Camara.updateProjectionMatrix();
	Render.setSize(window.innerWidth, window.innerHeight);
});