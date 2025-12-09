// All images for the game (9 images for 3 rounds, 3 images per round)
const images = [
    { name: "Camp Nou", src: images/campnou.jpg.jpg },
    { name: "Anfield", src: images/anfield.jpg.jpg },
    { name: "Old Trafford", src: images/oldtrafford.jpg.jpg},
    { name: "Stadium 4", src: "images/image4.jpg" },
    { name: "Stadium 5", src: "images/image5.jpg" },
    { name: "Stadium 6", src: "images/image6.jpg" },
    { name: "Stadium 7", src: "images/image7.jpg" },
    { name: "Stadium 8", src: "images/image8.jpg" },
    { name: "Stadium 9", src: "images/image9.jpg" }
];

let rounds = 3;
let currentRound = 0;
let score = 0;
let roundImages = [];

window.onload = startPickGame;

function startPickGame() {
    currentRound = 0;
    score = 0;

    // Shuffle images and divide into rounds
    const shuffled = [...images].sort(() => Math.random() - 0.5);
    roundImages = [];
    for (let i = 0; i < rounds; i++) {
        roundImages.push(shuffled.slice(i*3, i*3 + 3));
    }

    nextRound();
}

function nextRound() {
    if (currentRound >= rounds) {
        document.getElementById("imageContainer").innerHTML = "";
        document.getElementById("stadiumName").textContent = "";
        document.getElementById("roundInfo").textContent = "";
        document.getElementById("result").textContent =
            `🎉 Game Over! You scored ${score}/${rounds}`;
        document.getElementById("restartBtn").style.display = "inline-block";
        return;
    }

    document.getElementById("restartBtn").style.display = "none";
    document.getElementById("result").textContent = "";

    const imagesThisRound = roundImages[currentRound];
    currentRound++;

    // Pick a random stadium from this round as the correct answer
    const correctIndex = Math.floor(Math.random() * imagesThisRound.length);
    const correctStadium = imagesThisRound[correctIndex];

    document.getElementById("stadiumName").textContent = correctStadium.name;
    document.getElementById("roundInfo").textContent =
        `Round ${currentRound} of ${rounds}`;

    const container = document.getElementById("imageContainer");
    container.innerHTML = "";

    imagesThisRound.forEach(imgObj => {
        const img = document.createElement("img");
        img.src = imgObj.src;
        img.style.width = "250px";
        img.style.borderRadius = "12px";
        img.style.cursor = "pointer";
        img.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
        img.onclick = () => {
            if (imgObj.name === correctStadium.name) {
                score++;
                document.getElementById("result").textContent = "✅ Correct!";
            } else {
                document.getElementById("result").textContent =
                    `❌ Wrong! It was ${correctStadium.name}`;
            }
            setTimeout(nextRound, 1000);
        };
        container.appendChild(img);
    });
}

function restartPick() {
    startPickGame();
}
