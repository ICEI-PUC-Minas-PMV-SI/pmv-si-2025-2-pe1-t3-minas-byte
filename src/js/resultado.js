document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("lista-cursos");
  const resultado = JSON.parse(localStorage.getItem("quizResultado"));

  if (!resultado || !resultado.cursosSelecionados || resultado.cursosSelecionados.length === 0) {
    container.innerHTML = "<p>Nenhum resultado encontrado. Faça o quiz primeiro.</p>";
    return;
  }

  container.innerHTML = "";

  resultado.cursosSelecionados.forEach(curso => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${curso.imagem || 'img/default.png'}" alt="${curso.titulo}">
      <h3>${curso.titulo}</h3>
      <p>${curso.descricao}</p>
      <button class="btn-inscrever">Inscrever-se</button>
    `;

    container.appendChild(card);
  });
});
