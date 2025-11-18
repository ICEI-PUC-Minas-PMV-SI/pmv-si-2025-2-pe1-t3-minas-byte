// Seleciona todos os botões de "Inscreva-se"
const botoes = document.querySelectorAll('.btn-inscreva-mentorias');

botoes.forEach(botao => {
    botao.addEventListener('click', () => {
        // Evita múltiplos cliques
        if(botao.classList.contains('inscrita')){
            return;
        }

        // Pega a categoria da mentoria do card correspondente
        const categoria = botao.closest('.mentoria').dataset.category;

        // Cria fundo escuro (overlay)
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.background = 'rgba(0, 0, 0, 0.5)';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.zIndex = '999';

        // Cria o modal
        const modal = document.createElement('div');
        modal.style.background = '#fff';
        modal.style.padding = '30px';
        modal.style.borderRadius = '10px';
        modal.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
        modal.style.textAlign = 'center';
        modal.style.maxWidth = '400px';
        modal.style.width = '90%';
        modal.innerHTML = `
            <h2>Parabéns!</h2>
            <p>Você se inscreveu para a mentoria de <strong>${categoria}</strong>.</p>
            <p>A mentoria é feita diretamente com a mentora, com reuniões agendadas por e-mail<p>
            <p>Você receberá um e-mail da mentora escolhida para agendar sua primeira mentoria.</p>
            <button id="fecharPopup" style="margin-top:15px; padding:10px 20px; border:none; background:#007BFF; color:white; border-radius:5px; cursor:pointer;">Entendido</button>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // Fecha o modal ao clicar no botão
        document.getElementById('fecharPopup').addEventListener('click', () => {
            document.body.removeChild(overlay);
        });

        // Fecha também se clicar fora do modal
        overlay.addEventListener('click', e => {
            if(e.target === overlay){
                document.body.removeChild(overlay);
            }
        });

        // Atualiza o botão após clicar
        botao.classList.add('inscrita'); // marca como inscrita
        botao.textContent = 'Inscrita ✔️';
        botao.style.backgroundColor = '#28a745'; // verde
        botao.style.color = 'white';
        botao.style.cursor = 'default';
    });
});
