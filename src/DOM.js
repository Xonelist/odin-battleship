import { maingame } from "./maingame";
import { ComputerAI, Player } from "./player";

function mainmenu() {
    const div = document.createElement('div');
    const introduction = document.createElement('h1');
    introduction.className = 'Intro-title'
    introduction.textContent = 'Welcome to Battleship Game !'
    let _wait = true;
    const startbutton = document.createElement('button');
    startbutton.textContent = 'Start Game'

    startbutton.addEventListener('click',() => {
        _wait = false;
    })

    div.appendChild(introduction);
    div.appendChild(startbutton);
    document.body.appendChild(div);

    while(_wait) {

    }
    console.log('you clicked')
}

function game() {
    const body = document.body
    const divHead = document.createElement('div')
    divHead.id = 'divHead'
    const divBody = document.createElement('div')
    divBody.id = 'divBody'
    const divFoot = document.createElement('div')
    divFoot.id = 'divFoot'
    const divBoard = document.createElement('div');
    divBoard.id = 'divBoard';

    const player1 = new Player('Player1')
    const player2 = new ComputerAI('ComputerAI');

    let noWinner = true;
    let winner = '';
    let activePlayer = player1;
    let oppenentPlayer = player2;

    player1.init();
    player2.init();


    divBoard.appendChild(showBoard(player1.name));
    divBoard.appendChild(showBoard(player2.name));

    divBody.appendChild(divBoard)

    body.appendChild(divHead)
    body.appendChild(divBody)
    body.appendChild(divFoot)
}


//return board with form of table
function showBoard(playerName) {
    const table = document.createElement('table');
    table.id = playerName
    for(let i= 0; i < 10; i++) {
        const row = document.createElement('tr');
        for(let j = 0; j < 10; j++) {
            const col = document.createElement('td');
            col.id = `c${j}${i}`;
            row.appendChild(col)
        }
        table.insertBefore(row, table.firstChild);
    }

    return table;
}

export { mainmenu, showBoard, game }