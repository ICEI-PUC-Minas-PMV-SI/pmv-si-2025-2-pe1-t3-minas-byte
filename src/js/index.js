async function carregarCursos() {
    try {
        const response = await fetch("json/cursos.json");

        if (!response.ok) {
            throw new Error(`Erro HTTP ${response.status}`);
        }

        const data = await response.json();

        if (!data?.cursos) {
            throw new Error("JSON sem propriedade 'cursos'");
        }

        renderizarCursos(data.cursos);
        if (typeof inicializarFiltros === "function") {
            inicializarFiltros();
        }
    } catch (error) {
        console.error("Erro ao carregar cursos:", error);
    }
}

function renderizarCursos(cursos) {
    const container = document.querySelector(".cursos");
    if (!container) {
        console.error("Container .cursos não encontrado");
        return;
    }

    const categorias = {
        basico: 3,
        programacao: 1,
        dados: 2,
        design: 2,
        gestao: 1
    };

    const cursosParaExibir = [];

    for (const categoria in categorias) {
        const quantidade = categorias[categoria];
        cursosParaExibir.push(
            ...cursos
                .filter(c => c.categoria === categoria)
                .slice(0, quantidade)
        );
    }

    if (typeof criarCursoHTML !== "function") {
        console.error("Função criarCursoHTML() não encontrada!");
        return;
    }

    container.innerHTML = cursosParaExibir
        .map(curso => criarCursoHTML(curso))
        .join("");

    if (typeof ativarEventos === "function") {
        ativarEventos();
    } else {
        console.warn("Função ativarEventos() não encontrada.");
    }
}

document.addEventListener("DOMContentLoaded", carregarCursos);
