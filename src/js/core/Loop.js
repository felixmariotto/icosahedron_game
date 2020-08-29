
import Renderer from './Renderer.js';
import Camera from './Camera.js';
import { updateAssets } from '../Assets.js';

//

function loop() {

	Camera.update();

	updateAssets();

	Renderer.render();

}

//

function init() {

	Renderer.threeRenderer.setAnimationLoop( loop );

}

//

export default {
	init
}