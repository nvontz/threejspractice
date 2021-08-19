import './style.css'

import * as THREE from 'three';

import {OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(100);

const heatMapTexture = new THREE.TextureLoader().load('heatmap.jpg')

const geometry = new THREE.TorusGeometry( 10, 3, 16, 90 );
const material = new THREE.MeshToonMaterial( { map: heatMapTexture } );
const torus = new THREE.Mesh( geometry, material );
torus.position.set(20,0,70);
scene.add( torus );




const wall1 = new THREE.Mesh( 
  new THREE.BoxGeometry( 50, 100, 1 ),
  new THREE.MeshToonMaterial( {color: 0x222222} )
);

  wall1.position.set(-30,0,80)
scene.add( wall1 );



const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(30,20,100)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

function addSpace() {
  const geometry = new THREE.TorusKnotGeometry( 2, 1.5, 4, 8 );
  const material = new THREE.MeshStandardMaterial( { color: 0xE9E9E9 } );
  const torusKnot = new THREE.Mesh( geometry, material );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(1000));
  torusKnot.position.set(x,y,z);
  scene.add( torusKnot );
}

Array(400).fill().forEach(addSpace)

const skyTexture = new THREE.TextureLoader().load('void.jpg');
scene.background = skyTexture;

function moveCamera() {
  const t = document.body.getBoundingClientRect().bottom;
  camera.position.z = t;
}

document.body.onscroll = moveCamera



function animate() {
  requestAnimationFrame( animate );
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate()