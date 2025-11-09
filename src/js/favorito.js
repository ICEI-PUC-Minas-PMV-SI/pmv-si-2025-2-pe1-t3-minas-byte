function toggleFavorito(cursoId) {
    const btn = document.querySelector(button[onclick = "toggleFavorito(${cursoId})"]);
    const coracao = btn.querySelector('.coracao');

    if (coracao.textContent === '♡') {
        coracao.textContent = '♥';
        coracao.style.color = '#ef4444';
    } else {
        coracao.textContent = '♡';
        coracao.style.color = '';
    }
}