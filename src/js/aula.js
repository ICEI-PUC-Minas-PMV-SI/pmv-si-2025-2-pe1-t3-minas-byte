let dadosCursos = [];

async function init() {
    const cursoId = new URLSearchParams(location.search).get('id');
    if (!cursoId) return;

    // Carregar cursos
    const data = await app.getCursos();
    dadosCursos = data.cursos;
    const curso = dadosCursos.find(c => c.id == cursoId);
    if (!curso) return;

    // Atualizar título do curso
    const tituloEl = document.querySelector('.titulo-curso');
    if (tituloEl) {
        tituloEl.textContent = `Conteúdo do curso: ${curso.titulo}`;
    }

    carregarAulas(curso.aulas, cursoId);
    carregarRequisitos(curso.requisitos);
    carregarInstrutora?.(curso.instrutora);
}

// Carregar aulas no Accordion
function carregarAulas(aulas, cursoId) {
    const accordionContainer = document.querySelector('.accordion');
    if (!accordionContainer) return;

    const usuariaLogada = usuariaService?.getUsuariaLogada();

    // Limpar conteúdo
    accordionContainer.innerHTML = '';

    aulas.forEach((aula, index) => {
        const aulaNumero = index + 1;
        const aulaId = `aula-${aulaNumero}`;

        // Verificar progresso salvo localmente
        const aulasConcluidasStore = JSON.parse(localStorage.getItem('aulasConcluidas') || '{}');
        const aulaConcluida = usuariaLogada && aulasConcluidasStore[cursoId]?.includes(aulaId);

        // Criar item do accordion
        const item = document.createElement('div');
        item.className = 'accordion-item';

        item.innerHTML = `
            <input type="checkbox" id="item${aulaNumero}">
            <label class="accordion-header" for="item${aulaNumero}">
                <span class="titulo-item ${aulaConcluida ? 'concluida' : ''}">
                    ${aulaConcluida ? '✓' : ''} Aula ${aulaNumero}: ${aula.titulo}
                </span>
                <span class="seta">▼</span>
            </label>

            <div class="accordion-content">
                <p class="descricao-curso">${aula.descricao}</p>

                <div class="p-icons">
                    <i class="icone bi bi-download" onclick="baixarConteudoAula(${aulaNumero})"></i>
                    <i class="icone bi bi-caret-right-square-fill" onclick="abrirModal(${aulaNumero})"></i>

                    <button class="btn-concluir ${aulaConcluida ? 'concluida' : ''}"
                        ${aulaConcluida ? 'disabled' : `onclick="concluirAula('${aulaId}', ${aulaNumero})"`}>
                        ${aulaConcluida ? 'Concluída' : 'Marcar como Concluída'}
                    </button>
                </div>
            </div>
        `;

        accordionContainer.appendChild(item);
    });
}

// Modal de vídeo
function abrirModal(aulaNumero = null) {
    const modal = document.getElementById('modalVideo');
    if (!modal) return;

    const titulo = modal.querySelector('h2');
    titulo.textContent = aulaNumero ? `Aula ${aulaNumero}` : 'Aula';

    modal.style.display = 'flex';
}

function fecharModal() {
    const modal = document.getElementById('modalVideo');
    if (modal) modal.style.display = 'none';
}

// Download de conteúdo da aula
function baixarConteudoAula(aulaNumero = null) {
    alert(aulaNumero ? `Download da Aula ${aulaNumero} iniciado!` : 'Download iniciado!');
}

// Concluir aula
async function concluirAula(aulaId, aulaNumero) {
    const usuariaLogada = usuariaService?.getUsuariaLogada();
    if (!usuariaLogada) {
        alert('Faça login para marcar aulas como concluídas');
        return;
    }

    const cursoId = new URLSearchParams(window.location.search).get('id');
    if (!cursoId) return alert('Erro: ID do curso não encontrado.');

    try {
        const resultado = await usuariaService.concluirAula(
            usuariaLogada.id,
            cursoId,
            aulaId
        );

        // Atualizar botão e título
        const botao = document.querySelector(`button[onclick*="${aulaId}"]`);
        if (botao) {
            botao.textContent = 'Concluída';
            botao.classList.add('concluida');
            botao.disabled = true;
        }

        const titulo = document.querySelector(`label[for="item${aulaNumero}"] .titulo-item`);
        if (titulo) {
            titulo.classList.add('concluida');
            const textoOriginal = titulo.textContent.replace(/^✓\s*/, '');
            titulo.innerHTML = `✓ ${textoOriginal}`;
        }

        // Salvar progresso local
        const store = JSON.parse(localStorage.getItem('aulasConcluidas') || '{}');
        if (!store[cursoId]) store[cursoId] = [];
        if (!store[cursoId].includes(aulaId)) {
            store[cursoId].push(aulaId);
            localStorage.setItem('aulasConcluidas', JSON.stringify(store));
        }

        // Atualizar perfil (progresso, medalhas, certificados)
        window.atualizarProgressoCurso?.(cursoId, resultado.progresso);
        window.atualizarPerfil?.();

        // Feedback final
        if (resultado.progresso >= 100) {
            setTimeout(() => {
                if (confirm(`
🎉 Parabéns! Você concluiu o curso!
🏆 Certificado gerado e disponível no seu perfil.

Deseja explorar novos cursos?
                `)) {
                    window.location.href = 'cursos.html';
                }
            }, 500);
        } else {
            alert(`✅ Aula concluída! Progresso do curso: ${resultado.progresso}%`);
        }

    } catch (error) {
        console.error('Erro ao concluir aula:', error);
        alert('Erro ao marcar aula como concluída. Tente novamente.');
    }
}

document.addEventListener('DOMContentLoaded', init);
