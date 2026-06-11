// Пустой файл - слайдер проектов больше не используется
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