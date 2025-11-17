let dados = {};

async function init() {
    const response = await fetch('./db.json');
    dados = await response.json();
    trocarPerfil('AL001');
}

function trocarPerfil(id) {
    const perfil = dados.perfis.find(p => p.id === id);
    if (!perfil) return;

    // Foto e nome
    document.querySelector('.foto img').src = perfil.foto;
    document.querySelector('h2').textContent = perfil.nome;
    document.querySelector('.cargo').textContent = perfil.cargo;

    // Habilidades
    const tags = document.querySelector('.tags');
    // CORREÇÃO 1: Deve usar template literal (crase `) para interpolação (span...)
    tags.innerHTML = perfil.habilidades.map(h => `<span class="badge-primary">${h}</span>`).join('');

    // Contato
    const contato = document.querySelector('.dados-contato');
    contato.innerHTML = `
        <div class="linha flex-start spacing-sm"><i class="fa-solid fa-envelope icon-sm"></i><span class="text-sm">${perfil.email}</span></div>
        <div class="linha flex-start spacing-sm"><i class="fa-solid fa-calendar icon-sm"></i><span class="text-sm">Membro desde ${perfil.membroDesde}</span></div>
        <div class="linha flex-start spacing-sm"><i class="fa-solid fa-phone icon-sm"></i><span class="text-sm">${perfil.telefone}</span></div>
        <div class="linha flex-start spacing-sm"><i class="fa-solid fa-location-dot icon-sm"></i><span class="text-sm">${perfil.localizacao}</span></div>
    `;

    // Curso atual
    if (perfil.cursoAtual) {
        document.querySelector('.card-title').textContent = perfil.cursoAtual.titulo;
        // CORREÇÃO 2: Deve usar template literal (crase `) para a string inteira
        document.querySelector('.aulas').textContent = `${perfil.cursoAtual.aulasCompletas}/${perfil.cursoAtual.totalAulas} aulas`;
        // CORREÇÃO 3: Deve usar template literal (crase `) para a string inteira
        document.querySelector('.progresso').style.width = `${perfil.cursoAtual.progresso}%`;
        // CORREÇÃO 4: Deve usar template literal (crase `) para a string inteira
        document.querySelector('.proxima-aula p').innerHTML = `<strong>Próxima aula:</strong> ${perfil.cursoAtual.proximaAula}`;
    }

    // Favoritos
    const favoritos = document.getElementById('cursosFavoritos');
    if (perfil.cursosFavoritos && perfil.cursosFavoritos.length > 0) {
        const cursosFav = perfil.cursosFavoritos.map(id => dados.cursos.find(c => c.id === id)).filter(c => c);
        favoritos.innerHTML = cursosFav.map(curso => `
            <div class="curso-favorito">
                <div class="curso-info">
                    <img src="${curso.imagem}" alt="${curso.titulo}" class="curso-thumb">
                    <div class="curso-detalhes">
                        <h4 class="curso-titulo">${curso.titulo}</h4>
                        <p class="curso-descricao">${curso.descricao}</p>
                        <div class="curso-meta">
                            <span class="badge-outline">${curso.categoria}</span>
                            <span class="text-xs">${curso.cargaHoraria}</span>
                        </div>
                    </div>
                </div>
                <button class="btn-base btn-primary btn-sm" onclick="window.location.href='descricao.html?id=${curso.id}'">Ver Curso</button>
            </div>
        `).join('');
    }

    // Medalhas
    const medalhas = document.querySelector('.conquistas');
    if (perfil.medalhas) {
        medalhas.innerHTML = '<h3 class="card-title">Medalhas e Conquistas</h3>' +
            perfil.medalhas.map(m => `
            <div class="medalha ${m.tipo} flex-start spacing-md">
                <i class="fa-solid ${m.icone} icon-lg" style="color: ${getCor(m.tipo)};"></i>
                <div>
                    <p class="titulo text-base font-weight-600">${m.titulo}</p>
                    <p class="descricao text-sm">${m.descricao}</p>
                    <p class="data text-xs">Conquistada em ${formatData(m.dataConquista)}</p>
                </div>
            </div>
        `).join('');
    }

    // Certificados
    const certificados = document.querySelector('.certificados');
    if (perfil.certificados) {
        certificados.innerHTML = '<h3 class="card-title">Certificados</h3>' +
            perfil.certificados.map(c => `
            <div class="certificado">
                <p class="titulo heading-sm">${c.titulo}</p>
                <p class="descricao text-sm">Emitido em: ${formatData(c.dataEmissao)}</p>
                <p class="descricao text-sm">Carga horária: ${c.cargaHoraria}</p>
                <div class="botoes flex-start spacing-md">
                    <button class="btn-base btn-outline"><i class="fa-regular fa-eye icon-sm"></i> Visualizar</button>
                    <button class="btn-base btn-primary"><i class="fa-solid fa-download icon-sm"></i> Download</button>
                </div>
            </div>
        `).join('');
    }
}

function getCor(tipo) {
    const cores = { comum: '#fbbf24', rara: '#8b5cf6', epica: '#f59e0b', lendaria: '#ef4444' };
    return cores[tipo] || '#6b7280';
}

function formatData(data) {
    return new Date(data).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}

document.addEventListener('DOMContentLoaded', init);