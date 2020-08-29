
import './style.css';

//

const uiConsole = document.createElement('DIV');
uiConsole.id = 'console';
document.body.append( uiConsole );

//

consoleLog('Welcome to isocahedron game');

function consoleLog( text ) {

	const newLine = document.createElement('DIV');
	newLine.classList.add('console-line');
	uiConsole.append( newLine );

	newLine.innerHTML = text;

	uiConsole.scrollTop = uiConsole.scrollHeight;

};