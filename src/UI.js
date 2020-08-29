
import './style.css';

import { startMultiplayer } from './gameManager.js';

//

const homeTitle = document.createElement('H1');
homeTitle.id = 'home-title';
homeTitle.innerHTML = 'Icosahedron game';
document.body.append( homeTitle );

const homeScreen = document.createElement('DIV');
homeScreen.id = 'home-screen';
document.body.append( homeScreen );

const homeDialogue = document.createElement('DIV');
homeDialogue.id = 'home-dialogue';
homeScreen.append( homeDialogue );

const homeInstruction = document.createElement('H2');
homeInstruction.innerHTML = "Select a game mode :";
homeDialogue.append( homeInstruction );

const multiplayerButton = document.createElement('DIV');
multiplayerButton.innerHTML = "multiplayer";
homeDialogue.append( multiplayerButton );
multiplayerButton.onclick = () => {

	startMultiplayer();

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