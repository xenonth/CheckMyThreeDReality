import * as THREE from 'three';

import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'

import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const loader = new FontLoader();

const font = loader.load(
	// resource URL
	typefaceFont,

	// onLoad callback
	function ( font ) {
		// do something with the font
		console.log( "Armed and loaded" );
	},

	// onProgress callback
	function ( xhr ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	},

	// onError callback
	function (error) {
		console.log( `text Resource failed to load` );
	}
);

camera.position.z = 5;

//animate the text to render to the screen
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
