document.addEventListener("DOMContentLoaded", () => {
  const usuaria = JSON.parse(localStorage.getItem("usuariaLogada"));
  const todosOsCards = document.querySelectorAll(".card, .curso");

  // Redireciona para pg descrição
  todosOsCards.forEach(card => {
    card.style.cursor = "pointer";
    card.addEventListener("click", (e) => {
      if (
        e.target.closest(".btn-inscreva") ||
        e.target.closest(".btn-inscrever") ||
        e.target.closest(".btn-favorito")
      ) {
        e.stopPropagation();
        return;
      }

      const destino = card.getAttribute("data-link");
      if (destino) {
        window.location.href = destino;
      }
    });
  });

  // Inscrição
  document.querySelectorAll(".btn-inscrever, .btn-inscreva").forEach(btn => {
    btn.addEventListener("click", (event) => {
      event.stopPropagation();

      // Pega o estado atual da inscrição da usuaria
      const inscricaoAtual = JSON.parse(localStorage.getItem("cursoInscrito"));
      const card = btn.closest(".card") || btn.closest(".curso");
      if (!card) return;

      const nomeCurso =
        card.querySelector(".card-title")?.textContent?.trim() ||
        card.querySelector("h3")?.textContent?.trim() ||
        "Curso";

      if (!usuaria) {
        alert("Faça login para realizar a inscrição!!");
        return;
      }

      // Verifica se utiliza a versão atualizada do localStorage
      if (inscricaoAtual && inscricaoAtual.email === usuaria.email && inscricaoAtual.curso !== nomeCurso) {
        alert(`Você já está inscrita no curso "${inscricaoAtual.curso}". Só é possível realizar um curso por vez.`);
        return;
      }

      const novaInscricao = { email: usuaria.email, curso: nomeCurso };
      localStorage.setItem("cursoInscrito", JSON.stringify(novaInscricao));

      btn.textContent = "Inscrita";
      btn.classList.add("btn-success");
      btn.disabled = true;

      //Msg de inscrição
      const popup = document.createElement("div");
      popup.classList.add("popup-inscricao");
      popup.innerHTML = `
        <h3>Parabéns, ${usuaria.nome}!</h3>
        <p>Você está inscrita no curso <strong>${nomeCurso}</strong>.</p>
        <div>
          <button id="btnOk">OK</button>
          <button id="btnIrSala">Ir para a sala de aula</button>
        </div>
      `;
      document.body.appendChild(popup);

      document.getElementById("btnOk").onclick = () => popup.remove();
      document.getElementById("btnIrSala").onclick = () => {
        window.location.href = "aula.html";
      };
    });

    // Botão inscreva-se desativado se já estiver inscrita
    const card = btn.closest(".card") || btn.closest(".curso");
    const nomeCurso =
      card.querySelector(".card-title")?.textContent?.trim() ||
      card.querySelector("h3")?.textContent?.trim();

    const inscricaoAtual = JSON.parse(localStorage.getItem("cursoInscrito"));

    if (
      inscricaoAtual &&
      usuaria &&
      inscricaoAtual.email === usuaria.email &&
      inscricaoAtual.curso === nomeCurso
    ) {
      btn.textContent = "Inscrita";
      btn.classList.add("btn-success");
      btn.disabled = true;
    }
  });
});
