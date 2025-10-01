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

    // Disable parallax effect to prevent overlap issues
    // window.addEventListener('scroll', () => {
    //     const scrolled = window.pageYOffset;
    //     const hero = document.querySelector('.hero');
    //     if (hero && scrolled < window.innerHeight) {
    //         hero.style.transform = `translateY(${scrolled * 0.2}px)`;
    //     }
    // });
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

// Modern Applications Interactive Functions

// Impact Detail Functions
function showImpactDetail(type) {
    const details = {
        'drug-discovery': {
            title: '💊 Drug Discovery Revolution',
            content: 'Traditional drug discovery takes 10-15 years and costs $2.6 billion. Quantum computers can simulate molecular interactions at the atomic level, reducing this to 2-3 years and saving billions of lives and dollars!'
        },
        'climate': {
            title: '🌱 Climate Modeling',
            content: 'Current weather models can predict 5-7 days ahead. Quantum computers could model complex climate systems for decades, helping us predict and prevent climate disasters!'
        },
        'ai': {
            title: '🤖 AI Training Acceleration',
            content: 'Training large AI models currently takes months on thousands of GPUs. Quantum computers could reduce this to hours, making AI development faster and more accessible!'
        }
    };

    const detail = details[type];
    const detailDiv = document.getElementById('impact-detail');
    detailDiv.innerHTML = `
        <div class="impact-detail-content">
            <h5>${detail.title}</h5>
            <p>${detail.content}</p>
        </div>
    `;
}

// Computing Race Simulation
function startComputingRace() {
    const classicalProgress = document.querySelector('.classical-progress');
    const quantumProgress = document.querySelector('.quantum-progress');
    const classicalTime = document.querySelector('.classical-time');
    const quantumTime = document.querySelector('.quantum-time');

    // Reset progress
    classicalProgress.style.width = '0%';
    quantumProgress.style.width = '0%';

    let classicalPercent = 0;
    let quantumPercent = 0;

    const raceInterval = setInterval(() => {
        // Classical computer progresses slowly
        classicalPercent += Math.random() * 2;
        classicalProgress.style.width = Math.min(classicalPercent, 100) + '%';
        classicalTime.textContent = `${Math.round(classicalPercent)}% completed`;

        // Quantum computer progresses much faster
        quantumPercent += Math.random() * 15;
        quantumProgress.style.width = Math.min(quantumPercent, 100) + '%';
        quantumTime.textContent = `${Math.round(quantumPercent)}% completed`;

        // Check for completion
        if (quantumPercent >= 100) {
            quantumTime.textContent = '✅ Done in 0.3 seconds!';
            classicalTime.textContent = `${Math.round(classicalPercent)}% (Still calculating...)`;
            clearInterval(raceInterval);

            // Continue classical for demonstration
            setTimeout(() => {
                if (classicalPercent < 100) {
                    classicalTime.textContent = '⏰ Classical would take 3 hours!';
                }
            }, 2000);
        }
    }, 100);
}

// Quantum Key Distribution Functions
let qkdState = {
    eavesdropperActive: false,
    transmissionInProgress: false
};

function startQKD() {
    if (qkdState.transmissionInProgress) return;

    qkdState.transmissionInProgress = true;
    const aliceStatus = document.getElementById('alice-status');
    const bobStatus = document.getElementById('bob-status');
    const securityResult = document.getElementById('security-result');
    const photonStream = document.getElementById('photon-stream');

    aliceStatus.textContent = 'Sending quantum key...';
    bobStatus.textContent = 'Receiving...';

    // Animate photon stream
    photonStream.innerHTML = '';
    for (let i = 0; i < 10; i++) {
        const photon = document.createElement('div');
        photon.className = 'photon';
        photon.style.left = (i * 10) + '%';
        photon.style.animationDelay = (i * 0.1) + 's';
        photonStream.appendChild(photon);
    }

    setTimeout(() => {
        if (qkdState.eavesdropperActive) {
            aliceStatus.textContent = '⚠️ Eavesdropping detected!';
            bobStatus.textContent = '🚨 Key compromised!';
            securityResult.innerHTML = `
                <div class="security-alert danger">
                    <h4>🚨 Security Breach Detected!</h4>
                    <p>Eve tried to intercept the quantum key, but we caught her immediately! The quantum states changed when she observed them, alerting us to the breach.</p>
                    <p><strong>Result:</strong> Communication aborted. No information leaked!</p>
                </div>
            `;
        } else {
            aliceStatus.textContent = '✅ Key sent securely';
            bobStatus.textContent = '✅ Key received intact';
            securityResult.innerHTML = `
                <div class="security-alert success">
                    <h4>🔐 Secure Communication Established!</h4>
                    <p>The quantum key was transmitted successfully with no eavesdropping detected.</p>
                    <p><strong>Security Level:</strong> Mathematically Unbreakable</p>
                </div>
            `;
        }
        qkdState.transmissionInProgress = false;
    }, 3000);
}

