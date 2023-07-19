import { Quaternion } from 'cannon-es';
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
const makeMesh = () => {
    const material = new THREE.MeshNormalMaterial({wireframe: true, wireframeLinewidth: 2});
    const mesh_parent = new THREE.Mesh(
        new THREE.SphereGeometry(1, 12, 12), material
    );

    const mesh_child = new THREE.Mesh(new THREE.CylinderGeometry(0, 0.25, 0.25, 8, 8), material);
    mesh_child.position.y = 1.25;
    mesh_parent.add(mesh_child);
    return mesh_parent;
}

//Objects
scene.add(new THREE.GridHelper(10, 10))

const mesh1 = makeMesh();
mesh1.position.set(0, 0 ,-2.5);
scene.add(mesh1);

const mesh2 = makeMesh();
mesh2.position.set(0, 0 ,2.5);
scene.add(mesh2);

const mesh3 = makeMesh();
mesh3.position.set(0, 0 , 0);
scene.add(mesh3)

//quaternion objects
const q = new Quaternion();
const q1 = q.clone();
const q2 = q.clone();

// Camera position
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);

renderer.render(scene,camera);

// Start animation
//Animate loop
//setting camera position and angle
camera.position.set(4 , 4, 4);
camera.lookAt(0,0,0);

const FPS_UPDATE = 20;
const FPS_MOVEMENT = 30;
const FRAME_MAX = 900;
let secs = 0,
frame = 0,
lt = new Date();

//animating for loop
//update
const axis1 = new THREE.Vector3(0, 0, 1);
const el = new THREE.Euler();
const axis2 = new THREE.Vector3(1, 0, 0);
const update = function(frame, frameMax) {
    const a1 = frame / frameMax;
    const a2 = a1 * 1 % 1;
    const a3 = a1 * (16 * Math.sin(Math.PI * 2) * a1) % 1;
    const radian1 = Math.PI * 2 * a2;
    el.x = Math.cos(radian1);
    el.y = 0;
    el.z = Math.sin(radian1)
    axis1.set(0, 1, 0).applyEuler(el);
    const deg1 = 90;
    const deg2 = 360 * a3;
    //set q1 and q2 using from axis angle method
    q1.setFromAxisAngle(axis1.normalize(), THREE.MathUtils.degToRad(deg1));
    q2.setFromAxisAngle(axis2.normalize(), THREE.MathUtils.degToRad(deg2));
    //update the mesh object local rotations with quternion obejects where mesh and mesh 2 are just the current state of q1 and q2.
    //Rotation of mesh3 is q1 premultiplyed by q2
    mesh1.quaternion.copy(q1);
    mesh2.quaternion.copy(q2);
    mesh3.quaternion.copy(q1).premultiply(q2);
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