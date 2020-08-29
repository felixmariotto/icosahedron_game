
import * as THREE from 'three';

import Scene from './core/Scene.js';

//

const icoMaterial = new THREE.MeshNormalMaterial({
	flatShading: true
});

function makeIco( faceSub ) {

	const rad = 0.5;

	const geometry = new THREE.IcosahedronGeometry( rad, faceSub )

	// add adjacent faces information to each face of the geometry

	geometry.faces.forEach( (thisFace) => {

		thisFace.adjFaces = [];

		geometry.faces.forEach( (face) => {

			const arr = [ face.a, face.b, face.c ];

			let counter = 0;

			if ( arr.includes( thisFace.a ) ) counter ++
			if ( arr.includes( thisFace.b ) ) counter ++
			if ( arr.includes( thisFace.c ) ) counter ++

			if ( counter === 2 ) thisFace.adjFaces.push( face );

		})

	})

	//

	const mesh = new THREE.Mesh( geometry, icoMaterial );

	return mesh

};

//

Scene.add( makeIco( 1 ) );
