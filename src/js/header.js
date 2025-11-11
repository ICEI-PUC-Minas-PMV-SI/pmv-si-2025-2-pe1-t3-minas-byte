const menuContainer = "menu-container";

const menuNaoLogado = "./components/headerFooter.html";
const menuLogado = "./components/headerlogado.html";

const paginasRestritas = [
    "comunidade.html",
    "marketplace.html",
    "bancoTalentos.html",
    "aula.html",
    "mentoria.html",
    "perfil.html",
    "quizPerguntas.html",
    "quizresultado.html"
];

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById(menuContainer);

    if (!container) {
        console.warn(`[Header] Container '${menuContainer}' não encontrado.`);
        return;
    }

    carregarHeader();
});

async function carregarHeader() {
    const container = document.getElementById(menuContainer);

    const usuaria = localStorage.getItem("usuariaLogada");

    const paginaAtual = window.location.pathname.split("/").pop();
    const ehRestrita = paginasRestritas.includes(paginaAtual);

    let caminho;

    if (ehRestrita && !usuaria) {
        window.location.href = "login.html";
        return;
    }

    caminho = usuaria ? menuLogado : menuNaoLogado;

    try {
        const res = await fetch(caminho);
        const html = await res.text();
        container.innerHTML = html;

        executarScripts(container);

    } catch (err) {
        console.error("[Header] Falha ao carregar menu:", err);
    }
}

function executarScripts(elemento) {
    const scripts = elemento.querySelectorAll("script");

    scripts.forEach(script => {
        const novo = document.createElement("script");

        if (script.src) {
            novo.src = script.src;
        } else {
            novo.textContent = script.textContent;
        }

        document.body.appendChild(novo);
        novo.remove();
    });
}

window.handleLogout = function () {
    localStorage.removeItem("usuariaLogada");
    window.location.href = "index.html";
};
