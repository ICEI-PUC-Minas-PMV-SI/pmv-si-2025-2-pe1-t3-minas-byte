document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("lista-cursos");

  // Pega resultado do localStorage
  const resultado = JSON.parse(localStorage.getItem("quizResultado"));

  // Se não tiver resultado, mostra cursos de exemplo
  const cursos = resultado?.cursosSelecionados || [
    {
      titulo: "Primeiros Passos no Computador",
      descricao: "Aprenda a ligar, usar teclado, mouse e organizar seus arquivos com autonomia.",
      imagem: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
      tag: "Negócios",
      level: "Iniciante",
      rating: 4.9
    },
    {
      titulo: "Ferramentas de Escritório",
      descricao: "Descubra como textos, planilhas e apresentações podem transformar sua rotina.",
      imagem: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=800&q=80",
      tag: "Tecnologia",
      level: "Iniciante",
      rating: 4.9
    },
    {
      titulo: "Segurança Digital para Iniciantes",
      descricao: "Navegue tranquilo(a) aprendendo a se proteger de golpes e cuidar da sua privacidade.",
      imagem: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      tag: "Tecnologia",
      level: "Iniciante",
      rating: 4.8
    }
  ];

  container.innerHTML = "";

  cursos.forEach(curso => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${curso.imagem || 'img/default.png'}" alt="${curso.titulo}" />
      <div class="card-content">
        <div class="tags">
          <span class="tag">${curso.tag || ''}</span>
          <span class="tag level">${curso.level || ''}</span>
        </div>
        <h3 class="card-title">${curso.titulo}</h3>
        <p class="card-desc">${curso.descricao || ''}</p>
        <div class="card-footer">
          <div class="rating">${curso.rating || ''}</div>
          <button class="btn-inscrever">Inscreva-se</button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
});

