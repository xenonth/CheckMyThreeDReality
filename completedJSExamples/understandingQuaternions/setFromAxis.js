import * as THREE from 'three';
import WebGL from "three/addons/capabilities/WebGL.js"
// Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.add(new THREE.GridHelper(10, 10));

// Sphere
const geo = new THREE.SphereGeometry(1, 16, 16);
const material = new THREE.MeshNormalMaterial({wireframe: true, wireframeLinewidth: 6});
const mesh1 = new THREE.Mesh(geo, material);
scene.add(mesh1);

//Arrow Helper (axis rotation line);
const arrowHelper = new THREE.ArrowHelper();
arrowHelper.setLength(1.5);
arrowHelper.line.material.linewidth = 6;
scene.add(arrowHelper);

//mesh1.quaternion.setFromAxisAngle(axis.normalize(), THREE.MathUtils.degToRad(degree));

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
const FRAME_MAX = 900;
let secs = 0,
frame = 0,
lt = new Date();

//animating for loop
//update
const v_axis = new THREE.Vector3();
const e_axis = new THREE.Euler();

const update = function(frame, frameMax) {
    const a1 = frame / frameMax;
    const a2 = a1 * 8 % 1;
    const a3 = Math.sin(Math.PI * (a1 * 2 % 1));
    e_axis.z = Math.PI / 180 * (45 * a3);
    mesh1.quaternion.setFromAxisAngle(v_axis, Math.PI * 2 * a2);
    mesh1.rotation.z += e_axis.z
    arrowHelper.setDirection(v_axis); 
}

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