let dados = {};

async function init() {
    const usuariaLogada = usuariaService.getUsuariaLogada();
    if (!usuariaLogada) {
        window.location.href = 'login.html';
        return;
    }

    try {
        const [cursosData, mentorasData, perfilCompleto] = await Promise.all([
            app && typeof app.getCursos === 'function' ? app.getCursos() : fetch('./json/cursos.json').then(r => r.json()),
            app && typeof app.getResource === 'function' ? app.getResource('mentoras') : fetch('./json/mentoras.json').then(r => r.json()),
            usuariaService.carregarPerfil(usuariaLogada.id)
        ]);

        dados.cursos = cursosData.cursos || [];
        dados.mentoras = mentorasData.mentoras || [];

        carregarPerfilUsuaria(perfilCompleto);
    } catch (error) {
        console.error("Erro ao carregar perfil:", error);
    }
}

function carregarPerfilUsuaria(usuaria) {
    if (!usuaria) return;

    // Foto e nome
    const fotoImg = document.getElementById('fotoUsuaria');
    if (fotoImg) {
        fotoImg.src = usuaria.foto || 'img/personas/comentarios/persona_julia_silva.jpeg';
        fotoImg.alt = usuaria.nome;
    }
    const nomeElem = document.querySelector('h2');
    if (nomeElem) nomeElem.textContent = usuaria.nome;
    const cargoElem = document.querySelector('.cargo');
    if (cargoElem) cargoElem.textContent = 'Estudante InovaElas';

    // Tags
    const tagsElem = document.querySelector('.tags');
    if (tagsElem) {
        const habilidades = ['Aprendizado', 'Tecnologia', 'Crescimento'];
        tagsElem.innerHTML = habilidades.map(h => `<span class="badge-primary">${h}</span>`).join('');
    }

    // Contato e membro desde
    const contato = document.getElementById('dadosContato');
    if (contato) {
        const membroDesde = new Date(usuaria.loginTime || Date.now()).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
        contato.innerHTML = `
            <div class="linha flex-start spacing-sm"><i class="fa-solid fa-envelope icon-sm"></i><span class="text-sm">${usuaria.email}</span></div>
            <div class="linha flex-start spacing-sm"><i class="fa-solid fa-calendar icon-sm"></i><span class="text-sm">Membro desde ${membroDesde}</span></div>
        `;
    }
    

    // Cursos favoritos
    const favoritos = document.getElementById('cursosFavoritos');
    if (favoritos) {
        const cursosFav = (usuaria.favoritos || []).map(favId => dados.cursos.find(c => c.id == favId)).filter(Boolean);
        favoritos.innerHTML = cursosFav.length
            ? cursosFav.map(PerfilUtils.renderFavorito).join('')
            : `<div class="explorar-favoritos">
                   <i class="fa-regular fa-compass icon-xl"></i>
                   <h4>Explore novos cursos</h4>
                   <p>Descubra novos conhecimentos e expanda suas habilidades</p>
                   <button class="btn-base btn-outline" onclick="window.location.href='cursos.html'">Explorar Cursos</button>
               </div>`;
    }

    // Medalhas
    const medalhas = document.querySelector('.conquistas');
    if (medalhas) {
        const medalhasUsuaria = PerfilUtils.gerarMedalhas(usuaria);
        medalhas.innerHTML = '<h3 class="card-title">Medalhas e Conquistas</h3>' +
            (medalhasUsuaria.length
                ? medalhasUsuaria.map(m => `
                    <div class="medalha ${m.tipo}">
                        <i class="fa-solid ${m.icone}" style="color: ${PerfilUtils.getCor(m.tipo)};"></i>
                        <div>
                            <p class="titulo">${m.titulo}</p>
                            <p class="descricao">${m.descricao}</p>
                            <p class="data">Conquistada em ${PerfilUtils.formatData(m.dataConquista)}</p>
                        </div>
                    </div>
                `).join('')
                : `<div class="sem-medalhas">
                       <i class="fa-regular fa-star icon-xl" style="color: #cbd5e1; margin-bottom: 12px;"></i>
                       <h4>Nenhuma medalha ainda</h4>
                       <p>Complete cursos e aulas para conquistar medalhas!</p>
                   </div>`);
    }

    // Certificados
    const certificados = document.querySelector('.certificados');
    if (certificados) {
        certificados.innerHTML = '<h3 class="card-title">Certificados</h3>' +
            (usuaria.certificados?.length
                ? usuaria.certificados.map(c => `
                    <div class="certificado">
                        <p class="titulo">${c.nomeCurso || `Curso ${c.cursoId}`}</p>
                        <p class="descricao">Emitido em: ${PerfilUtils.formatData(c.dataEmissao)}</p>
                        <p class="descricao">Carga horária: ${c.cargaHoraria}</p>
                        <div class="botoes">
                            <button class="btn-base btn-outline" onclick="visualizarCertificado('${c.arquivo}')">
                                <i class="fa-regular fa-eye"></i> Visualizar
                            </button>
                            <button class="btn-base btn-primary" onclick="baixarCertificado('${c.arquivo}', '${c.nomeCurso || c.cursoId}')">
                                <i class="fa-solid fa-download"></i> Download
                            </button>
                        </div>
                    </div>
                `).join('')
                : `<div class="sem-certificados">
                       <i class="fa-regular fa-certificate icon-xl" style="color: #cbd5e1; margin-bottom: 12px;"></i>
                       <h4>Nenhum certificado ainda</h4>
                       <p>Complete cursos para receber certificados!</p>
                   </div>`);
    }

    // Mentorias
    const mentoriasContainer = document.getElementById('mentoriasAgendadas');
    if (mentoriasContainer) {
        mentoriasContainer.innerHTML = (usuaria.agendamentos || []).length
            ? usuaria.agendamentos.map(mentoria => {
                const dataFormatada = new Date(mentoria.data).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
                const mentoraDados = dados.mentoras.find(m => m.nome === mentoria.mentoraNome) || {};
                const mentoraImagem = mentoraDados.imagem || 'img/Mentoria/mentora1.jpg';
                const mentoraArea = mentoraDados.categoria || mentoria.area || 'Mentoria';
                return `
                    <div class="mentoria-agendada">
                        <div class="mentoria-info">
                            <img src="${mentoraImagem}" alt="${mentoria.mentoraNome || "Mentora"}" class="mentora-thumb">
                            <div class="mentoria-detalhes">
                                <h4 class="mentora-nome">${mentoria.mentoraNome || "Mentora"}</h4>
                                <p class="mentora-area">${mentoraArea}</p>
                                <p class="mentoria-data">${dataFormatada} às ${mentoria.horario}</p>
                                ${mentoria.tema ? `<p class="mentoria-tema"><strong>Tema:</strong> ${mentoria.tema}</p>` : ''}
                            </div>
                        </div>
                        <div class="mentoria-acoes">
                            <button class="btn-entrar-mentoria" onclick="window.location.href='mentoria.html'">Entrar</button>
                            <button class="btn-desmarcar-mentoria" onclick="desmarcarMentoria('${mentoria.id}')">Desmarcar</button>
                        </div>
                    </div>`;
            }).join('')
            : `<div class="sem-mentorias">
                   <i class="fa-solid fa-calendar-plus icon-xl"></i>
                   <h4 class="heading-sm">Nenhuma mentoria agendada</h4>
                   <p class="text-sm">Agende uma mentoria personalizada com nossas especialistas</p>
                   <button class="btn-base btn-outline" onclick="window.location.href='mentoria.html'">Agendar Mentoria</button>
               </div>`;
    }

    // Upload de foto
    const inputFoto = document.getElementById('inputFoto');
    if (inputFoto) {
        inputFoto.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = async (event) => {
                const fotoBase64 = event.target.result;
                fotoImg.src = fotoBase64;
                try {
                    await usuariaService.atualizarPerfil(usuaria.id, { foto: fotoBase64 });
                    if (window.atualizarHeaderFoto) await window.atualizarHeaderFoto();
                } catch (error) { console.error(error); }
            };
            reader.readAsDataURL(file);
        });
    }
    // Atualizar informações de curso em andamento após montar o perfil
    try { atualizarCursoAtual(usuaria); } catch (e) { /* não bloqueia */ }
}

