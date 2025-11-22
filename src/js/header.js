const menuContainer = "menu-container";
const menuNaoLogado = "./components/headerFooter.html";
const menuLogado = "./components/headerlogado.html";

const paginasRestritas = [
    "comunidade.html", "marketplace.html", "bancoTalentos.html", "aula.html",
    "mentoria.html", "perfil.html", "quizPerguntas.html", "quizresultado.html"
];

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById(menuContainer);
    if (!container) return console.warn(`[Header] Container '${menuContainer}' não encontrado.`);
    carregarHeader();
});

async function carregarHeader() {
    const container = document.getElementById(menuContainer);
    const usuaria = usuariaService?.getUsuariaLogada() || JSON.parse(localStorage.getItem("usuariaLogada") || "null");
    const paginaAtual = window.location.pathname.split("/").pop();
    const ehRestrita = paginasRestritas.includes(paginaAtual);

    if (ehRestrita && !usuaria) return (window.location.href = "login.html");

    const caminho = usuaria ? menuLogado : menuNaoLogado;

    try {
        const res = await fetch(caminho);
        container.innerHTML = await res.text();
        if (usuaria && usuariaService) await atualizarFotoHeader();
        executarScripts(container);
        configurarEventosAuth();
    } catch (err) {
        console.error("[Header] Falha ao carregar menu:", err);
    }
}

function executarScripts(elemento) {
    elemento.querySelectorAll("script").forEach(old => {
        const novo = document.createElement("script");
        old.src ? (novo.src = old.src) : (novo.textContent = old.textContent);
        document.body.appendChild(novo);
        novo.remove();
    });
}

async function atualizarFotoHeader() {
    try {
        const usuaria = usuariaService.getUsuariaLogada();
        if (!usuaria) return;

        const perfil = await usuariaService.carregarPerfil(usuaria.id);
        const fotoUrl = perfil.foto || "img/personas/comentarios/persona_julia_silva.jpeg";

        document.querySelectorAll(".usuaria-desktop img, .usuaria-mobile img")
            .forEach(img => (img.src = fotoUrl));

    } catch (error) {
        console.error("Erro ao atualizar foto do header:", error);
    }
}

window.atualizarHeaderFoto = atualizarFotoHeader;

function configurarEventosAuth() {
    document.addEventListener("click", e => {
        if (e.target.closest(".btn-logout")) return handleLogout();
    });

    const toggle = document.querySelector(".user-menu-toggle");
    const dropdown = document.querySelector(".user-dropdown");

    if (toggle && dropdown) {
        toggle.addEventListener("click", e => {
            e.preventDefault();
            dropdown.classList.toggle("show");
        });

        document.addEventListener("click", e => {
            if (!toggle.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.remove("show");
            }
        });
    }

    atualizarInfoUsuario();
}

function atualizarInfoUsuario() {
    const usuaria = usuariaService?.getUsuariaLogada() || JSON.parse(localStorage.getItem("usuariaLogada") || "null");
    const loginBtn = document.querySelector(".btn-login");
    const userMenu = document.querySelector(".user-menu");
    const userName = document.querySelector(".user-name");

    if (usuaria) {
        loginBtn && (loginBtn.style.display = "none");
        if (userMenu) {
            userMenu.style.display = "block";
            if (userName) userName.textContent = usuaria.nome;
        }
    } else {
        loginBtn && (loginBtn.style.display = "block");
        userMenu && (userMenu.style.display = "none");
    }
}

function handleLogout() {
    if (!confirm("Deseja realmente sair?")) return;
    usuariaService ? usuariaService.logout() : localStorage.removeItem("usuariaLogada");
    window.location.href = "index.html";
}

function verificarAutenticacao() {
    const usuaria = usuariaService?.getUsuariaLogada() || JSON.parse(localStorage.getItem("usuariaLogada") || "null");
    if (!usuaria) {
        alert("Você precisa estar logada para acessar esta página");
        window.location.href = "login.html";
        return false;
    }
    return true;
}

window.handleLogout = handleLogout;
window.verificarAutenticacao = verificarAutenticacao;
