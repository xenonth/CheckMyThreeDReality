//importing from three.js
import * as THREE from 'three';
import WebGL from "three/addons/capabilities/WebGL.js"

//Setting width and height of the rendering frame
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//creating and setting camera position
const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 500);
camera.position.set(0,0,100);
camera.lookAt(0,0,0);

const scene = new THREE.Scene();

//create a blue LineBasicMaterial
const material = new THREE.LineBasicMaterial({color: 0x0000ff});

//setting points to draw a square
const points = [];
points.push(new THREE.Vector3(0, -10, 0));
points.push(new THREE.Vector3(10, 0, 0));
points.push(new THREE.Vector3(0, 10, 0));
points.push(new THREE.Vector3(-10, 0, 0));
points.push(new THREE.Vector3(0, -10, 0));

const geometry = new THREE.BufferGeometry().setFromPoints( points );

//creating the line using geometry and material
const line = new THREE.Line( geometry, material);

scene.add(line);
renderer.render(scene, camera);