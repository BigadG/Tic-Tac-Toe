const gameBoardDiv = document.querySelector('.game-board');
const squares = document.querySelectorAll('.squares');
const popup = document.querySelector('.popup');
const restart = document.querySelector('.restart');
const gameStatus = document.querySelector('.game-status');
const xButton = document.querySelector('.x');
const yourScoreDisplay = document.querySelector('.user-score');
const compScoreDisplay = document.querySelector('.comp-score');



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
            if (!winnerInvoked) {
            computerSquare.innerText = 'O';
            }
        }, 250); // 1000 milliseconds is equivalent to 1 second
        
        //add computer squares to oArray and remove them from gameBoardArray
        let indexComp = gameBoardArray.indexOf(computerSelection);
        if (indexComp !== -1) {
            let splicedComp = gameBoardArray.splice(indexComp, 1);
            oArray.push(...splicedComp);
        } 


        checkForRepeatingCharacters(xArray);
        checkForRepeatingCharacters(oArray);
        checkForDiagonal(xArray);
        checkForDiagonal(oArray);
        checkForTie(gameBoardArray);
        closePopup();


        return { availableSquares: gameBoardArray, squareSelection, computerSelection };
    }


    //replace this example func with the func for ending the game/announcing winner
    let winnerInvoked = false;
    let loserInvoked = false;
   
    function winnerFunction(char) {
        winnerInvoked = true;
        loserInvoked = true;
        
        setTimeout(() => {
            popup.style.display = 'block';
            popup.style.backgroundColor = "green";
            popup.style.color = "green";
            gameStatus.innerHTML = 'You won the game!'
        }, 500);
        
        addPoints();
        gameReset();
    }

    function loserFunction(char) {
        loserInvoked = true;
        
        setTimeout(() => {
            popup.style.display = 'block';
            popup.style.backgroundColor = "darkred";
            popup.style.color = "darkred";
            gameStatus.innerHTML = 'You lost the game!'
        }, 500); 
        
        addPoints();
        gameReset();
    }

    function tieFunction() {
        setTimeout(() => {
            popup.style.display = 'block';
            popup.style.backgroundColor = "darkgray";
            popup.style.color = "black";
            gameStatus.innerHTML = "It's a tie!"
        }, 500); 

        gameReset();
    }

    function closePopup() {
        xButton.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    }

    function checkForRepeatingCharacters(items) {
        // Create a Map to store character counts
        let charCount = new Map();

        // Flatten the array into a single string
        let flattened = items.join('');

        for (let char of flattened) {
            charCount.set(char, (charCount.get(char) || 0) + 1);
        }

        for (let [char, count] of charCount.entries()) {
            if (count >= 3 && items === xArray) {
                return winnerFunction(char);
            } else if (count >= 3 && items === oArray) {
                return loserFunction(char);
            }
        }
    }

    function checkForDiagonal(items) {
        const isDiagonal =
            (items.includes('1A') && items.includes('2B') && items.includes('3C')) ||
            (items.includes('1C') && items.includes('2B') && items.includes('3A'));
    
        if (isDiagonal) {
            if (items === xArray) {
                return winnerFunction();
            } else if (items === oArray) {
                return loserFunction();
            }
        }
    }


    function gameReset() {
        restart.addEventListener('click', () => {
            xArray = [];
            oArray = [];
            gameBoardArray = ['1A', '1B', '1C', '2A', '2B', '2C', '3A', '3B', '3C'];

            //change this so instead of after 3 seconds, it's after the win or loss popup is exited by user
            setTimeout(() => {
                squares.forEach(element => {
                    element.innerText = '';
                });

                winnerInvoked = false;
                loserInvoked = false;
            }, 500);

            //close popup
            popup.style.display = 'none';
        })
    }

    function checkForTie(gameBoardArray) {
        if (gameBoardArray.length === 0 && !winnerInvoked) {
            return tieFunction();
        } else return
    }

    let yourScore = 0;
    let compScore = 0;

    function addPoints() {
        if (winnerInvoked) {
            yourScore++
            return yourScoreDisplay.innerHTML = yourScore;
        } else if (loserInvoked) {
            compScore++
            return compScoreDisplay.innerHTML = compScore;
        } else return
    }



    return { player, handleSquareClick };
})();

gameBoardDiv.addEventListener('click', Gameboard.handleSquareClick);



//allow players to input their names?: use 'player' fact func for this

