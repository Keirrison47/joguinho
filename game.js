const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Jogador
const player = {
  x: canvas.width / 2 - 20,
  y: canvas.height - 50,
  width: 40,
  height: 40,
  speed: 5,
  dx: 0
};

// Tiros e Inimigos
const bullets = [];
const enemies = [];

// Controles de teclado
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") player.dx = player.speed;
  if (e.key === "ArrowLeft") player.dx = -player.speed;
  if (e.key === " ") {
    bullets.push({ x: player.x + player.width / 2 - 2, y: player.y, width: 4, height: 10, speed: 7 });
  }
});

window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowRight" || e.key === "ArrowLeft") player.dx = 0;
});

// Gerar inimigos periodicamente
setInterval(() => {
  enemies.push({
    x: Math.random() * (canvas.width - 30),
    y: 0,
    width: 30,
    height: 30,
    speed: 2
  });
}, 1000);

// Loop principal do jogo
function update() {
  player.x += player.dx;
  if (player.x < 0) player.x = 0;
  if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;

  // Atualizar tiros
  bullets.forEach((bullet, bIndex) => {
    bullet.y -= bullet.speed;
    if (bullet.y < 0) bullets.splice(bIndex, 1);
  });

  // Atualizar inimigos e colisões
  enemies.forEach((enemy, eIndex) => {
    enemy.y += enemy.speed;

    // Colisão tiro com inimigo
    bullets.forEach((bullet, bIndex) => {
      if (
        bullet.x < enemy.x + enemy.width &&
        bullet.x + bullet.width > enemy.x &&
        bullet.y < enemy.y + enemy.height &&
        bullet.y + bullet.height > enemy.y
      ) {
        enemies.splice(eIndex, 1);
        bullets.splice(bIndex, 1);
      }
    });

    if (enemy.y > canvas.height) {
      enemies.splice(eIndex, 1);
    }
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Desenhar Jogador
  ctx.fillStyle = "#00ffcc";
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Desenhar Tiros
  ctx.fillStyle = "#ff0055";
  bullets.forEach(b => ctx.fillRect(b.x, b.y, b.width, b.height));

  // Desenhar Inimigos
  ctx.fillStyle = "#ffaa00";
  enemies.forEach(e => ctx.fillRect(e.x, e.y, e.width, e.height));
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
