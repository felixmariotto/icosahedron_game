
import * as THREE from 'three';

import Scene from './core/Scene.js';

//

const planetMaterial = new THREE.MeshNormalMaterial({
	flatShading: true
});

function makePlanet( faceSub ) {

	const rad = 1;

	const geometry = new THREE.IcosahedronBufferGeometry( rad, faceSub )

	const mesh = new THREE.Mesh( geometry, planetMaterial );

	return mesh

};

//

Scene.add( makePlanet( 1 ) );
