//importing from three.js
import * as THREE from 'three';
import WebGL from "three/addons/capabilities/WebGL.js"

//Setting width and height of the rendering frame
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//creating and setting camera position
const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 500);
camera.position.set(0,0,100);
camera.lookAt(0,0,0);

const scene = new THREE.Scene();

//create a blue LineBasicMaterial
const material = new THREE.LineBasicMaterial({color: 0x0000ff});

//setting points to draw a square
const square = [];
square.push(new THREE.Vector3(0, -10, 0));
square.push(new THREE.Vector3(10, 0, 0));
square.push(new THREE.Vector3(0, 10, 0));
square.push(new THREE.Vector3(-10, 0, 0));
square.push(new THREE.Vector3(0, -10, 0));

//creating the top triangle
const topTriangle = [];
topTriangle.push(new THREE.Vector3(0, 10, 0));
topTriangle.push(new THREE.Vector3(-10, 20, 0));
topTriangle.push(new THREE.Vector3(10, 20, 0));
topTriangle.push(new THREE.Vector3(0, 10, 0));

//Drawing Right Triangle
const rightTriangle = [];
rightTriangle.push(new THREE.Vector3(10, 0, 0));
rightTriangle.push(new THREE.Vector3(20, 10, 0));
rightTriangle.push(new THREE.Vector3(20, -10, 0));
rightTriangle.push(new THREE.Vector3(10, 0, 0));

//Drawing Left Triangle
const leftTriangle = [];
leftTriangle.push(new THREE.Vector3(-10, 0, 0));
leftTriangle.push(new THREE.Vector3(-20, 10, 0));
leftTriangle.push(new THREE.Vector3(-20, -10, 0));
leftTriangle.push(new THREE.Vector3(-10, 0, 0));

//Drawing Left Triangle
const bottomTriangle = [];
bottomTriangle.push(new THREE.Vector3(0,-10,0));
bottomTriangle.push(new THREE.Vector3(10,-20,0));
bottomTriangle.push(new THREE.Vector3(-10,-20,0));
bottomTriangle.push(new THREE.Vector3(0,-10,0));

//outer edging connecter points
const bottomToRight = [];
bottomToRight.push(new THREE.Vector3(10,-20,0));
bottomToRight.push(new THREE.Vector3(20,-10,0));

//outer edging connecter points top right
const topToRight = [];
topToRight.push(new THREE.Vector3(10,20,0));
topToRight.push(new THREE.Vector3(20,10,0));

//outer edging connecter points top right
const topToLeft = [];
topToLeft.push(new THREE.Vector3(-10,20,0));
topToLeft.push(new THREE.Vector3(-20,10,0));

//outer edging connecter points top right
const bottomToLeft = [];
bottomToLeft.push(new THREE.Vector3(-10,-20,0));
bottomToLeft.push(new THREE.Vector3(-20,-10,0));


const geometrySquare = new THREE.BufferGeometry().setFromPoints( square );
const geometryTopTriangle = new THREE.BufferGeometry().setFromPoints( topTriangle );
const geometryRightTriangle = new THREE.BufferGeometry().setFromPoints( rightTriangle );
const geometryBottomTriangle = new THREE.BufferGeometry().setFromPoints( bottomTriangle );
const geometryLeftTriangle = new THREE.BufferGeometry().setFromPoints( leftTriangle );
const geometryConectorbr    = new THREE.BufferGeometry().setFromPoints( bottomToRight );
const geometryConectortr = new THREE.BufferGeometry().setFromPoints( topToRight );
const geometryConectortl = new THREE.BufferGeometry().setFromPoints( topToLeft );
const geometryConectortlb = new THREE.BufferGeometry().setFromPoints( bottomToLeft );

//drawing the line using geometry and material variables
const lineOne = new THREE.Line( geometrySquare, material);
const lineTwo = new THREE.Line( geometryTopTriangle, material);
const lineThree = new THREE.Line( geometryRightTriangle, material);
const lineFour = new THREE.Line( geometryBottomTriangle, material);
const lineFive = new THREE.Line( geometryLeftTriangle, material);
const lineSix = new THREE.Line( geometryConectorbr, material);
const lineSeven = new THREE.Line( geometryConectortr, material);
const lineEight = new THREE.Line( geometryConectortl, material);
const lineNine = new THREE.Line( geometryConectortlb, material);

//Adding different shapes to the scene
scene.add(lineOne);
scene.add(lineTwo);
scene.add(lineThree);
scene.add(lineFour);
scene.add(lineFive);
scene.add(lineSix);
scene.add(lineSeven);
scene.add(lineEight);
scene.add(lineNine);
renderer.render(scene, camera);