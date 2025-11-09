let pos = 0;

function moveCarousel(dir) {
    pos += dir;
    if (pos > 2) pos = 0;
    if (pos < 0) pos = 2;

    document.getElementById('comentariosContainer').style.transform = 'translateX(' + (-pos * 424) + 'px)';
}