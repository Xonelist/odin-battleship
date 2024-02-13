import { ComputerAI, Player } from "./player";

function mainmenu(player1, player2) {
    const div = document.createElement('div');
    const introduction = document.createElement('h1');
    introduction.className = 'Intro-title'
    introduction.textContent = 'Welcome to Battleship Game !'
    let _wait = true;
    const startbutton = document.createElement('button');
    startbutton.textContent = 'Start Game'

    startbutton.addEventListener('click',() => {
        document.body.removeChild(div);
        maingame();
        game();
    })

    div.appendChild(introduction);
    div.appendChild(startbutton);
    document.body.appendChild(div);
}

function maingame() {
    const body = document.body
    const main = document.createElement('main')
    const divHead = document.createElement('div')
    divHead.id = 'divHead'
    const divBody = document.createElement('div')
    divBody.id = 'divBody'
    const divFoot = document.createElement('div')
    divFoot.id = 'divFoot'
    const divBoard = document.createElement('div');
    divBoard.id = 'divBoard';

    divBody.appendChild(divBoard)

    main.appendChild(divHead)
    main.appendChild(divBody)
    main.appendChild(divFoot)

    body.appendChild(main);
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
            col.classList = 'cell'
            row.appendChild(col)
        }
        table.insertBefore(row, table.firstChild);
    }

    return table;
}

//player turns display
function turnBoards(playerName) {
    const head = document.querySelector('#divHead');
    const headline = document.createElement('h3');
    headline.textContent = playerName;
}

//players logs 
function logGame() {
    const log = document.createElement('div')
}

function game() {
    var player1 = new Player('Player1')
    var player2 = new ComputerAI('ComputerAI')

    const divBoard = document.querySelector('#divBoard')
    divBoard.appendChild(showBoard(player1.name))
    divBoard.appendChild(showBoard(player2.name))

    let activePlayer = player1;
    let oppenentPlayer = player2;

    nextTurn(activePlayer, oppenentPlayer);
}

function nextTurn(activePlayer, oppenentPlayer) {
    if (activePlayer.name === 'ComputerAI') {
        activePlayer.attack(oppenentPlayer);
        nextTurn(oppenentPlayer, activePlayer);
    } else {
        const cells = document.querySelectorAll('td.cell');
        cells.forEach(cell => {
            if(!cell.classList.contains('attacked')) {
                
                cell.addEventListener('click', (e) => {
                    const cor = e.target.id
                    activePlayer.attack(oppenentPlayer, cor[1], cor[2])
                    nextTurn(oppenentPlayer, activePlayer)
                }, {once: true})   
            }         
        });
    }
}

export { mainmenu, showBoard, maingame }