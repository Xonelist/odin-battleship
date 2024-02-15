const { GameBoard } = require('./Gameboard');
//hieracy of moduleexports Battleship.js > Gameboard > Player
class Player {
    constructor(name) {
        this.name = name
        this.gameBoard = new GameBoard()
        this.logsAttack = {} 
    }

    checkLogs(x, y) {
        return this.logsAttack[`${x}${y}`] === undefined
    }

    init() {
        this.gameBoard.addShip('P', 4, 4, this.name)
    }

    attack(player, x, y) {
        console.log(`${this.name} attack ${player.name} ${x}, ${y}`)
        if(this.checkLogs(x, y)) {
            this.logsAttack[`${x}${y}`] = true;
            return player.receiveAttack(x, y);
        }
    }

    receiveAttack(x, y) {
        return this.gameBoard.receiveAttack(x, y)
    }

    isLost() {
        return this.gameBoard.isAllShipSunk();
    }
}

class ComputerAI extends Player {

    attack(player,x,y) {
        //let x = Math.floor(Math.random()*10);
        //let y = Math.floor(Math.random()*10);
        console.log(`${this.name} attack ${player.name} ${x}, ${y}`)
        this.logsAttack[`${x}${y}`] = true;
        return player.receiveAttack(x, y);
    }
}

module.exports = { Player, ComputerAI }