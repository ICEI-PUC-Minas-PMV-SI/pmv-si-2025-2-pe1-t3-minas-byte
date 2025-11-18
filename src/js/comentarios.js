let pos = 0;
let totalCards = 5;

function moveCarousel(dir) {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        // Mobile: mostra um comentário por vez
        const cards = document.querySelectorAll('.comentario-card');
        cards[pos].style.display = 'none';

        pos += dir;
        if (pos >= totalCards) pos = 0;
        if (pos < 0) pos = totalCards - 1;

        cards[pos].style.display = 'block';
    } else {
        // Desktop: carrossel normal
        pos += dir;
        if (pos > 2) pos = 0;
        if (pos < 0) pos = 2;

        document.getElementById('comentariosContainer').style.transform = 'translateX(' + (-pos * 424) + 'px)';
    }
}

// Ajusta visualização quando redimensiona a tela
window.addEventListener('resize', () => {
    const isMobile = window.innerWidth <= 768;
    const cards = document.querySelectorAll('.comentario-card');

    if (isMobile) {
        // Mobile: esconde todos exceto o atual
        cards.forEach((card, index) => {
            card.style.display = index === pos ? 'block' : 'none';
        });
        document.getElementById('comentariosContainer').style.transform = 'translateX(0)';
    } else {
        // Desktop: mostra todos
        cards.forEach(card => {
            card.style.display = 'block';
        });
        document.getElementById('comentariosContainer').style.transform = 'translateX(' + (-pos * 424) + 'px)';
    }
});

// Inicializa corretamente
document.addEventListener('DOMContentLoaded', () => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        const cards = document.querySelectorAll('.comentario-card');
        cards.forEach((card, index) => {
            card.style.display = index === 0 ? 'block' : 'none';
        });
    }
});
