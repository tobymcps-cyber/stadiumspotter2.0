// ---------------- Stadium Guesser ----------------
const stadiums = [
  { name:"Camp Nou", lat:41.3809, lng:2.1228 },
  { name:"Santiago Bernabéu", lat:40.4531, lng:-3.6883 },
  { name:"Allianz Arena", lat:48.2188, lng:11.6247 },
  { name:"Anfield", lat:53.4308, lng:-2.9608 },
  { name:"Old Trafford", lat:53.4631, lng:-2.2913 },
  { name:"San Siro", lat:45.4781, lng:9.1247 },
  { name:"Wembley Stadium", lat:51.5560, lng:-0.2796 },
  { name:"Parc des Princes", lat:48.8414, lng:2.2530 },
  { name:"Signal Iduna Park", lat:51.4925, lng:7.4519 },
  { name:"Stade Vélodrome", lat:43.2699, lng:5.3955 },
  { name:"Estádio da Luz", lat:38.7528, lng:-9.1847 },
  { name:"Estádio do Dragão", lat:41.1621, lng:-8.5856 },
  { name:"Celtic Park", lat:55.8497, lng:-4.2055 },
  { name:"Emirates Stadium", lat:51.5549, lng:-0.1084 },
  { name:"Tottenham Hotspur Stadium", lat:51.6043, lng:-0.0664 },
  { name:"Stadio Olimpico", lat:41.9339, lng:12.4546 },
  { name:"Volksparkstadion", lat:53.5872, lng:9.8986 },
  { name:"Philips Stadion", lat:51.4416, lng:5.4677 },
  { name:"Amsterdam Arena", lat:52.3142, lng:4.9414 },
  { name:"Stuttgart Arena", lat:48.7921, lng:9.2319 }
];

let shuffledStadiums, current, score;
let map, marker, correctMarker, polyline;

function startGame() {
  document.getElementById('welcome').style.display = 'none';
  document.getElementById('clubGame').style.display = 'none';
  document.getElementById('game').style.display = 'block';
  document.getElementById('map').style.display = 'block';

  map = L.map('map').setView([54,15],4);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);

  restartGame();
}

function restartGame() {
  shuffledStadiums = [...stadiums].sort(() => Math.random() - 0.5);
  current = 0; score = 0;

  document.getElementById('stadiumName').style.display = 'block';
  document.getElementById('map').style.display = 'block';
  document.getElementById('restartBtn').style.display = 'none';
  document.getElementById('score').textContent = `Score: ${score}`;

  loadStadium();
}

function loadStadium() {
  const stadium = shuffledStadiums[current];
  document.getElementById('stadiumName').textContent = `(${current+1}/${shuffledStadiums.length}) ${stadium.name}`;
  document.getElementById('result').textContent = '';
  document.getElementById('nextBtn').style.display = 'none';

  if(marker) map.removeLayer(marker);
  if(correctMarker) map.removeLayer(correctMarker);
  if(polyline) map.removeLayer(polyline);

  map.once('click', function(e) {
    const {lat, lng} = e.latlng;
    marker = L.marker([lat, lng]).addTo(map);

    const distance = getDistance(lat, lng, stadium.lat, stadium.lng);
    let resultText;

    if(distance < 50) {
      resultText = `✅ Correct! ${Math.round(distance)} km`;
      score++;
      document.getElementById('score').textContent = `Score: ${score}`;
    } else {
      resultText = `❌ ${Math.round(distance)} km`;
    }

    correctMarker = L.marker([stadium.lat, stadium.lng], { opacity: 0.7 }).addTo(map).bindPopup(`${stadium.name}`).openPopup();
    polyline = L.polyline([[lat, lng], [stadium.lat, stadium.lng]], { color: 'red' }).addTo(map);

    document.getElementById('result').textContent = resultText;
    document.getElementById('nextBtn').style.display = 'inline-block';
  });
}

function nextStadium() {
  current++;
  if(current < shuffledStadiums.length) {
    map.setView([54,15],4);
    loadStadium();
  } else {
    document.getElementById('stadiumName').style.display = 'none';
    document.getElementById('map').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'none';
    document.getElementById('result').textContent = `🎉 Game over! You scored ${score}/${shuffledStadiums.length}`;
    document.getElementById('restartBtn').style.display = 'inline-block';
  }
}

