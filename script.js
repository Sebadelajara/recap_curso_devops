// Funcionalidad principal del sitio DevOps
document.addEventListener('DOMContentLoaded', function() {
    
    // Navegación suave
    initSmoothScrolling();
    
    // Efectos de scroll
    initScrollEffects();
    
    // Animaciones de entrada
    initScrollAnimations();
    
    // Funcionalidad del botón CTA
    initCTAButton();
    
    // Efectos hover en las tarjetas
    initCardEffects();
});

// Navegación suave entre secciones
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Ajuste por navbar fijo
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Efectos de scroll en la navegación
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'linear-gradient(135deg, rgba(37, 99, 235, 0.95), rgba(30, 64, 175, 0.95))';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
            navbar.style.backdropFilter = 'none';
        }
    });
}

// Animaciones al hacer scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Elementos a animar
    const animatedElements = document.querySelectorAll(`
        .content-card,
        .principle-item,
        .tool-category,
        .benefit-card
    `);
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Funcionalidad del botón CTA
function initCTAButton() {
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Scroll hacia la sección "¿Qué es?"
            const targetSection = document.querySelector('#que-es');
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Efecto de click
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    }
}

// Efectos adicionales en las tarjetas
function initCardEffects() {
    // Efecto parallax suave en las tarjetas
    const cards = document.querySelectorAll('.content-card, .principle-item, .benefit-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Efecto de rotación en los elementos del ciclo DevOps
    const cycleItems = document.querySelectorAll('.cycle-item');
    let rotationInterval;
    
    function startCycleAnimation() {
        let currentIndex = 0;
        
        rotationInterval = setInterval(() => {
            // Remover clase activa de todos los elementos
            cycleItems.forEach(item => {
                item.style.background = 'rgba(255, 255, 255, 0.1)';
                item.style.transform = 'scale(1)';
            });
            
            // Agregar clase activa al elemento actual
            if (cycleItems[currentIndex]) {
                cycleItems[currentIndex].style.background = 'rgba(245, 158, 11, 0.3)';
                cycleItems[currentIndex].style.transform = 'scale(1.1)';
            }
            
            currentIndex = (currentIndex + 1) % cycleItems.length;
        }, 1000);
    }
    
    // Iniciar animación cuando el hero esté visible
    const heroObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCycleAnimation();
            } else {
                clearInterval(rotationInterval);
                // Resetear estilos
                cycleItems.forEach(item => {
                    item.style.background = 'rgba(255, 255, 255, 0.1)';
                    item.style.transform = 'scale(1)';
                });
            }
        });
    });
    
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
}

// Función para contar números (efecto contador)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Efectos adicionales de interactividad
document.addEventListener('DOMContentLoaded', function() {
    // Efecto de tipeo en el título del hero
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Iniciar efecto de tipeo después de un breve delay
        setTimeout(typeWriter, 500);
    }
    
    // Efecto de hover en tool tags
    const toolTags = document.querySelectorAll('.tool-tag');
    toolTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(2deg)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Easter egg: Konami code
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.code);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            // Activar modo "DevOps Master"
            document.body.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)';
            document.body.style.backgroundSize = '400% 400%';
            document.body.style.animation = 'gradient 15s ease infinite';
            
            // Mostrar mensaje
            const message = document.createElement('div');
            message.innerHTML = '🚀 ¡Modo DevOps Master Activado! 🚀';
            message.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: var(--primary-color);
                color: white;
                padding: 1rem 2rem;
                border-radius: var(--border-radius);
                z-index: 10000;
                font-size: 1.2rem;
                font-weight: bold;
                box-shadow: var(--shadow-lg);
            `;
            
            document.body.appendChild(message);
            
            setTimeout(() => {
                message.remove();
            }, 3000);
            
            konamiCode = [];
        }
    });
});

// Agregar animación CSS para el easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
`;
document.head.appendChild(style);

// Función para mostrar estadísticas (si se quisieran agregar)
function showDevOpsStats() {
    const stats = [
        { label: 'Deployments más rápidos', value: '200%' },
        { label: 'Reducción de errores', value: '50%' },
        { label: 'Tiempo de recuperación', value: '90%' },
        { label: 'Satisfacción del equipo', value: '85%' }
    ];
    
    // Esta función podría usarse para mostrar estadísticas animadas
    console.log('DevOps Stats:', stats);
}

// Detectar si el usuario prefiere movimiento reducido
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Deshabilitar animaciones para usuarios que prefieren movimiento reducido
    const style = document.createElement('style');
    style.textContent = `
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}
