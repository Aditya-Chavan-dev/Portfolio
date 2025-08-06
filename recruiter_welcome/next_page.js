document.addEventListener('DOMContentLoaded', function() {
    const experienceCards = document.querySelectorAll('.experience-card');
    let selectedCard = null;

    // Initialize experience
    function init() {
        resetState();
        setupCardInteractions();
        initializeParallax();
        animateCounters();
        setupKeyboardShortcuts();
    }

    // Reset all states
    function resetState() {
        experienceCards.forEach(card => {
            card.classList.remove('selected');
            card.style.transform = '';
            card.style.boxShadow = '';
            card.style.borderColor = '';
            
            // Reset button text
            const button = card.querySelector('.start-button .button-text');
            const choice = card.dataset.choice;
            const originalTexts = {
                full: 'Start Full Journey',
                quick: 'View Highlights',
                busy: 'Ask Questions'
            };
            if (button) {
                button.textContent = originalTexts[choice];
            }
        });

        selectedCard = null;
    }

    // Setup card interactions - DIRECT REDIRECT
    function setupCardInteractions() {
        experienceCards.forEach(card => {
            // Click handler - immediate redirect
            card.addEventListener('click', function() {
                const url = this.dataset.url;
                
                // Visual feedback only
                this.style.transform = 'translateY(-8px) translateZ(0) scale(1.03)';
                this.style.boxShadow = '0 12px 48px rgba(0, 212, 255, 0.25)';
                this.style.borderColor = 'var(--accent-primary)';
                
                // Update button text briefly
                const button = this.querySelector('.start-button .button-text');
                const choice = this.dataset.choice;
                const loadingTexts = {
                    full: 'Launching...',
                    quick: 'Loading...',
                    busy: 'Starting...'
                };
                if (button) {
                    button.textContent = loadingTexts[choice];
                }

                // Immediate redirect
                setTimeout(() => {
                    window.location.href = url;
                }, 300); // Very short delay for visual feedback
            });

            // Hover effects
            card.addEventListener('mouseenter', function() {
                if (!this.classList.contains('selected')) {
                    this.style.transform = 'translateY(-6px) translateZ(0) scale(1.02)';
                    this.style.boxShadow = '0 8px 40px rgba(0, 212, 255, 0.15)';
                    this.style.borderColor = 'rgba(0, 212, 255, 0.3)';
                }
                
                // Animate CTA button
                const button = this.querySelector('.start-button');
                if (button) {
                    button.style.transform = 'translateY(-2px)';
                    button.style.boxShadow = '0 8px 24px rgba(0, 212, 255, 0.3)';
                }
            });

            card.addEventListener('mouseleave', function() {
                if (!this.classList.contains('selected')) {
                    this.style.transform = '';
                    this.style.boxShadow = '';
                    this.style.borderColor = '';
                }
                
                // Reset CTA button
                const button = this.querySelector('.start-button');
                if (button) {
                    button.style.transform = '';
                    button.style.boxShadow = '';
                }
            });

            // Button-specific interactions
            const button = card.querySelector('.start-button');
            if (button) {
                button.addEventListener('mouseenter', function(e) {
                    e.stopPropagation();
                    this.style.transform = 'translateY(-2px)';
                    this.style.boxShadow = '0 8px 24px rgba(0, 212, 255, 0.3)';
                });

                button.addEventListener('mouseleave', function(e) {
                    e.stopPropagation();
                    if (!card.classList.contains('selected')) {
                        this.style.transform = '';
                        this.style.boxShadow = '';
                    }
                });

                // Direct button click
                button.addEventListener('click', function(e) {
                    e.stopPropagation();
                    card.click(); // Trigger card click
                });
            }
        });
    }

    // Animate counters with stagger
    function animateCounters() {
        const totalVisits = document.querySelector('.total-visits');
        const statNumbers = document.querySelectorAll('.stat-number');
        
        // Animate total visits first
        if (totalVisits) {
            animateNumber(totalVisits);
        }
        
        // Stagger stat animations
        statNumbers.forEach((stat, index) => {
            setTimeout(() => {
                animateNumber(stat);
            }, 500 + (index * 200));
        });
    }

    function animateNumber(element) {
        const targetValue = parseInt(element.textContent.replace(/\D/g, ''));
        if (!targetValue) return;

        let currentValue = 0;
        const increment = targetValue / 40;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(timer);
            }
            
            // Preserve any + suffix
            const suffix = element.textContent.includes('+') ? '+' : '';
            element.textContent = Math.floor(currentValue) + suffix;
        }, 40);
    }

    // Subtle parallax for premium feel
    function initializeParallax() {
        let mouseX = 0, mouseY = 0;
        let currentX = 0, currentY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5;
        });

        function updateParallax() {
            currentX += (mouseX - currentX) * 0.05;
            currentY += (mouseY - currentY) * 0.05;

            const orbs = document.querySelectorAll('.floating-orb');
            orbs.forEach((orb, index) => {
                const speed = (index + 1) * 0.3;
                const x = currentX * 20 * speed;
                const y = currentY * 20 * speed;
                orb.style.transform = `translate(${x}px, ${y}px)`;
            });

            requestAnimationFrame(updateParallax);
        }
        updateParallax();
    }

    // Keyboard shortcuts
    function setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.key === '1') selectExperienceByIndex(0);
            if (e.key === '2') selectExperienceByIndex(1);
            if (e.key === '3') selectExperienceByIndex(2);
            if (e.key === 'Escape') resetState();
        });
    }

    function selectExperienceByIndex(index) {
        const card = experienceCards[index];
        if (card) {
            card.click();
        }
    }

    // Handle page visibility for state management
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            resetState();
        }
    });

    window.addEventListener('pageshow', function() {
        resetState();
    });

    // Initialize the experience
    init();
});
