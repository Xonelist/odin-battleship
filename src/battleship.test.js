const {Ship, PatrolBoat, Submarine, Destroyer, Battleship, Carrier, GameBoard,Player, ComputerAI} = require('./battleship');


//Ship class Test
    test('Scout name Patrol Boat', ()=> {
        const scout = new PatrolBoat(1);
        expect(scout.shipName).toBe('Patrol Boat')
    });

    test('Ship have size', ()=> {
        const ship = new Submarine('St John');
        expect(ship.size).toBe(3)
    });

    test('Ship can get hit', ()=> {
        const ship = new Carrier('St John');
        expect(ship.hit()).toBe('St John\'s Carrier got hit')
    });

    test('Ship is sunk?', ()=> {
        const ship = new Carrier('St John');
        expect(ship.isSunk()).toBe(false)
    });

//Board class Test
test('There is a ship at 0, 0', ()=> {
    const cordinate = `0, 0`
    const board = new GameBoard()
    board.addShip('P', 0, 0);
    expect(board.board[cordinate].shipName).toBe('Patrol Boat')
});

test('Incoming attack on 0, 0 location (Hit)', ()=> {
    const board = new GameBoard()
    board.addShip('P', 0, 0, 'St John');
    expect(board.receiveAttack(0, 0)).toBe('St John\'s Patrol Boat got hit');
});

test('Ship got hit twice in same location (total hit = 1)', ()=> {
    const board = new GameBoard()
    const ship = board.addShip('P', 0, 0);
    board.receiveAttack(0, 0);
    board.receiveAttack(0, 0);
    expect(ship.totalHit).toBe(1);
});

test('Incoming attack on 0, 1 location (miss)', ()=> {
    const board = new GameBoard()
    board.addShip('P', 0, 0);
    expect(board.receiveAttack(0, 1)).toBe(false);
});

test('is All Ship in board sunk? (false)', ()=> {
    const board = new GameBoard()
    board.addShip('P', 0, 0);
    expect(board.isAllShipSunk()).toBe(false);
});

test('is All Ship in board sunk? (true)', ()=> {
    const board = new GameBoard()
    board.addShip('P', 0, 0);
    board.receiveAttack(0, 0);
    board.receiveAttack(1, 0);
    expect(board.isAllShipSunk()).toBe(true);
});

//Battle Test
test('Computer Patrol Boat got hit by Player at 4, 5? (true)', ()=> {
    const player = new Player('Player1')
    const computer = new ComputerAI('Computer')
    computer.init();
    expect(player.attack(computer, 5, 4)).toBe('Computer\'s Patrol Boat got hit');
});