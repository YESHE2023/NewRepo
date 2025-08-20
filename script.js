document.addEventListener('DOMContentLoaded', () => {
    const choices = document.querySelectorAll('.choice-btn');
    const playerChoiceText = document.getElementById('player-choice-text');
    const computerChoiceText = document.getElementById('computer-choice-text');
    const resultText = document.getElementById('result-text');
    const resetBtn = document.getElementById('reset-btn');

    const options = ['piedra', 'papel', 'tijera'];

    function getComputerChoice() {
        const randomIndex = Math.floor(Math.random() * options.length);
        return options[randomIndex];
    }

    function determineWinner(playerChoice, computerChoice) {
        if (playerChoice === computerChoice) {
            return '¡Es un empate!';
        }
        if (
            (playerChoice === 'piedra' && computerChoice === 'tijera') ||
            (playerChoice === 'papel' && computerChoice === 'piedra') ||
            (playerChoice === 'tijera' && computerChoice === 'papel')
        ) {
            return '¡Ganaste!';
        } else {
            return 'Yo gané... ¡pero tú eres la mejor!';
        }
    }

    function playGame(playerChoice) {
        const computerChoice = getComputerChoice();

        playerChoiceText.textContent = `Tú elegiste: ${playerChoice}`;
        computerChoiceText.textContent = `Yo elegí: ${computerChoice}`;

        const result = determineWinner(playerChoice, computerChoice);
        resultText.textContent = result;
    }

    choices.forEach(button => {
        button.addEventListener('click', (e) => {
            const playerChoice = e.currentTarget.id;
            playGame(playerChoice);
        });
    });

    resetBtn.addEventListener('click', () => {
        playerChoiceText.textContent = 'Tú elegiste:';
        computerChoiceText.textContent = 'Yo elegí:';
        resultText.textContent = '¡Elige tu movimiento!';
    });
});
