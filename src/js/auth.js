document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formCadastro") || document.getElementById("registerForm");
  if (!form) {
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = (document.getElementById("name") || document.getElementById("nome")).value.trim();
    const email = (document.getElementById("email")).value.trim().toLowerCase();
    const senha = (document.getElementById("senha")).value.trim();

    if (!nome || !email || !senha) {
      alert("Preencha todos os campos.");
      return;
    }

    const payload = { nome, email, senha };

    // tenta usar JSON Server
    try {
      // verifica se já existe (GET ?email=...)
      const check = await fetch(`http://localhost:3000/usuarios?email=${encodeURIComponent(email)}`);
      if (check.ok) {
        const found = await check.json();
        if (found.length > 0) {
          alert("E-mail já cadastrado. Faça login.");
          return;
        }
      } else {
        // se GET falhar com status diferente, vamos para fallback
        console.warn("JSON Server check retornou status:", check.status);
      }

      // cria usuário no JSON Server
      const res = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        // alert("Cadastro realizado com sucesso (via JSON Server)!");
        form.reset();
        window.location.href = "login.html";
        return;
      } else {
        // se o JSON Server retornar erro, cair no fallback
        console.warn("JSON Server POST retornou status:", res.status);
      }
    } catch (err) {
      // falha ao conectar ao JSON Server — vamos usar localStorage como fallback
      console.warn("Não foi possível conectar ao JSON Server — usando localStorage. Erro:", err.message);
    }

    // === Fallback: salvar em localStorage ===
    try {
      const key = "usuarias";
      let usuarias = JSON.parse(localStorage.getItem(key)) || [];
      const exists = usuarias.some(u => u.email === email);
      if (exists) {
        alert("E-mail já cadastrado (local). Faça login.");
        return;
      }
      usuarias.push(payload);
      localStorage.setItem(key, JSON.stringify(usuarias));
      alert("Cadastro realizado com sucesso (salvo localmente)!");
      form.reset();
      window.location.href = "login.html";
    } catch (err) {
      console.error("Erro ao salvar em localStorage:", err);
      alert("Erro ao cadastrar. Veja console.");
    }
  });
});