function addEavesdropper() {
    qkdState.eavesdropperActive = true;
    const eavesdropper = document.getElementById('eavesdropper');
    eavesdropper.style.display = 'block';
    eavesdropper.classList.add('active');
}

function resetQKD() {
    qkdState = { eavesdropperActive: false, transmissionInProgress: false };
    document.getElementById('alice-status').textContent = 'Ready to send';
    document.getElementById('bob-status').textContent = 'Waiting...';
    document.getElementById('security-result').innerHTML = '';
    document.getElementById('photon-stream').innerHTML = '';
    const eavesdropper = document.getElementById('eavesdropper');
    eavesdropper.style.display = 'none';
    eavesdropper.classList.remove('active');
}

// Medical Applications Functions
function showMedApplication(app) {
    // Hide all content
    document.querySelectorAll('.med-content').forEach(content => {
        content.classList.remove('active');
    });
    document.querySelectorAll('.med-tab').forEach(tab => {
        tab.classList.remove('active');
    });

    // Show selected content
    document.getElementById(app + '-content').classList.add('active');
    event.target.classList.add('active');
}

function scanOrgan(organ) {
    const scanResult = document.getElementById('scan-result');
    const organInfo = {
        brain: {
            name: '🧠 Brain Scan',
            result: 'High-resolution MRI reveals neural pathways and blood flow. No abnormalities detected. Quantum spins in water molecules provide incredible detail!'
        },
        heart: {
            name: '❤️ Heart Scan',
            result: 'Cardiac MRI shows strong, healthy heart rhythm. Blood flow is normal. Quantum magnetic resonance detects even tiny blockages!'
        },
        lungs: {
            name: '🫁 Lung Scan',
            result: 'Pulmonary scan shows clear airways and healthy tissue. No fluid or masses detected. Quantum imaging sees what X-rays cannot!'
        }
    };

    const info = organInfo[organ];
    scanResult.innerHTML = `
        <div class="scan-result-content">
            <h6>${info.name}</h6>
            <div class="scan-animation"></div>
            <p>${info.result}</p>
        </div>
    `;
}

function startMRIScan() {
    const scanLine = document.getElementById('scan-line');
    const scanResult = document.getElementById('scan-result');

    scanLine.style.display = 'block';
    scanLine.style.animation = 'none';
    setTimeout(() => {
        scanLine.style.animation = 'mri-scan 3s ease-in-out';
    }, 10);

    scanResult.innerHTML = `
        <div class="full-scan-result">
            <h6>🔍 Full Body Quantum MRI</h6>
            <div class="scanning-progress">
                <div class="scan-bar"></div>
                <p>Scanning... Using quantum spin resonance</p>
            </div>
        </div>
    `;

    setTimeout(() => {
        scanResult.innerHTML = `
            <div class="scan-complete">
                <h6>✅ Scan Complete!</h6>
                <div class="scan-summary">
                    <p><strong>🧠 Brain:</strong> Healthy neural activity</p>
                    <p><strong>❤️ Heart:</strong> Strong cardiac function</p>
                    <p><strong>🫁 Lungs:</strong> Clear respiratory system</p>
                    <p><strong>🦴 Bones:</strong> Normal density</p>
                </div>
                <p class="quantum-note">All thanks to quantum mechanics! 🎉</p>
            </div>
        `;
    }, 3000);
}

// LIGO Simulation Functions
function simulateBlackHoleCollision() {
    const horizontalBeam = document.getElementById('horizontal-beam');
    const verticalBeam = document.getElementById('vertical-beam');
    const waveform = document.getElementById('waveform');
    const detectionInfo = document.getElementById('detection-info');

    // Simulate gravitational wave distortion
    horizontalBeam.style.animation = 'gravitational-wave-h 2s ease-in-out';
    verticalBeam.style.animation = 'gravitational-wave-v 2s ease-in-out';

    // Show detection
    waveform.innerHTML = `
        <div class="detected-wave black-hole-wave"></div>
    `;

    detectionInfo.innerHTML = `
        <div class="detection-alert">
            <h4>🕳️ BLACK HOLE COLLISION DETECTED!</h4>
            <p><strong>Distance:</strong> 1.3 billion light-years away</p>
            <p><strong>Mass:</strong> 29 + 36 solar masses → 62 solar masses</p>
            <p><strong>Energy Released:</strong> 3 solar masses converted to gravitational waves</p>
            <p><strong>Detection Time:</strong> 0.2 seconds</p>
            <p class="amazing-fact">✨ This happened 1.3 billion years ago - before life on Earth!</p>
        </div>
    `;
}

