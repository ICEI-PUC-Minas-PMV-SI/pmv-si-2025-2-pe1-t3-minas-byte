// Carregar cursos
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const res = await fetch("json/cursos.json");
        const data = (res.ok && await res.json()) || null;
        if (!data?.cursos) throw new Error("JSON inválido");
        renderizarCursos(data.cursos);
    } catch (e) {
        console.error("Erro ao carregar cursos:", e);
    }
});

// Renderizar cursos
function renderizarCursos(cursos) {
    const categorias = {
        basico:       { titulo: "Inclusão Digital" },
        programacao:  { titulo: "Tecnologia da informação" },
        gestao:       { titulo: "E-commerce, logística e operações" },
        design:       { titulo: "Design e Comunicação" },
        dados:        { titulo: "Análise de Dados" }
    };

    const hero = document.querySelector(".quiz-hero");
    if (!hero) return;

    const containerMaster = hero.parentNode;
    containerMaster.querySelectorAll(".container").forEach(el => el.remove());

    // Agrupar por categoria
    const grupos = cursos.reduce((acc, c) => {
        if (categorias[c.categoria]) {
            (acc[c.categoria] ||= []).push(c);
        }
        return acc;
    }, {});

    if (typeof criarCursoHTML !== "function") return;

    // Criar blocos de categoria
    Object.entries(grupos).forEach(([cat, lista]) => {
        const bloco = document.createElement("div");
        bloco.className = "container";

        bloco.innerHTML = `
            <h3 class="category-title">${categorias[cat].titulo}</h3>
            <div class="cursos">
                ${lista.map(criarCursoHTML).join("")}
            </div>
        `;

        containerMaster.appendChild(bloco);
    });

    typeof ativarEventos === "function" && ativarEventos();
}
