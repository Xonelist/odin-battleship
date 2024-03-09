//active player board rendering (own ship visible on own board and attack visible on oppenent board)
function renderBoard(activePlayer, oppenentPlayer, remove = false) {
    //add or rmv player's cellXY class
    const add = function(id, className, tablePlayer) {
        tablePlayer.querySelector(id).classList.add(`${className}`)
    }

    const rmv = function(id, className, tablePlayer) {
        tablePlayer.querySelector(id).classList.remove(`${className}`)
    }

    //call default is add, if remove is true call will use rmv function
    let call = add
    if(remove) {
        call = rmv
    }

    let activePlayerBoard = activePlayer.getBoard();
    let activePlayerAttackLog = activePlayer.getLog();
    let oppenentPlayerAttackLog = oppenentPlayer.getLog();

    const tableActivePlayer = document.querySelector(`table#${activePlayer.name}`)
    const tableOppenentPlayer = document.querySelector(`table#${oppenentPlayer.name}`)

    Object.keys(activePlayerBoard).forEach((key) => {
        call(`#c${key}`, 'ship', tableActivePlayer)
    })

    Object.keys(activePlayerAttackLog).forEach((key) => {
        call(`#c${key}`, 'attacked', tableOppenentPlayer)
    })
    Object.keys(oppenentPlayerAttackLog).forEach((key) => {
        call(`#c${key}`, 'crossed', tableActivePlayer)
    })

    return true;
}

module.exports = {renderBoard}