function simulateNeutronStarMerger() {
    const horizontalBeam = document.getElementById('horizontal-beam');
    const verticalBeam = document.getElementById('vertical-beam');
    const waveform = document.getElementById('waveform');
    const detectionInfo = document.getElementById('detection-info');

    // Simulate different wave pattern
    horizontalBeam.style.animation = 'neutron-wave-h 3s ease-in-out';
    verticalBeam.style.animation = 'neutron-wave-v 3s ease-in-out';

    waveform.innerHTML = `
        <div class="detected-wave neutron-wave"></div>
    `;

    detectionInfo.innerHTML = `
        <div class="detection-alert neutron">
            <h4>⭐ NEUTRON STAR MERGER DETECTED!</h4>
            <p><strong>Distance:</strong> 130 million light-years</p>
            <p><strong>Duration:</strong> ~100 seconds</p>
            <p><strong>Created:</strong> Heavy elements (gold, platinum, uranium)</p>
            <p><strong>Gold Produced:</strong> 10 Earth masses worth!</p>
            <p class="amazing-fact">💰 Your gold jewelry was forged in neutron star collisions!</p>
        </div>
    `;
}

// Old complex LIGO demo reset function - not used in simplified version
/*
function resetLIGOOld() {
    const horizontalBeam = document.getElementById('horizontal-beam');
    const verticalBeam = document.getElementById('vertical-beam');
    const waveform = document.getElementById('waveform');
    const detectionInfo = document.getElementById('detection-info');

    if (horizontalBeam && verticalBeam && waveform && detectionInfo) {
        horizontalBeam.style.animation = 'none';
        verticalBeam.style.animation = 'none';
        waveform.innerHTML = '';
        detectionInfo.innerHTML = '';
    }
}
*/

// Simple Application Demos
let isEveActive = false;

// Speed Demo - Quantum vs Classical
function startSpeedDemo() {
    console.log('Starting speed demo...');
    const classicalProgress = document.getElementById('classical-progress');
    const quantumProgress = document.getElementById('quantum-progress');
    const classicalTime = document.getElementById('classical-time');
    const quantumTime = document.getElementById('quantum-time');

    if (!classicalProgress || !quantumProgress) {
        console.error('Progress elements not found');
        return;
    }

    // Reset
    classicalProgress.style.width = '0%';
    quantumProgress.style.width = '0%';
    if (classicalTime) classicalTime.textContent = '0s';
    if (quantumTime) quantumTime.textContent = '0s';

    let classicalPercent = 0;
    let quantumPercent = 0;
    let startTime = Date.now();

    const interval = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;

        // Classical computer progresses linearly
        classicalPercent += 1;
        classicalProgress.style.width = classicalPercent + '%';
        if (classicalTime) classicalTime.textContent = elapsed.toFixed(1) + 's';

        // Quantum computer progresses much faster
        quantumPercent += 8;
        quantumProgress.style.width = Math.min(quantumPercent, 100) + '%';
        if (quantumTime) quantumTime.textContent = (elapsed * 0.3).toFixed(1) + 's';

        if (quantumPercent >= 100) {
            clearInterval(interval);
            if (quantumTime) quantumTime.textContent = 'Done! ⚡';
            setTimeout(() => {
                if (classicalPercent < 100 && classicalTime) {
                    classicalTime.textContent = 'Still calculating...';
                }
            }, 1000);
        }
    }, 100);
}

// Quantum Cryptography Demo
function sendQuantumKey() {
    console.log('Sending quantum key...');
    const photon = document.getElementById('photon');
    const result = document.getElementById('crypto-result');

    if (!photon || !result) {
        console.error('Photon or result element not found');
        return;
    }

    // Reset photon position
    photon.style.left = '10px';
    photon.style.animation = 'none';

    setTimeout(() => {
        photon.style.animation = 'movePhoton 2s ease-in-out';

        setTimeout(() => {
            if (isEveActive) {
                result.textContent = '⚠️ Eavesdropping detected! Quantum states disturbed.';
                result.className = 'result compromised';
            } else {
                result.textContent = '✅ Quantum key successfully distributed!';
                result.className = 'result secure';
            }
        }, 2000);
    }, 100);
}

