let dadosCursos = [];

async function init() {
    const cursoId = new URLSearchParams(location.search).get('id');
    if (!cursoId) return;

    // Verificar se app está disponível
    if (!window.app) {
        console.error('App core não disponível');
        return;
    }

    // Carregar cursos
    const data = await window.app.getCursos();
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
    if (typeof carregarInstrutora === 'function') {
        carregarInstrutora(curso.instrutora);
    }
}

// Carregar aulas no Accordion
function carregarAulas(aulas, cursoId) {
    const accordionContainer = document.querySelector('.accordion');
    if (!accordionContainer) return;

    const usuariaLogada = window.usuariaService ? window.usuariaService.getUsuariaLogada() : null;

    // Limpar conteúdo
    accordionContainer.innerHTML = '';

    aulas.forEach((aula, index) => {
        const aulaNumero = index + 1;
        const aulaId = `aula-${aulaNumero}`;

        // Verificar progresso salvo localmente apenas se usuário estiver logado
        const aulasConcluidasStore = usuariaLogada ? JSON.parse(localStorage.getItem('aulasConcluidas') || '{}') : {};
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
    const usuariaLogada = window.usuariaService ? window.usuariaService.getUsuariaLogada() : null;
    if (!usuariaLogada) {
        alert('Faça login para marcar aulas como concluídas');
        return;
    }

    const cursoId = new URLSearchParams(window.location.search).get('id');
    if (!cursoId) return alert('Erro: ID do curso não encontrado.');

    try {
        const resultado = await window.usuariaService.concluirAula(
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

        // Salvar progresso local apenas se usuário estiver logado
        if (usuariaLogada) {
            const store = JSON.parse(localStorage.getItem('aulasConcluidas') || '{}');
            if (!store[cursoId]) store[cursoId] = [];
            if (!store[cursoId].includes(aulaId)) {
                store[cursoId].push(aulaId);
                localStorage.setItem('aulasConcluidas', JSON.stringify(store));
            }
        }

        // Atualizar perfil (progresso, medalhas, certificados)
        window.atualizarProgressoCurso?.(cursoId, resultado.progresso);
        window.atualizarPerfil?.();

        // Feedback final
        if (resultado.progresso >= 100) {
            // Atualizar perfil para mostrar certificado
            if (window.atualizarPerfil) {
                setTimeout(() => window.atualizarPerfil(), 100);
            }

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

// Carregar requisitos do curso
function carregarRequisitos(requisitos) {
    const requisitosContainer = document.querySelector('.requisitos-um');
    if (!requisitosContainer || !requisitos) return;

    requisitosContainer.innerHTML = `
        <h3>Requisitos</h3>
        ${requisitos.map(req => `
            <div class="requisitos-icones">
                <i class="bi bi-check-circle" style="color: #364C84; margin-right: 10px;"></i>
                <p>${req}</p>
            </div>
        `).join('')}
    `;
}

// Carregar informações da instrutora
function carregarInstrutora(instrutora) {
    if (!instrutora) return;

    const nomeEl = document.querySelector('.info-instr h4');
    const descricaoEl = document.querySelector('.info-instr p');
    const biografiaEl = document.querySelector('.desc-intr p');
    const imagemEl = document.querySelector('.img-instrutora');

    if (nomeEl) nomeEl.textContent = instrutora.nome;
    if (descricaoEl) descricaoEl.textContent = instrutora.descricao;
    if (biografiaEl) biografiaEl.textContent = instrutora.biografia;
    if (imagemEl && instrutora.imagem) imagemEl.src = instrutora.imagem;
}

document.addEventListener('DOMContentLoaded', init);