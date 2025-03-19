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
    'SjdLQWZu1MY': 'https://example.com/test1',
    '3I9vBo4uPzE': 'https://example.com/test2',
    'QtCCmAcjdwI': 'https://example.com/test3',
    '1q3eSg9zoiQ': 'https://example.com/test4',
    '73d_quFOns4': 'https://example.com/test5',
    '5e-TNzuZuYs': 'https://example.com/test6',
    'dFoYurqckQ8': 'https://example.com/test7',
    '5ccHMhrvzH8': 'https://example.com/test8',
    '4MJx9cSu9qA': 'https://example.com/test9',
    'I_Ejm9dZGCM': 'https://example.com/test10',
    'm7r17LpAfGg': 'https://example.com/test11',
    'JJSOjToLMSU': 'https://example.com/test12',
    'Sz0G7_eojVY': 'https://example.com/test13',
    'IHrlQDJk5l8': 'https://example.com/test14',
    'AKFdIwQ2f98': 'https://example.com/test15',
    'puzyHmWq_n0': 'https://example.com/test16',
    'vWvtS8GaxoU': 'https://example.com/test17',
    '1qlAdyaGGXo': 'https://example.com/test18',
    'KitVY_FYeLs': 'https://example.com/test19',
    'jYLbbCSNcqo': 'https://example.com/test20',
    '79HYcgktfqM': 'https://example.com/test21',
    '8erN1rdXwTU': 'https://example.com/test22',
    'ekJ5vFzJSv4': 'https://example.com/test23',
    'kiqVYZR8v_E': 'https://example.com/test24',
    'tEp6TlV87qI': 'https://example.com/test25',
    'rk4_JiKNIQo': 'https://example.com/test26',
    'SDqMY5IRVcQ': 'https://example.com/test27',
    'Yo75lS5z9OQ': 'https://example.com/test28',
    'fMOt36By0wE': 'https://example.com/test29',
    '5s_vwrwbroA': 'https://example.com/test30',
    'aozNdUtCIMs': 'https://example.com/test31',
    'xR2CYp4Puik': 'https://example.com/test32',
    'cI90f2Et3E4': 'https://example.com/test33',
    'lwsJnYJE5rE': 'https://example.com/test34',
    'GwPUarJuxuE': 'https://example.com/test35',
    'PFIAtT0W9Rg': 'https://example.com/test36',
    'QG3gaKCPsys': 'https://example.com/test37',
    'BlDS5GnNjuY': 'https://example.com/test38',
    'jeX97HIn4m4': 'https://example.com/test39',
    'Aawqgu0ErUg': 'https://example.com/test40',
    'J113InQQCcE': 'https://example.com/test41',
    'dtIwNQcaElk': 'https://example.com/test42'
};


// Функция для открытия модального окна
function openVideoModal(videoUrl) {
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    const testButton = document.getElementById('testButton');

    // Извлекаем идентификатор видео из ссылки
    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
        alert('Неверный формат ссылки на видео.');
        return;
    }

    // Устанавливаем URL видео в iframe
    videoFrame.src = `https://www.youtube.com/embed/${videoId}`;

    // Проверяем, есть ли тест для этого видео
    if (testLinks[videoId]) {
        testButton.style.display = 'block'; // Показываем кнопку "Тест"
        testButton.onclick = function () {
            window.open(testLinks[videoId], '_blank');
        };
    } else {
        testButton.style.display = 'none'; // Скрываем кнопку, если теста нет
    }

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
