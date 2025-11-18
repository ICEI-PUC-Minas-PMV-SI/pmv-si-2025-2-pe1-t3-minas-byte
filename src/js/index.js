// Carrega cursos dinamicamente do JSON
async function carregarCursos() {
    try {
        const response = await fetch('json/cursos.json');
        const data = await response.json();
        renderizarCursos(data.cursos);
        // Reinicializa filtros após carregar cursos
        if (typeof inicializarFiltros === 'function') {
            inicializarFiltros();
        }
    } catch (error) {
        console.error('Erro ao carregar cursos:', error);
    }
}

function renderizarCursos(cursos) {
    const container = document.querySelector('.cursos');
    if (!container) return;

    // Mapear categorias para nomes de exibição
    const categorias = {
        'basico': 'Digital Básico',
        'programacao': 'Programação', 
        'dados': 'Dados',
        'design': 'Design',
        'gestao': 'Gestão'
    };

    // Mapear níveis
    const niveis = {
        'basico': 'Iniciante',
        'programacao': 'Intermediário',
        'dados': 'Iniciante', 
        'design': 'Iniciante',
        'gestao': 'Iniciante'
    };

    // Selecionar cursos de cada categoria
    const cursosCategoria = {
        'basico': cursos.filter(c => c.categoria === 'basico').slice(0, 2),
        'programacao': cursos.filter(c => c.categoria === 'programacao').slice(0, 3),
        'dados': cursos.filter(c => c.categoria === 'dados').slice(0, 1),
        'design': cursos.filter(c => c.categoria === 'design').slice(0, 2),
        'gestao': cursos.filter(c => c.categoria === 'gestao').slice(0, 3)
    };

    const cursosParaExibir = [
        ...cursosCategoria.basico,
        ...cursosCategoria.programacao,
        ...cursosCategoria.dados,
        ...cursosCategoria.design,
        ...cursosCategoria.gestao
    ];

    container.innerHTML = cursosParaExibir.map(curso => `
        <div class="curso" data-category="${curso.categoria}" data-link="descricao.html" data-id="${curso.id}">
            <img src="${curso.imagem}" alt="${curso.titulo}">
            <button class="btn-favorito" onclick="toggleFavorito(this)">
                <img class="coracao" src="img/icons/coracao_blank.png" alt="Favorito">
            </button>
            <div class="curso-content">
                <div class="curso-topo">
                    <span class="curso-categoria">${categorias[curso.categoria] || curso.categoria}</span>
                    <span class="curso-nivel">${niveis[curso.categoria] || 'Iniciante'}</span>
                </div>
                <h3>${curso.titulo}</h3>
                <p>${curso.descricao}</p>
            </div>
            <div class="curso-footer">
                <div class="classificacao">
                    <img src="https://images.emojiterra.com/twitter/v14.0/1024px/2b50.png" alt="Estrela" class="star-icon">
                    <span class="rating">${(Math.random() * 0.5 + 4.5).toFixed(1)}</span>
                </div>
                <button class="btn btn-inscreva" onclick="window.location.href='descricao.html?id=${curso.id}'">Inscreva-se</button>
            </div>
        </div>
    `).join('');
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', carregarCursos);
