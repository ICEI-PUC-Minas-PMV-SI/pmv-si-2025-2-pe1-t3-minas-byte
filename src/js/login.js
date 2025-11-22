document.addEventListener("DOMContentLoaded", () => {
  console.log("Login.js carregado");

  const form = document.getElementById("formLogin") || document.getElementById("loginForm");
  if (!form) return console.warn("Formulário de login não encontrado");

  console.log("Formulário de login encontrado:", form.id);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Formulário de login submetido");

    const email = document.getElementById("email")?.value.trim();
    const senha = document.getElementById("senha")?.value.trim();

    console.log("Dados do login:", { email, senha });

    if (!email || !senha) return alert("Preencha todos os campos.");

    try {
      console.log("Tentando fazer login...");
      const result = await usuariaService.autenticar(email, senha);

      console.log("Login realizado:", result);
      alert(`Bem-vinda, ${result.usuaria.nome}!`);
      window.location.href = "index.html";

    } catch (error) {
      console.error("Erro no login:", error);
      alert(error.message);
    }
  });
});
