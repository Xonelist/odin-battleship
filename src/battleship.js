class Board {
    constructor() {

    }
}

class Player {
    constructor(name) {
        this.name = name;
        this.collection = [];
        this.board = null;
    }

    addShip(type, x, y, face) {
        let ship = null;
        switch (type) {
            case 'P':
                ship = new PatrolBoat(this.name)
                break;
            
            case 'S':
                ship = new Submarine(this.name)
                break;

            case 'D':
                ship = new Destroyer(this.name)
                break;
            
            case 'B':
                ship = new Battleship(this.name)
                break;
            
            case 'C':
                ship = new Carrier(this.name)
                break;    
            default:
                return 'your type input is false';
        }
        console.log(ship)
        this.collection.push(ship)
        return this.collection
    }

    setCollection () {

    }

}

class Ship {
    constructor(player) {
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
            return `${this.player}'s ${this.shipName} is sunk`
        } else {
            return `${this.totalHit} / ${this.size} hits till ${this.player}'s ${this.shipName} sinking`
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

module.exports =  { Ship, PatrolBoat, Submarine, Destroyer, Battleship, Carrier, Player }
