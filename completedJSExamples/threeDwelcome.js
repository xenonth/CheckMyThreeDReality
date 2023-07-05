import * as THREE from 'three';
//import { FileLoader } from 'three/addons/loaders/FontLoader.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//calling fontloader
const loader = new FontLoader();
loader.load(
	// resource URL
	//'https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/fonts/helvetiker_regular.typeface.json',
		"node_modules/three/examples/fonts/helvetiker_bold.typeface.json",
	// onLoad callback
	function ( font ) {
		// do something with the font
		const textGeometry = new TextGeometry("Hello World!", {
			font: font,
			size: 10,
			height: 2,			
		})

		const textMaterial = new THREE.MeshNormalMaterial();
		const textMesh = new THREE.Mesh(textGeometry, textMaterial);
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

camera.position.z = 100;

//animate the text to render to the screen
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
