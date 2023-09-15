const Gameboard = (() => {
    let gameBoardArray = ['1A', '1B', '1C', '2A', '2B', '2C', '3A', '3B', '3C']; //numb = row, letter = column

    const player = (userName, squareSelection) => {
        const playerName = `Name: ${userName}`;
        return { playerName, squareSelection };
    };

    function getRandomValue(arr) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    }

    function handleSquareClick(event) {
        let squareSelection = event.target.closest("button");

        if (!squareSelection || !gameBoardDiv.contains(squareSelection)) return;

        let buttonID = squareSelection.id;

        let index = gameBoardArray.indexOf(buttonID);
        if (index !== -1) {
            gameBoardArray.splice(index, 1);
        } 

        squareSelection.innerText = 'X';
        
        const computerSelection = getRandomValue(gameBoardArray);        
        let computerSquare = document.getElementById(computerSelection);
        
        setTimeout(function() {
            computerSquare.innerText = 'O';
        }, 1000);

        let indexComp = gameBoardArray.indexOf(computerSelection);
        if (indexComp !== -1) {
            gameBoardArray.splice(indexComp, 1);
        } 

        return { availableSquares: gameBoardArray, squareSelection, computerSelection };
    }

    return { player, handleSquareClick };
})();

const gameBoardDiv = document.querySelector('.game-board');
gameBoardDiv.addEventListener('click', Gameboard.handleSquareClick);




//figure out proper connection between eventlistenter and const gameboard. rn gameboard seems mostly redundant

//make game end once someboday gets 3 in a row, display message with this (figure out how reseting the game is going to
//work so that it's not only a refresh, or maybe it should be?)

//make game end once all squares are filled, display message with this

//make a button to start/restart the game

//Clean up the interface to allow players to put in their names, 