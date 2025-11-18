// Seleciona todos os botões de filtro e os cards de mentorias
const filtroBtns = document.querySelectorAll('.filtro-btn');
const mentorias = document.querySelectorAll('.mentoria');

// Função para mostrar mentorias de uma categoria específica
function filtrarMentorias(categoria) {
    mentorias.forEach(mentoria => {
        if (categoria === 'all' || mentoria.dataset.category === categoria) {
            mentoria.style.display = 'block'; // Mostra a mentoria
        } else {
            mentoria.style.display = 'none'; // Oculta a mentoria
        }
    });
}

// Adiciona evento de clique a cada botão de filtro
filtroBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove a classe 'active' de todos os botões e adiciona no clicado
        filtroBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filtra mentorias de acordo com o data-filter do botão
        filtrarMentorias(btn.dataset.filter);
    });
});

// Opcional: garante que todas a
