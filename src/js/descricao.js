// Gerenciamento da página de descrição de cursos
class DescricaoCurso {
    constructor() {
        this.curso = null;
        this.init();
    }

    async init() {
        const cursoId = this.getCursoId();
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
        this.curso = data.cursos.find(c => c.id === id);
    }

    renderizar() {
        if (!this.curso) {
            this.mostrarErro('Curso não encontrado.');
            return;
        }

        document.title = `${ this.curso.titulo } | InovaElas`;

        this.atualizarTitulo();
        this.atualizarImagem();
        this.atualizarDescricao();
        this.atualizarDetalhes();

        // 🔥 ADIÇÕES NOVAS (DINÂMICAS)
        this.renderizarDescricaoCompleta();
        this.renderizarOQueVaiAprender();
        this.renderizarBeneficios();
        this.renderizarMercado();
        this.renderizarEstatisticas();

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

        this.renderizarAulas();
        this.renderizarRequisitos();
        this.renderizarInstrutora();
    }

    /* --------------------------
       NOVO: DESCRIÇÃO COMPLETA
    -------------------------- */
    renderizarDescricaoCompleta() {
        const box = document.getElementById('descricao-completa');
        if (box && this.curso.descricaoCompleta) {
            box.innerHTML = this.curso.descricaoCompleta
                .map(paragrafo => `<p>${paragrafo}</p>`)
                .join('');
        }
    }

    /* -------------------------------
       NOVO: O QUE VOCÊ VAI APRENDER
    -------------------------------- */
    renderizarOQueVaiAprender() {
        const lista = document.getElementById('o-que-vai-aprender');
        if (lista && this.curso.oQueVaiAprender) {
            lista.innerHTML = this.curso.oQueVaiAprender
                .map(item => `<li>${item}</li>`)
                .join('');
        }
    }

    /* --------------------------
       NOVO: BENEFÍCIOS
    -------------------------- */
    renderizarBeneficios() {
        const container = document.getElementById('beneficios-curso');
        if (container && this.curso.beneficios) {
            container.innerHTML = this.curso.beneficios
                .map(benef => `<li>${benef}</li>`)
                .join('');
        }
    }

    /* ------------------------------------
       NOVO: MERCADO & OPORTUNIDADES
    ------------------------------------- */
    renderizarMercado() {
        const box = document.getElementById('mercado-texto');
        if (box && this.curso.mercado) {
            box.textContent = this.curso.mercado;
        }
    }

    /* --------------------------
       NOVO: ESTATÍSTICAS
    -------------------------- */
    renderizarEstatisticas() {
        const lista = document.getElementById('stats-lista');
        if (lista && this.curso.estatisticas) {
            lista.innerHTML = this.curso.estatisticas
                .map(stat => `
                    <li>
                        <strong>${stat.valor}</strong><br>${stat.descricao}
                    </li>
                `)
                .join('');
        }
    }

    /* --------------------------
       JÁ EXISTIA
    -------------------------- */
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
            alert(`Você já está inscrita no curso "${inscricaoAtual.curso}".`);
            return;
        }

        localStorage.setItem("cursoInscrito", JSON.stringify({
            email: usuariaTemp.email,
            curso: this.curso.titulo
        }));

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
