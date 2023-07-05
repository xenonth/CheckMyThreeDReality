import * as THREE from 'three';

import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//variables for mathematics in scenes
let negativePi = - 3.141569 / 2;
// inititate camera

camera.position.x = 3;
camera.position.y = 20;
camera.position.z= 45;


const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.setPixelRatio);
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);

//Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target = new THREE.Vector3(0,0,-40);
controls.update();

//creating the plane
const plane = new THREE.Mesh(new THREE.PlaneGeometry(200,200), new THREE.MeshPhongMaterial({color: 0x0a7d15}))

plane.rotation.x = - Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);

//Lighting hemisphere light:
scene.add(new THREE.AmbientLight(0xffffff, 0.5));

const light1 = new THREE.PointLight(0xff6666, 1, 100);
light1.castShadow = true;
light1.shadow.mapSize.height = 4096;
light1.shadow.mapSize.height = 4096;
scene.add(light1);

const light2 = new THREE.PointLight(0x33ff33, 1, 100);
light2.castShadow = true;
light2.shadow.mapSize.height = 4096;
light2.shadow.mapSize.height = 4096;
scene.add(light2);

const loader = new FontLoader();
loader.load(
	// resource URL
	//'https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/fonts/helvetiker_regular.typeface.json',
		"node_modules/three/examples/fonts/helvetiker_bold.typeface.json",
	// onLoad callback
	function ( font ) {
		// do something with the font
		const textGeometry = new TextGeometry("Michael is \namazing", {
			font: font,
			size: 10,
			height: 2,			
		})

		const textMaterial = new THREE.MeshNormalMaterial();
		const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.x = -36;
        textMesh.position.y = 5
        textMesh.rotation.x += 0.01; 
		scene.add(textMesh);
	},

	// onProgress callback
	function ( xhr ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	},

	// onError callback
	function ( err ) {
		console.log( err);
	}
);



//animate function
function animate() {
//animate the lighting
    const now = Date.now() / 1000;
    light1.position.x = Math.cos(now) * 20;
    light1.position.y = 15;
    light1.position.z =  Math.sin(now) * 20;

    light2.position.x = Math.sin(now) * 20;
    light2.position.y = 15;
    light2.position.z = Math.cos(now) * 20;
    
    textMesh.rotation.x += 0.01;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

document.body.appendChild(renderer.domElement)
animate();
