//importing from three.js
import * as THREE from 'three';
import WebGL from "three/addons/capabilities/WebGL.js"

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 50, 4 / 3, 0.5, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( 640, 480 );
document.body.appendChild( renderer.domElement );

//Vector 3 construction
const v_dir = new THREE.Vector3(0,0,18).normalize();
console.log(v_dir.x,v_dir.y,v_dir.z);

//object

scene.add(new THREE.GridHelper(2,2));
const mesh1 = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10,10));
scene.add(mesh1);
mesh1.position.copy(v_dir);

camera.position.set(2,2,2);
camera.lookAt(0,0,0);


//animating for loop
function animate() {
	requestAnimationFrame( animate );
    renderer.render( scene, camera );
}

//test check for WebGL capability
if (WebGL.isWebGLAvailable() ) {

    //initate functions here
    animate();
} else {
    const warning = WebGL.getWebGLErrorMessage();
    document.getElementById('container').appendChild( warning );
}

console.log("its connected");
