const canvas = document.getElementById('petalCanvas'); // ambil elemen canvas
const ctx = canvas.getContext('2d'); // ambil konteks canvas
let width, height;

function resize() {
  width = canvas.width = window.innerWidth; 
  height = canvas.height = window.innerHeight; // set ukuran canvas sesuai dengan ukuran layar
}
resize();
window.addEventListener('resize', resize); // tambahkan listener untuk tukar ukuran layar

class Petal { 
  constructor() {
    this.x = Math.random() * width; // posisi awal petal
    this.y = Math.random() * height; 
    this.size = 5 + Math.random() * 8; // ukuran petal
    this.speedY = 1 + Math.random() * 1.5; // speed petal
    this.speedX = Math.random() * 1 - 0.5; 
    this.angle = Math.random() * 2 * Math.PI; // sudut petal
    this.angleSpeed = 0.01 + Math.random() * 0.02;
  }
  update() {
    this.y += this.speedY;
    this.x += this.speedX + Math.sin(this.angle) * 0.5;
    this.angle += this.angleSpeed;
    if (this.y > height) {
      this.y = -this.size;
      this.x = Math.random() * width;
    }
    if (this.x > width) this.x = 0;
    if (this.x < 0) this.x = width;
  }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = 'rgba(255,182,193,0.7)'; // light pink
    ctx.beginPath();
    ctx.ellipse(0, 0, this.size * 0.6, this.size, 0, 0, 2 * Math.PI); // gambar petal
    ctx.fill();
    ctx.restore();
  }
}

const petals = [];
const PETAL_COUNT = 40; // jumlah petal

for (let i = 0; i < PETAL_COUNT; i++) {
  petals.push(new Petal());
}

function animate() {
  ctx.clearRect(0, 0, width, height); // bersihkan canvas
  petals.forEach(petal => { // perbarui dan gambar petal
    petal.update();
    petal.draw();
  });
  requestAnimationFrame(animate);
}
animate(); // mulakan animasi