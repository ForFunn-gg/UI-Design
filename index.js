// Add floating shapes to body
function createFloatingShapes() {
    const shapesContainer = document.createElement('div');
    shapesContainer.className = 'floating-shapes';
    
    for (let i = 0; i < 4; i++) {
        const shape = document.createElement('div');
        shape.className = 'floating-shape';
        shapesContainer.appendChild(shape);
    }
    
    document.body.insertBefore(shapesContainer, document.body.firstChild);
}


function createScrollProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    document.body.insertBefore(progressBar, document.body.firstChild);
    return progressBar;
}


createFloatingShapes();
const scrollProgressBar = createScrollProgressBar();


window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgressBar.style.width = scrolled + '%';
});


document.getElementById('contact-form').addEventListener('submit', function(e){
    e.preventDefault();

    const Status = document.getElementById('form-status');
    const name = document.getElementById('name').value;

    if(name.length < 2){
        Status.innerHTML = 'Please enter a valid name.';
        Status.style.color = 'red';
        return;
    }
    Status.innerHTML = 'Thank you for contacting me, ' + name + '! I will get back to you soon.';
    Status.className = "success-msg";
    this.reset(); 
}); 


const btn = document.getElementById('read-more-btn');
const moreInfo = document.getElementById('more-info');

btn.addEventListener('click', function(){
    if(moreInfo.classList.contains('hidden')){
        moreInfo.classList.remove('hidden');
        moreInfo.style.opacity = '0';
        moreInfo.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            moreInfo.style.opacity = '1';
        }, 10);
        btn.textContent = 'Read Less';
    }else{
        moreInfo.style.opacity = '0';
        setTimeout(() => {
            moreInfo.classList.add('hidden');
            btn.textContent = 'Read My Story';
        }, 500);
    }
});


const modal = document.getElementById("project-modal");
const closeBtn = document.querySelector(".close-btn");

// Modal carousel state
let modalImages = [];
let modalCurrentIndex = 0;

closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = "none";
    }, 300);
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = "none";
        }, 300);
    }
});


// Initialize project card carousel
function initProjectCarousel(card) {
    const carousel = card.querySelector('.project-carousel');
    const images = carousel.querySelectorAll('.carousel-img');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    const counter = carousel.querySelector('.carousel-counter');
    const currentImgSpan = counter.querySelector('.current-img');
    const totalImgSpan = counter.querySelector('.total-img');
    
    let currentIndex = 0;
    const totalImages = images.length;
    
    totalImgSpan.textContent = totalImages;
    
    // Create dots
    images.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = 'carousel-dot' + (index === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    function updateCarousel() {
        images.forEach((img, index) => {
            img.classList.toggle('active', index === currentIndex);
        });
        
        dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        currentImgSpan.textContent = currentIndex + 1;
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalImages;
        updateCarousel();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateCarousel();
    }
    
    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        prevSlide();
    });
    
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        nextSlide();
    });
}

// Initialize all project carousels
document.querySelectorAll('.project-carousel').forEach(carousel => {
    initProjectCarousel(carousel.closest('.project-card'));
});


// Modal carousel functions
function initModalCarousel(images) {
    modalImages = images;
    modalCurrentIndex = 0;
    
    const modalCarousel = document.querySelector('.modal-carousel');
    const imagesContainer = modalCarousel.querySelector('.modal-carousel-images');
    const prevBtn = modalCarousel.querySelector('.modal-prev');
    const nextBtn = modalCarousel.querySelector('.modal-next');
    const dotsContainer = modalCarousel.querySelector('.modal-carousel-dots');
    
    // Clear existing images and dots
    imagesContainer.innerHTML = '';
    dotsContainer.innerHTML = '';
    
    // Create modal carousel images
    images.forEach((src, index) => {
        const img = document.createElement('img');
        img.className = 'modal-carousel-img' + (index === 0 ? ' active' : '');
        img.src = src;
        img.alt = 'Project Image ' + (index + 1);
        imagesContainer.appendChild(img);
        
        const dot = document.createElement('button');
        dot.className = 'modal-carousel-dot' + (index === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToModalSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    function updateModalCarousel() {
        imagesContainer.querySelectorAll('.modal-carousel-img').forEach((img, index) => {
            img.classList.toggle('active', index === modalCurrentIndex);
        });
        
        dotsContainer.querySelectorAll('.modal-carousel-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === modalCurrentIndex);
        });
    }
    
    function goToModalSlide(index) {
        modalCurrentIndex = index;
        updateModalCarousel();
    }
    
    function nextModalSlide() {
        modalCurrentIndex = (modalCurrentIndex + 1) % modalImages.length;
        updateModalCarousel();
    }
    
    function prevModalSlide() {
        modalCurrentIndex = (modalCurrentIndex - 1 + modalImages.length) % modalImages.length;
        updateModalCarousel();
    }
    
    prevBtn.onclick = prevModalSlide;
    nextBtn.onclick = nextModalSlide;
    
    // Store functions for later use
    modalCarousel._nextSlide = nextModalSlide;
    modalCarousel._prevSlide = prevModalSlide;
    
    // Add keyboard navigation
    modalCarousel._keyHandler = (e) => {
        if (e.key === 'ArrowLeft') prevModalSlide();
        if (e.key === 'ArrowRight') nextModalSlide();
    };
}


document.querySelectorAll('.project-card .btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        const card = button.closest('.project-card');
        const title = card.querySelector('h3').innerText;
        const desc = card.querySelector('p').innerText;
        
        // Get all images from carousel
        const carousel = card.querySelector('.project-carousel');
        const imageElements = carousel.querySelectorAll('.carousel-img');
        const images = Array.from(imageElements).map(img => {
            // Extract URL from style.backgroundImage
            const bgImage = img.style.backgroundImage;
            return bgImage.slice(5, -2);
        });

        document.getElementById('modal-title').innerText = title;
        document.getElementById('modal-desc').innerText = desc;
        
        // Initialize modal carousel with all images
        initModalCarousel(images);

        modal.style.display = "flex";
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    });
});


