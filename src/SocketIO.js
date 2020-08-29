
import CLIENT from "socket.io-client";

const socket = CLIENT.connect();

// Good to test with webpack-dev-server :
// const socket = CLIENT.connect("https://vrgate-stage.herokuapp.com/");

//

function requestOpponent() {

	socket.emit( 'request-opponent', null, ( message ) => {

		console.log( message );

	});

}

//

export { requestOpponent }