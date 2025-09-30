// Quantum Mechanics Learning Site - Interactive JavaScript

// Global variables
let waveParticleMode = 'wave';
let doubleSlitDetectorOn = false;
let showWave = false;
let catState = 'superposition';
let blochState = { theta: Math.PI/2, phi: 0 };

// Utility functions
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Wave-Particle Duality Demo
function toggleWaveParticle() {
    waveParticleMode = waveParticleMode === 'wave' ? 'particle' : 'wave';
    drawWaveParticle();
}

function drawWaveParticle() {
    const canvas = document.getElementById('waveParticleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (waveParticleMode === 'wave') {
        // Draw wave
        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 3;
        ctx.beginPath();

        for (let x = 0; x < canvas.width; x++) {
            const y = canvas.height/2 + 30 * Math.sin((x * 0.05) + Date.now() * 0.01);
            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();

        // Add wave label
        ctx.fillStyle = '#667eea';
        ctx.font = '16px Inter';
        ctx.fillText('Wave', 10, 30);
    } else {
        // Draw particles
        ctx.fillStyle = '#667eea';
        const particleSize = 6;
        const particleCount = 8;

        for (let i = 0; i < particleCount; i++) {
            const x = (canvas.width / particleCount) * i + 30;
            const y = canvas.height/2 + 20 * Math.sin(i * 0.5 + Date.now() * 0.005);

            ctx.beginPath();
            ctx.arc(x, y, particleSize, 0, 2 * Math.PI);
            ctx.fill();
        }

        // Add particle label
        ctx.fillStyle = '#667eea';
        ctx.font = '16px Inter';
        ctx.fillText('Particle', 10, 30);
    }
}

// Heisenberg Uncertainty Principle Demo
function updateUncertainty() {
    const positionSlider = document.getElementById('positionSlider');
    if (!positionSlider) return;

    const positionAccuracy = parseInt(positionSlider.value);
    const momentumAccuracy = Math.max(1, 101 - positionAccuracy); // Inverse relationship

    const positionBar = document.querySelector('.position-bar');
    const momentumBar = document.querySelector('.momentum-bar');

    if (positionBar && momentumBar) {
        positionBar.style.background = `linear-gradient(90deg, #667eea ${positionAccuracy}%, #e0e0e0 ${positionAccuracy}%)`;
        momentumBar.style.background = `linear-gradient(90deg, #764ba2 ${momentumAccuracy}%, #e0e0e0 ${momentumAccuracy}%)`;
    }
}

// Bloch Sphere for Quantum Superposition
function drawBlochSphere() {
    const canvas = document.getElementById('blochSphere');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 80;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw sphere outline
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();

    // Draw equator
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, radius, radius * 0.3, 0, 0, 2 * Math.PI);
    ctx.stroke();

    // Draw meridian
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, radius * 0.3, radius, 0, 0, 2 * Math.PI);
    ctx.stroke();

    // Draw state vector
    const x = centerX + radius * Math.sin(blochState.theta) * Math.cos(blochState.phi);
    const y = centerY - radius * Math.cos(blochState.theta);

    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.stroke();

    // Draw state point
    ctx.fillStyle = '#667eea';
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, 2 * Math.PI);
    ctx.fill();

    // Labels
    ctx.fillStyle = '#333';
    ctx.font = '14px Inter';
    ctx.fillText('|0⟩', centerX - 10, centerY - radius - 10);
    ctx.fillText('|1⟩', centerX - 10, centerY + radius + 20);
}

function setState(state) {
    switch(state) {
        case '0':
            blochState = { theta: 0, phi: 0 };
            break;
        case '1':
            blochState = { theta: Math.PI, phi: 0 };
            break;
        case 'plus':
            blochState = { theta: Math.PI/2, phi: 0 };
            break;
        case 'minus':
            blochState = { theta: Math.PI/2, phi: Math.PI };
            break;
    }
    drawBlochSphere();
}

