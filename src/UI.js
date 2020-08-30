
import './style.css';

import { requestOpponent } from './SocketIO.js';

//

let deleteHomeScreen, showOpponentWait;

createHomeScreen();

function createHomeScreen() {

	const title = document.createElement('H1');
	title.id = 'home-title';
	title.innerHTML = 'Icosahedron game';
	document.body.append( title );

	const container = document.createElement('DIV');
	container.id = 'home-screen';
	document.body.append( container );

	const dialogueBox = document.createElement('DIV');
	dialogueBox.id = 'home-dialogue';
	container.append( dialogueBox );

	const instruction = document.createElement('H2');
	instruction.innerHTML = "Select a game mode :";
	dialogueBox.append( instruction );

	const multiplayerButton = document.createElement('DIV');
	multiplayerButton.innerHTML = "multiplayer";
	dialogueBox.append( multiplayerButton );
	multiplayerButton.onclick = () => {

		showOpponentWait();

		requestOpponent();

	}

	deleteHomeScreen = function () {

		document.body.removeChild( title );
		document.body.removeChild( container );

	}

	showOpponentWait = function () {

		instruction.innerHTML = "Looking for an opponent, please wait.";
		dialogueBox.removeChild( multiplayerButton );

	}

}

//

const uiConsole = document.createElement('DIV');
uiConsole.id = 'console';

//

function consoleLog( text, type ) {

	const newLine = document.createElement('DIV');
	newLine.classList.add( 'console-line', type );
	uiConsole.append( newLine );

	newLine.innerHTML = text;

	uiConsole.scrollTop = uiConsole.scrollHeight;

};

//

const turnPanel = document.createElement('DIV');
turnPanel.id = 'turn-panel';

/* 

API

these are functions aimed at being abstract enough to allow for
an big UI refactoring later on.

*/

function showGameUI() {

	document.body.append( uiConsole );
	document.body.append( turnPanel );

};

//

function printHelp( text ) {

	consoleLog( text, 'help' );

}

//

function printWarning( text ) {

	consoleLog( text, 'warning' );

}

//

function printError( text ) {

	consoleLog( text, 'error' );

}

printHelp( 'this is help comment' );
printWarning( 'your turn will finish in 20 seconds');
printError( "you can't do this" );

//

function hideHomeScreen() {

	deleteHomeScreen();
	showGameUI();

};

//

export { hideHomeScreen }