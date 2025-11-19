// Gerenciamento da página de descrição de cursos
class DescricaoCurso {
    constructor() {
        this.curso = null;
        this.init();
    }

    async init() {
        const cursoId = this.getCursoId();
        // A função getCursoId agora retorna null se não encontrar ou se for inválido.
        if (cursoId === null) {
            this.mostrarErro('O ID do curso é inválido ou não foi fornecido.');
            return;
        }

        await this.carregarCurso(cursoId);
        this.renderizar();
    }

    getCursoId() {
        const params = new URLSearchParams(window.location.search);
        const idString = params.get('id');

        if (!idString) {
            return null;
        }

        const id = parseInt(idString);

        if (isNaN(id) || id <= 0) {
            return null;
        }

        return id;
    }

    async carregarCurso(id) {
        const response = await fetch('json/cursos.json');
        const data = await response.json();
        // O id em data.cursos deve ser do mesmo tipo. Se for string em db.json, use String(id). 
        // Assumindo que o ID no JSON é Number (que é o que getCursoId retorna):
        this.curso = data.cursos.find(c => c.id === id);
    }

    renderizar() {
        if (!this.curso) {
            this.mostrarErro('Curso não encontrado.');
            return;
        }

        // CORREÇÃO 1: Deve usar template literal (crase `) para interpolação na atribuição do título
        document.title = `${ this.curso.titulo } | InovaElas`;

        // Atualizar elementos da página
        this.atualizarTitulo();
        this.atualizarImagem();
        this.atualizarDescricao();
        this.atualizarDetalhes();
        this.atualizarBotaoInscricao();
    }

    atualizarTitulo() {
        const titulo = document.querySelector('.curso-titulo');
        if (titulo) titulo.innerHTML = this.curso.titulo;
    }

    atualizarImagem() {
        const imagem = document.querySelector('.curso-imagem, .hero-image img');
        if (imagem) {
            imagem.src = this.curso.imagem;
            imagem.alt = this.curso.titulo;
        }
    }

    atualizarDescricao() {
        const descricaoHeader = document.querySelector('.curso-descricao');
        if (descricaoHeader) descricaoHeader.textContent = this.curso.descricao;
    }

    atualizarDetalhes() {
        const cargaHoraria = document.querySelector('.carga-horaria');
        if (cargaHoraria) cargaHoraria.textContent = this.curso.cargaHoraria;

        const nivel = document.querySelector('.nivel');
        if (nivel) nivel.textContent = this.curso.nivel;

        const categoria = document.querySelector('.categoria');
        if (categoria) categoria.textContent = this.curso.categoria;

        // Aulas
        this.renderizarAulas();

        // Requisitos
        this.renderizarRequisitos();

        // Instrutora
        this.renderizarInstrutora();
    }

    renderizarAulas() {
        const aulasContainer = document.querySelector('.aulas-lista, .curso-aulas');
        if (aulasContainer && this.curso.aulas) {
            aulasContainer.innerHTML = this.curso.aulas.map((aula, index) => `
                <div class="aula-item">
                    <div class="aula-numero">${index + 1}</div>
                    <div class="aula-conteudo">
                        <h4 class="aula-titulo">${aula.titulo}</h4>
                        <p class="aula-descricao">${aula.descricao}</p>
                    </div>
                </div>
            `).join('');
        }
    }

    renderizarRequisitos() {
        const requisitosContainer = document.querySelector('.requisitos-lista, .curso-requisitos');
        if (requisitosContainer && this.curso.requisitos) {
            requisitosContainer.innerHTML = this.curso.requisitos.map(req => `
                <li class="requisito-item">${req}</li>
            `).join('');
        }
    }

    renderizarInstrutora() {
        const instrutora = document.querySelector('.instrutora-info');
        if (instrutora && this.curso.instrutora) {
            instrutora.innerHTML = `
                <img src="${this.curso.instrutora.imagem}" alt="${this.curso.instrutora.nome}" class="instrutora-foto">
                <div class="instrutora-detalhes">
                    <h3 class="instrutora-nome">${this.curso.instrutora.nome}</h3>
                    <p class="instrutora-descricao">${this.curso.instrutora.descricao}</p>
                    <p class="instrutora-biografia">${this.curso.instrutora.biografia}</p>
                </div>
            `;
        }
    }

    atualizarBotaoInscricao() {
        const botao = document.querySelector('.btn-inscrever, .btn-inscricao');
        if (botao) {
            botao.onclick = () => this.inscrever();
        }
    }

    inscrever() {
        const usuariaTemp = { nome: "Usuária Teste", email: "teste@email.com" };
        const inscricaoAtual = JSON.parse(localStorage.getItem("cursoInscrito"));

        if (inscricaoAtual && inscricaoAtual.curso !== this.curso.titulo) {
            // CORREÇÃO 2: Deve usar template literal (crase `) para a mensagem de alerta
            alert(`Você já está inscrita no curso "${inscricaoAtual.curso}".`);
            return;
        }

        localStorage.setItem("cursoInscrito", JSON.stringify({
            email: usuariaTemp.email,
            curso: this.curso.titulo
        }));

        // CORREÇÃO 3: Deve usar template literal (crase `) para a mensagem de alerta
        alert(`Parabéns! Você está inscrita no curso "${this.curso.titulo}".`);
        window.location.href = "aula.html";
    }

    mostrarErro(mensagem) {
        document.body.innerHTML = `
            <div style="text-align: center; padding: 50px;">
                <h1>${mensagem}</h1>
                <a href="cursos.html">Voltar aos cursos</a>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new DescricaoCurso();
});
