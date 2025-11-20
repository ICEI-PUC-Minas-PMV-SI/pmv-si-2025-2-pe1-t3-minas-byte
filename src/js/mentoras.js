class MentorasManager {
    constructor() {
        this.mentoras = [];
        this.init();
    }

    async init() {
        await this.carregarMentoras();
        this.renderizarMentoras();
        this.configurarFiltros();
    }

    async carregarMentoras() {
        try {
            const response = await fetch('json/mentoras.json');
            const data = await response.json();
            this.mentoras = data.mentoras;
        } catch (error) {
            console.error('Erro ao carregar mentoras:', error);
        }
    }

    renderizarMentoras(mentorasFiltradas = null) {
        const container = document.querySelector('.mentoras-grid');
        const mentoras = mentorasFiltradas || this.mentoras;

        container.innerHTML = mentoras.map(mentora => this.criarCardMentora(mentora)).join('');
    }

    criarCardMentora(mentora) {
        const badgeClass = mentora.categoria.toLowerCase().replace('ç', 'c').replace('ã', 'a');

        return `
            <div class="mentora-card" data-category="${mentora.categoria}">
                <div class="mentora-image">
                    <img src="${mentora.imagem}" alt="${mentora.nome}">
                    <div class="mentora-badge ${badgeClass}">
                        <img src="img/icons/brilhando.png" class="badge-icon">
                        <span>${mentora.categoria}</span>
                    </div>
                </div>

                <div class="mentora-content">
                    <div class="mentora-header">
                        <h3>${mentora.nome}</h3>
                        <div class="mentora-rating">
                            <img src="img/icons/estrela.png" class="star-icon">
                            <span>${mentora.rating}</span>
                        </div>
                    </div>

                    <p class="mentora-role">${mentora.cargo} | ${mentora.empresa}</p>
                    <p class="mentora-bio">${mentora.bio}</p>

                    <div class="mentora-specialties">
                        ${mentora.especialidades.map(esp => `<span class="specialty-tag">${esp}</span>`).join('')}
                    </div>

                    <div class="mentora-actions">
                        <button class="btn-mentora" onclick="agendarMentoria(${mentora.id})">Agendar Mentoria</button>
                        <button class="btn-conversa" onclick="iniciarConversa(${mentora.id})">
                            <img src="img/icons/chat.png" class="icone-conversa">
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    configurarFiltros() {
        const filtros = document.querySelectorAll('.filtro-btn');

        filtros.forEach(filtro => {
            filtro.addEventListener('click', (e) => {
                filtros.forEach(f => f.classList.remove('active'));
                e.target.classList.add('active');

                const categoria = e.target.dataset.filter;
                this.filtrarMentoras(categoria);
            });
        });
    }

    filtrarMentoras(categoria) {
        if (categoria === 'all') {
            this.renderizarMentoras();
        } else {
            const mentorasFiltradas = this.mentoras.filter(mentora => mentora.categoria === categoria);
            this.renderizarMentoras(mentorasFiltradas);
        }
    }
}

// Funções globais
function agendarMentoria(id) { abrirModalAgendamento(); }
function iniciarConversa(id) {
    const mentorasManager = window.mentorasManagerInstance;
    if (!mentorasManager) return;

    const mentora = mentorasManager.mentoras.find(m => m.id === id);
    if (mentora) abrirConversa(mentora);
}

document.addEventListener('DOMContentLoaded', () => {
    window.mentorasManagerInstance = new MentorasManager();
});
