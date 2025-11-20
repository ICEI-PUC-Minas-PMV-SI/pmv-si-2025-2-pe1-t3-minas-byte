// Mapas usados para exibir nomes das categorias e níveis
const CATEGORIAS_EXIBICAO = {
    'basico': 'Digital Básico',
    'programacao': 'Programação',
    'dados': 'Dados',
    'design': 'Design',
    'gestao': 'Gestão'
};

const NIVEIS = {
    'basico': 'Iniciante',
    'programacao': 'Intermediário',
    'dados': 'Iniciante',
    'design': 'Iniciante',
    'gestao': 'Iniciante'
};

function criarCursoHTML(curso) {
    return `
        <div class="curso" data-link="descricao.html" data-id="${curso.id}" data-category="${curso.categoria}">
            <img src="${curso.imagem}" alt="${curso.titulo}">
            <button class="btn-favorito" onclick="toggleFavorito(this)">
                <img class="coracao" src="img/icons/coracao_blank.png" alt="Favorito">
            </button>
            <div class="curso-content">
                <div class="curso-topo">
                    <span class="curso-categoria">${CATEGORIAS_EXIBICAO[curso.categoria]}</span>
                    <span class="curso-nivel">${NIVEIS[curso.categoria]}</span>
                </div>
                <h3>${curso.titulo}</h3>
                <p>${curso.descricao}</p>
            </div>
            <div class="curso-footer">
                <div class="classificacao">
                    <span class="star-icon">⭐</span>
                    <span class="rating">${(Math.random() * 0.5 + 4.5).toFixed(1)}</span>
                </div>
                <button class="btn btn-inscreva">Inscreva-se</button>
            </div>
        </div>
    `;
}

function ativarEventos() {
    const usuaria = JSON.parse(localStorage.getItem("usuariaLogada"));

    document.querySelectorAll(".curso").forEach(card => {
        card.style.cursor = "pointer";

        card.addEventListener("click", (e) => {
            // Evita conflito com botões internos
            if (e.target.closest(".btn-inscreva") || e.target.closest(".btn-favorito")) {
                e.stopPropagation();
                return;
            }

            const destino = card.getAttribute("data-link");
            const idCurso = card.getAttribute("data-id");
            if (destino && idCurso) {
                window.location.href = `${destino}?id=${idCurso}`;
            }
        });
    });

    document.querySelectorAll(".btn-inscreva").forEach(btn => {
        btn.addEventListener("click", (event) => {
            event.stopPropagation();

            const inscricaoAtual = JSON.parse(localStorage.getItem("cursoInscrito"));
            const card = btn.closest(".curso");
            if (!card) return;

            const nomeCurso = card.querySelector("h3")?.textContent?.trim() || "Curso";

            if (!usuaria) {
                mostrarPopup("Atenção!", "Faça login para se inscrever!", false);
                return;
            }

            // Garante apenas uma inscrição por vez
            if (inscricaoAtual && inscricaoAtual.email === usuaria.email && inscricaoAtual.curso !== nomeCurso) {
                mostrarPopup("Já Inscrita!", `Você já está inscrita no curso "${inscricaoAtual.curso}". Só é possível realizar um curso por vez.`, false);
                return;
            }

            const novaInscricao = { email: usuaria.email, curso: nomeCurso };
            localStorage.setItem("cursoInscrito", JSON.stringify(novaInscricao));

            btn.textContent = "Inscrita";
            btn.classList.add("btn-success");
            btn.disabled = true;

            mostrarPopup(`Parabéns, ${usuaria.nome || 'Usuária'}!`, `Você está inscrita no curso <strong>${nomeCurso}</strong>.`, true, card);
        });

        // Marca visualmente caso a usuária já esteja inscrita
        const card = btn.closest(".curso");
        const nomeCurso = card.querySelector("h3")?.textContent?.trim();
        const inscricaoAtual = JSON.parse(localStorage.getItem("cursoInscrito"));

        if (inscricaoAtual && usuaria && inscricaoAtual.email === usuaria.email && inscricaoAtual.curso === nomeCurso) {
            btn.textContent = "Inscrita";
            btn.classList.add("btn-success");
            btn.disabled = true;
        }
    });
}

function toggleFavorito(btn) {
    const coracao = btn.querySelector('.coracao');
    btn.classList.toggle('favorito');

    coracao.src = btn.classList.contains('favorito')
        ? 'img/icons/coracao.png'
        : 'img/icons/coracao_blank.png';
}

function mostrarPopup(titulo, mensagem, sucesso, card = null) {
    // Remove popup anterior se houver
    const popupExistente = document.querySelector('.popup-inscricao');
    if (popupExistente) popupExistente.remove();

    const popup = document.createElement("div");
    popup.classList.add("popup-inscricao");
    if (!sucesso) popup.classList.add("erro");

    if (sucesso) {
        popup.innerHTML = `
            <h3>${titulo}</h3>
            <p>${mensagem}</p>
            <div class="popup-buttons">
                <button class="btn-popup-ok">OK</button>
                <button class="btn-popup-sala">Ir para a sala de aula</button>
            </div>
        `;
    } else {
        popup.innerHTML = `
            <h3>${titulo}</h3>
            <p>${mensagem}</p>
            <div class="popup-buttons">
                <button class="btn-popup-ok">Entendi</button>
            </div>
        `;
    }

    document.body.appendChild(popup);

    popup.querySelector('.btn-popup-ok').onclick = () => {
        popup.style.animation = 'popupSaida 0.2s ease-in';
        setTimeout(() => popup.remove(), 200);
    };

    // Redireciona ao concluir inscrição
    if (sucesso && card) {
        popup.querySelector('.btn-popup-sala').onclick = () => {
            const idCurso = card.getAttribute("data-id");
            window.location.href = idCurso ? `aula.html?id=${idCurso}` : "aula.html";
        };
    }
}
