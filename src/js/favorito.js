function toggleFavorito(btn) {
    const coracao = btn.querySelector('.coracao');

    btn.classList.toggle('favorito');

    if (btn.classList.contains('favorito')) {
        coracao.src = 'img/icons/coracao.png';
    } else {
        coracao.src = 'img/icons/coracao_blank.png';
    }
}