class Resultado {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.cursos = [];
    this.init();
  }

  async init() {
    // Pega cursos do quiz ou do JSON
    const resultado = JSON.parse(localStorage.getItem("quizResultado"));

    if (resultado?.cursosSelecionados?.length > 0) {
      this.cursos = resultado.cursosSelecionados;
    } else {
      await this.carregarCursosDoJSON();
    }

    // Garante que cada curso tenha um ID consistente
    this.cursos = this.cursos.map((curso, index) => ({
      id: curso.id !== undefined ? curso.id : index + 1,
      ...curso
    }));

    this.renderizarCursos();
  }

  async carregarCursosDoJSON() {
    try {
      const response = await fetch('json/cursos.json');
      const data = await response.json();
      this.cursos = data.cursos;
    } catch (error) {
      console.error("Erro ao carregar cursos do JSON:", error);
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
    if (!this.container) return;
    this.container.innerHTML = '';

    this.cursos.forEach(curso => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${curso.imagem || 'img/default.png'}" alt="${curso.titulo}" class="curso-imagem" />
        <div class="card-content">
          <div class="tags">
            <span class="tag">${curso.categoria || curso.tag || ''}</span>
            <span class="tag level">${curso.nivel || curso.level || ''}</span>
          </div>
          <h3 class="card-title">${curso.titulo}</h3>
          <p class="card-desc">${curso.descricao || ''}</p>
          <div class="card-footer">
            <div class="rating">${curso.rating || ''}</div>
            <button class="btn-inscrever">Inscreva-se</button>
          </div>
        </div>
      `;

      // Clique na imagem abre descricao.html e salva curso completo no localStorage
      const img = card.querySelector(".curso-imagem");
      img.style.cursor = "pointer";
      img.addEventListener("click", async () => {
        try {
          const response = await fetch('json/cursos.json');
          const data = await response.json();

          // Pega o curso completo pelo ID
          const cursoCompleto = data.cursos.find(c => c.id === curso.id);
          if (!cursoCompleto) throw new Error("Curso não encontrado");

          // Salva no localStorage
          localStorage.setItem("cursoSelecionado", JSON.stringify(cursoCompleto));

          // Redireciona para a página de descrição
          window.location.href = "descricao.html";
        } catch (err) {
          console.error(err);
          alert("Erro ao carregar o curso. Tente novamente.");
        }
      });

      this.container.appendChild(card);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Resultado("lista-cursos");
});


