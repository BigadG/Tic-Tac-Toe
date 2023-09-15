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

    let xArray = [];
    let oArray = [];


    function handleSquareClick(event) {
        let squareSelection = event.target.closest("button");

        if (!squareSelection || !gameBoardDiv.contains(squareSelection)) return;

        let buttonID = squareSelection.id;

        //add selected squares to xArray and remove them from gameBoardArray
        let index = gameBoardArray.indexOf(buttonID);
        if (index !== -1) {
            let splicedItems = gameBoardArray.splice(index, 1);
            xArray.push(...splicedItems);
        } 

        squareSelection.innerText = 'X';
        
        const computerSelection = getRandomValue(gameBoardArray);        
        let computerSquare = document.getElementById(computerSelection);
        
        setTimeout(function() {
            computerSquare.innerText = 'O';
        }, 1000);

        let indexComp = gameBoardArray.indexOf(computerSelection);
        if (indexComp !== -1) {
            let splicedComp = gameBoardArray.splice(indexComp, 1);
            oArray.push(...splicedComp);        } 


        console.log(`xArray: ${xArray}`)
        console.log(`oArray: ${oArray}`)
        console.log(`gameBoardArray: ${gameBoardArray}`)


        return { availableSquares: gameBoardArray, squareSelection, computerSelection };
    }

    return { player, handleSquareClick };
})();

const gameBoardDiv = document.querySelector('.game-board');
gameBoardDiv.addEventListener('click', Gameboard.handleSquareClick);



//make game end once someboday gets 3 in a row. Display message with this. Steps:
// --find pattern in array--Maybe: if 3 array items contain same letter or number, game ends. For diagonal: if the specific
//pattern of [1A, 2B, 3C] or [1C, 2B. 3A] exists, game ends
// -- Then worry about popup and game reset process (through page reload or other method)

//make game end once all squares are filled, display message with this

//make a button to start/restart the game

//Clean up the interface to allow players to put in their names, use 'player' fact func for this