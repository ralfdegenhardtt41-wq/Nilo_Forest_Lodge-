document.addEventListener('DOMContentLoaded', () => {
    const btnDe = document.getElementById('btn-de');
    const btnEn = document.getElementById('btn-en');
    
    // Function to set language by picking up HTML data attributes
    function setLanguage(lang) {
        document.querySelectorAll('[data-de]').forEach(el => {
            if (lang === 'de') {
                el.textContent = el.getAttribute('data-de');
                if (el.tagName === 'A') el.innerHTML = el.getAttribute('data-de'); // Safety for links
            } else {
                el.textContent = el.getAttribute('data-en');
                if (el.tagName === 'A') el.innerHTML = el.getAttribute('data-en');
            }
        });

        // Toggle active button state
        if (lang === 'de') {
            btnDe.classList.add('active');
            btnEn.classList.remove('active');
            document.documentElement.lang = 'de';
        } else {
            btnEn.classList.add('active');
            btnDe.classList.remove('active');
            document.documentElement.lang = 'en';
        }
    }

    // Event listeners
    btnDe.addEventListener('click', () => setLanguage('de'));
    btnEn.addEventListener('click', () => setLanguage('en'));
    
    // Auto-detect browser language or default to 'en'
    const userLang = navigator.language || navigator.userLanguage;
    if (userLang.startsWith('de')) {
        setLanguage('de');
    } else {
        setLanguage('en');
    }

    // Image Slider Navigation
    const sliders = document.querySelectorAll('.slider-container');
    sliders.forEach(slider => {
        const imageTrack = slider.querySelector('.image-slider');
        const prevBtn = slider.querySelector('.prev-btn');
        const nextBtn = slider.querySelector('.next-btn');
        const dots = slider.querySelectorAll('.dot');
        
        if (!imageTrack || !prevBtn || !nextBtn || dots.length === 0) return;

        let currentIndex = 0;
        const totalImages = dots.length;

        function updateSlider(index) {
            const slideWidth = slider.clientWidth;
            imageTrack.scrollTo({
                left: index * slideWidth,
                behavior: 'smooth'
            });
        }

        function updateDots(index) {
            dots.forEach(dot => dot.classList.remove('active'));
            if(dots[index]) dots[index].classList.add('active');
        }

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalImages - 1;
            updateSlider(currentIndex);
            updateDots(currentIndex);
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex < totalImages - 1) ? currentIndex + 1 : 0;
            updateSlider(currentIndex);
            updateDots(currentIndex);
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateSlider(currentIndex);
                updateDots(currentIndex);
            });
        });

        // Update active dot on manual scroll
        imageTrack.addEventListener('scroll', () => {
            const slideWidth = slider.clientWidth;
            const scrollLeft = imageTrack.scrollLeft;
            // Add a small threshold to avoid jumping
            if (slideWidth > 0) {
                const index = Math.round(scrollLeft / slideWidth);
                if (index !== currentIndex && index < totalImages) {
                    currentIndex = index;
                    updateDots(currentIndex);
                }
            }
        });
    });
});
