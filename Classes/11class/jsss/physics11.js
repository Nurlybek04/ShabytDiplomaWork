function openVideo(url) {
    window.open(url, '_blank');
}

// Функция для извлечения идентификатора видео из ссылки
function extractVideoId(url) {
    // Для ссылок формата https://youtu.be/VIDEO_ID?si=...
    const match = url.match(/youtu\.be\/([^?]+)/);
    return match ? match[1] : null;
}

// Функция для открытия модального окна
function openVideoModal(videoUrl) {
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    
    // Извлекаем идентификатор видео из ссылки
    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
        alert('Неверный формат ссылки на видео.');
        return;
    }
    
    // Устанавливаем URL видео в iframe
    videoFrame.src = `https://www.youtube.com/embed/${videoId}`;
    
    // Показываем модальное окно
    modal.style.display = 'block';
}

// Функция для закрытия модального окна
function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    
    // Очищаем iframe, чтобы остановить воспроизведение видео
    videoFrame.src = '';
    
    // Скрываем модальное окно
    modal.style.display = 'none';
}

// Закрытие модального окна при клике вне его области
window.onclick = function(event) {
    const modal = document.getElementById('videoModal');
    if (event.target === modal) {
        closeVideoModal();
    }
};

function filterLessons() {
    // Получаем значение из поля ввода
    const searchInput = document.getElementById('searchInput').value.toLowerCase();

    // Находим все карточки уроков
    const lessonCards = document.querySelectorAll('.lesson-card');

    // Проходим по каждой карточке и проверяем совпадение
    lessonCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();

        // Проверяем, содержится ли введенное значение в заголовке или описании
        if (title.includes(searchInput) || description.includes(searchInput)) {
            card.style.display = ''; // Показываем карточку
        } else {
            card.style.display = 'none'; // Скрываем карточку
        }
    });
}