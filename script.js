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

    initCardAppearObserver();
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


// let show1 = show2 = show3 = show4 = show5 = show6 = show7 = show8 = show9 = show10 = show11 = show12 = show13 = show14 = true;
// document.addEventListener("scroll", (event) => {

//     let aux = window.innerHeight*0.75;
//     let scrollY = window.scrollY + aux;
//     let scrollYBranches = window.scrollY + window.innerHeight;
//     var ceremonyContainer = document.getElementById('ceremony-container');
//     var receptionContainer = document.getElementById('reception-container');
//     var dressContainer = document.getElementById('dress-container');
//     var giftContainer = document.getElementById('gift-container');
//     var attendanceContainer = document.getElementById('attendance-container');
//     var nosotros1 = document.getElementById('nosotros1');
//     var nosotros2 = document.getElementById('nosotros2');
//     var nosotros3 = document.getElementById('nosotros3');
//     var nosotros4 = document.getElementById('nosotros4');
//     var nosotros5 = document.getElementById('nosotros5');

//     var branch1 = document.getElementsByClassName('first-branch')[0];
//     var branch2 = document.getElementsByClassName('second-branch')[0];
//     var branch3 = document.getElementsByClassName('third-branch')[0];
//     var branch4 = document.getElementsByClassName('fourth-branch')[0];




//     if(show1 && scrollY > ceremonyContainer.offsetTop){
//         show1 = false;
//         ceremonyContainer.classList.add("appear-element");
//     }
//     if(show2 && scrollY > receptionContainer.offsetTop){
//         show2 = false;
//         receptionContainer.classList.add("appear-element");
//     }
//     if(show3 && scrollY > dressContainer.offsetTop){
//         show3 = false;
//         dressContainer.classList.add("appear-element");
//     }
//     if(show4 && scrollY > giftContainer.offsetTop){
//         show4 = false;
//         giftContainer.classList.add("appear-element");
//     }
//     if(show5 && scrollY > attendanceContainer.offsetTop){
//         show5 = false;
//         attendanceContainer.classList.add("appear-element");
//     }

//     if(show6 && scrollY > nosotros1.offsetTop){
//         show6 = false;
//         nosotros1.classList.add('move-element');
//     }

//     if(show7 && scrollY > nosotros2.offsetTop){
//         show7 = false;
//         nosotros2.classList.add('move-element');
//     }

//     if(show8 && scrollY > nosotros3.offsetTop){
//         show8 = false;
//         nosotros3.classList.add('move-element');
//     }

//     if(show9 && scrollY > nosotros4.offsetTop){
//         show9 = false;
//         nosotros4.classList.add('move-element');
//     }

//     if(show10 && scrollY > nosotros5.offsetTop){
//         show10 = false;
//         nosotros5.classList.add('move-element');
//     }

//     if(show11 && scrollYBranches > branch2.offsetTop){
//         show11 = false;
//         branch2.classList.add('move-branch-left');
//     }

//     if(show12 && scrollYBranches > branch3.offsetTop){
//         show12 = false;
//         branch3.classList.add('move-branch-left');
//     }

//     if(show13 && scrollYBranches > branch1.offsetTop){
//         show13 = false;
//         branch1.classList.add('move-branch-right');
//     }

//     if(show14 && scrollYBranches > branch4.offsetTop){
//         show14 = false;
//         branch4.classList.add('move-branch-right');
//     }
// });

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
    const phoneNumber = '573136568109';
    const message = 'Hola,%20quiero%20confirmar%20mi%20asistencia%20a%20la%20boda%20de%20Luisa%20%26%20José.%20Mi%20nombre%20es:';
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