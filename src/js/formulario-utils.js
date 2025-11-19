class FormularioUtils {

    static validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    static async enviarFormulario(dados, tipo = 'duvida') {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(`${ tipo } enviado:`, dados);
                resolve();
            }, 1000);
        });
    }

    static mostrarMensagemSucesso(container) {
        const mensagem = document.createElement('div');
        mensagem.className = 'mensagem-sucesso';
        mensagem.innerHTML = `
            <div style="background: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin-top: 20px; border: 1px solid #c3e6cb;">
                <strong>✓ Sua pergunta foi enviada.</strong><br>
                Fique atento ao e-mail que o nosso time entrará em contato para tirar todas as suas dúvidas.
            </div>
        `;

        container.appendChild(mensagem);

        setTimeout(() => {
            if (mensagem.parentNode) {
                mensagem.parentNode.removeChild(mensagem);
            }
        }, 5000);
    }

    static validarFormularioGenerico(seletor, callback) {
        const form = document.querySelector(seletor);
        if (!form) return;

        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            const nome = form.querySelector('#name, [name="name"]')?.value.trim();
            const email = form.querySelector('#email, [name="email"]')?.value.trim();
            const curso = form.querySelector('#curso, [name="curso"]')?.value;
            const mensagem = form.querySelector('#duvida, [name="duvida"], textarea')?.value.trim();

            if (!nome || !email || !curso || !mensagem) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }

            if (!FormularioUtils.validarEmail(email)) {
                alert('Por favor, insira um e-mail válido.');
                return;
            }

            try {
                if (callback) {
                    await callback({ nome, email, curso, mensagem });
                } else {
                    await FormularioUtils.enviarFormulario({ nome, email, curso, mensagem });
                }

                FormularioUtils.mostrarMensagemSucesso(form.parentNode);
                form.reset();
            } catch (error) {
                alert('Erro ao enviar mensagem. Tente novamente.');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Formulário de dúvidas (index.html)
    FormularioUtils.validarFormularioGenerico('#duvidas form');

    // Formulário de feedback (comunidade.html)
    FormularioUtils.validarFormularioGenerico('.duvidas form');
});
