
import * as THREE from 'three';
import defaults from '../../data/defaults.js';

//

const scene = new THREE.Scene();

const groups = [];

for ( let i=0 ; i<5 ; i++ ) {

	const group = new THREE.Group();
	group.visible = i ? false : true;

	scene.add( group );
	groups.push( group );

};

updateBackground( defaults.sceneBackColor );

//

export default {
	threeScene: scene,
	updateBackground,
	add,
	addToGroup
}

//

function updateBackground( color ) {

	if ( !color ) return

	if ( scene.background ) {

		scene.background.set( color );

	} else {

		scene.background = new THREE.Color( color );

	}

}

//

function add() {

	scene.add( ...arguments );

};

//

function addToGroup( id ) {

	const args = [ ...arguments ];
	args.shift();

	groups[ id ].add( ...args )

};