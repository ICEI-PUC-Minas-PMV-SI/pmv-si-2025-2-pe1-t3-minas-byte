document.addEventListener("DOMContentLoaded", async () => {
  const footerContainer = document.getElementById("footer");

  if (footerContainer) {
    try {
      const resposta = await fetch("./components/footer.html");
      const html = await resposta.text();
      footerContainer.innerHTML = html;
    } catch (erro) {
      console.error("Erro ao carregar o footer:", erro);
    }
  }
});