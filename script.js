let availableSquares;
const gameboard = ((availableSquares) => {
    
    let gameBoardArray = ['1A', '1B', '1C', '2A', '2B', '2C', '3A', '3B', '3C'] //numb = row, letter = column
    
    if (availableSquares != null) {
        return gameBoardArray = availableSquares
    }

    console.log(availableSquares)
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
        
        //change gameBoardArray value based on which button was clicked
        let index = gameBoardArray.indexOf(buttonID);
        if (index !== -1) {
            gameBoardArray.splice(index, 1);
        } 

        //add an 'X' on to the button that's clicked
        squareSelection.innerText = 'X';

        //func to randomly select a square for computerSelection
        function getRandomValue(arr) {
            const randomIndex = Math.floor(Math.random() * arr.length);
            return arr[randomIndex];
        }
        
        const computerSelection = getRandomValue(gameBoardArray);        

        //update squareSelection inner text with an 'O' for the computerSelection
        let computerSquare = document.getElementById(computerSelection)
        
        setTimeout(function() {
            computerSquare.innerText = 'O';
        }, 1000); // 1000 milliseconds = 1 second
        
        //run the func to change the gameBoardArray value again after this
        let indexComp = gameBoardArray.indexOf(computerSelection);
        if (indexComp !== -1) {
            gameBoardArray.splice(indexComp, 1);
        } 
        console.log(gameBoardArray);

        availableSquares = gameBoardArray
        return availableSquares, squareSelection, computerSelection
    });

 //   return {availableSquares, squareSelection, computerSelection}
//})(gameBoardArray);



//figure out proper connection between eventlistenter and const gameboard. rn gameboard seems mostly redundant

//make game end once someboday gets 3 in a row, display message with this (figure out how reseting the game is going to
//work so that it's not only a refresh, or maybe it should be?)

//make game end once all squares are filled, display message with this

//make a button to start/restart the game

//Clean up the interface to allow players to put in their names, 