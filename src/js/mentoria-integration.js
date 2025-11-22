class MentoriaIntegration {
    constructor() {
        this.usuariaService = window.usuariaService;
    }

    async agendarMentoria(mentoraNome, data, horario, tema) {
        const usuaria = this.usuariaService.getUsuariaLogada();
        if (!usuaria) {
            alert('Faça login para agendar mentorias');
            return false;
        }

        try {
            const mentoriaData = { mentoraNome, data, horario, tema };
            await this.usuariaService.agendarMentoria(usuaria.id, mentoriaData);
            alert('Mentoria agendada com sucesso!');
            return true;
        } catch (error) {
            console.error('Erro ao agendar mentoria:', error);
            alert('Erro ao agendar mentoria');
            return false;
        }
    }

    integrarAgendamento() {
        if (typeof window.confirmarAgendamento !== 'function') return;

        const originalConfirmar = window.confirmarAgendamento;

        window.confirmarAgendamento = async () => {
            const resultado = originalConfirmar();

            const data = document.getElementById('dataAgendamento')?.value;
            const horarioSelecionado = document.querySelector('.horario-opcao.selecionado')?.textContent;
            const mentoraNome = document.getElementById('mentoraNome')?.textContent || 'Ana Costa';
            const tema = 'Carreira em Tecnologia';

            if (data && horarioSelecionado) {
                await this.agendarMentoria(mentoraNome, data, horarioSelecionado, tema);
            }

            return resultado;
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
