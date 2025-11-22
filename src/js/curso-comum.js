// Mapas de exibição
const CATEGORIAS_EXIBICAO = {
    basico: 'Digital Básico',
    programacao: 'Programação',
    dados: 'Dados',
    design: 'Design',
    gestao: 'Gestão'
};

const NIVEIS = {
    basico: 'Iniciante',
    programacao: 'Intermediário',
    dados: 'Iniciante',
    design: 'Iniciante',
    gestao: 'Iniciante'
};

// Criar card do curso
const criarCursoHTML = (c) => `
    <div class="curso" data-link="descricao.html" data-id="${c.id}" data-category="${c.categoria}">
        <img src="${c.imagem}" alt="${c.titulo}">
        <button class="btn-favorito"><img class="coracao" src="img/icons/coracao_blank.png"></button>
        <div class="curso-content">
            <div class="curso-topo">
                <span class="curso-categoria">${CATEGORIAS_EXIBICAO[c.categoria]}</span>
                <span class="curso-nivel">${NIVEIS[c.categoria]}</span>
            </div>
            <h3>${c.titulo}</h3>
            <p>${c.descricao}</p>
        </div>
        <div class="curso-footer">
            <div class="classificacao"><span>⭐</span><span class="rating">${(Math.random() * 0.5 + 4.5).toFixed(1)}</span></div>
            <button class="btn btn-inscreva">Inscreva-se</button>
        </div>
    </div>
`;

// Ativar eventos gerais
function ativarEventos() {
    const usuaria = JSON.parse(localStorage.getItem("usuariaLogada"));

    // Marcar favoritos
    if (usuaria) {
        const favoritos = JSON.parse(localStorage.getItem('cursosFavoritos')) || [];
        document.querySelectorAll('.curso').forEach(card => {
            const id = card.dataset.id;
            const btn = card.querySelector('.btn-favorito');
            const img = btn.querySelector('.coracao');

            if (favoritos.some(f => f.email === usuaria.email && f.cursoId == id)) {
                btn.classList.add('favorito');
                img.src = 'img/icons/coracao.png';
            }
        });
    }

    // Clique no card
    document.querySelectorAll(".curso").forEach(card => {
        card.style.cursor = "pointer";
        card.onclick = (e) => {
            if (e.target.closest(".btn-inscreva, .btn-favorito")) return;
            window.location.href = `${card.dataset.link}?id=${card.dataset.id}`;
        };
    });

    // Clique em "Inscreva-se"
    document.querySelectorAll(".btn-inscreva, .btn-inscrever").forEach(btn => {
        btn.onclick = (e) => {
            e.stopPropagation();
            const id = +btn.closest(".curso").dataset.id;
            inscreverCurso(id, btn);
        };
    });

    // Clique em favorito
    document.querySelectorAll('.btn-favorito').forEach(btn => {
        btn.onclick = (e) => {
            e.stopPropagation();
            toggleFavorito(btn);
        };
    });

    if (usuaria && usuariaService) inicializarBotoes();
}

// Favoritar curso
async function toggleFavorito(btn) {
    const usuaria = usuariaService?.getUsuariaLogada();
    if (!usuaria) return alert('Faça login para favoritar');

    const card = btn.closest('.curso');
    const id = +card.dataset.id;

    try {
        const perfil = await usuariaService.carregarPerfil(usuaria.id);
        const existe = perfil.favoritos.includes(id);

        await (existe
            ? usuariaService.removerFavorito(usuaria.id, id)
            : usuariaService.favoritarCurso(usuaria.id, id));

        atualizarBotaoFavorito(id, !existe);
    } catch {
        toggleFavoritoLocal(btn, id);
    }
}

