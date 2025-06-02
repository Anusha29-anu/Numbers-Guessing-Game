document.addEventListener('DOMContentLoaded', () => {
    const guessInput = document.getElementById('guessInput');
    const submitGuessButton = document.getElementById('submitGuessButton');
    const feedbackMessage = document.getElementById('feedbackMessage');
    const attemptsLeftDisplay = document.getElementById('attemptsLeft');
    const newGameButton = document.getElementById('newGameButton');

    let targetNumber;
    let attemptsRemaining;
    const maxAttempts = 10;

    function startGame() {
        targetNumber = Math.floor(Math.random() * 100) + 1;
        attemptsRemaining = maxAttempts;

        attemptsLeftDisplay.textContent = attemptsRemaining;
        feedbackMessage.textContent = '';
        feedbackMessage.className = 'feedback'; // Reset class
        guessInput.value = '';
        guessInput.disabled = false;
        submitGuessButton.disabled = false;
        newGameButton.style.display = 'none';
        guessInput.focus();
        // console.log(`New game started. Target: ${targetNumber}`); // For debugging
    }

    function handleGuess() {
        const userGuess = parseInt(guessInput.value);

        if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
            feedbackMessage.textContent = 'Please enter a valid number between 1 and 100.';
            feedbackMessage.className = 'feedback incorrect';
            guessInput.value = '';
            guessInput.focus();
            return;
        }

        attemptsRemaining--;
        attemptsLeftDisplay.textContent = attemptsRemaining;

        if (userGuess === targetNumber) {
            feedbackMessage.textContent = `Congratulations! You guessed the number ${targetNumber}!`;
            feedbackMessage.className = 'feedback correct';
            endGame(true);
        } else if (attemptsRemaining === 0) {
            feedbackMessage.textContent = `Game Over! The number was ${targetNumber}. Better luck next time!`;
            feedbackMessage.className = 'feedback incorrect';
            endGame(false);
        } else if (userGuess < targetNumber) {
            feedbackMessage.textContent = 'Too Low! Try again.';
            feedbackMessage.className = 'feedback info';
        } else {
            feedbackMessage.textContent = 'Too High! Try again.';
            feedbackMessage.className = 'feedback info';
        }
        guessInput.value = '';
        guessInput.focus();
    }

    function endGame(isWin) {
        guessInput.disabled = true;
        submitGuessButton.disabled = true;
        newGameButton.style.display = 'block';
    }

    submitGuessButton.addEventListener('click', handleGuess);
    guessInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            handleGuess();
        }
    });
    newGameButton.addEventListener('click', startGame);

    // Initialize the first game
    startGame();
});