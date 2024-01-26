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

module.exports =  { Ship, PatrolBoat, Submarine, Destroyer, Battleship, Carrier }
