import { Quaternion } from 'cannon-es';
import * as THREE from 'three';

// Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.add(new THREE.GridHelper(10, 10));
//Helper functions

//rotation function designed to teach quaternions in three.js
const setRotationByAxis = (q, v_axis, n_degree) => {
    const vector = v_axis.normalize();
    const radian = THREE.MathUtils.degToRad(n_degree);
    const halfAngle = radian/ 2, s = Math.sin(halfAngle);
    q.x = vector.x * s;
    q.y = vector.y * s;
    q.z = vector.z * s;
    q.w = Math.cos(halfAngle);
}

// Sphere
const mesh1 = new THREE.Mesh(new THREE.CylinderGeometry(0, 0.25, 1), new THREE.MeshNormalMaterial());
mesh1.geometry.rotateX(Math.PI * 0.5);
scene.add(mesh1);

// setting rotation with quaternion
const q = new THREE.Quaternion();
const v_axis = new THREE.Vector3(0, 10, 0);
const degree = 45;

setRotationByAxis(q, v_axis, degree);
mesh1.rotation.setFromQuaternion(q);

//mesh1.quaternion.setFromAxisAngle(axis.normalize(), THREE.MathUtils.degToRad(degree));

// Camera position
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);

renderer.render(scene,camera);

// Start animation
animate();

