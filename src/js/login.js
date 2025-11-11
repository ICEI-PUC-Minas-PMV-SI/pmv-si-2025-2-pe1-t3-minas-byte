document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formLogin") || document.getElementById("loginForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = (document.getElementById("email")).value.trim().toLowerCase();
    const senha = (document.getElementById("senha")).value.trim();

    if (!email || !senha) {
      alert("Preencha todos os campos.");
      return;
    }

    // Tenta JSON Server
    try {
      const res = await fetch(`http://localhost:3000/usuarios?email=${encodeURIComponent(email)}&senha=${encodeURIComponent(senha)}`);
      if (res.ok) {
        const usuarios = await res.json();
        if (usuarios.length === 1) {
          // login OK
          const usuaria = usuarios[0];
          localStorage.setItem("usuariaLogada", JSON.stringify(usuaria));
          //alert(`Bem-vinda, ${usuaria.nome}! (via JSON Server)`);
          window.location.href = "index.html";
          return;
        } else {
          alert("E-mail ou senha incorretos.");
          return;
        }
      } else {
        console.warn("JSON Server GET retornou status:", res.status);
      }
    } catch (err) {
      console.warn("Não foi possível conectar ao JSON Server — tentando localStorage. Erro:", err.message);
    }

    // Fallback: checar localStorage
    try {
      const usuarias = JSON.parse(localStorage.getItem("usuarias")) || [];
      const usuaria = usuarias.find(u => u.email === email && u.senha === senha);
      if (usuaria) {
        localStorage.setItem("usuariaLogada", JSON.stringify(usuaria));
        alert(`Bem-vinda, ${usuaria.nome}! (local)`);
        window.location.href = "index.html";
      } else {
        alert("E-mail ou senha incorretos.");
      }
    } catch (err) {
      console.error("Erro ao verificar localStorage:", err);
      alert("Erro ao realizar login. Veja console.");
    }
  });
});
