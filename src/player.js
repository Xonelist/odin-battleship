const { GameBoard } = require('./Gameboard');
//hieracy of moduleexports Battleship.js > Gameboard > Player
class Player {
    constructor(name) {
        this.name = name
        this.gameBoard = new GameBoard() 
    }

    init() {
        this.gameBoard.addShip('P', 4, 4, this.name)
    }

    attack(player, x, y) {
        return player.receiveAttack(x, y);
    }

    receiveAttack(x, y) {
        return this.gameBoard.receiveAttack(x, y)
    }
}

class ComputerAI extends Player {
    constructor(name) {
        super(name)
    }

    attack(player) {
        let x = Math.floor(Math.random()*10);
        let y = Math.floor(Math.random()*10);

        player.receiveAttack(x, y);
    }
}

module.exports = { Player, ComputerAI }