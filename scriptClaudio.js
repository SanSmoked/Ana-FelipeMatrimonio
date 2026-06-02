/* ============================================================
   script.js — Ana & Felipe Wedding Invitation
============================================================ */

/* ----------------------------------------------------------
   1. COUNTDOWN TIMER
---------------------------------------------------------- */
function updateCountdown() {
    // Wedding date: August 15, 2025 at 2:30 PM
    const weddingDate = new Date('2025-08-15T14:30:00');
    const now = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
        document.getElementById('days').textContent    = '00';
        document.getElementById('hours').textContent   = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }

    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const pad = n => String(n).padStart(2, '0');

    document.getElementById('days').textContent    = pad(days);
    document.getElementById('hours').textContent   = pad(hours);
    document.getElementById('minutes').textContent = pad(minutes);
    document.getElementById('seconds').textContent = pad(seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);


/* ----------------------------------------------------------
   2. SCROLL FADE-IN SECTIONS
---------------------------------------------------------- */
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.fade-in-section').forEach(el => observer.observe(el));


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
    track.style.transform = `translateX(-${100 * currentSlide}%)`;

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


/* ----------------------------------------------------------
   5. SONG SUGGESTION
---------------------------------------------------------- */
function submitSong() {
    const name  = document.getElementById('song-name')?.value.trim();
    const title = document.getElementById('song-title')?.value.trim();
    const link  = document.getElementById('song-link')?.value.trim();

    if (!name || !title) {
        alert('Por favor completa tu nombre y el nombre de la canción.');
        return;
    }

    // Build WhatsApp message
    let msg = `🎵 Sugerencia de canción para Ana & Felipe\n\n👤 Nombre: ${name}\n🎶 Canción: ${title}`;
    if (link) msg += `\n🔗 Link: ${link}`;

    const encoded = encodeURIComponent(msg);
    // Replace +57XXXXXXXXXX with the actual WhatsApp number
    window.open(`https://wa.me/57XXXXXXXXXX?text=${encoded}`, '_blank');

    closeModal('music-modal');
}


/* ----------------------------------------------------------
   6. GOOGLE MAPS LINKS
---------------------------------------------------------- */
function openGoogleMaps(type) {
    const urls = {
        ceremony  : 'https://maps.google.com/?q=Batallon+Juan+De+Dios+Cañas',
        reception : 'https://maps.google.com/?q=Medellin+Colombia',
    };
    const url = urls[type] || 'https://maps.google.com';
    window.open(url, '_blank');
}


/* ----------------------------------------------------------
   7. ATTENDANCE CONFIRMATION
---------------------------------------------------------- */
function confirmation() {
    const msg = '¡Hola! Quiero confirmar mi asistencia a la boda de Ana & Felipe 🤍';
    const encoded = encodeURIComponent(msg);
    // Replace +57XXXXXXXXXX with the actual WhatsApp number
    window.open(`https://wa.me/57XXXXXXXXXX?text=${encoded}`, '_blank');
}


/* ----------------------------------------------------------
   8. ADD EVENT TO CALENDAR
---------------------------------------------------------- */
function addEventToCalendar() {
    const start  = '20250815T143000';
    const end    = '20250815T230000';
    const title  = encodeURIComponent('Boda Ana & Felipe');
    const details = encodeURIComponent('¡Celebramos el día más especial de nuestras vidas!');
    const location = encodeURIComponent('Batallón Juan De Dios Cañas, Colombia');

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
    window.open(url, '_blank');
}
