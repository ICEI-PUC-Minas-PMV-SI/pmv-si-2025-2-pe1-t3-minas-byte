let mentoraAtual = null;

function abrirConversa(mentora) {
    mentoraAtual = mentora;
    const conversaJanela = document.getElementById('conversaJanela');
    const mentoraFoto = document.getElementById('mentoraFoto');
    const mentoraNome = document.getElementById('mentoraNome');
    const areaMensagens = document.getElementById('areaMensagens');

    // Configurar informações da mentora
    mentoraFoto.src = mentora.imagem;
    mentoraNome.textContent = mentora.nome;

    // Limpar mensagens anteriores
    areaMensagens.innerHTML = '';

    // Adicionar mensagem inicial da mentora
    setTimeout(() => {
        adicionarMensagem(`Olá! Sou a ${ mentora.nome }.Como posso te ajudar hoje ?`, 'mentora');
    }, 500);

    // Mostrar conversa
    conversaJanela.classList.add('ativa');
}

function fecharConversa() {
    const conversaJanela = document.getElementById('conversaJanela');
    conversaJanela.classList.remove('ativa');
}

function adicionarMensagem(texto, remetente) {
    const areaMensagens = document.getElementById('areaMensagens');
    const mensagemDiv = document.createElement('div');
    mensagemDiv.className = `mensagem ${ remetente }`;

    const conteudoDiv = document.createElement('div');
    conteudoDiv.className = 'conteudo-mensagem';
    conteudoDiv.textContent = texto;

    mensagemDiv.appendChild(conteudoDiv);
    areaMensagens.appendChild(mensagemDiv);

    // Scroll para baixo
    areaMensagens.scrollTop = areaMensagens.scrollHeight;
}

function enviarMensagem() {
    const entradaTexto = document.getElementById('entradaTexto');
    const mensagem = entradaTexto.value.trim();

    if (mensagem) {
        // Adicionar mensagem do usuário
        adicionarMensagem(mensagem, 'usuario');
        entradaTexto.value = '';

        // Simular resposta da mentora após um delay
        setTimeout(() => {
            const resposta = gerarRespostaMentora(mensagem);
            adicionarMensagem(resposta, 'mentora');
        }, 1000 + Math.random() * 1000);
    }
}

function aoApertarEnter(evento) {
    if (evento.key === 'Enter') {
        enviarMensagem();
    }
}

function gerarRespostaMentora(mensagemUsuario) {
    const respostas = [
        "Entendo sua situação. Vamos trabalhar juntas para encontrar a melhor solução!",
        "Essa é uma excelente pergunta! Com base na minha experiência, posso te orientar sobre isso.",
        "Vou te ajudar com isso. Primeiro, vamos analisar alguns pontos importantes.",
        "Ótima questão! Isso é algo que vejo frequentemente na minha área de atuação.",
        "Posso te dar algumas dicas valiosas sobre isso. Vamos conversar mais detalhadamente?"
    ];

    return respostas[Math.floor(Math.random() * respostas.length)];
}

// Fechar conversa ao clicar fora dela
document.addEventListener('click', function (evento) {
    const conversaJanela = document.getElementById('conversaJanela');
    const clicouDentroConversa = conversaJanela.contains(evento.target);
    const clicouBotaoConversa = evento.target.closest('.btn-conversa');

    if (!clicouDentroConversa && !clicouBotaoConversa && conversaJanela.classList.contains('ativa')) {
        fecharConversa();
    }
});

// ===== SISTEMA DE AGENDAMENTO =====
let horarioSelecionado = null;

function abrirModalAgendamento() {
    const modal = document.getElementById('modalAgendamento');
    const dataInput = document.getElementById('dataAgendamento');

    // Definir data mínima como hoje
    const hoje = new Date().toISOString().split('T')[0];
    dataInput.min = hoje;

    // Resetar modal para primeira etapa
    mostrarEtapa('etapaData');
    horarioSelecionado = null;

    modal.classList.add('ativo');
}

function fecharModalAgendamento() {
    const modal = document.getElementById('modalAgendamento');
    modal.classList.remove('ativo');
}

function mostrarEtapa(etapaId) {
    // Esconder todas as etapas
    document.querySelectorAll('.etapa-agendamento').forEach(etapa => {
        etapa.classList.remove('ativa');
    });

    // Mostrar etapa específica
    document.getElementById(etapaId).classList.add('ativa');
}

function proximaEtapa() {
    const dataInput = document.getElementById('dataAgendamento');

    if (!dataInput.value) {
        alert('Por favor, selecione uma data.');
        return;
    }

    mostrarEtapa('etapaHorario');
}

function voltarEtapa() {
    mostrarEtapa('etapaData');
}

function selecionarHorario(elemento, horario) {
    // Remover seleção anterior
    document.querySelectorAll('.horario-opcao').forEach(opcao => {
        opcao.classList.remove('selecionado');
    });

    // Selecionar novo horário
    elemento.classList.add('selecionado');
    horarioSelecionado = horario;
}

function confirmarAgendamento() {
    if (!horarioSelecionado) {
        alert('Por favor, selecione um horário.');
        return;
    }

    mostrarEtapa('etapaSucesso');
}

// Fechar modal de agendamento ao clicar fora dele
document.addEventListener('click', function (evento) {
    const modal = document.getElementById('modalAgendamento');
    if (modal) {
        const conteudoModal = modal.querySelector('.conteudo-modal');

        if (evento.target === modal && !conteudoModal.contains(evento.target)) {
            fecharModalAgendamento();
        }
    }
});
