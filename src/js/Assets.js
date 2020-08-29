
import * as THREE from 'three';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

import Scene from './core/Scene.js';

//

const BASE_ICO_RAD = 0.5;

const icoMaterial = new THREE.MeshNormalMaterial({
	flatShading: true
});

function makeIco( faceSub ) {

	const rad = BASE_ICO_RAD * ( faceSub + 1 );

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

	// add ID to each vertex

	geometry.vertices.forEach( (vec, i) => {

		vec.id = i

	});

	// add adjacent vertices information to each vertex

	geometry.vertices.forEach( (thisVertex, i) => {

		thisVertex.adjVertices = [];

		geometry.faces.forEach( (face) => {

			const faceVertIDs = [ face.a, face.b, face.c ];

			if ( faceVertIDs.includes( i ) ) {
				
				faceVertIDs.forEach( (vertIDToAdd) => {

					if ( vertIDToAdd === i ) return

					if ( ! thisVertex.adjVertices.includes( geometry.vertices[ vertIDToAdd ] ) ) {

						thisVertex.adjVertices.push( geometry.vertices[ vertIDToAdd ] )

					}
					
				})

			}

		})

	})

	// add helpers for static points

	const HELPER_RAD = 0.02;

	const geoms = [];

	geometry.vertices.forEach( (vec) => {

		if ( vec.adjVertices.length === 5 ) {

			const newGeom = new THREE.IcosahedronBufferGeometry( HELPER_RAD, 1 );

			newGeom.translate( vec.x, vec.y, vec.z );

			geoms.push( newGeom );

		}

	})

	const helperGeometry = BufferGeometryUtils.mergeBufferGeometries( geoms );

	const helperMaterial = new THREE.MeshBasicMaterial();

	//

	const mesh = new THREE.Mesh( geometry, icoMaterial );
	
	const helper = new THREE.Mesh( helperGeometry, helperMaterial );
	
	const group = new THREE.Group();

	group.add( mesh, helper )

	return {
		mesh,
		helper,
		group
	}

};

//

const ico0 = makeIco( 0 );
const ico1 = makeIco( 1 );
const ico2 = makeIco( 2 );

ico0.group.position.x -= 2;
ico2.group.position.x += 3;

Scene.add(
	ico0.group,
	ico1.group,
	ico2.group
)
