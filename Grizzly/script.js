const carouselSlide = document.querySelector('.carousel-slide');
const images = document.querySelectorAll('.slide-item');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

let counter = 0;
let isDragging = false;
let startPos = 0;
let prevTranslate = 0;

function updateCarousel() {
    const size = images[0].clientWidth;
    prevTranslate = -counter * size;
    carouselSlide.style.transition = 'transform 0.4s cubic-bezier(0.45, 0.05, 0.55, 0.95)';
    carouselSlide.style.transform = `translateX(${prevTranslate}px)`;
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === counter);
    });
}

// --- LOOP INFINITO EN BOTONES ---
nextBtn.addEventListener('click', () => {
    if (counter >= images.length - 1) {
        counter = 0; // Vuelve al inicio
    } else {
        counter++;
    }
    updateCarousel();
});

prevBtn.addEventListener('click', () => {
    if (counter <= 0) {
        counter = images.length - 1; // Va al final
    } else {
        counter--;
    }
    updateCarousel();
});

// --- LÓGICA DE ARRASTRE CON LOOP ---
function touchStart(event) {
    startPos = getPositionX(event);
    isDragging = true;
    carouselSlide.style.transition = 'none';
}

function touchMove(event) {
    if (isDragging) {
        const currentPosition = getPositionX(event);
        const diff = currentPosition - startPos;
        const translate = prevTranslate + diff;
        carouselSlide.style.transform = `translateX(${translate}px)`;
    }
}

function touchEnd(event) {
    if (!isDragging) return;
    isDragging = false;
    
    const finalDiff = (event.type.includes('mouse') ? event.pageX : event.changedTouches[0].clientX) - startPos;

    // Umbral de 50px para cambiar
    if (finalDiff < -50) {
        // Swipe Izquierda -> Siguiente
        if (counter >= images.length - 1) counter = 0;
        else counter++;
    } else if (finalDiff > 50) {
        // Swipe Derecha -> Anterior
        if (counter <= 0) counter = images.length - 1;
        else counter--;
    }

    updateCarousel();
}

// Helper para posición
function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

// Event Listeners (Mouse y Touch)
carouselSlide.addEventListener('touchstart', touchStart);
carouselSlide.addEventListener('touchend', touchEnd);
carouselSlide.addEventListener('touchmove', touchMove);
carouselSlide.addEventListener('mousedown', touchStart);
carouselSlide.addEventListener('mouseup', touchEnd);
carouselSlide.addEventListener('mouseleave', touchEnd);
carouselSlide.addEventListener('mousemove', touchMove);

// Evitar arrastre de imagen
images.forEach(img => img.addEventListener('dragstart', (e) => e.preventDefault()));

window.addEventListener('resize', updateCarousel);