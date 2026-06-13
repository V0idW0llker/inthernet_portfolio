// Слайдер проектов
const carouselTrack = document.querySelector('.carousel-track');
const carouselContainer = document.querySelector('.carousel-container');
const indicatorsContainer = document.querySelector('.carousel-indicators');

if (carouselTrack && carouselContainer && indicatorsContainer) {
    const cards = document.querySelectorAll('.project-card');
    const totalCards = cards.length;
    let currentIndex = 0;
    let autoScrollInterval;
    let isPaused = false;
    
    // Настройки слайдера
    const cardsPerView = 3;
    const autoScrollDelay = 3000;
    
    // Создаем индикаторы
    function createIndicators() {
        const maxIndicators = totalCards - cardsPerView + 1;
        for (let i = 0; i < maxIndicators; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'carousel-indicator' + (i === 0 ? ' active' : '');
            indicator.addEventListener('click', () => goToSlide(i));
            indicatorsContainer.appendChild(indicator);
        }
    }
    
    // Получаем ширину одной карточки с отступом
    function getCardWidth() {
        return cards[0].offsetWidth + 20; // ширина карточки + gap
    }
    
    // Переход к конкретному слайду
    function goToSlide(index) {
        const maxIndex = totalCards - cardsPerView;
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        
        const translateX = -(currentIndex * getCardWidth());
        carouselTrack.style.transform = `translateX(${translateX}px)`;
        
        // Обновляем индикаторы
        const indicators = document.querySelectorAll('.carousel-indicator');
        indicators.forEach((ind, i) => {
            ind.classList.toggle('active', i === currentIndex);
        });
    }
    
    // Следующий слайд (зацикленный)
    function nextSlide() {
        const maxIndex = totalCards - cardsPerView;
        if (currentIndex >= maxIndex) {
            currentIndex = 0; // Зацикливаем - возвращаемся к началу
        } else {
            currentIndex++;
        }
        goToSlide(currentIndex);
    }
    
    // Автоматическая прокрутка (в одну сторону)
    function startAutoScroll() {
        stopAutoScroll(); // Очистить предыдущий интервал
        autoScrollInterval = setInterval(() => {
            if (!isPaused) {
                nextSlide();
            }
        }, autoScrollDelay);
    }
    
    // Остановка автоматической прокрутки
    function stopAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
        }
    }
    
    // Пауза при наведении на карточку
    carouselContainer.addEventListener('mouseenter', () => {
        isPaused = true;
    });
    
    carouselContainer.addEventListener('mouseleave', () => {
        isPaused = false;
    });
    
    // Свайп для мобильных устройств
    let touchStartX = 0;
    let touchEndX = 0;
    
    carouselContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoScroll();
    }, { passive: true });
    
    carouselContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoScroll();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Свайп влево - следующий слайд
                nextSlide();
            } else {
                // Свайп вправо - предыдущий слайд
                const maxIndex = totalCards - cardsPerView;
                if (currentIndex > 0) {
                    currentIndex--;
                    goToSlide(currentIndex);
                }
            }
        }
    }
    
    // Обработка изменения размера окна
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            goToSlide(currentIndex);
        }, 100);
    });
    
    // Инициализация
    createIndicators();
    startAutoScroll();
    
    // Пересчет при изменении размера
    setTimeout(() => goToSlide(0), 100);
}

console.log('Сайт-визитка Никишина Владислава');

// Копирование Discord-тега при клике
const discordBtn = document.getElementById('discord-btn');
const discordTag = '___Vladislav___';

discordBtn.addEventListener('click', () => {
    // Копируем тег в буфер обмена
    navigator.clipboard.writeText(discordTag).then(() => {
        // Показываем кастомное уведомление
        showNotification('<b>Discord-тег скопирован:</b> ' + discordTag + '\n');
        
        // Через 1 секунду закрываем уведомление и переходим на Discord
        setTimeout(() => {
            window.open('https://discord.com/app', '_blank');
        }, 1000);
    }).catch(err => {
        console.error('Не удалось скопировать:', err);
        alert('Тег: ' + discordTag);
        window.open('https://discord.com/app', '_blank');
    });
});


// Функция для показа уведомления
function showNotification(message) {
    // Убираем старое уведомление если есть
    const oldNotification = document.querySelector('.custom-notification');
    if (oldNotification) oldNotification.remove();
    
    // Создаём уведомление
    const notification = document.createElement('div');
    notification.className = 'custom-notification';
    notification.innerHTML = message; // используем innerHTML для поддержки HTML-тегов
    document.body.appendChild(notification);
    
    // Показываем с анимацией
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Скрываем через 1 секунду
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 1000);
}

