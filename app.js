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

io.on( 'connection', (client)=> {

	console.log( `User ${ client.id } connected.` );

	client.on( 'request-opponent', (message, respFn) => {

		respFn();

	})

});