import * as THREE from 'three';

import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// inititate camera

camera.position.x = 3;
camera.position.y = 20;
camera.position.z= 45;


const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.setPixelRatio);
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);

//Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target = new THREE.Vector3(0,0,-40);
controls.update();

//creating the plane
const plane = new THREE.Mesh(new THREE.PlaneGeometry(200,200), new THREE.MeshPhongMaterial({color: 0x0a7d15}))

plane.rotation = - Math.PI/2;
plane.receiveShadow = true;
scene.add(plane);

//Lighting hemisphere light:
scene.add(new THREE.AmbientLight(0xffffff, 0.5));

const light1 = new THREE.PointLight(0xff6666, 1, 100);
light1.castShadow = true;
light1.shadow.mapSize.height = 4096;
light1.shadow.mapSize.height = 4096;
scene.add(light1);

const light2 = new THREE.PointLight(0x33ff33, 1, 100);
light2.castShadow = true;
light2.shadow.mapSize.height = 4096;
light2.shadow.mapSize.height = 4096;
scene.add(light2);

//animate function
function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}