import * as THREE from 'three';

import WebGL from "three/addons/capabilities/WebGL.js"

//imports for threed text.
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import helvetikerFont from 'three/examples/fonts/helvetiker_regular.typeface.json';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//redndering the font
const font = new THREE.Font(helvetikerFont);

const geometry = new THREE.TextBufferGeometry()