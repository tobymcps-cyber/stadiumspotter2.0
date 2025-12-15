const clubs = [
  {
    name: "FC Barcelona",
    country: "Spain",
    founded: 1899,
    manager: "Xavi",
    player: "Lewandowski",
    badge: "Blue & Red",
    stadium: "Camp Nou",
    league: "La Liga"
  },
  {
    name: "Real Madrid",
    country: "Spain",
    founded: 1902,
    manager: "Carlo Ancelotti",
    player: "Vinícius Jr.",
    badge: "White",
    stadium: "Santiago Bernabéu",
    league: "La Liga"
  },
  {
    name: "Manchester United",
    country: "England",
    founded: 1878,
    manager: "Erik ten Hag",
    player: "Marcus Rashford",
    badge: "Red",
    stadium: "Old Trafford",
    league: "Premier League"
  },
  {
    name: "AC Milan",
    country: "Italy",
    founded: 1899,
    manager: "Stefano Pioli",
    player: "Olivier Giroud",
    badge: "Red & Black",
    stadium: "San Siro",
    league: "Serie A"
  },
  {
    name: "Stuttgart",
    country: "Germany",
    founded: 1893,
    manager: "Sebastian Hoeneß",
    player: "Angelo Stiller",
    badge: "White & Red",
    stadium: "MHPArena",
    league: "Bundesliga"
  },
  {
    name: "Atletico Madrid",
    country: "Spain",
    founded: 1903,
    manager: "Diego Simeone",
    player: "Koke",
    badge: "Red & White",
    stadium: "Cívitas Metropolitano",
    league: "La Liga"
  },
  {
    name: "Atalanta BC",
    country: "Italy",
    founded: 1907,
    manager: "Ivan Djuric",
    player: "Lookman",
    badge: "Blue & Black",
    stadium: "Gewiss Stadium",
    league: "Serie A"
  },
  {
    name: "Marseille FC",
    country: "France",
    founded: 1899,
    manager: "Roberto De Zerbi",
    player: "Greenwood",
    badge: "White & Blue",
    stadium: "Stade Vélodrome",
    league: "Ligue 1"
  },
  {
    name: "Tottenham Hotspur",
    country: "England",
    founded: 1882,
    manager: "Thomas Frank",
    player: "Solanke",
    badge: "Dark Blue & White",
    stadium: "Tottenham Hotspur Stadium",
    league: "Premier League"
  },
  {
    name: "AS Roma",
    country: "Italy",
    founded: 1927,
    manager: "Gian Piero Gasperini",
    player: "Dybala",
    badge: "Red & Orange",
    stadium: "Stadio Olimpico",
    league: "Serie A"
  },
  {
    name: "Bayern Munich",
    country: "Germany",
    founded: 1900,
    manager: "Thomas Tuchel",
    player: "Harry Kane",
    badge: "Red & White",
    stadium: "Allianz Arena",
    league: "Bundesliga"
  },
  {
    name: "Juventus",
    country: "Italy",
    founded: 1897,
    manager: "Massimiliano Allegri",
    player: "Dušan Vlahović",
    badge: "Black & White",
    stadium: "Allianz Stadium",
    league: "Serie A"
  },
  {
    name: "PSG",
    country: "France",
    founded: 1970,
    manager: "Luis Enrique",
    player: "Kylian Mbappé",
    badge: "Blue & Red",
    stadium: "Parc des Princes",
    league: "Ligue 1"
  },
  {
    name: "Liverpool",
    country: "England",
    founded: 1892,
    manager: "Jürgen Klopp",
    player: "Mohamed Salah",
    badge: "Red",
    stadium: "Anfield",
    league: "Premier League"
  }
];

let currentClub;
let clueStep;
let chances;
let score = 0;
let streak = 0;

function startClubGame() {
  restartClubGame();
}

function restartClubGame() {
  currentClub = clubs[Math.floor(Math.random() * clubs.length)];
  clueStep = 0;
  chances = 6;

  document.getElementById("clubInput").value = "";
  document.getElementById("clubClue").textContent = "";
  document.getElementById("clubResult").textContent = "";
  document.getElementById("clubChances").textContent = `Chances left: ${chances}`;
  document.getElementById("clubScore").textContent = `Score: ${score} | Streak: ${streak}`;
  document.getElementById("clubRestart").style.display = "none";
}

function checkClub() {
  const guess = document.getElementById("clubInput").value.trim().toLowerCase();
  const correct = currentClub.name.toLowerCase();

  if (
    correct.includes(guess) ||
    guess.includes(correct) ||
    similarity(guess, correct) > 0.7
  ) {
    score += 10;
    streak++;
    document.getElementById("clubResult").innerHTML =
      `✅ <strong>Correct!</strong><br>${currentClub.name}`;
    document.getElementById("clubRestart").style.display = "inline-block";
  } else {
    chances--;
    streak = 0;
    document.getElementById("clubChances").textContent = `Chances left: ${chances}`;
    giveClue();
  }

  document.getElementById("clubScore").textContent =
    `Score: ${score} | Streak: ${streak}`;
}

function giveClue() {
  const clues = [
    `🌍 Country: ${currentClub.country}`,
    `📅 Founded: ${currentClub.founded}`,
    `👔 Manager: ${currentClub.manager}`,
    `⭐ Star player: ${currentClub.player}`,
    `🏟️ Stadium: ${currentClub.stadium}`,
    `🏆 League: ${currentClub.league}`,
    `🎨 Colours: ${currentClub.badge}`
  ];

  if (clueStep < clues.length && chances > 0) {
    document.getElementById("clubClue").textContent = clues[clueStep];
    clueStep++;
  } else {
    document.getElementById("clubResult").textContent =
      `❌ Out of clues! It was ${currentClub.name}`;
    document.getElementById("clubRestart").style.display = "inline-block";
  }
}

function similarity(a, b) {
  const s1 = new Set(a.split(""));
  const s2 = new Set(b.split(""));
  const inter = [...s1].filter(x => s2.has(x)).length;
  return inter / Math.max(s1.size, s2.size);
}

window.onload = startClubGame;


