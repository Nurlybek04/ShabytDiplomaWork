let search = document.querySelector('.search-box');

document.querySelector('#search-icon').onclick = () => {
    search.classList.toggle('active');
    menu.classList.remove('active');
}

let menu = document.querySelector('.navbar');

document.querySelector('#menu-icon').onclick = () => {
    menu.classList.toggle('active');
    search.classList.remove('active');
}
window.onscroll = () => {
    menu.classList.remove('active');
    search.classList.remove('active');
}
// Header
let header = document.querySelector('header');

window.addEventListener('scroll' , () => {
    header.classList.toggle('shadow', window.scrollY > 0);
});

document.getElementById('search-input').addEventListener('input', function () {
    const query = this.value.toLowerCase(); // Get the search query and convert to lowercase
    const sections = document.querySelectorAll('.searchable'); // Select all searchable sections

    sections.forEach(section => {
        const sectionText = section.textContent.toLowerCase(); // Get the text content of the section
        if (sectionText.includes(query)) {
            section.style.display = 'block'; // Show the section if it matches the query
        } else {
            section.style.display = 'none'; // Hide the section if it doesn't match
        }
    });
});


// Время бездействия в миллисекундах (например, 5 минут = 300000 мс)
const inactivityTime = 600000; // 10 минут

let inactivityTimer;

// Функция сброса таймера бездействия
function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(logoutUser, inactivityTime);
}

// Функция, которая выполняется при бездействии
function logoutUser() {
    alert("Сіз әрекетсіздікке байланысты автоматты түрде жүйеден шығарылдыңыз.");
    // Здесь можно добавить код для выхода из системы или перенаправления
    window.location.href = "form.html"; // Например, перенаправление на страницу выхода
}

// Отслеживание событий активности пользователя
function setupInactivityListener() {
    window.onload = resetInactivityTimer;
    document.onmousemove = resetInactivityTimer;
    document.onkeypress = resetInactivityTimer;
    document.onclick = resetInactivityTimer;
    document.onscroll = resetInactivityTimer;
}

// Инициализация слушателя бездействия
setupInactivityListener();