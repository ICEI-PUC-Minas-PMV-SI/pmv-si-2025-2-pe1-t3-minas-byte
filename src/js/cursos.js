document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("json/cursos.json");
        if (!response.ok) throw new Error(); // Falha na requisição
        const data = await response.json();
        if (!data?.cursos) throw new Error(); // JSON inválido
        renderizarCursos(data.cursos);
    } catch (error) {
        console.error("Erro ao carregar cursos:", error);
    }
});

function renderizarCursos(cursos) {
    const categorias = {
        basico: { titulo: "Inclusão Digital", cursos: [] },
        programacao: { titulo: "Tecnologia da informação", cursos: [] },
        gestao: { titulo: "E-commerce, logística e operações", cursos: [] },
        design: { titulo: "Design e Comunicação", cursos: [] },
        dados: { titulo: "Análise de Dados", cursos: [] }
    };

    cursos.forEach(curso => {
        if (categorias[curso.categoria]) {
            categorias[curso.categoria].cursos.push(curso);
        }
    });

    const hero = document.querySelector(".quiz-hero");
    if (!hero) return; // Elemento base não encontrado

    const container = hero.parentNode;
    container.querySelectorAll(".container").forEach(cont => cont.remove()); // Remove blocos antigos

    if (typeof criarCursoHTML !== "function") return; // Evita erro se a função não existir

    Object.entries(categorias).forEach(([key, categoria]) => {
        if (categoria.cursos.length === 0) return;

        const containerDiv = document.createElement("div");
        containerDiv.className = "container";

        const title = document.createElement("h3");
        title.className = "category-title";
        title.textContent = categoria.titulo;
        containerDiv.appendChild(title);

        const cursosDiv = document.createElement("div");
        cursosDiv.className = "cursos";
        cursosDiv.innerHTML = categoria.cursos
            .map(curso => criarCursoHTML(curso))
            .join("");

        containerDiv.appendChild(cursosDiv);
        container.appendChild(containerDiv);
    });

    if (typeof ativarEventos === "function") {
        ativarEventos(); // Ativa interações
    }
}
