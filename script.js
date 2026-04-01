class Carousel {
    constructor(carouselId) {
        this.carousel = document.getElementById(carouselId);
        this.slides = this.carousel.querySelectorAll('.slide');
        this.slidesContainer = this.carousel.querySelector('.carousel-slides');
        this.currentIndex = 0;
        this.autoplayInterval = null;
        
        this.init();
    }

    init() {
        this.createControls();
        this.createIndicators();
        this.startAutoplay();
        this.attachEventListeners();
    }

    createControls() {
        const controls = document.createElement('div');
        controls.className = 'carousel-controls';
        
        const prevBtn = document.createElement('button');
        prevBtn.className = 'carousel-btn prev-btn';
        prevBtn.textContent = '← Previous';
        prevBtn.addEventListener('click', () => this.prevSlide());
        
        const nextBtn = document.createElement('button');
        nextBtn.className = 'carousel-btn next-btn';
        nextBtn.textContent = 'Next →';
        nextBtn.addEventListener('click', () => this.nextSlide());
        
        controls.appendChild(prevBtn);
        controls.appendChild(nextBtn);
        this.carousel.appendChild(controls);
    }

    createIndicators() {
        const indicatorsContainer = document.createElement('div');
        indicatorsContainer.className = 'carousel-indicators';
        
        this.slides.forEach((_, index) => {
            const indicator = document.createElement('span');
            indicator.className = 'indicator';
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => this.goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });
        
        this.carousel.appendChild(indicatorsContainer);
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateSlide();
        this.resetAutoplay();
    }

    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.updateSlide();
        this.resetAutoplay();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateSlide();
        this.resetAutoplay();
    }

    updateSlide() {
        const offset = -this.currentIndex * 100;
        this.slidesContainer.style.transform = `translateX(${offset}%)`;
        
        this.slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentIndex);
        });
        
        document.querySelectorAll(`#${this.carousel.id} .indicator`).forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
    }

    startAutoplay() {
        this.autoplayInterval = setInterval(() => this.nextSlide(), 5000);
    }

    resetAutoplay() {
        clearInterval(this.autoplayInterval);
        this.startAutoplay();
    }

    stopAutoplay() {
        clearInterval(this.autoplayInterval);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const topNewsCarousel = new Carousel('top-news-carousel');
    const techNewsCarousel = new Carousel('tech-news-carousel');
    const entertainmentCarousel = new Carousel('entertainment-news-carousel');

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            topNewsCarousel.stopAutoplay();
            techNewsCarousel.stopAutoplay();
            entertainmentCarousel.stopAutoplay();
        } else {
            topNewsCarousel.startAutoplay();
            techNewsCarousel.startAutoplay();
            entertainmentCarousel.startAutoplay();
        }
    });
});
