let availableSquares;
const gameboard = ((availableSquares) => {
    
    let gameBoardArray = ['1A', '1B', '1C', '2A', '2B', '2C', '3A', '3B', '3C'] //numb = row, letter = column
    
    if (availableSquares != null) {
        return gameBoardArray = availableSquares
    }

    return {gameBoardArray}
    //if the process of feeding gameBoardArray back and forth between gameboard and flowOfGame, try returning a diff
    //name from gameboard, and recieving that same name into flowOfGame
})(availableSquares);

const player = (userName, squareSelection) => {
    const playerName = `Name: ${userName}`
    return {playerName, squareSelection}
};

let gameBoardArray = gameboard.gameBoardArray

const squares = document.querySelector('.squares');
const gameBoardDiv = document.querySelector('.game-board');


//const flowOfGame = ((gameBoardArray) => {

        //assign a square title to each square (ex. 1A, 1B, etc.)
    gameBoardDiv.addEventListener('click', event => {
        let squareSelection = event.target.closest("button");

        if (!squareSelection || !gameBoardDiv.contains(squareSelection)) return;

        let buttonID = squareSelection.id;
        
        //add func to change gameBoardArray value based on which button was clicked
        let index = gameBoardArray.indexOf(buttonID);
        if (index !== -1) {
            gameBoardArray.splice(index, 1);
        }
            
        console.log(gameBoardArray);
    });



        //add func to toggle an 'X' on to the button that's clicked
        //add func to randomly select a square for computerSelection
        //run the func to change the gameBoardArray value again after this

 //   return {availableSquares, squareSelection, computerSelection}
//})(gameBoardArray);