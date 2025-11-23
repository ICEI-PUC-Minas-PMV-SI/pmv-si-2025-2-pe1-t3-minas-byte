//Forum
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

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("botao-excluir")) {
        const post = e.target.closest(".post, .resposta");
        if (post) {
            post.remove();
        }
    }
});


//Grupos
document.addEventListener("DOMContentLoaded", () => {

    const usuaria = JSON.parse(localStorage.getItem("usuariaLogada"));

    // Filtro grupos
    const filtroBtns = document.querySelectorAll(".filtro-btn");
    const cards = document.querySelectorAll(".cardss");

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

    // Pop up grupos
    function abrirPopup(titulo, mensagem, callback) {
        document.getElementById("popup-titulo").innerText = titulo;
        document.getElementById("popup-mensagem").innerText = mensagem;

        const popup = document.getElementById("popup");
        popup.style.display = "flex";

        document.getElementById("popup-ok").onclick = () => {
            popup.style.display = "none";
            if (callback) callback();
        };
    }

    // Historico grupos
    let historicos = JSON.parse(localStorage.getItem("historico_grupos")) || {};

    function salvarHistorico() {
        localStorage.setItem("historico_grupos", JSON.stringify(historicos));
    }

    //Usuárias ficticias
    const usuariasPreCadastradas = [
        "Ana", "Luiza", "Marina", "Paula", "Juliana", "Rosana",
        "Milena", "Fernanda", "Leila", "Sofia", "Karen", "Carla",
        "Luana", "Lívia", "Letícia"
    ];

    //Mensagens cadastradas
    const mensagensIniciais = {
        "Autoconhecimento e autoestima": [
            { nome: "Ana", texto: "Oi meninas, como estão hoje?" },
            { nome: "Luiza", texto: "Animadas pra conversar um pouco?" }
        ],
        "Cuidando de mim": [
            { nome: "Marina", texto: "Meninas, alguém aqui faz skincare diário?" },
            { nome: "Paula", texto: "Quero dicas pra conseguir relaxar corpo e mente, dicas?" }
        ],
        "Projeto de vida": [
            { nome: "Juliana", texto: "Quais metas vocês estão planejando esse mês?" },
            { nome: "Rosana", texto: "As principais são estudar e conseguir ganhar renda extra!!" },
            { nome: "Milena", texto: "Pelo menos aqui no inovaelas você pode conseguir os dois!!" }
        ],
        "Rede de apoio": [
            { nome: "Fernanda", texto: "Se precisarem conversar, estou aqui 💛" },
            { nome: "Leila", texto: "Estamos juntas sempre!" }
        ],
        "Cidadania da mulher": [
            { nome: "Ana Paula", texto: "Alguém viu as novas políticas públicas sobre mulheres?" },
            { nome: "Mara", texto: "Me atualiza? Por favor!" }
        ],
        "Autonomia feminina": [
            { nome: "Sofia", texto: "Vocês usam planilha financeira?" },
            { nome: "Karen", texto: "Acho muito importante a organização!" }
        ],
        "Liderança Feminina": [
            { nome: "Carla", texto: "Quero melhorar minha autoconfiança no trabalho." },
            { nome: "Luana", texto: "É uma área predominantemente masculina!" }
        ],
        "Encontros e vivências": [
            { nome: "Lívia", texto: "Meninas, já foram em algum evento aqui da comunidade?" }
        ],
        "Desenvolvimento profissional": [
            { nome: "Letícia", texto: "Quero crescer na carreira, bora trocar ideias!" }
        ]
    };

    // Mng automaticas
    const respostasAutomaticas = [
        "Nossa, adorei!",
        "Muito interessante isso!",
        "Conta mais sobre isso!",
        "Também penso assim!",
        "Caramba! Isso eu não sabia!",
        "Faz total sentido!",
        "Que legal ouvir isso!",
        "Uau! Me identifiquei demais!",
        "Não entendi, me explica por favor!"
    ];

    //Entrar/Participar
    const btnsParticipar = document.querySelectorAll(".btn-participar");

    btnsParticipar.forEach(btn => {
        btn.addEventListener("click", () => {

            if (!usuaria) {
                abrirPopup("Atenção", "Você precisa estar logada!");
                return;
            }

            const card = btn.closest(".cardss");
            const titulo = card.querySelector("h3").innerText;

            if (btn.innerText === "Participar") {
                abrirPopup(
                    "Inscrição realizada!",
                    `Parabéns, ${usuaria.nome}!\nVocê entrou no grupo: "${titulo}".`,
                    () => {
                        btn.innerText = "Entrar";
                        btn.style.backgroundColor = "#364c84";
                        btn.style.color = "#fff";
                        btn.style.fontWeight = "600";
                    }
                );
                return;
            }
            if (btn.innerText === "Entrar") abrirModalChat(titulo);
        });
    });

    //Modal
    const modal = document.getElementById("modal-chat");
    const fechar = document.querySelector(".fechar-modal");
    const mensagensContainer = document.getElementById("chat-mensagens");
    const input = document.getElementById("mensagem-input");
    const enviar = document.getElementById("btn-enviar");
    const tituloChat = document.querySelector(".header-chat h3");

    let grupoAtual = "";

    function abrirModalChat(nomeGrupo) {
        grupoAtual = nomeGrupo;
        tituloChat.innerText = nomeGrupo;

        mensagensContainer.innerHTML = "";

        if (!historicos[grupoAtual]) {
            historicos[grupoAtual] = [];

            mensagensIniciais[grupoAtual]?.forEach(m => {
                const textoFormatado = `<b>${m.nome}:</b> ${m.texto}`;
                criarMensagem(textoFormatado, "outra");
                historicos[grupoAtual].push({ texto: textoFormatado, tipo: "outra" });
            });

            salvarHistorico();
        } else {
            historicos[grupoAtual].forEach(msg => criarMensagem(msg.texto, msg.tipo));
        }

        modal.style.display = "flex";
    }

    fechar.addEventListener("click", () => modal.style.display = "none");
    window.addEventListener("click", e => {
        if (e.target === modal) modal.style.display = "none";
    });

    enviar.addEventListener("click", enviarMensagem);
    input.addEventListener("keypress", e => { if (e.key === "Enter") enviarMensagem(); });

    function enviarMensagem() {
        const texto = input.value.trim();
        if (!texto) return;

        criarMensagem(texto, "eu");
        historicos[grupoAtual].push({ texto, tipo: "eu" });
        salvarHistorico();

        input.value = "";

        setTimeout(() => {
            const resposta = respostasAutomaticas[Math.floor(Math.random() * respostasAutomaticas.length)];
            const nomeAleatorio = usuariasPreCadastradas[Math.floor(Math.random() * usuariasPreCadastradas.length)];

            const mensagemFormatada = `<b>${nomeAleatorio}:</b> ${resposta}`;

            criarMensagem(mensagemFormatada, "outra");

            historicos[grupoAtual].push({ texto: mensagemFormatada, tipo: "outra" });
            salvarHistorico();
        }, 700);
    }

    function criarMensagem(texto, tipo) {
        const div = document.createElement("div");
        div.classList.add("msg", tipo);

        if (tipo === "outra") {
            const avatar = document.createElement("img");
            avatar.src = "./img/img_comunidade/img_pg_comun_1.png";
            avatar.classList.add("avatar-msg");
            div.appendChild(avatar);
        }

        const span = document.createElement("span");
        span.innerHTML = texto; 
        div.appendChild(span);

        mensagensContainer.appendChild(div);
        mensagensContainer.scrollTop = mensagensContainer.scrollHeight;
    }

});