// Utils
function atualizarCursoAtual(usuaria) {
    const cursoAtualElem = document.getElementById('cursoAtual');
    if (!cursoAtualElem || !usuaria?.progressoCursos) return;

    const cursosEmAndamento = Object.entries(usuaria.progressoCursos || {})
        .filter(([_, progresso]) => progresso > 0 && progresso < 100);

    if (cursosEmAndamento.length > 0 && dados.cursos) {
        const [cursoId, progresso] = cursosEmAndamento[0];
        const curso = dados.cursos.find(c => c.id == cursoId);
        if (curso) {
            cursoAtualElem.innerHTML = `
                <h4>${curso.titulo}</h4>
                <p>Progresso: ${progresso}%</p>
            `;
            // Atualizar barra de progresso e contagem de aulas
            const barra = document.querySelector('.barra-progresso .progresso');
            if (barra) barra.style.width = `${progresso}%`;

            const totalAulas = curso.aulas ? curso.aulas.length : 0;
            const concluidas = (usuaria.aulasConcluidas?.[cursoId] || []).length;
            const aulasElem = document.querySelector('.aulas');
            if (aulasElem) aulasElem.textContent = `${concluidas}/${totalAulas} aulas`;

            // Atualizar status badge
            const badge = document.querySelector('.badge-base.status-inactive');
            if (badge) {
                badge.textContent = 'Ativo';
                badge.classList.remove('status-inactive');
                badge.classList.add('status-active');
            }

            // Atualizar botão Explorar -> Continuar
            const explorarLink = document.querySelector('.proxima-aula a');
            const explorarBtn = explorarLink?.querySelector('button');
            if (explorarBtn) {
                explorarBtn.innerHTML = `<i class="fa-solid fa-play"></i> Continuar`;
                // redireciona para a sala do curso atual
                if (explorarLink) explorarLink.href = `aula.html?id=${cursoId}`;
                explorarBtn.onclick = () => window.location.href = `aula.html?id=${cursoId}`;
            }
            return;
        }
    }

    cursoAtualElem.innerHTML = `<p>Nenhum curso em andamento</p>`;
    // Resetar barra e contagens
    const barra = document.querySelector('.barra-progresso .progresso');
    if (barra) barra.style.width = `0%`;
    const aulasElem = document.querySelector('.aulas');
    if (aulasElem) aulasElem.textContent = `0/0 aulas`;
    const badge = document.querySelector('.badge-base.status-active');
    if (badge) {
        badge.textContent = 'Inativo';
        badge.classList.remove('status-active');
        badge.classList.add('status-inactive');
    }

    // Restaurar botão Explorar (caso tenha sido alterado)
    const explorarLink = document.querySelector('.proxima-aula a');
    const explorarBtn = explorarLink?.querySelector('button');
    if (explorarBtn) {
        explorarBtn.innerHTML = `<i class="fa-solid fa-search icon-sm"></i> Explorar`;
        if (explorarLink) explorarLink.href = 'cursos.html';
        explorarBtn.onclick = null;
    }
}
const PerfilUtils = {
    gerarMedalhas(usuaria) {
        const totalAulas = Object.values(usuaria.aulasConcluidas || {}).flat().length;
        const cursosConcluidos = Object.values(usuaria.progressoCursos || {}).filter(p => p >= 100).length;
        const conquistas = [
            { condicao: totalAulas >= 1, tipo: 'comum', icone: 'fa-medal', titulo: 'Primeira Conquista', descricao: 'Complete sua primeira aula' },
            { condicao: totalAulas >= 10, tipo: 'rara', icone: 'fa-trophy', titulo: 'Dedicada', descricao: 'Complete 10 aulas' },
            { condicao: cursosConcluidos >= 1, tipo: 'epica', icone: 'fa-gem', titulo: 'Expert', descricao: 'Complete seu primeiro curso' }
        ];
        return conquistas.filter(c => c.condicao).map(c => ({ ...c, dataConquista: new Date() }));
    },
    getCor: tipo => ({ comum: '#fbbf24', rara: '#8b5cf6', epica: '#f59e0b', lendaria: '#ef4444' }[tipo] || '#6b7280'),
    formatData: data => new Date(data).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }),
    renderFavorito: curso => `
        <div class="curso-favorito" onclick="window.location.href='descricao.html?id=${curso.id}'">
            <img src="${curso.imagem}" alt="${curso.titulo}" class="curso-thumb">
            <div class="curso-detalhes">
                <h4 class="curso-titulo">${curso.titulo}</h4>
                <p class="curso-descricao">${curso.descricao}</p>
                <div class="curso-meta">
                    <span class="badge-outline">${curso.categoria}</span>
                    <span class="text-xs">${curso.cargaHoraria}</span>
                </div>
            </div>
            <button class="btn-base btn-primary btn-sm" onclick="event.stopPropagation(); window.location.href='descricao.html?id=${curso.id}'">Ver Curso</button>
        </div>`
};

