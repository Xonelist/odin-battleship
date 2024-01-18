class GameBoard {
    constructor() {
        this.board = {};
        this.Ships = null;
        this.AttackedRecords = {}
    }

    addShips(type, x, y) {
        let ship;
        if(`${x}, ${y}` in this.board) return false;
        switch (type) {
            case 'P':
                ship = new PatrolBoat()
                break;
            case 'S':
                ship = new Submarine()
                break;
            case 'D':
                ship = new Destroyer()
                break;
            case 'B':
                ship = new Battleship()
                break;
            case 'C':
                ship = new Carrier()
                break;
                
            default:
                return false;
        }
        this.board[`${x}, ${y}`] = ship;
    }

    receiveAttack(x, y) {
        if(`${x}, ${y}` in this.AttackedRecords) return false;
        this.AttackedRecords[`${x}, ${y}`] = true;
        if(`${x}, ${y}` in this.board) {
            return this.board[`${x}, ${y}`].hit();
        } else {
            return false;
        }
    }
}

class Ship {
    constructor(player = 'St John') {
        this.player = player;
        this.totalHit = 0;
        this.location = null;
    }

    hit() {
        this.totalHit += 1
        return `${this.player}'s ${this.shipName} got hit`
    }

    isSunk() {
        if(this.totalHit === this.size) {
            //return `${this.player}'s ${this.shipName} is sunk`
            return true;
        } else {
            //return `${this.totalHit} / ${this.size} hits till ${this.player}'s ${this.shipName} sinking`
            return false;
        }
    }
}
class PatrolBoat extends Ship {
    constructor(player) {
        super(player)
        this.shipName = 'Patrol Boat'
        this.size = 2
    }
}

class Submarine extends Ship {
    constructor(player) {
        super(player)
        this.shipName = 'Submarine'
        this.size = 3
    }
}

class Destroyer extends Ship {
    constructor(player) {
        super(player)
        this.shipName = 'Destroyer'
        this.size = 3
    }
}

class Battleship extends Ship {
    constructor(player) {
        super(player)
        this.shipName = 'Battleship'
        this.size = 4
    }
}

class Carrier extends Ship {
    constructor(player) {
        super(player)
        this.shipName = 'Carrier'
        this.size = 5
    }
}

module.exports =  { Ship, PatrolBoat, Submarine, Destroyer, Battleship, Carrier, GameBoard}
