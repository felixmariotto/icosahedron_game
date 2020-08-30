
const THREE = require('three');

//

const BASE_ICO_RAD = 0.5;

//

module.exports = function Board( faceSub ) {

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

	// create sphere objects for raycasting

	const SPHERE_RAD = 0.1;

	const staticSpheres = [];
	const mobileSpheres = [];

	geometry.vertices.forEach( (vec) => {

		const sphere = new THREE.Sphere( vec, SPHERE_RAD )

		if ( vec.adjVertices.length === 5 ) {

			staticSpheres.push( sphere )

		} else {

			mobileSpheres.push( sphere )

		}

	})

	//

	return geometry

};