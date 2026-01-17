import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

//Preparamos el render
const Render = new THREE.WebGLRenderer({ alpha: true });
//Tamaño del render(resultado)
Render.setSize(800, 600);
//Se agrega el render al documento html
document.getElementById('render').appendChild(Render.domElement);

//El escenario
const Escenario = new THREE.Scene();

//La cámara
const Camara = new THREE.PerspectiveCamera(75, 800/600, 0.1, 1000);
//Posicionamos la cámara para ver la figura (centrada en x=7, y=10)
Camara.position.x = 7;
Camara.position.y = 10;
Camara.position.z = 30;
//agregando la cámara al escenario
Escenario.add(Camara);
// Geometría (BufferGeometry para versiones modernas de Three.js)
const Geometria = new THREE.BufferGeometry();
// vector a dibujar
const vertices = new Float32Array([
    2, 7, 0,
    7, 2, 0,
    12, 7, 0,
    12, 17, 0,
    7, 12, 0,
    2, 17, 0,
    2, 7, 0
]);
// Agregamos los vértices como atributo de posición
Geometria.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
// agregamos un material para que la línea tenga color
const Material = new THREE.LineBasicMaterial({ color: 0xFF0000 });
// creamos una línea con la geometría y el material
const Figura = new THREE.Line(Geometria, Material);
// agregamos la figura al escenario
Escenario.add(Figura);
// agregamos todo el escenario y la cámara al render
Render.render(Escenario, Camara);