function toggleEavesdropper() {
    console.log('Toggling eavesdropper...');
    const eve = document.getElementById('eve');
    if (!eve) {
        console.error('Eve element not found');
        return;
    }

    isEveActive = !isEveActive;
    eve.style.display = isEveActive ? 'block' : 'none';

    const result = document.getElementById('crypto-result');
    if (result) {
        result.textContent = isEveActive ? 'Eve is now listening...' : 'Channel is secure';
        result.className = 'result';
    }
}

// MRI Demo
function scanOrganSimple(organ) {
    console.log('Scanning organ:', organ);
    const display = document.getElementById('mri-display');
    if (!display) {
        console.error('MRI display element not found');
        return;
    }

    const organData = {
        brain: '🧠 Brain scan: Neural activity detected. Healthy tissue composition.',
        heart: '❤️ Heart scan: Regular rhythm, strong cardiac muscle detected.',
        lungs: '🫁 Lung scan: Clear airways, normal oxygen exchange detected.'
    };

    display.textContent = organData[organ] || 'Scanning...';
    display.style.background = '#27ae60';

    setTimeout(() => {
        display.style.background = '#2c3e50';
    }, 3000);
}

function startMRIDemo() {
    console.log('Starting MRI demo...');
    const scanLine = document.getElementById('mri-scan-line');
    const display = document.getElementById('mri-display');

    if (!display) {
        console.error('MRI display element not found');
        return;
    }

    display.textContent = 'Full body scan in progress...';
    if (scanLine) scanLine.style.animation = 'scanMove 3s ease-in-out';

    setTimeout(() => {
        display.textContent = '✅ Full body scan complete. All organs healthy!';
        display.style.background = '#27ae60';

        setTimeout(() => {
            display.style.background = '#2c3e50';
            display.textContent = 'Click an organ to scan';
        }, 3000);
    }, 3000);
}

// LIGO Simple Demo
function simulateCollision() {
    console.log('Simulating collision...');
    const display = document.getElementById('ligo-display');
    const armH = document.getElementById('ligo-arm-h');
    const armV = document.getElementById('ligo-arm-v');

    if (!display) {
        console.error('LIGO display element not found');
        return;
    }

    display.textContent = 'Detecting gravitational waves...';
    display.style.background = '#f39c12';

    // Simulate arm distortion
    if (armH && armV) {
        armH.style.transform = 'translateY(-50%) scaleX(1.02)';
        armV.style.transform = 'translateX(-50%) scaleY(0.98)';

        setTimeout(() => {
            armH.style.transform = 'translateY(-50%)';
            armV.style.transform = 'translateX(-50%)';
        }, 1000);
    }

    setTimeout(() => {
        display.textContent = '🌌 Gravitational wave detected! Black holes collided 1.3 billion years ago!';
        display.className = 'wave-display wave-detected';

        setTimeout(() => {
            display.className = 'wave-display';
            display.style.background = '#34495e';
        }, 3000);
    }, 2000);
}

function resetLIGO() {
    console.log('Resetting LIGO...');
    const display = document.getElementById('ligo-display');
    const armH = document.getElementById('ligo-arm-h');
    const armV = document.getElementById('ligo-arm-v');

    if (display) {
        display.textContent = 'Listening for gravitational waves...';
        display.className = 'wave-display';
        display.style.background = '#34495e';
    }

    if (armH && armV) {
        armH.style.transform = 'translateY(-50%)';
        armV.style.transform = 'translateX(-50%)';
    }
}

// Ensure functions are available globally and log their availability
window.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded. Checking function availability:');
    console.log('startSpeedDemo:', typeof startSpeedDemo);
    console.log('sendQuantumKey:', typeof sendQuantumKey);
    console.log('toggleEavesdropper:', typeof toggleEavesdropper);
    console.log('scanOrganSimple:', typeof scanOrganSimple);
    console.log('startMRIDemo:', typeof startMRIDemo);
    console.log('simulateCollision:', typeof simulateCollision);
    console.log('resetLIGO:', typeof resetLIGO);

    // Make functions explicitly global (in case of module bundling issues)
    window.startSpeedDemo = startSpeedDemo;
    window.sendQuantumKey = sendQuantumKey;
    window.toggleEavesdropper = toggleEavesdropper;
    window.scanOrganSimple = scanOrganSimple;
    window.startMRIDemo = startMRIDemo;
    window.simulateCollision = simulateCollision;
    window.resetLIGO = resetLIGO;
});