
import * as THREE from 'three';

//

import Camera from './core/Camera.js';

//

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const intersectVec = new THREE.Vector3();

//

function onMouseMove( event ) {

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	raycaster.setFromCamera( mouse, Camera.threeCamera );

}

window.addEventListener( 'mousemove', onMouseMove, false );

//

function castAgainstSphere( sphere ) {

	const intersect = raycaster.ray.intersectSphere( sphere, intersectVec );

	return intersect

}

//

export { castAgainstSphere }
