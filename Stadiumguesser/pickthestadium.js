const stadiums = [
  { name:"Camp Nou", img:"images/stadiums/campnou.jpg" },
  { name:"Anfield", img:"images/stadiums/anfield.jpg" },
  { name:"Old Trafford", img:"images/stadiums/oldtrafford.jpg" },
  { name:"Santiago Bernabéu", img:"images/stadiums/bernabeu.jpg" },
  { name:"Allianz Arena", img:"images/stadiums/allianz.jpg" },
  { name:"San Siro", img:"images/stadiums/sansiro.jpg" },
  { name:"Stamford Bridge", img:"images/stadiums/stamfordbridge.jpg" },
  { name:"Stade Velodrome", img:"images/stadiums/stadevelodrome.jpg" },
  { name:"Signal Iduna", img:"images/stadiums/signaliduna.jpg" },
  { name:"Diego Maradona", img:"images/stadiums/diegomaradona.jpg" },
  { name:"Parc Princess", img:"images/stadiums/parcprincess.jpg" }
];

let rounds = 5;  // total rounds
let currentRound = 0;
let score = 0;
let allRounds = [];  // stores stadiums for each round
let correctStadium = "";

// shuffle array helper
function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function startGame() {
  score = 0;
  currentRound = 0;
  document.getElementById('scoreDisplay').textContent = `Score: ${score}`;
  document.getElementById('feedback').textContent = '';

  // shuffle all stadiums once
  const shuffled = shuffleArray([...stadiums]);

  // split into rounds of 3 stadiums each
  allRounds = [];
  for (let i = 0; i < rounds; i++) {
    allRounds.push(shuffled.slice(i*3, i*3 + 3));
  }

  nextRound();
}

function nextRound() {
  if(currentRound >= rounds) {
    document.getElementById('roundContainer').innerHTML = `<h3>Game over! Your score: ${score}/${rounds}</h3>`;
    document.getElementById('feedback').textContent = '';
    return;
  }

  const roundStadiums = allRounds[currentRound];
  correctStadium = roundStadiums[Math.floor(Math.random()*roundStadiums.length)].name;

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

function checkAnswer(selected) {
  if(selected === correctStadium) {
    score++;
    document.getElementById('feedback').textContent = `✅ Correct! It was ${correctStadium}`;
  } else {
    document.getElementById('feedback').textContent = `❌ Wrong! It was ${correctStadium}`;
  }
  document.getElementById('scoreDisplay').textContent = `Score: ${score}`;
  setTimeout(nextRound, 1000);
}

// start game immediately
startGame();