// Favorito local
function toggleFavoritoLocal(btn, id) {
    const usuaria = JSON.parse(localStorage.getItem("usuariaLogada"));
    const favoritos = JSON.parse(localStorage.getItem('cursosFavoritos')) || [];
    const img = btn.querySelector('.coracao');

    const existe = favoritos.find(f => f.email === usuaria.email && f.cursoId === id);

    const novos = existe
        ? favoritos.filter(f => !(f.email === usuaria.email && f.cursoId === id))
        : [...favoritos, { email: usuaria.email, cursoId: id, data: new Date() }];

    localStorage.setItem('cursosFavoritos', JSON.stringify(novos));

    btn.classList.toggle('favorito', !existe);
    img.src = !existe ? 'img/icons/coracao.png' : 'img/icons/coracao_blank.png';
}

// Atualiza todos os botões favoritos do curso
function atualizarBotaoFavorito(id, ativo) {
    document.querySelectorAll(`[data-id="${id}"] .btn-favorito .coracao`)
        .forEach(img => img.src = ativo ? 'img/icons/coracao.png' : 'img/icons/coracao_blank.png');

    document.querySelectorAll(`[data-id="${id}"] .btn-favorito`)
        .forEach(btn => btn.classList.toggle('favorito', ativo));
}

// Inscrição em cursos
async function inscreverCurso(id, btn) {
    const usuaria = usuariaService?.getUsuariaLogada();
    if (!usuaria) return mostrarPopup("Atenção", "Faça login para se inscrever!", false);

    try {
        await usuariaService.inscreverCurso(usuaria.id, id);
        atualizarBotaoInscrito(btn, id, false);
        mostrarPopup(`Parabéns, ${usuaria.nome}!`, 'Inscrição realizada!', true, btn.closest('.curso'));
    } catch (err) {
        console.error(err);
        inscreverCursoLocal(btn);
    }
}

function inscreverCursoLocal(btn) {
    const usuaria = JSON.parse(localStorage.getItem("usuariaLogada"));
    btn.innerHTML = `<i class="fa-solid fa-play"></i> Iniciar Curso`;
    btn.classList.add("btn-continuar");
    mostrarPopup(`Parabéns, ${usuaria.nome}!`, 'Inscrição concluída!', true);
}

// Atualiza botão inscrito
function atualizarBotaoInscrito(btn, id, progresso) {
    btn.innerHTML = `<i class="fa-solid fa-play"></i> ${progresso ? 'Continuar' : 'Iniciar'} Curso`;
    btn.classList.add('btn-continuar');
    btn.onclick = () => window.location.href = `aula.html?id=${id}`;
}

// Popup
function mostrarPopup(t, msg, ok, card = null) {
    document.querySelector('.popup-inscricao')?.remove();

    const pop = document.createElement('div');
    pop.className = `popup-inscricao ${ok ? '' : 'erro'}`;
    pop.innerHTML = `
        <h3>${t}</h3>
        <p>${msg}</p>
        <div class="popup-buttons">
            <button class="btn-popup-ok">OK</button>
            ${ok ? `<button class="btn-popup-sala">Ir para a sala</button>` : ''}
        </div>
    `;

    document.body.appendChild(pop);

    pop.querySelector('.btn-popup-ok').onclick = () => pop.remove();
    if (ok && card)
        pop.querySelector('.btn-popup-sala').onclick = () =>
            window.location.href = `aula.html?id=${card.dataset.id}`;
}

// Inicializar botões (favoritos + inscritos)
async function inicializarBotoes() {
    try {
        const usuaria = usuariaService.getUsuariaLogada();
        const perfil = await usuariaService.carregarPerfil(usuaria.id);

        perfil.favoritos.forEach(id => atualizarBotaoFavorito(id, true));

        perfil.inscritos.forEach(id => {
            const card = document.querySelector(`[data-id="${id}"]`);
            const btn = card?.querySelector('.btn-inscreva, .btn-inscrever');
            const prog = perfil.progressoCursos[id] || 0;
            if (btn) atualizarBotaoInscrito(btn, id, prog);
        });
    } catch (e) {
        console.error('Erro ao inicializar botões:', e);
    }
}

// Exporta global
window.toggleFavorito = toggleFavorito;
window.inscreverCurso = inscreverCurso;
window.inicializarBotoes = inicializarBotoes;
