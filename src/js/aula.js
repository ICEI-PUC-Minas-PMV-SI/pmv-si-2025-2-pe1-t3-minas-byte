document.addEventListener("DOMContentLoaded", async () => {
    const cursoId = localStorage.getItem("cursoSelecionado");
    if (!cursoId) return;

    const response = await fetch("json/cursos.json");
    const data = await response.json();

    const curso = data.cursos.find(c => c.id == cursoId);
    if (!curso) return;


    document.querySelector(".titulo-curso").textContent =
        `Conteúdo do curso: ${curso.titulo}`;


    const itens = document.querySelectorAll(".accordion-item");

    itens.forEach((item, index) => {
        const dadosAula = curso.aulas[index];
        if (!dadosAula) return;

        const tituloEl = item.querySelector(".titulo-item");
        if (tituloEl) tituloEl.textContent = dadosAula.titulo;

        const descEl = item.querySelector(".descricao-curso") ||
            item.querySelector("p");

        if (descEl) descEl.textContent = dadosAula.descricao;
    });

    if (curso.requisitos) {
        const reqContainer = document.querySelector(".requisitos-um");
        const reqItens = reqContainer.querySelectorAll(".requisitos-icones");

        reqItens.forEach((div, index) => {
            if (curso.requisitos[index]) {
                div.querySelector("p").textContent = curso.requisitos[index];
            }
        });
    }

    if (curso.instrutora) {

        document.querySelector(".img-instrutora")
            .src = curso.instrutora.imagem;

        document.querySelector(".info-instr h4")
            .textContent = curso.instrutora.nome;

        document.querySelector(".info-instr p")
            .textContent = curso.instrutora.descricao;

        document.querySelector(".desc-intr p")
            .textContent = curso.instrutora.biografia;
    }
});

function baixarConteudoAula() {
    const link = document.createElement('a');
    link.href = 'conteudoAulaPdf/conteudoAula.pdf';
    link.download = 'conteudoAula.pdf';
    link.click();
}

function abrirModal() {
    document.getElementById("modalVideo").style.display = "flex";
}

function fecharModal() {
    document.getElementById("modalVideo").style.display = "none";
}
