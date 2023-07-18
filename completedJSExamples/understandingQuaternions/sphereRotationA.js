import { Quaternion } from 'cannon-es';
import * as THREE from 'three';

// Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.add(new THREE.GridHelper(10, 10));
// Sphere
const mesh1 = new THREE.Mesh(new THREE.BoxGeometry(1,1,1), new THREE.MeshNormalMaterial());
scene.add(mesh1);
// setting rotation with quaternion
const axis = new THREE.Vector3(1,0,0);
const degree = 45;

mesh1.quaternion.setFromAxisAngle(axis.normalize(), THREE.MathUtils.degToRad(degree));

// Camera position
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);

renderer.render(scene,camera);

// Start animation
animate();

