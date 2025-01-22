const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

// Gambar karakter
let playerImg = new Image();
playerImg.src = "character.png"; // Pastikan gambar ada di folder yang sama

let player = {
    x: 50,
    y: 300,
    width: 60, 
    height: 60, 
    velocityY: 0,
    gravity: 1.5,
    isJumping: false
};

// Rintangan (kaktus)
let obstacles = [];
let score = 0;
let gameOver = false;

// Fungsi untuk melompat
function jump() {
    if (!player.isJumping) {
        player.velocityY = -20;
        player.isJumping = true;
    }
}

// Deteksi klik atau tap layar
document.addEventListener("click", jump);
document.addEventListener("touchstart", jump);

// Fungsi untuk menggambar pemain
function drawPlayer() {
    ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
}

// Fungsi untuk menggambar rintangan
function drawObstacles() {
    ctx.fillStyle = "green"; // Warna kaktus
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

// Game loop utama
function update() {
    if (gameOver) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Pergerakan pemain
    player.y += player.velocityY;
    player.velocityY += player.gravity;
    
    // Cegah keluar dari tanah
    if (player.y >= 300) {
        player.y = 300;
        player.isJumping = false;
    }

    // Gerakkan dan hapus rintangan yang lewat
    obstacles.forEach((obstacle, index) => {
        obstacle.x -= 5;
        if (obstacle.x + obstacle.width < 0) {
            obstacles.splice(index, 1);
            score++;
        }

        // Cek tabrakan
        if (
            player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y
        ) {
            gameOver = true;
            alert("Game Over! Skor: " + score);
            document.location.reload();
        }
    });

    drawPlayer();
    drawObstacles();

    requestAnimationFrame(update);
}

// Fungsi untuk membuat rintangan baru
function spawnObstacle() {
    if (gameOver) return;

    let obstacle = {
        x: canvas.width,
        y: 320,
        width: 30,
        height: 50
    };
    
    obstacles.push(obstacle);

    setTimeout(spawnObstacle, Math.random() * 2000 + 1000);
}

// Mulai game
update();
spawnObstacle();