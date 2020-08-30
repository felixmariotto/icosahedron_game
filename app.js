const express = require('express');
const path = require('path');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 8080;

/* EXPRESS */

const app = express()

	.use( express.static( path.join( __dirname, 'dist' ) ) )

	.get('/', (req, res) => {

		res.sendFile( path.join( __dirname, 'dist/index.html' ) );

	})

	.listen( PORT, () => {

		console.log( 'App listening on port ' + PORT );

	})

/* SOCKET.IO */

const io = socketIO( app );

let waitingOpponent;

function createGameID() {
	return ( Math.random() * 10000000 ).toFixed(0)
}

io.on( 'connection', (client)=> {

	console.log( `User ${ client.id } connected.` );

	client.on( 'request-opponent', (message) => {

		if ( waitingOpponent ) {

			const gameID = createGameID();

			// join the room with the requested game name
			
			io.sockets.sockets[ client.id ].join( gameID );
			io.sockets.sockets[ client.id ].gameID = gameID;

			io.sockets.sockets[ waitingOpponent ].join( gameID );
			io.sockets.sockets[ waitingOpponent ].gameID = gameID;

			// broadcast new game to both opponents

			io.to( gameID ).emit( 'new-multiplayer-game', { gameID } );

		} else {

			waitingOpponent = client.id;

		}

	})

});