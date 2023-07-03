import * as THREE from 'three';
//import { FileLoader } from 'three/addons/loaders/FontLoader.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//calling fontloader
const loader = new FontLoader();
const font = loader.load(
	// resource URL
	'fonts/helvetiker_bold.typeface.json',

	// onLoad callback
	function ( font ) {
		// do something with the font
		console.log( font );
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

camera.position.z = 5;

//animate the text to render to the screen
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
