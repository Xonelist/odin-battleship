class GameBoard {
    constructor() {
        this.board = {};
        this.ships = Array();
        this.AttackedRecords = {}
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
        if(`${x}, ${y}` in this.AttackedRecords) return false;
        this.AttackedRecords[`${x}, ${y}`] = true;
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

module.exports =  { Ship, PatrolBoat, Submarine, Destroyer, Battleship, Carrier, GameBoard, Player, ComputerAI}
