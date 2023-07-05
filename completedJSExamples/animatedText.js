import * as THREE from 'three';
//import { FileLoader } from 'three/addons/loaders/FontLoader.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

//global three.js variables
var scene, camera, renderer;

function init () {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.z = 100;

    const loader = new FontLoader();
    loader.load(
	// resource URL
	//'https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/fonts/helvetiker_regular.typeface.json',
		"node_modules/three/examples/fonts/helvetiker_bold.typeface.json",
	// onLoad callback
	    function ( font ) {
		// do something with the font
		var textGeometry = new TextGeometry("Hello World!", {
			font: font,
			size: 10,
			height: 2,			
		});
		textGeometry.center();
		var textMaterial = new THREE.MeshNormalMaterial();

		var textMesh = new THREE.Mesh(textGeometry, textMaterial);
		textMesh.name = "renderText";
		scene.add(textMesh);
		animate();
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
    
};





//animate the text to render to the screen
function animate() {
  requestAnimationFrame(animate);

 render();
}

function render() {
    scene.getObjectByName("renderText").rotation;
    renderer.render(scene, camera);
}

init();