
import CLIENT from "socket.io-client";
import Ico from './js/Ico.js';
import { startMultiplayer } from './gameManager.js';

// const socket = CLIENT.connect();

// Good to test with webpack-dev-server :
const socket = CLIENT.connect("https://ico-game.herokuapp.com/");

// RECEPTION

socket.on( 'new-multiplayer-game', (message) => {

	Ico.createBoards( message.boardSizes );

	startMultiplayer();

})

//

function requestOpponent() {

	socket.emit( 'request-opponent' );

}

//

export { requestOpponent }