// Quantum Entanglement Demo
function measureEntanglement() {
    const particleA = document.getElementById('particleA');
    const particleB = document.getElementById('particleB');
    const result = document.getElementById('measurementResult');

    if (!particleA || !particleB || !result) return;

    // Random measurement outcome
    const spinA = Math.random() > 0.5 ? 'up' : 'down';
    const spinB = spinA === 'up' ? 'down' : 'up'; // Entangled - opposite spins

    // Update particle visuals
    const arrowA = particleA.querySelector('.spin-arrow');
    const arrowB = particleB.querySelector('.spin-arrow');

    arrowA.textContent = spinA === 'up' ? '↑' : '↓';
    arrowB.textContent = spinB === 'up' ? '↑' : '↓';

    arrowA.style.color = spinA === 'up' ? '#4caf50' : '#f44336';
    arrowB.style.color = spinB === 'up' ? '#4caf50' : '#f44336';

    // Show result
    result.innerHTML = `
        <strong>Measurement Result:</strong><br>
        Particle A: ${spinA === 'up' ? 'Spin Up ↑' : 'Spin Down ↓'}<br>
        Particle B: ${spinB === 'up' ? 'Spin Up ↑' : 'Spin Down ↓'}<br>
        <em>Instant correlation confirmed!</em>
    `;

    // Reset after 3 seconds
    setTimeout(() => {
        arrowA.textContent = '↕️';
        arrowB.textContent = '↕️';
        arrowA.style.color = '';
        arrowB.style.color = '';
        result.innerHTML = '';
    }, 3000);
}

// Double Slit Experiment
let doubleSlitAnimation = null;
let isExperimentRunning = false;

function startDoubleSlitExperiment() {
    const canvas = document.getElementById('doubleSlitCanvas');
    if (!canvas) return;

    // Stop any existing animation
    if (doubleSlitAnimation) {
        clearInterval(doubleSlitAnimation);
    }

    // Reset experiment state
    isExperimentRunning = true;

    // Update button text
    const button = document.querySelector('button[onclick="startDoubleSlitExperiment()"]');
    if (button) {
        button.textContent = 'Stop Experiment';
        button.onclick = stopDoubleSlitExperiment;
    }

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw setup
    drawDoubleSlitSetup(ctx);

    // Animate particles/waves
    animateDoubleSlitPattern(ctx);
}

function stopDoubleSlitExperiment() {
    isExperimentRunning = false;

    if (doubleSlitAnimation) {
        clearInterval(doubleSlitAnimation);
        doubleSlitAnimation = null;
    }

    // Update button text
    const button = document.querySelector('button[onclick="stopDoubleSlitExperiment()"]');
    if (button) {
        button.textContent = 'Start Experiment';
        button.onclick = startDoubleSlitExperiment;
    }

    // Clear and redraw static setup
    const canvas = document.getElementById('doubleSlitCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawDoubleSlitSetup(ctx);
    }
}

function drawDoubleSlitSetup(ctx) {
    const canvas = ctx.canvas;

    // Draw barrier with slits
    ctx.fillStyle = '#666';
    ctx.fillRect(150, 50, 20, 80);  // Top part
    ctx.fillRect(150, 170, 20, 80); // Bottom part

    // Draw screen
    ctx.fillStyle = '#333';
    ctx.fillRect(400, 50, 10, 200);

    // Labels
    ctx.fillStyle = '#fff';
    ctx.font = '12px Inter';
    ctx.fillText('Source', 20, 160);
    ctx.fillText('Double Slit', 120, 40);
    ctx.fillText('Screen', 420, 40);

    // Slit labels
    ctx.fillText('Slit 1', 180, 145);
    ctx.fillText('Slit 2', 180, 165);
}

function animateDoubleSlitPattern(ctx) {
    let frame = 0;
    const animate = () => {
        if (!isExperimentRunning) return; // Stop if experiment stopped

        const canvas = ctx.canvas;

        if (doubleSlitDetectorOn) {
            // Show particle behavior - no interference
            drawParticlePattern(ctx, frame);
        } else {
            // Show wave interference pattern
            drawInterferencePattern(ctx, frame);
        }

        frame++;

        // Continue animation
        doubleSlitAnimation = setTimeout(() => requestAnimationFrame(animate), 50); // Faster animation
    };
    animate();
}

