import * as CANNON from "cannon-es";
import * as THREE from 'three';
import WebGL from "three/addons/capabilities/WebGL.js"

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.z = 5;

//downwards gravity from top to bottom of screen
const world = new CANNON.World({
    gravity: new CANNON.Vec3(0, -9.82, 0),
})

const radius = 1; //m

const sphereBody = new CANNON.Body({
    mass: 5, //kg
    shape: new CANNON.Sphere(radius),
})

sphereBody.position.set(0,10,0);

world.addBody(sphereBody);

//creating a static plane for the ground
const groundBody = new CANNON.Body({
    type: CANNON.Body.STATIC,  //can set mass to 0 if preferred
    shape: new CANNON.Plane(),
})

//sets plane to be face up
groundBody.quaternion.setFromEuler(-Math.PI/2, 0 , 0 );
world.addBody(groundBody);

//rendering to the screen
const geometry = new THREE.SphereGeometry(radius);
const material = new THREE.MeshNormalMaterial();
const sphereMesh = new THREE.Mesh(geometry, material);

scene.add(sphereMesh);

//animating function
function animate () {
    requestAnimationFrame(animate);
//Run simulation indepenently of frame rate
    world.fixedStep();
sphereMesh.position.copy(sphereBody.position);
sphereMesh.quaternion.copy(sphereBody.quaternion);

renderer.render( scene, camera );

}

animate();