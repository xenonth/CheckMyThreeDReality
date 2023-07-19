import * as THREE from 'three';
import WebGL from "three/addons/capabilities/WebGL.js"
// Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.add(new THREE.GridHelper(10, 10));

//Helper Functions

//setting Quaternion function
const setQ = (q, x, y, z, degree) => {
    q.setFromAxisAngle( new THREE.Vector3(x, y, z).normalize(), THREE.MathUtils.degToRad(degree) );

}

//Objects
scene.add(new THREE.GridHelper(10, 10))

//creating the box geometry
const mesh1 = new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), new THREE.MeshNormalMaterial());
scene.add(mesh1);

//quaternion Objects
//rotating mesh1 between two vector points until that angle.
const q1 = new THREE.Quaternion();
setQ(q1, 0, 0, 1, 90);
const q2 = new THREE.Quaternion();
setQ(q2, 0, 0, 1, -90);

// Camera position
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);

renderer.render(scene,camera);

// Start animation
//Animate loop
//setting camera position and angle
camera.position.set(-2 , 2, 2);
camera.lookAt(0,0,0);

const FPS_UPDATE = 30;
const FPS_MOVEMENT = 30;
const FRAME_MAX = 800;
let secs = 0,
frame = 0,
lt = new Date();

//animating for loop

const update = function(frame, frameMax) {
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(0.5 - a1)/ 0.5;
    mesh1.quaternion.copy(q1).slerp(q2, a2);
};

const loop = () => {
    const now = new Date();
    secs = (now -lt) / 1000;
    requestAnimationFrame(loop);
    if( secs > 1 / FPS_UPDATE) {
        update (Math.floor(frame), FRAME_MAX);
        renderer.render(scene, camera)
        //step frame
        frame += FPS_MOVEMENT * secs;
        frame %= FRAME_MAX;
        lt = now
    }
}

//test check for WebGL capability
if (WebGL.isWebGLAvailable() ) {

    //initate functions here
    loop();

} else {
    const warning = WebGL.getWebGLErrorMessage();
    document.getElementById('container').appendChild( warning );
}

console.log("its connected");