function drawParticlePattern(ctx, frame) {
    // Clear and redraw setup
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawDoubleSlitSetup(ctx);

    // Draw multiple particles for more realistic effect
    const particleSpeed = 6; // Faster particles
    const numParticles = 3;

    for (let i = 0; i < numParticles; i++) {
        const offset = i * 20;
        const particleX = 30 + (frame * particleSpeed + offset) % 400;

        // Particles go through specific slits when detector is on
        const slit1Y = 130 + Math.sin((frame + offset) * 0.2) * 5;
        const slit2Y = 180 + Math.sin((frame + offset) * 0.2 + Math.PI) * 5;

        // Draw particles
        ctx.fillStyle = `hsl(${200 + i * 30}, 80%, 60%)`;

        // Particle going through slit 1
        if (particleX < 420) {
            ctx.beginPath();
            ctx.arc(particleX, slit1Y, 4, 0, 2 * Math.PI);
            ctx.fill();

            // Add particle trail
            ctx.fillStyle = `hsla(${200 + i * 30}, 80%, 60%, 0.3)`;
            for (let j = 1; j < 5; j++) {
                ctx.beginPath();
                ctx.arc(particleX - j * 8, slit1Y, 4 - j, 0, 2 * Math.PI);
                ctx.fill();
            }
        }

        // Particle going through slit 2
        if ((frame + offset) % 40 > 20 && particleX < 420) { // Staggered timing
            ctx.fillStyle = `hsl(${200 + i * 30}, 80%, 60%)`;
            ctx.beginPath();
            ctx.arc(particleX, slit2Y, 4, 0, 2 * Math.PI);
            ctx.fill();

            // Add particle trail
            ctx.fillStyle = `hsla(${200 + i * 30}, 80%, 60%, 0.3)`;
            for (let j = 1; j < 5; j++) {
                ctx.beginPath();
                ctx.arc(particleX - j * 8, slit2Y, 4 - j, 0, 2 * Math.PI);
                ctx.fill();
            }
        }

        // Show detection points on screen
        if (particleX > 380) {
            ctx.fillStyle = '#ff5722';
            ctx.beginPath();
            ctx.arc(410, slit1Y, 3, 0, 2 * Math.PI);
            ctx.fill();

            if ((frame + offset) % 40 > 20) {
                ctx.beginPath();
                ctx.arc(410, slit2Y, 3, 0, 2 * Math.PI);
                ctx.fill();
            }
        }
    }

    // Add detector indicator when on
    if (doubleSlitDetectorOn) {
        ctx.fillStyle = '#ff5722';
        ctx.font = '12px Inter';
        ctx.fillText('🔍 DETECTOR ON', 160, 30);
        ctx.fillText('(Observing which slit)', 160, 45);
    }
}

function drawInterferencePattern(ctx, frame) {
    // Clear and redraw setup
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawDoubleSlitSetup(ctx);

    // Draw interference pattern on screen
    const screenX = 410;
    for (let y = 50; y < 250; y += 2) {
        const intensity = Math.abs(Math.sin((y - 150) * 0.1 + frame * 0.2));
        const alpha = intensity * 0.8;

        ctx.fillStyle = `rgba(79, 195, 247, ${alpha})`;
        ctx.fillRect(screenX, y, 8, 2);
    }

    // Draw wave propagation
    if (showWave) {
        ctx.strokeStyle = 'rgba(79, 195, 247, 0.6)';
        ctx.lineWidth = 2;

        for (let x = 50; x < 400; x += 5) {
            ctx.beginPath();
            const waveY1 = 130 + 20 * Math.sin((x - frame * 5) * 0.1);
            const waveY2 = 180 + 20 * Math.sin((x - frame * 5) * 0.1);

            ctx.moveTo(x, waveY1);
            ctx.lineTo(x + 2, waveY1);
            ctx.moveTo(x, waveY2);
            ctx.lineTo(x + 2, waveY2);
            ctx.stroke();
        }
    }
}

function toggleDetector() {
    doubleSlitDetectorOn = !doubleSlitDetectorOn;
    const button = event.target;
    button.textContent = doubleSlitDetectorOn ? '🔍 Detector ON' : '👁️ Detector OFF';
    button.style.background = doubleSlitDetectorOn ? '#f44336' : '#4caf50';
    button.style.color = 'white';

    // Add visual feedback
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);

    // If experiment is running, immediately update the pattern
    if (isExperimentRunning) {
        const canvas = document.getElementById('doubleSlitCanvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawDoubleSlitSetup(ctx);
        }
    }
}

function toggleWaveView() {
    showWave = document.getElementById('showWave').checked;
}

// Schrödinger's Cat Demo
function openBox() {
    const catState = document.getElementById('catState');
    const result = Math.random() > 0.5 ? 'alive' : 'dead';

    // Hide superposition indicator
    const indicator = catState.querySelector('.superposition-indicator');
    indicator.style.display = 'none';

    // Show appropriate cat
    const aliveCat = catState.querySelector('.cat.alive');
    const deadCat = catState.querySelector('.cat.dead');

    if (result === 'alive') {
        aliveCat.style.display = 'block';
        deadCat.style.display = 'none';
    } else {
        aliveCat.style.display = 'none';
        deadCat.style.display = 'block';
    }

    // Add result text
    setTimeout(() => {
        const resultText = document.createElement('div');
        resultText.textContent = result === 'alive' ? 'The cat is alive!' : 'The cat is dead!';
        resultText.style.cssText = `
            position: absolute;
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
            background: ${result === 'alive' ? '#4caf50' : '#f44336'};
            color: white;
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 0.8rem;
            font-weight: 500;
        `;
        document.getElementById('catBox').appendChild(resultText);
    }, 1000);
}

