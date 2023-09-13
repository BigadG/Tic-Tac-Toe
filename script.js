let availableSquares;
const gameboard = ((availableSquares) => {
    let gameBoardArray
    if (availableSquares != null) {
        return gameBoardArray = availableSquares
    }
    else {
        return gameBoardArray = ['1A', '1B', '1C', '2A', '2B', '2C', '3A', '3B', '3C'] //numb = row, letter = column
    }
})(availableSquares);

const player = (userName, squareSelection) => {
    const playerName = `Name: ${userName}`
    return {playerName, squareSelection}
};

const squares = document.querySelector('.squares');

const flowOfGame = ((gameBoardArray) => {
    squares.addEventListener('click', event => {
        let btn = event.target.closest("button");
        
        if (!btn || !squares.contains(btn)) return;
    });
    
    return {availableSquares, squareSelection, computerSelection}
})();