function goHome() {
  document.getElementById('game').style.display = 'none';
  document.getElementById('clubGame').style.display = 'none';
  document.getElementById('welcome').style.display = 'block';
  if(map) { map.remove(); map = null; }
}

function getDistance(lat1, lon1, lat2, lon2) {
  function deg2rad(deg) { return deg * (Math.PI/180); }
  const R = 6371;
  const dLat = deg2rad(lat2-lat1);
  const dLon = deg2rad(lon2-lon1);

  const a = Math.sin(dLat/2)**2 +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon/2)**2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}



// ---------------- Guess the Club ----------------
const clubs = [
  { name:"FC Barcelona", country:"Spain", founded:1899, manager:"Xavi", player:"Lewandowski", badge:"Blue & Red" },
  { name:"Real Madrid", country:"Spain", founded:1902, manager:"Carlo Ancelotti", player:"Vinícius Jr.", badge:"White" },
  { name:"Manchester United", country:"England", founded:1878, manager:"Erik ten Hag", player:"Marcus Rashford", badge:"Red" },
  { name:"AC Milan", country:"Italy", founded:1899, manager:"Stefano Pioli", player:"Olivier Giroud", badge:"Red & Black" },
  { name:"Bayern Munich", country:"Germany", founded:1900, manager:"Thomas Tuchel", player:"Harry Kane", badge:"Red & White" },
  { name:"Stuttgart", country:"Germany", founded:1893, manager:"Sebastian Hoeneß", player:"Angelo Stiller", badge:"White & Red" },
  { name:"Atletico Madrid", country:"Spain", founded:1903, manager:"Diego Simeone", player:"Koke", badge:"Red & White" },
  { name:"Atalanta BC", country:"Italy", founded:1907, manager:"Ivan Djuric", player:"Lookman", badge:"Blue & Black" },
  { name:"Marseille FC", country:"France", founded:1899, manager:"Roberto De Zerbi", player:"Greenwood", badge:"White & Blue" },
  { name:"Tottenham Hotspur", country:"England", founded:1882, manager:"Thomas Frank", player:"Solanke", badge:"Dark Blue & White" },
  { name:"AS Roma", country:"Italy", founded:1927, manager:"Gian Piero Gasperini", player:"Dybala", badge:"Red & Orange" }
];

let currentClub, clueStep;

function startClubGame() {
  document.getElementById('welcome').style.display = 'none';
  document.getElementById('game').style.display = 'none';
  document.getElementById('clubGame').style.display = 'block';
  restartClubGame();
}

function restartClubGame() {
  currentClub = clubs[Math.floor(Math.random()*clubs.length)];
  clueStep = 0;

  document.getElementById('clubInput').value = '';
  document.getElementById('clubClue').textContent = '';
  document.getElementById('clubResult').textContent = '';
  document.getElementById('clubRestart').style.display = 'none';
}

function checkClub() {
  const guess = document.getElementById('clubInput').value.trim().toLowerCase();
  const correct = currentClub.name.toLowerCase();

  if(correct.includes(guess) || guess.includes(correct) || similarity(guess, correct) > 0.7) {
    document.getElementById('clubResult').textContent = `✅ Correct! It was ${currentClub.name}`;
    document.getElementById('clubClue').textContent = '';
    document.getElementById('clubRestart').style.display = 'inline-block';
  } else {
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

  if(clueStep < clues.length) {
    document.getElementById('clubClue').textContent = clues[clueStep];
    clueStep++;
  } else {
    document.getElementById('clubResult').textContent = `❌ Out of clues! The answer was ${currentClub.name}`;
    document.getElementById('clubRestart').style.display = 'inline-block';
  }
}

function similarity(a, b) {
  const s1 = new Set(a.split(''));
  const s2 = new Set(b.split(''));
  const inter = [...s1].filter(x => s2.has(x)).length;
  return inter / Math.max(s1.size, s2.size);
}
