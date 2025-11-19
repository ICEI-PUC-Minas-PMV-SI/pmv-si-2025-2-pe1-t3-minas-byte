document.addEventListener("DOMContentLoaded", () => {
    const usuaria = JSON.parse(localStorage.getItem("usuariaLogada"));

    if (!usuaria) {
        alert("Você precisa estar logada para acessar a comunidade.");
        window.location.href = "login.html";
        return;
    }

    const postsContainer = document.querySelector("#posts-dinamicos");
    const inputPrincipal = document.querySelector("#forum .box-comentario .input-comentario");
    const btnPrincipal = document.querySelector("#forum .box-comentario .btn-comentar");

    // Post comentario principal
    btnPrincipal.addEventListener("click", () => {
        const texto = inputPrincipal.value.trim();
        if (texto === "") return;
        const novoPost = criarPostPrincipal(usuaria, texto);
        postsContainer.prepend(novoPost);

        inputPrincipal.value = "";
    });

    document.addEventListener("click", (e) => {

        // Excluir ou postar resposta a comentario
        if (e.target.classList.contains("btn-excluir")) {
            e.target.parentElement.remove();
            return;
        }

        // Postar resposta
        if (!e.target.classList.contains("btn-comentar")) return;

        const box = e.target.closest(".box-comentario");
        const input = box.querySelector(".input-comentario");
        const texto = input.value.trim();
        if (texto === "") return;

        const post = e.target.closest(".post");
        const novaResp = criarResposta(usuaria, texto);

        post.insertBefore(novaResp, post.querySelector(".box-comentario"));
        input.value = "";
    });
});

//Post 
function criarPostPrincipal(usuaria, texto) {
    const div = document.createElement("div");
    div.classList.add("post");

    div.innerHTML = `
        <div class="comentario">
            <img src="${usuaria.foto || './img/personas/comentarios/persona_julia_silva.jpeg'}" alt="user">
            <div class="texto">
                <p><strong>${usuaria.nome}</strong></p>
                <p>${texto}</p>
                <span>Agora mesmo</span>
            </div>
                <div class="enviar-comentario">
                    <button class="botao-excluir">Excluir</button>
                </div>
        </div>
        <div class="box-comentario">
            <input type="text" class="input-comentario" placeholder="Comentar">
            <button class="btn-comentar">Postar</button>
        </div>
    `;
    return div;
}

// Resposta
function criarResposta(usuaria, texto) {
    const div = document.createElement("div");
    div.classList.add("resposta");

    div.innerHTML = `
        <img src="${usuaria.foto || './img/personas/comentarios/persona_julia_silva.jpeg'}" alt="user">
        <div class="texto">
            <p><strong>${usuaria.nome}</strong></p>
            <p>${texto}</p>
            <span>Agora mesmo</span>
        </div>
        <div class="enviar-comentario">
            <button class="botao-excluir">Excluir</button>
        </div>
    `;
    return div;
}

document.addEventListener("DOMContentLoaded", () => {

    const usuaria = JSON.parse(localStorage.getItem("usuariaLogada"));
    const filtroBtns = document.querySelectorAll(".filtro-btn");
    const cards = document.querySelectorAll(".cardss");

    // Filtro grupo
    filtroBtns.forEach(btn => {
        btn.addEventListener("click", () => {

            filtroBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filtro = btn.innerText.trim().toLowerCase();

            cards.forEach(card => {
                const categoria = card.dataset.category;

                if (filtro === "todos" || filtro.includes(categoria)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // Pop inscrição grupo
    const btnsParticipar = document.querySelectorAll(".btn-participar");

    btnsParticipar.forEach(btn => {
        btn.addEventListener("click", () => {

            if (!usuaria) {
                alert("Você precisa estar logada.");
                return;
            }

            const card = btn.closest(".cardss");
            const titulo = card.querySelector("h3").innerText;

            alert(`Parabéns, ${usuaria.nome}! \nVocê está inscrita no grupo: "${titulo}".`);

            btn.innerText = "Entrar";
            btn.style.backgroundColor = "#364c84";
            btn.style.color = "#fff";
            btn.style.fontWeight = "600";
        });
    });

});

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("botao-excluir")) {
        const post = e.target.closest(".post, .resposta");
        if (post) {
            post.remove();
        }
    }
});