document.getElementById("formCadastro").addEventListener("submit", (e) => {
  e.preventDefault();

  // Captura os valores dos campos
  const nome = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  // Verifica se os campos estão preenchidos
  if (!nome || !email || !senha) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  // Busca usuários já salvos no localStorage
  let usuarias = JSON.parse(localStorage.getItem("usuarias")) || [];

  // Verifica se já existe uma usuária com o mesmo e-mail
  const usuariaExistente = usuarias.find((u) => u.email === email);
  if (usuariaExistente) {
    alert("E-mail já cadastrado. Tente fazer login.");
    return;
  }

  // Cria o objeto da nova usuária
  const novaUsuaria = {
    nome,
    email,
    senha,
  };

  // Adiciona ao array e salva no LocalStorage
  usuarias.push(novaUsuaria);
  localStorage.setItem("usuarias", JSON.stringify(usuarias));

  alert("Cadastro realizado com sucesso!");
  window.location.href = "login.html"; // Redireciona para o login
});
