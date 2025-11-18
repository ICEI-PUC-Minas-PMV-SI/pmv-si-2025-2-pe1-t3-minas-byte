function inicializarFiltros() {
    const filtros = document.querySelectorAll('.filtro-btn');

    filtros.forEach(filtro => {
        filtro.addEventListener('click', function () {
            // Remove active de todos os botões
            filtros.forEach(btn => btn.classList.remove('active'));
            // Adiciona active no botão clicado
            this.classList.add('active');

            const categoria = this.getAttribute('data-filter');
            const cursos = document.querySelectorAll('.curso');

            cursos.forEach(curso => {
                if (categoria === 'all' || curso.getAttribute('data-category') === categoria) {
                    curso.style.display = 'block';
                } else {
                    curso.style.display = 'none';
                }
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', inicializarFiltros);
