// Integração de aulas com progresso do usuário
class AulaIntegration {
    constructor() {
        this.usuariaService = window.usuariaService;
        this.cursoId = this.getCursoIdFromURL();
        this.aulaId = this.getAulaIdFromURL();
    }

    // Obter ID do curso da URL
    getCursoIdFromURL() {
        const params = new URLSearchParams(window.location.search);
        // aceitar tanto `id` (usado por `curso-comum.js`) quanto `curso`
        return params.get('id') || params.get('curso') || 'curso-001';
    }

    // Obter ID da aula da URL
    getAulaIdFromURL() {
        const params = new URLSearchParams(window.location.search);
        return params.get('aula') || 'aula-1'; // padrão
    }

    // Concluir aula atual
    async concluirAula() {
        const usuaria = this.usuariaService.getUsuariaLogada();
        if (!usuaria) {
            alert('Faça login para marcar aulas como concluídas');
            return;
        }

        try {
            const resultado = await this.usuariaService.concluirAula(
                usuaria.id,
                this.cursoId,
                this.aulaId
            );

            // Atualizar interface
            this.atualizarBotaoConclusao(true);
            this.atualizarProgresso(resultado.progresso);

            // Feedback
            if (resultado.progresso >= 100) {
                alert('Parabéns! Você concluiu o curso! Certificado gerado.');
            } else {
                alert(`Aula concluída! Progresso: ${resultado.progresso}%`);
            }

            return resultado;
        } catch (error) {
            console.error('Erro ao concluir aula:', error);
            alert('Erro ao marcar aula como concluída');
        }
    }

    // Atualizar botão de conclusão
    atualizarBotaoConclusao(concluida) {
        const botao = document.getElementById('btnConcluirAula');
        if (!botao) return;

        if (concluida) {
            botao.textContent = 'Aula Concluída ✓';
            botao.classList.add('concluida');
            botao.disabled = true;
        } else {
            botao.textContent = 'Marcar como Concluída';
            botao.classList.remove('concluida');
            botao.disabled = false;
        }
    }

    // Atualizar barra de progresso
    atualizarProgresso(progresso) {
        const barraProgresso = document.querySelector('.progresso-aula');
        const textoProgresso = document.querySelector('.texto-progresso');

        if (barraProgresso) {
            barraProgresso.style.width = `${progresso}%`;
        }

        if (textoProgresso) {
            textoProgresso.textContent = `${progresso}% concluído`;
        }
    }

    // Verificar se aula já foi concluída
    async verificarStatusAula() {
        const usuaria = this.usuariaService.getUsuariaLogada();
        if (!usuaria) return;

        try {
            const perfil = await this.usuariaService.carregarPerfil(usuaria.id);

            const aulasConcluidas = perfil.aulasConcluidas?.[this.cursoId] || [];
            const jaConcluida = aulasConcluidas.includes(this.aulaId);

            this.atualizarBotaoConclusao(jaConcluida);

            const progresso = perfil.progressoCursos?.[this.cursoId] || 0;
            this.atualizarProgresso(progresso);

        } catch (error) {
            console.error('Erro ao verificar status da aula:', error);
        }
    }

    // Inicializar sistema de aulas
    init() {
        this.verificarStatusAula();
    }
}

// Instância global
const aulaIntegration = new AulaIntegration();
window.aulaIntegration = aulaIntegration;

// Função global para conclusão de aula: não sobrescreve se já existir
if (typeof window.concluirAula === 'function') {
    // mantém nome alternativo para evitar conflito
    window.aulaIntegrationConcluir = () => aulaIntegration.concluirAula();
} else {
    window.concluirAula = () => aulaIntegration.concluirAula();
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => aulaIntegration.init(), 500);
});
