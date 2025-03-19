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
    'NX3qsQLKRq8': 'https://example.com/test1',
    'hB0rGX-GsSY': 'https://example.com/test2',
    'jWKqbi-xQhc': 'https://example.com/test3',
    '2OsRXZGudW0': 'https://example.com/test4',
    'WIkS1aKc1T8': 'https://example.com/test5',
    'vnpZC2MIeGM': 'https://example.com/test6',
    'nHsF_kopBW4': 'https://example.com/test7',
    'S1cm_I1O9fE': 'https://example.com/test8',
    '4AHHuytv4Lg': 'https://example.com/test9',
    'z050LPpcZQ4': 'https://example.com/test10',
    'pOc-nyqeHf4': 'https://example.com/test11',
    'wHWigBhHQ44': 'https://example.com/test12',
    'uWHDfpGEiPk': 'https://example.com/test13',
    '3Q4QJmDo3us': 'https://example.com/test14',
    'AFvJ-WsLwUU': 'https://example.com/test15',
    'KK3mVZDmGBs': 'https://example.com/test16',
    '7b0BOG46o-A': 'https://example.com/test17',
    'llhXTxEx3g8': 'https://example.com/test18',
    'DgiOYdhL5m8': 'https://example.com/test19',
    'boXOMZaHBaY': 'https://example.com/test20',
    'Lo9pqZ_h0To': 'https://example.com/test21',
    'vn1IOtuY6bE': 'https://example.com/test22',
    'h_otRqNhFnk': 'https://example.com/test23',
    'JKuVMMexjFE': 'https://example.com/test24',
    'L56zdT3bBiA': 'https://example.com/test25',
    '95Ft0YpscZ8': 'https://example.com/test26',
    'x4QVPkHdmJc': 'https://example.com/test27',
    'Rl906PI0rDg': 'https://example.com/test28',
    'ttHStgKATo0': 'https://example.com/test29',
    'pNa4Yy7hS_8': 'https://example.com/test30',
    'PmfNWfifo-0': 'https://example.com/test31',
    'sXYSISa_OjY': 'https://example.com/test32',
    '0ZO6KL1_BJY': 'https://example.com/test33',
    'uEkOX3IAllQ': 'https://example.com/test34',
    'oi8WxLX2nHg': 'https://example.com/test35',
    'JDL0ttWWiG0': 'https://example.com/test36',
    'JzZytJ-3a3o': 'https://example.com/test37',
    'wY6ZZSXZ-pM': 'https://example.com/test38',
    'AfOHCxgFU0E': 'https://example.com/test39',
    'tdrX5XjQ2MU': 'https://example.com/test40',
    'bVZN5F_qpSA': 'https://example.com/test41',
    'lbY3vDfIELo': 'https://example.com/test42',
    'H010JHnXgGA': 'https://example.com/test43',
    'i1RwTOA-340': 'https://example.com/test44',
    '7KPfauCNPs4': 'https://example.com/test45',
    'stPusGiBpE4': 'https://example.com/test46',
    'T7QBZ5TUTuY': 'https://example.com/test47',
    'VSELmPj236U': 'https://example.com/test48',
    'xwimB9gXc9E': 'https://example.com/test49',
    'OZxBT6iQwyk': 'https://example.com/test50',
    'vWGHPOY8Phg': 'https://example.com/test51',
    'MLet_4wKUbU': 'https://example.com/test52'
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