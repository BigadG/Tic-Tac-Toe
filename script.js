const elems = {
    gameBoardDiv: document.querySelector('.game-board'),
    squares: document.querySelectorAll('.squares'),
    popup: document.querySelector('.popup'),
    restart: document.querySelector('.restart'),
    gameStatus: document.querySelector('.game-status'),
    xButton: document.querySelector('.x'),
    yourScoreDisplay: document.querySelector('.user-score'),
    compScoreDisplay: document.querySelector('.comp-score')
};

const Gameboard = (() => {
    let gameBoardArray = ['1A', '1B', '1C', '2A', '2B', '2C', '3A', '3B', '3C'];
    let xArray = [];
    let oArray = [];
    let winnerInvoked = false;
    let loserInvoked = false;
    let yourScore = 0;
    let compScore = 0;

    function getRandomValue(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function displayPopup(message, bgColor, txtColor) {
        elems.popup.style.display = 'block';
        elems.popup.style.backgroundColor = bgColor;
        elems.popup.style.color = txtColor;
        elems.gameStatus.innerHTML = message;
    }

    function updateArray(array, id) {
        const index = gameBoardArray.indexOf(id);
        if (index !== -1) {
            array.push(gameBoardArray.splice(index, 1)[0]);
        }
    }

    function checkForRepeatingCharacters(items) {
        let charCount = new Map();
        for (let char of items.join('')) {
            charCount.set(char, (charCount.get(char) || 0) + 1);
        }
        for (let count of charCount.values()) {
            if (count >= 3) return true;
        }
        return false;
    }

    function checkForDiagonal(items) {
        return (
            items.includes('1A') && items.includes('2B') && items.includes('3C') ||
            items.includes('1C') && items.includes('2B') && items.includes('3A')
        );
    }

    function updateScore() {
        elems.yourScoreDisplay.innerHTML = yourScore;
        elems.compScoreDisplay.innerHTML = compScore;
    }

    function handleSquareClick(event) {
        if (winnerInvoked || loserInvoked) return;

        const squareSelection = event.target.closest("button");
        if (!squareSelection || !elems.gameBoardDiv.contains(squareSelection) || squareSelection.innerText.trim() !== "") return;

        updateArray(xArray, squareSelection.id);
        if (squareSelection.innerText !== 'O') {
            squareSelection.innerText = 'X';
        }

        if (gameBoardArray.length === 0 && !winnerInvoked && !loserInvoked) {
            displayPopup("It's a tie!", 'darkgray', 'black');
        }

        if (checkForRepeatingCharacters(xArray) || checkForDiagonal(xArray)) {
            winnerInvoked = true;
            displayPopup('You won the game!', 'green', 'green');
            yourScore++;
            updateScore();
            return;
        }

        setTimeout(() => {
            let computerSelection;
            if (gameBoardArray.length > 0) {
                computerSelection = getRandomValue(gameBoardArray);
                document.getElementById(computerSelection).innerText = 'O';
                updateArray(oArray, computerSelection);
            }

            if (checkForRepeatingCharacters(oArray) || checkForDiagonal(oArray)) {
                loserInvoked = true;
                displayPopup('You lost the game!', 'darkred', 'darkred');
                compScore++;
                updateScore();
                return;
            }

        }, 250);
        
    }

    function gameReset() {
        xArray = [];
        oArray = [];
        gameBoardArray = ['1A', '1B', '1C', '2A', '2B', '2C', '3A', '3B', '3C'];
        elems.squares.forEach(square => square.innerText = '');
        winnerInvoked = false;
        loserInvoked = false;
        elems.popup.style.display = 'none'; // Hide the popup when game is reset
    }

    elems.xButton.addEventListener('click', () => {
        elems.popup.style.display = 'none';
    });

    elems.restart.addEventListener('click', gameReset);

    return { handleSquareClick };
})();

elems.gameBoardDiv.addEventListener('click', Gameboard.handleSquareClick);
