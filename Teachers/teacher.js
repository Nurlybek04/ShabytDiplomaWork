// Show active section
document.querySelectorAll('.menu li').forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class from all items
        document.querySelectorAll('.menu li').forEach(li => li.classList.remove('active'));

        // Add active class to clicked item
        item.classList.add('active');

        // Hide all sections
        document.querySelectorAll('section').forEach(section => section.classList.add('hidden'));

        // Show the selected section
        const target = item.querySelector('a').getAttribute('href');
        document.querySelector(target).classList.remove('hidden');
    });
});