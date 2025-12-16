// Categorize stadiums based on difficulty levels
const stadiums = {
  easy: [
    { name: "Camp Nou", img: "images/stadiums/campnou.jpg" },
    { name: "Anfield", img: "images/stadiums/anfield.jpg" },
    { name: "Old Trafford", img: "images/stadiums/oldtrafford.jpg" },
    { name: "Santiago Bernabéu", img: "images/stadiums/bernabeu.jpg" },
    { name: "Allianz Arena", img: "images/stadiums/allianz.jpg" },
    { name: "San Siro", img: "images/stadiums/sansiro.jpg" },
    { name: "Stamford Bridge", img: "images/stadiums/stamfordbridge.jpg" },
    { name: "Signal Iduna", img: "images/stadiums/signaliduna.jpg" },
    { name: "Parc Princess", img: "images/stadiums/parcprincess.jpg" }
  ],
  medium: [
    { name: "Stade Velodrome", img: "images/stadiums/stadevelodrome.jpg" },
    { name: "Diego Maradona", img: "images/stadiums/diegomaradona.jpg" },
    { name: "Tottenham Hotspur Stadium", img: "images/stadiums/tottenham.jpg" },
    { name: "Metropolitano", img: "images/stadiums/metropolitano.jpg" },
    { name: "Estádio da Luz", img: "images/stadiums/daluz.jpg" },
    { name: "Estádio do Dragão", img: "images/stadiums/dragao.jpg" },
    { name: "Celtic Park", img: "images/stadiums/celticpark.jpg" },
    { name: "Ibrox Stadium", img: "images/stadiums/ibrox.jpg" }
  ],
  hard: [
    { name: "Luzhniki Stadium", img: "images/stadiums/luzhniki.jpg" },
    { name: "Millennium Stadium", img: "images/stadiums/millennium.jpg" },
    { name: "Cotton Bowl", img: "images/stadiums/cottonbowl.jpg" },
    { name: "Azteca Stadium", img: "images/stadiums/azteca.jpg" },
    { name: "Bukit Jalil National Stadium", img: "images/stadiums/bukitjalil.jpg" },
    { name: "Rose Bowl", img: "images/stadiums/rosebowl.jpg" },
    { name: "Khalifa International Stadium", img: "images/stadiums/khalifa.jpg" },
    { name: "King Fahd International Stadium", img: "images/stadiums/kingfahd.jpg" },
    { name: "BMO Field", img: "images/stadiums/bmo.jpg" },
    { name: "Camping World Stadium", img: "images/stadiums/campingworld.jpg" }
  ]
};

// Global variables
let rounds = 5; // Default rounds for Medium
let currentRound = 0;
let score = 0;
let allRounds = [];
let correctStadium = "";
let stadiumsToUse = stadiums.medium; // Default difficulty is Medium

// Shuffle array helper
function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

// Set Difficulty (Easy, Medium, Hard)
function setDifficulty(level) {
  if (level === 'easy') {
    rounds = 5; // Easy level: 5 rounds
    allRounds = shuffleArray(stadiums.easy); // Randomize easy stadiums
  } else if (level === 'medium') {
    rounds = 7; // Medium level: 7 rounds
    allRounds = shuffleArray(stadiums.medium); // Randomize medium stadiums
  } else if (level === 'hard') {
    rounds = 10; // Hard level: 10 rounds
    allRounds = shuffleArray(stadiums.hard); // Randomize hard stadiums
  }
  startGame();
}


// Start game
function startGame() {
  score = 0;
  currentRound = 0;
  document.getElementById('scoreDisplay').textContent = `Score: ${score}`;
  document.getElementById('feedback').textContent = '';

  // Shuffle the selected stadiums for the chosen difficulty
  const shuffled = shuffleArray([...stadiumsToUse]);

  // Split into rounds of 3 stadiums each
  allRounds = [];
  for (let i = 0; i < rounds; i++) {
    allRounds.push(shuffled.slice(i * 3, i * 3 + 3));
  }

  nextRound();
}

// Proceed to the next round
function nextRound() {
  if (currentRound >= rounds) {
    document.getElementById('roundContainer').innerHTML = `<h3>Game over! Your score: ${score}/${rounds}</h3>`;
    document.getElementById('feedback').textContent = '';
    return;
  }

  const roundStadiums = allRounds[currentRound];
  correctStadium = roundStadiums[Math.floor(Math.random() * roundStadiums.length)].name;

  let html = `<h3>Round ${currentRound + 1}: Click on ${correctStadium}</h3>`;
  html += `<div class="images-row">`;
  roundStadiums.forEach(stadium => {
    html += `<img src="${stadium.img}" alt="${stadium.name}" onclick="checkAnswer('${stadium.name}')">`;
  });
  html += `</div>`;
  document.getElementById('roundContainer').innerHTML = html;
  document.getElementById('feedback').textContent = '';

  currentRound++;
}

// Check answer
function checkAnswer(selected) {
  if (selected === correctStadium) {
    score++;
    document.getElementById('feedback').textContent = `✅ Correct! It was ${correctStadium}`;
  } else {
    document.getElementById('feedback').textContent = `❌ Wrong! It was ${correctStadium}`;
  }
  document.getElementById('scoreDisplay').textContent = `Score: ${score}`;
  setTimeout(nextRound, 1000);
}

// Start game immediately with default difficulty (medium)
startGame();
