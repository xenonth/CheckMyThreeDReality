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
//adding a grid for visual reference
scene.add(new THREE.GridHelper(6,6));
const mesh1 = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10,10));
mesh1.position.set(3, 0.5, 3);
scene.add(mesh1);

//using length method to get the unit length of mesh1
//using normalise to get a vector with a length of one from that position
// and using the vector 3 lerp method to get vector 3 objects between teh two
const mesh_unit_length = mesh1.position.length();
const v2 = mesh1.position.clone().normalize();
let i = 0, count = 5;
while (i < count) {
    const alpha = (i + 1)/ count;
    const mesh = new THREE.Mesh (new THREE.SphereGeometry(0.1, 10, 10));
    mesh.position.copy(mesh1.position).lerp(v2, alpha);
    scene.add(mesh);
    i++;
}

camera.position.set(5,5,5);
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
