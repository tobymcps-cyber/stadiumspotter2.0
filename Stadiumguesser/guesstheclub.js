const clubs = [
  { name:"FC Barcelona", country:"Spain", founded:1899, manager:"Xavi", player:"Lewandowski", badge:"Blue & Red" },
  { name:"Real Madrid", country:"Spain", founded:1902, manager:"Carlo Ancelotti", player:"Vinícius Jr.", badge:"White" },
  { name:"Manchester United", country:"England", founded:1878, manager:"Erik ten Hag", player:"Marcus Rashford", badge:"Red" },
  { name:"AC Milan", country:"Italy", founded:1899, manager:"Stefano Pioli", player:"Olivier Giroud", badge:"Red & Black" }
];

let currentClub, clueStep, chances;

function startClubGame() {
    restartClubGame();
}

function restartClubGame() {
    currentClub = clubs[Math.floor(Math.random()*clubs.length)];
    clueStep = 0;
    chances = 5;
    document.getElementById('clubInput').value = '';
    document.getElementById('clubClue').textContent = '';
    document.getElementById('clubResult').textContent = '';
    document.getElementById('clubChances').textContent = `Chances left: ${chances}`;
    document.getElementById('clubRestart').style.display = 'none';
}

function checkClub() {
    const guess = document.getElementById('clubInput').value.trim().toLowerCase();
    const correct = currentClub.name.toLowerCase();

    if(correct.includes(guess) || guess.includes(correct) || similarity(guess, correct) > 0.7) {
        document.getElementById('clubResult').textContent = `✅ Correct! It was ${currentClub.name}`;
        document.getElementById('clubClue').textContent = '';
        document.getElementById('clubChances').textContent = '';
        document.getElementById('clubRestart').style.display = 'inline-block';
    } else {
        chances--;
        document.getElementById('clubChances').textContent = `Chances left: ${chances}`;
        giveClue();
    }
}

function giveClue() {
    const clues = [
        `Clue: Country is ${currentClub.country}`,
        `Clue: Founded in ${currentClub.founded}`,
        `Clue: Manager is ${currentClub.manager}`,
        `Clue: Star player is ${currentClub.player}`,
        `Clue: Badge colour is ${currentClub.badge}`
    ];

    if(clueStep < clues.length && chances > 0) {
        document.getElementById('clubClue').textContent = clues[clueStep];
        clueStep++;
    } else {
        document.getElementById('clubResult').textContent = `❌ Out of clues! The answer was ${currentClub.name}`;
        document.getElementById('clubClue').textContent = '';
        document.getElementById('clubChances').textContent = '';
        document.getElementById('clubRestart').style.display = 'inline-block';
    }
}

function similarity(a, b) {
    const s1 = new Set(a.split(''));
    const s2 = new Set(b.split(''));
    const inter = [...s1].filter(x => s2.has(x)).length;
    return inter / Math.max(s1.size, s2.size);
}

window.onload = startClubGame;
