import * as _ from 'lodash';
import * as THREE from 'three';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ForzaInter from './Hello';
import interLogo from './images/inter_milan.png'

const element = document.createElement('div');
document.body.appendChild(element);
ReactDOM.render(<ForzaInter language='Chinese'/>, element)

const scene = new THREE.Scene();

// 1 ---- Use built-in geometry
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
/************************* End ***********************/

// 2 --- Use buffer geometry
const TRIANGLE_NUM = 90;
const RADIUS = 2;
const delta = Math.PI * 2 / TRIANGLE_NUM;

let center = new THREE.Vector3(0, 1, 0);

const positions = [];
const uvs = [];
for(let i = 0; i < TRIANGLE_NUM; i++) {
	const angle0 = i * delta;
	const angle1 = (i + 1) * delta;

	// Point1
	positions.push(RADIUS * Math.cos(angle0));	
	positions.push(RADIUS * Math.sin(angle0));
	positions.push(0);
	uvs.push(0.5 + 0.48 * Math.cos(angle0));
	uvs.push(0.5 + 0.48 * Math.sin(angle0));

	// Point2
	positions.push(RADIUS * Math.cos(angle1));
	positions.push(RADIUS * Math.sin(angle1));
	positions.push(0);
	uvs.push(0.5 + 0.48 * Math.cos(angle1));
	uvs.push(0.5 + 0.48 * Math.sin(angle1));

	positions.push(0);
	positions.push(0);
	positions.push(0);
	uvs.push(0.5);
	uvs.push(0.5);
}

const bufferGeometry = new THREE.BufferGeometry();
bufferGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
bufferGeometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));

const uniforms = {
	logo: { type: "sampler2D", value: new THREE.TextureLoader().load(interLogo) },
	center: { type: "vec3", value: center }
}

const shaderMaterial = new THREE.ShaderMaterial({
	uniforms,
	vertexShader:  require('./shaders/logo.vs').default,
	fragmentShader: require('./shaders/logo.fs').default,
	side: THREE.DoubleSide
});

const mesh = new THREE.Mesh(bufferGeometry, shaderMaterial);
/************************* End ***********************/


// scene.add( plane );
scene.add(mesh);

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

renderer.domElement.onclick = () => {
	center.x++;
}

document.body.appendChild( renderer.domElement );

function renderFrame() {
    renderer.render( scene, camera );
    window.requestAnimationFrame(renderFrame);
}

renderFrame();

/** Simple Animation */
/*
	let angle = 0;
	setInterval(() => {
		center.x = Math.cos(angle);
		center.y = Math.sin(angle);
		angle += 0.1;
	}, 40)
*/
/** End */

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
