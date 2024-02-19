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
    const body = document.body;
    const main = document.createElement('main');
    const divHead = document.createElement('div');
    divHead.id = 'divHead';
    const divBody = document.createElement('div');
    divBody.id = 'divBody';
    const divFoot = document.createElement('div');
    divFoot.id = 'divFoot';
    const divBoard = document.createElement('div');
    divBoard.id = 'divBoard';
    const divTurn = document.createElement('h2');
    divTurn.id = 'divTurn';
    const divLogs = document.createElement('div');
    divLogs.id = 'divLogs'

    divHead.appendChild(divTurn)
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
    const divTurn = document.querySelector('#divTurn')
    divTurn.textContent = `Now is ${playerName}'s turn`;
}

//players logs 
function logGame() {
    const divLogs = document.querySelector('#divLogs');

}

function game() {
    const player1 = new Player('Player1')
    const player2 = new Player('Player2')

    player1.init()
    player2.init()

    const divBoard = document.querySelector('#divBoard')
    divBoard.appendChild(showBoard(player1.name))
    divBoard.appendChild(showBoard(player2.name))

    let activePlayer = player1;
    let oppenentPlayer = player2;

    nextTurn(activePlayer, oppenentPlayer);
}

function nextTurn(activePlayer, oppenentPlayer) {
    let act = function(e) {
        if(e.target.classList.contains('cell') && !e.target.classList.contains('attacked')) {
            e.target.classList.add('attacked')
            const cor = e.target.id
            const table = document.querySelector(`table#${oppenentPlayer.name}`);
            table.classList.remove('active')
            let hit = activePlayer.attack(oppenentPlayer, cor[1], cor[2])
            if(hit) {
                table.querySelector(`#c${cor[1]}${cor[2]}`).classList.add('hitted')
                console.log(`${oppenentPlayer.name}'s ${hit.shipName} got hit at ${cor[1]}, ${cor[2]}`)
            };
            table.removeEventListener('click', act)
            nextTurn(oppenentPlayer, activePlayer);
        }
    }

    let computerAct = function() {
        let x = Math.floor(Math.random()*10);
        let y = Math.floor(Math.random()*10);
        while(!activePlayer.checkLogs(x, y)) {
            console.log('reroll cordinate')
            x = Math.floor(Math.random()*10);
            y = Math.floor(Math.random()*10);
        }

        const table = document.querySelector(`table#${oppenentPlayer.name}`)
        table.querySelector(`#c${x}${y}`).classList.add('attacked')
        let hit = activePlayer.attack(oppenentPlayer, x, y)
        if(hit) {
            table.querySelector(`#c${x}${y}`).classList.add('hitted')
            console.log(`${oppenentPlayer.name}'s ${hit} got hit at ${x}, ${y}`)
        };
    }

    turnBoards(activePlayer.name)

    if (activePlayer.name === 'ComputerAI') {
        computerAct()
        nextTurn(oppenentPlayer, activePlayer);
    } else {
        const table = document.querySelector(`table#${oppenentPlayer.name}`);                
        table.classList.add('active');
        table.addEventListener('click', act)          
    }
}

function gameOver() {


}

export { mainmenu, showBoard, maingame }