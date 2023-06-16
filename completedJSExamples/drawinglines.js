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

//create a blue LineBasicMaterial
const material = new THREE.LineBasicMaterial({color: 0x0000ff})