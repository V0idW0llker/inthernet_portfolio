// Слайдер проектов
const carouselTrack = document.querySelector('.carousel-track');
const carouselContainer = document.querySelector('.carousel-container');
const prevBtn = document.querySelector('.carousel-btn--prev');
const nextBtn = document.querySelector('.carousel-btn--next');

if (carouselTrack && carouselContainer) {
    const originalCards = [...carouselTrack.querySelectorAll('.project-card')];
    const totalOriginal = originalCards.length;

    originalCards.forEach((card) => {
        carouselTrack.appendChild(card.cloneNode(true));
    });

    const cards = carouselTrack.querySelectorAll('.project-card');
    let currentIndex = 0;
    let autoScrollInterval;
    let isPaused = false;
    let isDragging = false;
    let wasDragged = false;
    let blockCardClick = false;
    let dragStartX = 0;
    let dragOffset = 0;
    let transitionEnabled = true;

    const autoScrollDelay = 3000;
    const dragThreshold = 8;

    function getCardWidth() {
        return cards[0].offsetWidth + 24;
    }

    function setTransition(enabled) {
        transitionEnabled = enabled;
        carouselTrack.style.transition = enabled ? 'transform 0.5s ease-in-out' : 'none';
    }

    function applyTransform(index, offset = 0) {
        const translateX = -(index * getCardWidth()) + offset;
        carouselTrack.style.transform = `translateX(${translateX}px)`;
    }

    function goToSlide(index, animate = true) {
        setTransition(animate);
        currentIndex = index;
        applyTransform(currentIndex);
    }

    function normalizeIndex() {
        if (currentIndex >= totalOriginal) {
            currentIndex = 0;
            goToSlide(0, false);
        } else if (currentIndex < 0) {
            currentIndex = totalOriginal - 1;
            goToSlide(currentIndex, false);
        }
    }

    function nextSlide() {
        currentIndex++;
        goToSlide(currentIndex, true);
    }

    function prevSlide() {
        if (currentIndex <= 0) {
            currentIndex = totalOriginal;
            goToSlide(currentIndex, false);
            requestAnimationFrame(() => {
                currentIndex--;
                goToSlide(currentIndex, true);
            });
            return;
        }

        currentIndex--;
        goToSlide(currentIndex, true);
    }

    carouselTrack.addEventListener('transitionend', (e) => {
        if (e.propertyName !== 'transform') return;

        if (currentIndex >= totalOriginal) {
            currentIndex = 0;
            goToSlide(0, false);
        }
    });

    function startAutoScroll() {
        stopAutoScroll();
        autoScrollInterval = setInterval(() => {
            if (!isPaused && !isDragging) {
                nextSlide();
            }
        }, autoScrollDelay);
    }

    function stopAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
        }
    }

    function pauseAutoScroll() {
        isPaused = true;
    }

    function resumeAutoScroll() {
        isPaused = false;
    }

    function snapAfterDrag() {
        const cardWidth = getCardWidth();
        const threshold = cardWidth * 0.2;
        const offset = dragOffset;
        dragOffset = 0;

        if (offset < -threshold) {
            prevSlide();
        } else if (offset > threshold) {
            nextSlide();
        } else {
            goToSlide(currentIndex, true);
        }

        if (wasDragged) {
            blockCardClick = true;
        }
    }

    function onDragStart(clientX) {
        isDragging = true;
        wasDragged = false;
        dragStartX = clientX;
        dragOffset = 0;
        setTransition(false);
        stopAutoScroll();
        carouselContainer.classList.add('is-dragging');
    }

    function onDragMove(clientX) {
        if (!isDragging) return;

        dragOffset = clientX - dragStartX;

        if (Math.abs(dragOffset) > dragThreshold) {
            wasDragged = true;
        }

        applyTransform(currentIndex, dragOffset);
    }

    function onDragEnd() {
        if (!isDragging) return;

        isDragging = false;
        carouselContainer.classList.remove('is-dragging');
        setTransition(true);
        snapAfterDrag();
        startAutoScroll();
    }

    carouselContainer.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return;
        e.preventDefault();
        onDragStart(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
        onDragMove(e.clientX);
    });

    window.addEventListener('mouseup', () => {
        onDragEnd();
    });

    carouselContainer.addEventListener('touchstart', (e) => {
        onDragStart(e.touches[0].clientX);
    }, { passive: true });

    carouselContainer.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        onDragMove(e.touches[0].clientX);
    }, { passive: true });

    carouselContainer.addEventListener('touchend', () => {
        onDragEnd();
    }, { passive: true });

    carouselContainer.addEventListener('mouseenter', pauseAutoScroll);
    carouselContainer.addEventListener('mouseleave', () => {
        if (!isDragging) {
            resumeAutoScroll();
        }
    });

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoScroll();
            startAutoScroll();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoScroll();
            startAutoScroll();
        });
    }

    carouselTrack.addEventListener('click', (e) => {
        if (blockCardClick) {
            blockCardClick = false;
            wasDragged = false;
            return;
        }

        const card = e.target.closest('.project-card');
        if (!card) return;

        if (e.target.closest('.project-link--external')) return;

        const href = card.dataset.href;
        if (href) {
            e.preventDefault();
            window.open(href, '_blank', 'noopener');
        }
    });

    carouselTrack.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter' && e.key !== ' ') return;

        const card = e.target.closest('.project-card');
        if (!card || e.target.closest('.project-link--external')) return;

        e.preventDefault();
        const href = card.dataset.href;
        if (href) {
            window.open(href, '_blank', 'noopener');
        }
    });

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            normalizeIndex();
            goToSlide(currentIndex, false);
        }, 100);
    });

    startAutoScroll();
    setTimeout(() => goToSlide(0, false), 100);
}

console.log('Сайт-визитка Никишина Владислава');

// Копирование Discord-тега при клике
const discordBtn = document.getElementById('discord-btn');
const discordTag = '___Vladislav___';

if (discordBtn) {
    discordBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(discordTag).then(() => {
            showNotification('<b>Discord-тег скопирован:</b> ' + discordTag + '\n');

            setTimeout(() => {
                window.open('https://discord.com/app', '_blank');
            }, 1000);
        }).catch(err => {
            console.error('Не удалось скопировать:', err);
            alert('Тег: ' + discordTag);
            window.open('https://discord.com/app', '_blank');
        });
    });
}

function showNotification(message) {
    const oldNotification = document.querySelector('.custom-notification');
    if (oldNotification) oldNotification.remove();

    const notification = document.createElement('div');
    notification.className = 'custom-notification';
    notification.innerHTML = message;
    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 10);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 1000);
}
