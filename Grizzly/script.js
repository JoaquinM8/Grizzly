const carouselSlide = document.querySelector('.carousel-slide');
const images = document.querySelectorAll('.carousel-slide img, .carousel-slide video');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

let counter = 0;

function updateCarousel() {
    // Obtenemos el ancho real en el momento del click
    const size = images[0].clientWidth;
    
    // Aplicamos la transformación
    carouselSlide.style.transform = `translateX(${-size * counter}px)`;
    
    // Actualizamos los indicadores (dots)
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === counter);
    });
}

// Evento Siguiente
nextBtn.addEventListener('click', () => {
    if (counter < images.length - 1) {
        counter++;
        updateCarousel();
    }
});

// Evento Anterior
prevBtn.addEventListener('click', () => {
    if (counter > 0) {
        counter--;
        updateCarousel();
    }
});

// RECALCULAR SI SE CAMBIA EL TAMAÑO DE LA VENTANA
// (Muy importante para que no se desfase el carrusel)
window.addEventListener('resize', updateCarousel);

// Asegurarnos de que el primer render sea correcto
window.addEventListener('load', updateCarousel);