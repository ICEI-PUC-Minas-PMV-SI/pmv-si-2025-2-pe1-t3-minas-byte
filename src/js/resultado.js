class Resultado {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.cursos = [];
    this.init();
  }

  async init() {
    // Carrega todos os cursos do JSON
    await this.carregarCursosDoJSON();
    const todosOsCursos = [...this.cursos];

    // Pega resultado salvo do quiz
    let resultadoQuiz = null;

    try {
      resultadoQuiz = JSON.parse(localStorage.getItem("quizResultado"));
    } catch (err) {
      console.warn("quizResultado inválido no localStorage:", err);
    }

    // Se existirem cursos selecionados no quiz, filtra
    if (resultadoQuiz?.cursosSelecionados?.length > 0) {
      const idsQuiz = resultadoQuiz.cursosSelecionados.map(c => Number(c.id));

      this.cursos = todosOsCursos.filter(curso =>
        idsQuiz.includes(Number(curso.id))
      );
    }

    // Caso não haja cursos filtrados, mostra alguns padrão
    if (!this.cursos || this.cursos.length === 0) {
      console.warn("Nenhum curso filtrado — exibindo cursos padrão.");
      this.cursos = todosOsCursos.slice(0, 3);
    }

    this.renderizarCursos();
  }

  async carregarCursosDoJSON() {
    try {
      const response = await fetch("json/cursos.json");

      if (!response.ok) {
        throw new Error(`Erro HTTP ${response.status}`);
      }

      const data = await response.json();

      if (!data?.cursos) {
        throw new Error("JSON sem propriedade 'cursos'");
      }

      this.cursos = data.cursos;
    } catch (error) {
      console.error("Erro ao carregar cursos do JSON:", error);

      // fallback caso falhe
      this.cursos = [
        {
          id: 1,
          titulo: "Curso padrão 1",
          descricao: "Descrição do curso padrão 1",
          imagem: "img/default.png",
          categoria: "Categoria Padrão",
          nivel: "Iniciante",
          rating: 5.0
        }
      ];
    }
  }

  renderizarCursos() {
    if (!this.container) {
      console.error("Container não encontrado!");
      return;
    }

    this.container.innerHTML = this.cursos
      .map(curso => criarCursoHTML(curso))
      .join("");

    if (typeof ativarEventos === "function") {
      ativarEventos();
    } else {
      console.warn("Função ativarEventos() não encontrada.");
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Resultado("lista-cursos");
});