function visualizarCertificado(arquivo) { window.open(`./certificados/${arquivo}`, '_blank'); }
function baixarCertificado(arquivo, titulo) {
    const link = Object.assign(document.createElement('a'), { href: `./certificados/${arquivo}`, download: `${(titulo || 'certificado').replace(/\s+/g, '_')}.pdf` });
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
}

document.addEventListener('DOMContentLoaded', init);

// Globais
window.desmarcarMentoria = async (id) => {
    if (!confirm('Tem certeza que deseja desmarcar esta mentoria?')) return;
    const usuaria = usuariaService.getUsuariaLogada();
    if (!usuaria) return;
    try {
        await usuariaService.desmarcarMentoria(usuaria.id, id);
        const perfil = await usuariaService.carregarPerfil(usuaria.id);
        carregarPerfilUsuaria(perfil);
    } catch (e) { console.error(e); }
};

window.atualizarPerfil = async () => {
    const usuaria = usuariaService.getUsuariaLogada();
    if (!usuaria) return;
    const perfil = await usuariaService.carregarPerfil(usuaria.id);
    carregarPerfilUsuaria(perfil);
};

window.atualizarProgressoCurso = async (cursoId, novoProgresso) => {
    const usuaria = usuariaService.getUsuariaLogada();
    if (!usuaria) return;
    try {
        const perfil = await usuariaService.carregarPerfil(usuaria.id);
        atualizarCursoAtual(perfil);
        const medalhas = document.querySelector('.conquistas');
        const medalhasUsuaria = PerfilUtils.gerarMedalhas(perfil);
        if (medalhasUsuaria.length) {
            medalhas.innerHTML = '<h3 class="card-title">Medalhas e Conquistas</h3>' + medalhasUsuaria.map(m => `
                <div class="medalha ${m.tipo}">
                    <i class="fa-solid ${m.icone}" style="color:${PerfilUtils.getCor(m.tipo)};"></i>
                    <div>
                        <p class="titulo">${m.titulo}</p>
                        <p class="descricao">${m.descricao}</p>
                        <p class="data">Conquistada em ${PerfilUtils.formatData(m.dataConquista)}</p>
                    </div>
                </div>`).join('');
        }
    } catch (e) { console.error(e); }
};
