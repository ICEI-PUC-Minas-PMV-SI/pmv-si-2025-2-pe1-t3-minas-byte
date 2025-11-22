document.addEventListener("DOMContentLoaded", () => {
  console.log('Auth.js carregado');

  const form = document.getElementById("formCadastro") || document.getElementById("registerForm");
  if (!form) {
    console.log('Formulário não encontrado');
    return;
  }

  console.log('Formulário encontrado:', form.id);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log('Formulário submetido');

    const nome = (document.getElementById("name") || document.getElementById("nome")).value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    console.log('Dados do formulário:', { nome, email, senha });

    if (!nome || !email || !senha) {
      alert("Preencha todos os campos.");
      return;
    }

    try {
      console.log('Tentando cadastrar usuária...');
      const result = await usuariaService.cadastrar({ nome, email, senha });
      console.log('Cadastro realizado:', result);
      alert("Cadastro realizado com sucesso!");
      form.reset();
      window.location.href = "login.html";
    } catch (error) {
      console.error('Erro no cadastro:', error);
      alert(error.message);
    }
  });
});
