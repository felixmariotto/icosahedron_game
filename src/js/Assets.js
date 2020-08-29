
import * as THREE from 'three';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

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

	const helper = new THREE.Mesh( helperGeometry, helperMaterial )

	Scene.add( helper )

	//

	const mesh = new THREE.Mesh( geometry, icoMaterial );

	return mesh

};

//

Scene.add( makeIco( 2 ) );
