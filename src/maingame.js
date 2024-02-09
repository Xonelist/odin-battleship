const { Player, ComputerAI } = require('./player')

function maingame() {
    let noWinner = true;
    let winner = '';
    let player1 = new Player('Player1')
    let player2 = new ComputerAI('computerAI')
    player1.init();
    player2.init();

    let activePlayer = player1;
    let oppenentPlayer = player2;
    while (noWinner) {

        if (activePlayer.name === 'computerAI') {
            activePlayer.attack(oppenentPlayer);
        } else {
            //waiting for input
            let x = prompt('x position')
            let y = prompt('y positon')
            activePlayer.attack(oppenentPlayer, x, y);
        }

        if (oppenentPlayer.isLost()) {
            noWinner = false;
            winner = activePlayer.name
        } else {
            let tempPlayer = activePlayer;
            activePlayer = oppenentPlayer;
            oppenentPlayer = tempPlayer;
        }


    }

    console.log(winner)
}

export {maingame}