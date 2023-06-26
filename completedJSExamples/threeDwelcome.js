import * as THREE from 'three';

import WebGL from "three/addons/capabilities/WebGL.js"

//imports for threed text.
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import helvetikerFont from 'three/examples/fonts/helvetiker_regular.typeface.json';


import HelvetikerFont from '../node_modules/three/examples/fonts/helvetiker_regular.typeface.json';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const loader = new FontLoader();
//redndering the font
loader.load(HelvetikerFont, function (font) {

   const geometry = new TextGeometry('Hello Three.js!', {
      font: font,
      size: 3,
      height: 0.2,
      curveSegments: 12,
      bevelEnabled: false,
      bevelThickness: 0.5,
      bevelSize: 0.3,
      bevelOffset: 0,
      bevelSegments: 5,
   })

   const material = new THREE.MeshFaceMaterial([
    new THREE.MeshPhongMaterial({
       color: 0xff22cc,
       flatShading: true,
    }), // front
    new THREE.MeshPhongMaterial({
       color: 0xffcc22
    }), // side
 ])
 const mesh = new THREE.Mesh(geometry, material)
 mesh.name = 'text';
 scene.add(mesh);

})