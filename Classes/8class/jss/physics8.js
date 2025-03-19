function openVideo(url) {
    window.open(url, '_blank');
}

// Функция для извлечения идентификатора видео из ссылки
function extractVideoId(url) {
    const match = url.match(/youtu\.be\/([^?]+)/);
    return match ? match[1] : null;
}

// Массив ссылок на тесты (по порядку, как и видео)
const testLinks = {
    'vXHb9Uv25ZM': 'https://example.com/test1',
    'Teah6XNp72o': 'https://example.com/test2',
    'qUMlscQsje0': 'https://example.com/test3',
    'DKUx4ZmsFX8': 'https://example.com/test4',
    'T0HkPWSJPvs': 'https://example.com/test5',
    '-0yZHlhRr1o': 'https://example.com/test6',
    'ci0LyHkFZC8': 'https://example.com/test7',
    'V3Z0ipA6KHo': 'https://example.com/test8',
    'WZSvUft2NSY': 'https://example.com/test9',
    'CNxyfp5E5bg': 'https://example.com/test10',
    'fUeiFwdeSpQ': 'https://example.com/test11',
    '2l2ApP_KT88': 'https://example.com/test12',
    'rppbrzYogO0': 'https://example.com/test13',
    'aQ-6uzGLu3o': 'https://example.com/test14',
    'ZbLBxaMVXbk': 'https://example.com/test15',
    '0wOWNVnf1nQ': 'https://example.com/test16',
    '-Os3i7DuVBg': 'https://example.com/test17',
    'x246y5iEUx0': 'https://example.com/test18',
    'WrpazTVHgZs': 'https://example.com/test19',
    'U2YOCUkxhO4': 'https://example.com/test20',
    'OatNks-UtGI': 'https://example.com/test21',
    'yxOkGUlHaJQ': 'https://example.com/test22',
    'vmpXTsihcsA': 'https://example.com/test23',
    'G2-NP9J4eMA': 'https://example.com/test24',
    '1GL2guTfBW0': 'https://example.com/test25',
    'Zr6IybUO39g': 'https://example.com/test26',
    'BQWPMNUf4cY': 'https://example.com/test27',
    'VEDLAtOVZjs': 'https://example.com/test28',
    'fegeMKctRRA': 'https://example.com/test29',
    'PQsI0jzvbhE': 'https://example.com/test30',
    'XPt_iutRmfY': 'https://example.com/test31',
    'pijgXnjEL7c': 'https://example.com/test32',
    'X8XLI7uw-qw': 'https://example.com/test33',
    '69d3pemFUAg': 'https://example.com/test34',
    'W5WtI_3LYwo': 'https://example.com/test35',
    'JQRq9cc4ypM': 'https://example.com/test36',
    'xJ2oeAu6WG0': 'https://example.com/test37',
    'yY4_s93zn9o': 'https://example.com/test38',
    'v8Q3gjvM56A': 'https://example.com/test39',
    'CuhkWeX3hqE': 'https://example.com/test40',
    'ec7ZDjzYafM': 'https://example.com/test41',
    'nn5VkwtYTAk': 'https://example.com/test42',
    'oSjK74VVFr8': 'https://example.com/test43',
    'xLfVewF9L-E': 'https://example.com/test44',
    'eq2VtRyRgBY': 'https://example.com/test45'
};

// Функция для открытия модального окна
function openVideoModal(videoUrl) {
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    const testButton = document.getElementById('testButton');

    // Извлекаем идентификатор видео
    const videoId = extractVideoId(videoUrl);
    console.log("Открываем видео:", videoUrl);
    console.log("Извлеченный ID:", videoId);

    if (!videoId) {
        alert('Неверный формат ссылки на видео.');
        return;
    }

    // Устанавливаем URL видео в iframe
    videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

    // Проверяем, есть ли тест
    if (testLinks[videoId]) {
        console.log("Тест найден:", testLinks[videoId]);
        testButton.style.display = 'block';
        testButton.onclick = () => {
            console.log("Переход на тест:", testLinks[videoId]);
            window.open(testLinks[videoId], '_blank');
        };
    } else {
        console.log("Тест отсутствует");
        testButton.style.display = 'none';
    }

    // Показываем модальное окно
    modal.style.display = "flex";
}

// Функция для закрытия модального окна
function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');

    // Очищаем iframe, чтобы остановить видео
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
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const lessonCards = document.querySelectorAll('.lesson-card');

    lessonCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();

        if (title.includes(searchInput) || description.includes(searchInput)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}