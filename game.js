const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 20,
  speedX: 0,
  speedY: 0,
};

let mouse = {
  x: 0,
  y: 0,
};

canvas.addEventListener("click", (event) => {
  mouse.x = event.clientX - canvas.getBoundingClientRect().left;
  mouse.y = event.clientY - canvas.getBoundingClientRect().top;

  let angle = Math.atan2(mouse.y - ball.y, mouse.x - ball.x);
  ball.speedX = Math.cos(angle) * 5;
  ball.speedY = Math.sin(angle) * 5;
});

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();

  ball.x += ball.speedX;
  ball.y += ball.speedY;

  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    ball.speedX = -ball.speedX;
  }

  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.speedY = -ball.speedY;
  }

  requestAnimationFrame(update);
}

update();