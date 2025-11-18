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
        // Usar Number() e checar se é um número válido (não-NaN)
        const id = Number(idString);
        
        // Retorna o ID numérico se for um número inteiro maior que zero, senão retorna null.
        if (isNaN(id) || id <= 0 || !Number.isInteger(id)) {
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
        document.title = `${this.curso.titulo} | InovaElas`;

        // Atualizar elementos da página
        this.atualizarTitulo();
        this.atualizarImagem();
        this.atualizarDescricao();
        this.atualizarDetalhes();
        this.atualizarBotaoInscricao();
    }

    atualizarTitulo() {
        const titulo = document.querySelector('.curso-titulo, h1');
        if (titulo) titulo.textContent = this.curso.titulo;
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

        const descricaoCompleta = document.querySelector('.descricao-completa');
        if (descricaoCompleta) descricaoCompleta.textContent = this.curso.descricaoCompleta || this.curso.descricao;
    }

    atualizarDetalhes() {
        const cargaHoraria = document.querySelector('.carga-horaria');
        if (cargaHoraria) cargaHoraria.textContent = this.curso.cargaHoraria;

        const nivel = document.querySelector('.nivel');
        if (nivel) nivel.textContent = this.curso.nivel;

        const categoria = document.querySelector('.categoria');
        if (categoria) categoria.textContent = this.curso.categoria;
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