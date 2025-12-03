class MentoriaIntegration {
    constructor() {
        this.usuariaService = window.usuariaService;
    }

    async agendarMentoria(mentoraNome, data, horario, tema, area) {
        const usuaria = this.usuariaService.getUsuariaLogada();
        if (!usuaria) {
            alert('Faça login para agendar mentorias');
            return false;
        }

        try {
            const mentoriaData = {
                mentoraNome: mentoraNome,
                area: area || "Área não especificada",
                data,
                horario,
                tema: tema || "Mentoria Personalizada"
            };
            await this.usuariaService.agendarMentoria(usuaria.id, mentoriaData);
            return true;
        } catch (error) {
            console.error('Erro ao agendar mentoria:', error);
            alert('Erro ao agendar mentoria: ' + error.message);
            return false;
        }
    }

    integrarAgendamento() {
        if (typeof window.confirmarAgendamento !== 'function') return;

        const originalConfirmar = window.confirmarAgendamento;
        const self = this;

        window.confirmarAgendamento = async () => {
            const data = document.getElementById('dataAgendamento')?.value;
            const horarioSelecionado = document.querySelector('.horario-opcao.selecionado')?.textContent;
            const mentoraSelecionada = window.mentoraSelecionada;

            if (data && horarioSelecionado && mentoraSelecionada) {
                const sucesso = await self.agendarMentoria(
                    mentoraSelecionada.nome,
                    data,
                    horarioSelecionado,
                    'Mentoria Personalizada',
                    mentoraSelecionada.categoria
                );
                if (sucesso) {
                    originalConfirmar();
                }
            } else {
                originalConfirmar();
            }
        };
    }
}

// Instância global
const mentoriaIntegration = new MentoriaIntegration();
window.mentoriaIntegration = mentoriaIntegration;

// Função auxiliar global para agendamento rápido
window.agendarMentoriaIntegrada = (mentoraNome, tema) => {
    return mentoriaIntegration.agendarMentoria(
        mentoraNome,
        new Date().toISOString().split('T')[0],
        '14:00',
        tema
    );
};

// Integração automática após DOM carregado
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => mentoriaIntegration.integrarAgendamento(), 1000);
});
