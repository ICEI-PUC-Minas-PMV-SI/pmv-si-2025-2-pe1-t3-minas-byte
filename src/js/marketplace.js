// marketplace.js
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search");
  const jobList = document.querySelector(".job-list");
  const jobs = Array.from(jobList.querySelectorAll(".job-card"));
  const categoryCards = document.querySelectorAll(".category-card");

  // Função para filtrar vagas
  function filterJobs() {
    const searchTerm = searchInput.value.toLowerCase();

    // Pega categorias ativas
    const activeCategories = Array.from(categoryCards)
      .filter(card => card.classList.contains("active") && card.dataset.category !== "todas")
      .map(card => card.dataset.category.toLowerCase());

    jobs.forEach(job => {
      const jobTitle = job.querySelector("h4");
      const jobDesc = job.querySelector("p");
      const jobTags = job.querySelector(".tags").textContent.toLowerCase();
      const jobText = jobTitle.textContent.toLowerCase() + " " + jobDesc.textContent.toLowerCase();

      // Filtragem por busca e categoria
      const matchesSearch = jobText.includes(searchTerm) || jobTags.includes(searchTerm);
      const matchesCategory = activeCategories.length === 0 || activeCategories.some(cat => jobTags.includes(cat));

      if (matchesSearch && matchesCategory) {
        job.style.display = "block";
        setTimeout(() => job.style.opacity = "1", 10);
      } else {
        job.style.opacity = "0";
        setTimeout(() => job.style.display = "none", 300);
      }

      // Destacar termos da busca
      if (searchTerm) {
        const regex = new RegExp(`(${searchTerm})`, "gi");
        jobTitle.innerHTML = jobTitle.textContent.replace(regex, '<span class="highlight">$1</span>');
        jobDesc.innerHTML = jobDesc.textContent.replace(regex, '<span class="highlight">$1</span>');
      } else {
        jobTitle.innerHTML = jobTitle.textContent;
        jobDesc.innerHTML = jobDesc.textContent;
      }
    });
  }

  // Eventos dos category cards
  categoryCards.forEach(card => {
    card.addEventListener("click", () => {
      if (card.dataset.category === "todas") {
        categoryCards.forEach(c => c.classList.remove("active"));
        card.classList.add("active");
      } else {
        card.classList.toggle("active");
        document.querySelector(".category-card[data-category='todas']").classList.remove("active");
      }
      filterJobs();
    });
  });

  // Evento do input de busca
  searchInput.addEventListener("input", filterJobs);

  // Inicializa filtro
  filterJobs();
});

// --- ABRIR MODAL ---
const btnOferecerServico = document.querySelector(".hero button");
const modal = document.getElementById("modal-servico");
const btnFecharModal = document.getElementById("btn-fechar-modal");
const btnSalvarServico = document.getElementById("btn-salvar-servico");
const jobList = document.querySelector(".job-list");

const usuariaLogada = JSON.parse(localStorage.getItem("usuariaLogada"));
const nomeUsuaria = usuariaLogada?.nome || "Usuária";

btnOferecerServico.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

// Fechar modal
btnFecharModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// --- SALVAR SERVIÇO ---
btnSalvarServico.addEventListener("click", () => {
  const titulo = document.getElementById("titulo-servico").value.trim();
  const descricao = document.getElementById("descricao-servico").value.trim();
  const tags = document.getElementById("tags-servico").value.trim();

  if (!titulo || !descricao || !tags) {
    alert("Preencha todos os campos!");
    return;
  }

  // Criar card no formato do HTML já existente
  const card = document.createElement("div");
  card.classList.add("job-card");

  card.innerHTML = `
    <h4>${titulo}</h4>
    <p>${descricao}</p>
    <div class="tags">${formatarTags(tags)}</div>
    <span class="company">${nomeUsuaria}</span>
  `;

  // Adicionar no topo da lista
  jobList.prepend(card);

  // Limpar campos
  document.getElementById("titulo-servico").value = "";
  document.getElementById("descricao-servico").value = "";
  document.getElementById("tags-servico").value = "";

  modal.classList.add("hidden");
});

function formatarTags(texto) {
  return texto
    .split(",")
    .map(t => "#" + t.trim())
    .join(" ");
}
