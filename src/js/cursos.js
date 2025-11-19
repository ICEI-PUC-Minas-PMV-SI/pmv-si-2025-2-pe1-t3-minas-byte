document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch('json/cursos.json');
        const data = await response.json();

        renderizarCursos(data.cursos);
    } catch (error) {
        console.error('Erro ao carregar cursos:', error);
    }
});

function renderizarCursos(cursos) {
    // Categorizar cursos
    const categorias = {
        'basico': { titulo: 'Inclusão Digital', cursos: [] },
        'programacao': { titulo: 'Tecnologia da informação', cursos: [] },
        'gestao': { titulo: 'E-commerce, logística e operações', cursos: [] },
        'design': { titulo: 'Design e Comunicação', cursos: [] },
        'dados': { titulo: 'Análise de Dados', cursos: [] }
    };

    cursos.forEach(curso => {
        if (categorias[curso.categoria]) {
            categorias[curso.categoria].cursos.push(curso);
        }
    });

    const container = document.querySelector('.quiz-hero').parentNode;

    const existingContainers = container.querySelectorAll('.container');
    existingContainers.forEach(cont => cont.remove());

    Object.keys(categorias).forEach(catKey => {
        const categoria = categorias[catKey];
        if (categoria.cursos.length > 0) {

            const containerDiv = document.createElement('div');
            containerDiv.className = 'container';

            const title = document.createElement('h3');
            title.className = 'category-title';
            title.textContent = categoria.titulo;
            containerDiv.appendChild(title);

            const cardsDiv = document.createElement('div');
            cardsDiv.className = 'cards';

            categoria.cursos.forEach(curso => {
                const cardDiv = document.createElement('div');
                cardDiv.className = 'card';
                cardDiv.setAttribute('data-id', curso.id);

                cardDiv.innerHTML = `
                    <img src="${curso.imagem}" alt="${curso.titulo}">
                    <div class="card-content">
                        <div>
                            <span class="tag">${curso.categoria}</span>
                            <span class="level">${curso.nivel}</span>
                        </div>
                        <div class="card-title">${curso.titulo}</div>
                        <div class="card-desc">${curso.descricao}</div>
                        <div class="card-footer">
                            <span class="rating">4.9</span>
                            <button class="btn btn-inscrever">Inscreva-se</button>
                        </div>
                    </div>
                `;

                cardsDiv.appendChild(cardDiv);
            });

            containerDiv.appendChild(cardsDiv);
            container.appendChild(containerDiv);

            const br = document.createElement('br');
            container.appendChild(br);
        }
    });

    ativarEventos();
}

function ativarEventos() {
    const usuaria = JSON.parse(localStorage.getItem("usuariaLogada"));
    const todosOsCards = document.querySelectorAll(".card");

    // Redireciona ao clicar no card
    todosOsCards.forEach(card => {
        card.style.cursor = "pointer";

        card.addEventListener("click", (e) => {
            if (e.target.closest(".btn-inscrever")) {
                e.stopPropagation();
                return;
            }
            const idCurso = card.getAttribute("data-id");
            if (idCurso) {
                window.location.href = "descricao.html?id=" + idCurso;
            }
        });
    });

    // Inscrição
    document.querySelectorAll(".btn-inscrever").forEach(btn => {
        btn.addEventListener("click", (event) => {
            event.stopPropagation();

            const card = btn.closest(".card");
            if (!card) return;

            const nomeCurso = card.querySelector(".card-title")?.textContent?.trim();
            const idCurso = card.getAttribute("data-id");

            if (!usuaria) {
                alert("Faça login para se inscrever!");
                return;
            }

            const inscricaoAtual = JSON.parse(localStorage.getItem("cursoInscrito"));

            if (inscricaoAtual && inscricaoAtual.curso !== nomeCurso) {
                alert(`Você já está inscrita no curso "${inscricaoAtual.curso}".`);
                return;
            }

            localStorage.setItem("cursoInscrito", JSON.stringify({
                email: usuaria.email,
                curso: nomeCurso
            }));

            localStorage.setItem("cursoSelecionado", idCurso);

            btn.textContent = "Inscrita";
            btn.classList.add("btn-success");
            btn.disabled = true;

            alert(`Parabéns! Você está inscrita no curso "${nomeCurso}".`);
        });
    });
}
