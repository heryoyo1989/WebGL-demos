import * as _ from 'lodash';
import * as THREE from 'three';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ForzaInter from './Hello';
import { createRoot } from 'react-dom/client';
import interLogo from './images/inter_milan.png'

const element = document.createElement('div');
document.body.appendChild(element);
ReactDOM.render(<ForzaInter language='Chinese'/>, element)

const scene = new THREE.Scene();

/*const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );*/


const material = new THREE.MeshBasicMaterial( {
    side: THREE.DoubleSide
 });
 

// geometry.rotateX(Math.PI / 2);
const texture = new THREE.TextureLoader().load(interLogo);
const loader = new THREE.TextureLoader();
loader.load(
    interLogo,
    function ( texture ) {    
        material.map = texture;
        material.needsUpdate = true;
        renderFrame();
    }
);

// const geometry = new THREE.PlaneGeometry(4, 4, 32 );
const geometry = new THREE.CircleGeometry(3, 32);
const plane = new THREE.Mesh( geometry, material );
scene.add( plane );

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
//renderer.render( scene, camera );

document.body.appendChild( renderer.domElement );

function renderFrame() {
    renderer.render( scene, camera );
    window.requestAnimationFrame(renderFrame);
}


// const texture = new THREE.TextureLoader().load(interLogo); 
// immediately use the texture for material creation 

// load a resource
/*loader.load(
	// resource URL
	"./a6b9122f28aec671815ecc8b7a76ab12.png",

	// onLoad callback
	function ( texture ) {
		// in this example we create the material when the texture is loaded
		const material = new THREE.MeshBasicMaterial( {
			color: 0x0000ff,
            side: THREE.DoubleSide
		 } );
        const geometry = new THREE.PlaneGeometry( 1, 1 );
        geometry.rotateX(Math.PI/2);
        const plane = new THREE.Mesh( geometry, material );
        scene.add( plane );
	},

	// onProgress callback currently not supported
	undefined,

	// onError callback
	function ( err ) {
		console.error( 'An error happened.' );
	}
);*/