function resetCat() {
    const catState = document.getElementById('catState');
    const catBox = document.getElementById('catBox');

    if (!catState || !catBox) return;

    // Reset cats
    const aliveCat = catState.querySelector('.cat.alive');
    const deadCat = catState.querySelector('.cat.dead');
    const indicator = catState.querySelector('.superposition-indicator');

    if (aliveCat) aliveCat.style.display = 'block';
    if (deadCat) deadCat.style.display = 'block';
    if (indicator) indicator.style.display = 'block';

    // Remove any result text elements
    const resultTexts = catBox.querySelectorAll('div');
    resultTexts.forEach(div => {
        if (div !== catState && div.textContent &&
            (div.textContent.includes('alive') || div.textContent.includes('dead'))) {
            div.remove();
        }
    });

    // Reset global cat state
    catState = 'superposition';
}

// Quantum Circuit Visualization
function drawQuantumCircuit() {
    const canvas = document.getElementById('quantumCircuit');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw qubit lines
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;

    for (let i = 0; i < 3; i++) {
        const y = 40 + i * 40;
        ctx.beginPath();
        ctx.moveTo(20, y);
        ctx.lineTo(280, y);
        ctx.stroke();

        // Qubit labels
        ctx.fillStyle = '#333';
        ctx.font = '12px Inter';
        ctx.fillText(`|q${i}⟩`, 0, y + 5);
    }

    // Draw gates
    drawGate(ctx, 60, 40, 'H', '#667eea'); // Hadamard gate
    drawGate(ctx, 120, 40, 'X', '#4caf50'); // Pauli-X gate
    drawGate(ctx, 180, 80, 'CNOT', '#ff9800'); // CNOT gate

    // Draw measurement
    ctx.strokeStyle = '#f44336';
    ctx.lineWidth = 2;
    ctx.strokeRect(220, 30, 30, 20);
    ctx.fillStyle = '#f44336';
    ctx.font = '10px Inter';
    ctx.fillText('Measure', 225, 42);
}

function drawGate(ctx, x, y, label, color) {
    // Gate box
    ctx.fillStyle = color;
    ctx.fillRect(x - 15, y - 15, 30, 30);

    // Gate label
    ctx.fillStyle = 'white';
    ctx.font = '14px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(label, x, y + 5);
    ctx.textAlign = 'start';
}

// Quantum Key Distribution Demo
function demonstrateQKD() {
    const alice = document.querySelector('.alice');
    const bob = document.querySelector('.bob');
    const channel = document.querySelector('.quantum-channel');

    // Animate key exchange
    alice.style.background = '#4caf50';
    alice.textContent = 'Alice (Sending...)';

    // Animate photons in channel
    channel.style.animation = 'pulse 0.5s ease-in-out 3';

    setTimeout(() => {
        bob.style.background = '#4caf50';
        bob.textContent = 'Bob (Received)';

        setTimeout(() => {
            alice.style.background = '#667eea';
            alice.textContent = 'Alice';
            bob.style.background = '#667eea';
            bob.textContent = 'Bob';
        }, 2000);
    }, 1500);
}

// Smooth scrolling for navigation
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and canvases
    updateUncertainty();
    drawBlochSphere();
    drawQuantumCircuit();

    // Set up wave-particle animation
    if (document.getElementById('waveParticleCanvas')) {
        setInterval(drawWaveParticle, 50);
    }

    // Add smooth scrolling to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all concept cards and experiment cards
    document.querySelectorAll('.concept-card, .experiment-card, .app-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Smooth parallax effect for hero section (reduced intensity)
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero && scrolled < window.innerHeight) {
            // Only apply parallax when hero is visible, with reduced intensity
            hero.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    });
});

// Responsive navigation toggle
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Add click handlers for external links
document.addEventListener('DOMContentLoaded', function() {
    // Track external link clicks (for analytics if needed)
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('click', function() {
            // Could add analytics tracking here
            console.log('External link clicked:', this.href);
        });
    });

    // Add loading states for interactive elements
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function() {
            const originalText = this.textContent;
            this.style.opacity = '0.7';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 300);
        });
    });
});

// Educational tooltips
function addTooltips() {
    const tooltipElements = [
        { selector: '.formula', text: 'These formulas mathematically express the core principles of quantum mechanics.' },
        { selector: '.references a', text: 'Click to view original academic sources.' }
    ];

    tooltipElements.forEach(({ selector, text }) => {
        document.querySelectorAll(selector).forEach(element => {
            element.title = text;
        });
    });
}

// Initialize tooltips when page loads
document.addEventListener('DOMContentLoaded', addTooltips);