let currentIndex = 0;
const cardsPerView = 3;

function moveCarousel(direction) {
    const container = document.getElementById('comentariosContainer');
    const cards = container.children;
    const totalCards = cards.length;
    const maxIndex = totalCards - cardsPerView;
    
    currentIndex += direction;
    
    if (currentIndex < 0) {
        currentIndex = 0;
    } else if (currentIndex > maxIndex) {
        currentIndex = maxIndex;
    }
    
    const cardWidth = cards[0].offsetWidth + 24; // largura do card + gap
    const translateX = -currentIndex * cardWidth;
    
    container.style.transform = translateX(${translateX}px);
}
