
import './style.css';

//

const uiConsole = document.createElement('DIV');
uiConsole.id = 'console';
document.body.append( uiConsole );

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
document.body.append( turnPanel );

/* 

API

these are functions aimed at being abstract enough to allow for
an big UI refactoring later on.

*/

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