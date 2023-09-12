let availableSquares;
const Gameboard = ((availableSquares) => {
    let gameBoardArray
    if (availableSquares != null) {
        return gameBoardArray = availableSquares
    }
    else {
        return gameBoardArray = ['1A', '1B', '1C', '2A', '2B', '2C', '3A', '3B', '3C'] //numb = row, letter = column
    }
})(availableSquares);

const Player = (playerName, squareSelection) => {

};

const FlowOfGame = ((gameBoardArray) => {
    
})();