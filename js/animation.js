const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

// Configuration
const particleCount = 60; // Adjust for density
const connectionDistance = 150;
const mouseDistance = 200;

// Particle Class
class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.2; // Minimal horizontal movement
        this.vy = (Math.random() - 0.5) * 1.5; // Stronger vertical movement (flow up/down)
        this.size = Math.random() * 2 + 1;
        this.color = 'rgba(0, 233, 176, 0.5)'; // Primary color
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

// Initialize
let animationId;
function init() {
    if (animationId) cancelAnimationFrame(animationId);
    resize();
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    animate();
}

// Resize
function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

// Animation Loop
function animate() {
    ctx.clearRect(0, 0, width, height);

    // Update and Draw Particles
    particles.forEach(p => {
        p.update();
        p.draw();
    });

    // Draw Connections
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 233, 176, ${1 - distance / connectionDistance})`;
                ctx.lineWidth = 1;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }

    animationId = requestAnimationFrame(animate);
}

// Event Listeners
// Event Listeners
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        init(); // Re-initialize to reset particles within new bounds
    }, 200);
});

// Start
init();
