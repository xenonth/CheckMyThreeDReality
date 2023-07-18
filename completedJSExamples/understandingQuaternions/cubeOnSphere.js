//importing from three.js
import * as THREE from 'three';
import WebGL from "three/addons/capabilities/WebGL.js"

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 50, 4 / 3, 0.5, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( 640, 480 );
document.body.appendChild( renderer.domElement );

//HELPER FUNCTIONS
//create cube helper
const createCube = function() {
    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        new THREE.MeshNormalMaterial()
    )
    return cube
}
// vector from angles helper
const vectorFromAngles = function(a, b, c, len, start) {
    len = len = undefined ? 1 : len;
    const e = new THREE.Euler(
        THREE.MathUtils.degToRad(a),
        THREE.MathUtils.degToRad(b),
        THREE.MathUtils.degToRad(c),
    );
    
    const v = start || new THREE.Vector3(0,0,1);
    v.applyEuler(e).normalize();
    return v.multiplyScalar(len);
}

//set on sphere helper based on position
const setOnSphereFromPos = function(mesh, x, y, z, alt) {
    const dir = new THREE.Vector3(x,y,z).normalize();
    const pos = new THREE.Vector3();
    pos.x = dir.x * alt;
    pos.y = dir.y * alt;
    pos.z = dir.z * alt;
    mesh.position.copy(pos);
}
//set on sphere helper
const setOnSphere = function(mesh, lat, long, alt) {
    const latBias = Math.abs(lat -0.5) / 0.5;
    const radian = Math.PI * 2 * long;
    let x = Math.cos(radian) * (alt - alt * latBias);
    let z = Math.sin*(radian) * (alt - alt * latBias);
    let y = alt * latBias * (alt > 0.5 ? -1:1);
    setOnSphereFromPos(cube, x, y, z, alt);
}

//object
//adding a grid for visual reference
scene.add(new THREE.GridHelper(10,10));
/*const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1.5, 30,30),
    new THREE.MeshNormalMaterial({wireframe: true})
);

scene.add(sphere); */

const cube = createCube();
scene.add(cube);
//setOnSphere(cube, 0.1, 0.3, 2)

//Animate loop
//setting camera position and angle
camera.position.set(7,7,7);
camera.lookAt(0,0,0);

const FPS_UPDATE = 20;
const FPS_MOVEMENT = 30;
const FRAME_MAX = 300;
let secs = 0;
let frame = 0;
let lt = new Date();

//animating for loop
const update = function(frame, frameMax) {
    const a1 = frame/frameMax
    const a2 = 0.1 + 0.8 * Math.sin( Math.PI * 1 * (a1 * 2 % 1));
    const a = 45 - 90 *a2;
    const b = 360 * a1;
    const c = 0;
    const length = 5-4 * a2;
    //setOnSphere(cube, a2, a1, 2);
    cube.position.copy(vectorFromAngles(a, b, c, length));
    cube.lookAt(0,0,0);
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