document.querySelectorAll('[data-tilt]').forEach(element => {
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        const cardInner = element.querySelector('.3d-card-inner');
        if (cardInner) {
            cardInner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        }
    });
    
    element.addEventListener('mouseleave', () => {
        const cardInner = element.querySelector('.3d-card-inner');
        if (cardInner) {
            cardInner.style.transform = 'rotateX(0) rotateY(0) translateZ(0)';
        }
    });
});


const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
          
            if (entry.target.classList.contains('skill-bar-wrapper')) {
                const progress = entry.target.querySelector('.progress');
                if (progress) {
                    const width = progress.style.width;
                    progress.style.width = '0';
                    setTimeout(() => {
                        progress.style.width = width;
                    }, 100);
                }
            }
            
            
            if (entry.target.classList.contains('skill-container')) {
                const pills = entry.target.querySelectorAll('.skill-pill');
                pills.forEach((pill, index) => {
                    pill.style.transitionDelay = (index * 0.1) + 's';
                    setTimeout(() => {
                        pill.classList.add('visible');
                    }, index * 100);
                });
            }
        }
    });
}, observerOptions);


document.querySelectorAll('.about-image, .about-text, .skill-bar-wrapper, .project-card, .project-title, .contact-wrapper, .resume-content, footer').forEach(element => {
    observer.observe(element);
});


const skillContainer = document.querySelector('.skill-container');
if (skillContainer) {
    observer.observe(skillContainer);
}


const contactForm = document.getElementById('contact-form');
if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach((input, index) => {
        input.style.transitionDelay = (index * 0.1) + 's';
        observer.observe(input);
    });
    
    
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                inputs.forEach((input, index) => {
                    setTimeout(() => {
                        input.classList.add('visible');
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.2 });
    
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
        contactObserver.observe(contactSection);
    }
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
        header.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.2)';
        header.style.transform = 'translateY(-2px)';
    } else {
        header.classList.remove('scrolled');
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        header.style.transform = 'translateY(0)';
    }
});


const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar ul li a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200) && window.scrollY < (sectionTop + sectionHeight - 200)) {
    current = section.getAttribute('id');
       } 
            
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});


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


document.querySelectorAll('.btn, #read-more-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            background: rgba(255,255,255,0.5);
            border-radius: 50%;
            pointer-events: none;
            width: 20px;
            height: 20px;
            left: ${x - 10}px;
            top: ${y - 10}px;
            transform: scale(0);
            animation: ripple 0.6s linear;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});


const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const shapes = document.querySelectorAll('.floating-shape');
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.1;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add slight delay for smoother entrance
    setTimeout(() => {
        // Trigger about section animations
        document.querySelector('.about-image')?.classList.add('visible');
        document.querySelector('.about-text')?.classList.add('visible');
        
        // Trigger title animation
        document.querySelector('.project-title')?.classList.add('visible');
    }, 300);
});

// Mouse cursor trail effect (subtle)
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Add glow effect to project cards on hover
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.zIndex = '1';
    });
});

// Resume section animation trigger
const resumeSection = document.getElementById('resume-section');
if (resumeSection) {
    const resumeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const resumeContent = entry.target.querySelector('.resume-content');
                if (resumeContent) {
                    resumeContent.classList.add('visible');
                }
            }
        });
    }, { threshold: 0.2 });
    
    resumeObserver.observe(resumeSection);
}

