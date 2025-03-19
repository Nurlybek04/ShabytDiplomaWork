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
        'zaeUPYBB70s': 'https://example.com/test1',
        'bQYroMBs0o4': 'https://example.com/test2',
        'fc7z1OHqoa8': 'https://example.com/test3',
        'jTG3vgJh0jU': 'https://example.com/test4',
        'UPW3tg2Yr1M': 'https://example.com/test5',
        'MLet_4wKUbU': 'https://example.com/test6',
        'Yk08ePxE2xU': 'https://example.com/test7',
        'TO1-RuSkShQ': 'https://example.com/test8',
        'fzW3s6EdeKY': 'https://example.com/test9',
        '-vdnsisQKOE': 'https://example.com/test10',
        'i-FrJC52AFE': 'https://example.com/test11',
        'ispel1XSzRw': 'https://example.com/test12',
        'r2LPTjp5v10': 'https://example.com/test13',
        'mAUNKWuXIBU': 'https://example.com/test14',
        'JHKmgVBZ3eo': 'https://example.com/test15',
        '7U74leKCrK8': 'https://example.com/test16',
        'xzy8ArkxTmg': 'https://example.com/test17',
        '-0LtI19-_To': 'https://example.com/test18',
        'h03Vl6uKw9o': 'https://example.com/test19',
        '4fB8EufBVTY': 'https://example.com/test20',
        'HhhS3_SzCdg': 'https://example.com/test21',
        'EjwSffsP_c8': 'https://example.com/test22',
        'baCpPtb1PkI': 'https://example.com/test23',
        'keLYAjLdQRs': 'https://example.com/test24',
        'q5_B9Jp5F5c': 'https://example.com/test25',
        's5e20YYGz6U': 'https://example.com/test26',
        'selAIzDhEKg': 'https://example.com/test27',
        '2K2SyBjOuYw': 'https://example.com/test28',
        'FZrAQH3C2fU': 'https://example.com/test29',
        'X4FD6CUH67E': 'https://example.com/test30',
        'vPkiUS8TA4Q': 'https://example.com/test31',
        'DLZaOuHwiss': 'https://example.com/test32',
        'VIUH-udHQ9c': 'https://example.com/test33',
        'N05tAMP7-js': 'https://example.com/test34',
        'rFym33uCwsI': 'https://example.com/test35',
        'PSoHp9XB9Jg': 'https://example.com/test36',
        'AOH3m5f2hqY': 'https://example.com/test37',
        '0E36zGqcZ5k': 'https://example.com/test38',
        'FB1ey-zdkx4': 'https://example.com/test39',
        'RcDbW2VU9Mc': 'https://example.com/test40',
        'g3rXY1_htX0': 'https://example.com/test41',
        'o5GGYV0lM6M': 'https://example.com/test42',
        'SENkDoy82Ng': 'https://example.com/test43',
        '5qjk8zipEe8': 'https://example.com/test44',
        'kbH_c5sR0Yo': 'https://example.com/test45',
        'rsMTGzRERjE': 'https://example.com/test46',
        '8qcVsB5qzV4': 'https://example.com/test47',
        'EPa0R0oLAU4': 'https://example.com/test48',
        '_fKXAVGnmGI': 'https://example.com/test49',
        'XWMcz8WyRBQ': 'https://example.com/test50',
        '16SwW7lyh3I': 'https://example.com/test51',
        'T1-uqHL8zUY': 'https://example.com/test52',
        'N_rLOao5R8E': 'https://example.com/test53',
        'f29PKP4-0Zw': 'https://example.com/test54'
};


// Функция для открытия модального окна
function openVideoModal(videoUrl) {
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    const testButton = document.getElementById('testButton');

    // Извлекаем идентификатор видео
    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
        alert('Неверный формат ссылки на видео.');
        return;
    }

    // Устанавливаем URL видео в iframe
    videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

    // Проверяем, есть ли тест
    if (testLinks[videoId]) {
        testButton.style.display = 'block';
        testButton.onclick = () => window.open(testLinks[videoId], '_blank');
    } else {
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
