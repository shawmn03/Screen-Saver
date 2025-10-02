const canvas = document.getElementById("lava");
const ctx = canvas.getContext("2d");
let W, H;

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const music = document.getElementById("music");
if (music) {
  music.volume = 100;
  music.muted = true; 
  music.play().then(() => {
    music.muted = false;
  }).catch(() => {
    console.log("Interact with the screen to start the music.");
  });
}

const colors = [
  "#FDD692", 
  "#EF2D56", 
  "#9CFFD9", 
  "#E3DFFF", 
  "#0B4F6C" 
];

class Clump {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;

    this.r = 300 + Math.random() * 150;

    this.color = colors[Math.floor(Math.random() * colors.length)];

    this.dx = (Math.random() - 0.5) * 1.5;
    this.dy = (Math.random() - 0.5) * 1.5;
  }
  update() {
    this.x += this.dx;
    this.y += this.dy;
    if (this.x < -this.r) this.x = W + this.r;
    if (this.x > W + this.r) this.x = -this.r;
    if (this.y < -this.r) this.y = H + this.r;
    if (this.y > H + this.r) this.y = -this.r;
  }
  draw() {
    const grad = ctx.createRadialGradient(this.x, this.y, this.r * 0.3, this.x, this.y, this.r);
    grad.addColorStop(0, this.color);
    grad.addColorStop(1, "transparent");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
  }
}

const clumps = Array.from({ length: 12 }, () => new Clump());

function animate() {
  ctx.clearRect(0, 0, W, H);
  ctx.globalCompositeOperation = "lighter";
  clumps.forEach(clump => {
    clump.update();
    clump.draw();
  });
  requestAnimationFrame(animate);
}
animate();
