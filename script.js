document.addEventListener("DOMContentLoaded", function(event) {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isMobile = /iphone|ipad|android|blackberry|windows phone|opera mini|iemobile|mobile/i.test(userAgent);
    if (isMobile) {
        setInterval(updateDate,1000);
    } else {
        var desktopContainer = document.getElementsByClassName('desktop-view')[0];
        var body = document.getElementsByTagName('body')[0];
        body.style.overflow = "hidden";
        desktopContainer.style.visibility = 'visible';
        desktopContainer.style.opacity = '1';
    }

    initIntroVideo();
    initCardAppearObserver();
    initFooterObserver();
});

function initCardAppearObserver() {
    const cardIds = ['ceremony', 'reception', 'dress-code', 'gift'];
    const cards = cardIds
        .map(id => document.getElementById(id))
        .filter(Boolean);

    if (!cards.length) return;

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear-card');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        cards.forEach(card => observer.observe(card));
    } else {
        const onScroll = () => {
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
                    card.classList.add('appear-card');
                }
            });
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }
}

function initIntroVideo() {
    const overlay = document.getElementById('intro-overlay');
    const video = document.getElementById('intro-video');
    const invitation = document.querySelector('.invitation-container');

    if (!overlay || !video) {
        if (invitation) invitation.style.opacity = '1';
        return;
    }

    // Ensure page stays hidden while intro plays
    if (invitation) invitation.style.opacity = '0';

    const finishIntro = () => {
        overlay.classList.add('fade-out');
        if (invitation) invitation.style.opacity = '1';
        setTimeout(() => {
            if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
        }, 1000);
    };

    // If autoplay blocked, play when user interacts
    const tryPlay = () => {
        const p = video.play();
        if (p && p.catch) p.catch(() => {});
    };

    video.addEventListener('ended', finishIntro);
    video.addEventListener('error', finishIntro);

    // Allow skipping intro by click/tap
    overlay.addEventListener('click', finishIntro);

    // Try to play; on some browsers autoplay with sound is blocked, but video is muted so should be fine
    tryPlay();
}

function initFooterObserver() {
    const footer = document.getElementById('footer-section');
    if (!footer) return;

    const ids = ['footer-ana', 'footer-ampersand', 'footer-felipe', 'footer-msg'];
    const elements = ids.map(id => document.getElementById(id)).filter(Boolean);

    if (!elements.length) return;

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    elements.forEach(el => el.classList.add('appear-on-footer'));
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        observer.observe(footer);
    } else {
        const onScroll = () => {
            const rect = footer.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                elements.forEach(el => el.classList.add('appear-on-footer'));
                window.removeEventListener('scroll', onScroll);
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }
}


function updateDate(){
    var countDownDate = new Date("Aug 15, 2026 15:00:0").getTime();
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("days").innerHTML = days ;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
}
function openGoogleMaps(place) {
    var url = '';
    if (place === 'ceremony') {
        // url church
        url = 'https://maps.app.goo.gl/pVWuueeQnCx5hbTC9';
    } else {
        //url celebration place
        url = 'https://maps.app.goo.gl/REUhkS8azWVyAVFX7';
    }
    window.location.href = url;
}

function confirmation() {
    const phoneNumber = '573045494967';
    const message = 'Hola.%0AQuiero%20confirmar%20mi%20asistencia%20a%20la%20boda%20de%20Ana%20%26%20Felipe:%0A*Nombre:*%0A*Cc:*%0A*Placa:*';
    var url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
    window.location.href = url;
}

function addEventToCalendar(){
    const title = "Matrimonio Luisa & José";
    const description = "";
    const location = "Parroquia nuestra señora de Chiquinquira, Rionegro";
    const startDateTime = "20241012T113000";
    const endDateTime = "20241012T170000";
    const timezone = "America/Bogota";

    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDateTime}/${endDateTime}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}&sf=true&output=xml&ctz=${timezone}`;

    window.open(url, '_blank');
}


/* ----------------------------------------------------------
   3. GALLERY SLIDER
---------------------------------------------------------- */
let currentSlide = 0;

function goToSlide(index) {
    const track  = document.getElementById('gallery-track');
    const dots   = document.querySelectorAll('.gallery-dot');
    const slides = document.querySelectorAll('.gallery-slide');

    if (!track || index < 0 || index >= slides.length) return;

    currentSlide = index;
    const targetSlide = slides[currentSlide];
    const offset = targetSlide ? targetSlide.offsetLeft : 0;
    track.style.transform = `translateX(-${offset}px)`;

    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
}

// Auto-advance gallery every 3 seconds
(function autoSlide() {
    const slides = document.querySelectorAll('.gallery-slide');
    if (!slides.length) return;

    setInterval(() => {
        const next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }, 3000);
})();

// Touch / swipe support for gallery
(function initSwipe() {
    const slider = document.getElementById('gallery-slider');
    if (!slider) return;

    let startX = 0;
    let isDragging = false;

    slider.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
        isDragging = true;
    }, { passive: true });

    slider.addEventListener('touchend', e => {
        if (!isDragging) return;
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        const slides = document.querySelectorAll('.gallery-slide');

        if (Math.abs(diff) > 40) {
            if (diff > 0) {
                goToSlide((currentSlide + 1) % slides.length);          // swipe left → next
            } else {
                goToSlide((currentSlide - 1 + slides.length) % slides.length); // swipe right → prev
            }
        }
        isDragging = false;
    }, { passive: true });
})();


/* ----------------------------------------------------------
   4. MODALS
---------------------------------------------------------- */
function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
}

function closeModalOutside(event, id) {
    // Only close if the click target is the overlay backdrop itself
    if (event.target === event.currentTarget) {
        closeModal(id);
    }
}

// Close any open modal with Escape key
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.open').forEach(m => {
            closeModal(m.id);
        });
    }
});