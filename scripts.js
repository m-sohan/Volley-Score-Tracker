let scoreA = 0;
let scoreB = 0;
let logList = [];
let teamAName = "";
let teamBName = "";
let teamAPlayers = [];
let teamBPlayers = [];

document.getElementById('detailsForm').addEventListener('submit', function(event) {
    event.preventDefault();
    startGame();
});

function startGame() {
    teamAName = document.getElementById('teamA').value;
    teamBName = document.getElementById('teamB').value;
    document.getElementById('teamA-name').innerText = teamAName;
    document.getElementById('teamB-name').innerText = teamBName;

    teamAPlayers = Array.from(document.querySelectorAll('#playersA input')).map(input => input.value);
    teamBPlayers = Array.from(document.querySelectorAll('#playersB input')).map(input => input.value);

    const playerASelect = document.getElementById('playerA');
    playerASelect.innerHTML = ''; // Clear existing options
    teamAPlayers.forEach(player => {
        const option = document.createElement('option');
        option.value = player;
        option.innerText = player;
        playerASelect.appendChild(option);
    });

    const playerBSelect = document.getElementById('playerB');
    playerBSelect.innerHTML = ''; // Clear existing options
    teamBPlayers.forEach(player => {
        const option = document.createElement('option');
        option.value = player;
        option.innerText = player;
        playerBSelect.appendChild(option);
    });

    document.getElementById('team-form').style.display = 'none';
    document.getElementById('score-tracker').style.display = 'block';
}

function addPoint(team, reason) {
    let player, opponentPlayer, logMessage;
    
    if (team === 'A') {
        if (reason === 'FL') {
            scoreB++;
            opponentPlayer = document.getElementById('playerA').value;
            logMessage = `Team B scores by foul of player: ${opponentPlayer}`;
        } else {
            scoreA++;
            player = document.getElementById('playerA').value;
            logMessage = `Team A scores by ${reason} - player: ${player}`;
        }
    } else if (team === 'B') {
        if (reason === 'FL') {
            scoreA++;
            opponentPlayer = document.getElementById('playerB').value;
            logMessage = `Team A scores by foul of player: ${opponentPlayer}`;
        } else {
            scoreB++;
            player = document.getElementById('playerB').value;
            logMessage = `Team B scores by ${reason} - player: ${player}`;
        }
    }

    document.getElementById('scoreA').innerText = scoreA;
    document.getElementById('scoreB').innerText = scoreB;

    logList.push(logMessage);
    updateLog();

    if (scoreA >= 25 || scoreB >= 25) {
        endGame();
    }
}

function updateLog() {
    const logElement = document.getElementById('logList');
    logElement.innerHTML = '';
    logList.forEach(log => {
        const li = document.createElement('li');
        li.innerText = log;
        logElement.appendChild(li);
    });
}

function endGame() {
    const resultSection = document.getElementById('result');
    const winnerElement = document.getElementById('winner');
    let winner;

    if (scoreA >= 25) {
        winner = `${teamAName} wins!`;
    } else if (scoreB >= 25) {
        winner = `${teamBName} wins!`;
    }

    winnerElement.innerText = `${winner}\nFinal Score: ${scoreA} - ${scoreB}`;
    resultSection.style.display = 'block';

    setTimeout(resetGame, 5000); // Show result for 5 seconds before resetting
}

function resetGame() {
    scoreA = 0;
    scoreB = 0;
    logList = [];

    document.getElementById('scoreA').innerText = scoreA;
    document.getElementById('scoreB').innerText = scoreB;

    document.getElementById('logList').innerHTML = '';

    document.getElementById('team-form').style.display = 'block';
    document.getElementById('score-tracker').style.display = 'none';
    document.getElementById('result').style.display = 'none';
}
