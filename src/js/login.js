document.getElementById("formLogin").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  // Verifica se os campos estão preenchidos
  if (!email || !senha) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  // Busca usuárias cadastradas no localStorage
  const usuarias = JSON.parse(localStorage.getItem("usuarias")) || [];

  // Procura usuária com email e senha correspondentes
  const usuariaEncontrada = usuarias.find(
    (u) => u.email === email && u.senha === senha
  );

  if (usuariaEncontrada) {
    alert(`Bem-vinda, ${usuariaEncontrada.nome}!`);
    localStorage.setItem("usuariaLogada", JSON.stringify(usuariaEncontrada));
    window.location.href = "home.html"; // redireciona para página principal
  } else {
    alert("E-mail ou senha incorretos. Tente novamente.");
  }
});
