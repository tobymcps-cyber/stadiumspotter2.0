const stadiums = [
    { name: "Camp Nou", lat: 41.3809, lng: 2.1228 },
    { name: "Santiago Bernabéu", lat: 40.4531, lng: -3.6883 },
    { name: "Anfield", lat: 53.4308, lng: -2.9608 },
    { name: "Old Trafford", lat: 53.4631, lng: -2.2913 },
    { name: "Wembley", lat: 51.5560, lng: -0.2795 },
    { name: "Allianz Arena", lat: 48.2188, lng: 11.6242 },
    { name: "Etihad Stadium", lat: 53.4831, lng: -2.2004 },
    { name: "Signal Iduna Park", lat: 51.4926, lng: 7.4510 },
    { name: "San Siro", lat: 45.4789, lng: 9.1244 },
    { name: "Luzhniki Stadium", lat: 55.7170, lng: 37.5552 },
    { name: "Stade de France", lat: 48.9244, lng: 2.3606 },
    { name: "Parc des Princes", lat: 48.8414, lng: 2.2535 },
    { name: "Veltins-Arena", lat: 51.5360, lng: 7.0765 },
    { name: "Stamford Bridge", lat: 51.4816, lng: -0.1900 },
    { name: "Juventus Stadium", lat: 45.1116, lng: 7.6274 },
    { name: "Amsterdam Arena", lat: 52.3730, lng: 4.9491 },
    { name: "Olympiastadion (Berlin)", lat: 52.5145, lng: 13.2905 }
];

let shuffledStadiums, current, score;
let map, marker, correctMarker, polyline;

window.addEventListener("DOMContentLoaded", startGame);

function startGame() {
    map = L.map('map').setView([54, 15], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
    }).addTo(map);

    restartGame();
}

function restartGame() {
    shuffledStadiums = [...stadiums].sort(() => Math.random() - 0.5);
    current = 0;
    score = 0;
    document.getElementById('score').textContent = `Score: ${score}`;
    document.getElementById('stadiumName').style.display = 'block';
    document.getElementById('map').style.display = 'block';
    document.getElementById('restartBtn').style.display = 'none';
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
            resultText = `✅ Correct! Distance: ${Math.round(distance)} km`;
            score++;
            document.getElementById('score').textContent = `Score: ${score}`;
        } else {
            resultText = `❌ Wrong! Distance: ${Math.round(distance)} km`;
        }

        correctMarker = L.marker([stadium.lat, stadium.lng], { opacity:0.7 })
            .addTo(map)
            .bindPopup(`<b>${stadium.name}</b>`)
            .openPopup();

        polyline = L.polyline([[lat, lng], [stadium.lat, stadium.lng]], { color: 'red', weight: 4, dashArray: '5,5' }).addTo(map);

        document.getElementById('result').textContent = resultText;
        document.getElementById('nextBtn').style.display = 'inline-block';
    });
}

function nextStadium() {
    current++;
    if(current < shuffledStadiums.length) {
        map.setView([54, 15], 4);
        loadStadium();
    } else {
        document.getElementById('stadiumName').style.display = 'none';
        document.getElementById('map').style.display = 'none';
        document.getElementById('nextBtn').style.display = 'none';
        document.getElementById('result').textContent = `🎉 Game over! You scored ${score}/${shuffledStadiums.length}`;
        document.getElementById('restartBtn').style.display = 'inline-block';
    }
}

function getDistance(lat1, lon1, lat2, lon2) {
    function deg2rad(deg) { return deg * (Math.PI/180); }
    const R = 6371;
    const dLat = deg2rad(lat2-lat1);
    const dLon = deg2rad(lon2-lon1);
    const a = Math.sin(dLat/2)**2 + Math.cos(deg2rad(lat1))*Math.cos(deg2rad(lat2))*Math.sin(dLon/2)**2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}


