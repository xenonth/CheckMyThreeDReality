import { Quaternion } from 'cannon-es';
import * as THREE from 'three';

// Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Sphere
const sphereGeo = new THREE.SphereGeometry(10);
const sphereMaterial = new THREE.PointsMaterial({
  color: "rgb(255,255,255)",
  size: 0.25,
})

//combine geometry and mesh
let particleSystem = new THREE.Points(sphereGeo, sphereMaterial);
particleSystem.name = "particleSystem";
scene.add(particleSystem);

// Set initial rotation
const axialTilt = 23.5 * THREE.MathUtils.DEG2RAD; // Axial tilt angle in radians
const tiltAxis = new THREE.Vector3(0, 1, 0); // Axis of axial tilt

const sphereQuaternion = new THREE.Quaternion().setFromAxisAngle(tiltAxis, axialTilt);
//particleSystem.rotation.y = new THREE.Euler().setFromQuaternion(sphereQuaternion);

let earthModel = particleSystem.setRotationFromQuaternion(sphereQuaternion); 

// Animation
function animate() {
  requestAnimationFrame(animate);

  
  earthModel += 0.01;
  

  renderer.render(scene, camera);
}

// Camera position
camera.position.z = 50;

// Start animation
animate();

