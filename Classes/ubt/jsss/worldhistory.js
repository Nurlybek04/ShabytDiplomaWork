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
    'PHdVzhLC2j8': 'https://example.com/test1',
    'aDjFVzRz9yQ': 'https://example.com/test2',
    'SU21Ps8PdCg': 'https://example.com/test3',
    'FRegwUjkQV0': 'https://example.com/test4',
    'p3XGrt_LKNg': 'https://example.com/test5',
    'VUxTxXR8zrk': 'https://example.com/test6',
    'SeAezP_X9LA': 'https://example.com/test7',
    'XeOUhJ_6sms': 'https://example.com/test8',
    'X6wnXS4Ywjs': 'https://example.com/test9',
    'DC1bbldOKNs': 'https://example.com/test10',
    'iR1ZmdPKY3s': 'https://example.com/test11',
    'RRzxsikKUs0': 'https://example.com/test12',
    '6_dTmXx9Qag': 'https://example.com/test13',
    'hRMjNndnOXk': 'https://example.com/test14',
    '6R300ZuOIC0': 'https://example.com/test15',
    '51cO_-BnFBw': 'https://example.com/test16',
    '1q_mSHTddt4': 'https://example.com/test17',
    'ePFe4APnKQY': 'https://example.com/test18',
    'r-c2bKwsgC8': 'https://example.com/test19',
    'suAAfLpXSVQ': 'https://example.com/test20',
    '5PQTfV4gGxc': 'https://example.com/test21',
    'CKo9FMjAE8k': 'https://example.com/test22',
    'QeL4OQxZAKE': 'https://example.com/test23',
    'oT4zqid1H2M': 'https://example.com/test24',
    'deGzWx3h8Bo': 'https://example.com/test25',
    'mtoErxNbkF8': 'https://example.com/test26',
    'dgWluRKExVE': 'https://example.com/test27',
    'p3YifhBHCxU': 'https://example.com/test28',
    'WtFRdcZIDXo': 'https://example.com/test29',
    'a4k4x65dlE0': 'https://example.com/test30',
    'SwLgAwG8lSg': 'https://example.com/test31',
    'VP_6Xj3HphQ': 'https://example.com/test32',
    'wQ18UKxjo4U': 'https://example.com/test33',
    'Phrt0zEFZ-E': 'https://example.com/test34',
    'OxMl01Z41ZU': 'https://example.com/test35',
    'QFUihUM-XCY': 'https://example.com/test36',
    'QFUihUM-XCY': 'https://example.com/test37',
    '0fsYC2msc74': 'https://example.com/test38',
    '5cU3WSe4zrc': 'https://example.com/test39',
    'BJTUWkXfqWw': 'https://example.com/test40'
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