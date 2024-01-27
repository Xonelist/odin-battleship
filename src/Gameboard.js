const {Ship, PatrolBoat, Submarine, Destroyer, Battleship, Carrier } = require('./battleship');

class GameBoard {
    constructor() {
        this.board = {};
        this.ships = Array();
    }

    addShip(type, x, y, player = 'default', face = 'h') {
        
        if(x < 0 || x > 9 || y < 0 || y > 9) return false;
        if(`${x}, ${y}` in this.board) return false;
        let ship = this.addTypeShip(type, player);
        this.ships.push(ship);
        
        switch (face) {
            case 'v':
                return this.addShipFaceVertical(x, y, ship)
            default:
                return this.addShipFaceHorizontal(x, y, ship)
                
        }
    }

    addTypeShip(type, player) {
        switch (type) {
            case 'P':
                return new PatrolBoat(player)
            case 'S':
                return new Submarine(player)
            case 'D':
                return new Destroyer(player)
            case 'B':
                return new Battleship(player)
            case 'C':
                return new Carrier(player)
            default:
                return false;
        }
    }
    addShipFaceHorizontal(x, y, ship) {
        if(x+ship.size > 9) return false;
        for(let i = x; i < x+ship.size; i++) {
            this.board[`${i}, ${y}`] = ship;
        }

        return ship;
    }

    addShipFaceVertical(x, y, ship) {
        if(y+ship.size > 9) return false;
        for(let i = y; i < y+ship.size; i++) {
            this.board[`${x}, ${i}`] = ship;
        }

        return ship;
    }

    receiveAttack(x, y) {
        if(`${x}, ${y}` in this.board) {
            return this.board[`${x}, ${y}`].hit();
        } else {
            return false;
        }
    }

    isAllShipSunk() {
        if(this.ships === null) return null
        let con = true;
        this.ships.forEach(ship => {
            if(!ship.isSunk()) con = false;
        });

        return con;

        //return true;
    }
}

module.exports = { GameBoard }