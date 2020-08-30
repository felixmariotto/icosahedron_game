
import CLIENT from "socket.io-client";

const socket = CLIENT.connect();

// Good to test with webpack-dev-server :
// const socket = CLIENT.connect("https://vrgate-stage.herokuapp.com/");

// RECEPTION

socket.on( 'new-multiplayer-game', (message) => {

	console.log( message );

})

//

function requestOpponent() {

	socket.emit( 'request-opponent' );

}

//

export { requestOpponent }