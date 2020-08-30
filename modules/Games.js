
const Board = require('./Board.js');

module.exports = function Games( socketServer ) {

	const games = {};

	function createNewGame( gameID, player1, player2 ) {

		const boardSizes = [
			Math.floor( Math.random() * 2 ),
			Math.floor( Math.random() * 2 ) + 1,
			Math.floor( Math.random() * 2 ) + 1,
			Math.floor( Math.random() * 2 ) + 1,
			Math.floor( Math.random() * 2 )
		];

		const boards = boardSizes.map( size => Board( size ) )

		games[ gameID ] = {
			gameID,
			player1,
			player2,
			boardSizes,
			boards
		};

		// broadcast new game to both opponents

		socketServer.to( gameID ).emit( 'new-multiplayer-game', games[ gameID ] );

	};

	//

	return {
		createNewGame
	}

}