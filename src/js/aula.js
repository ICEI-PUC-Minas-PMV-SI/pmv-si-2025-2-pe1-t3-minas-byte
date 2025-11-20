async function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const cursoId = urlParams.get('id');
    
    if (cursoId) {
        await carregarCurso(cursoId);
    }
}

async function carregarCurso(id) {
    try {
        const response = await fetch('./json/cursos.json');
        const data = await response.json();
        const curso = data.cursos.find(c => c.id == id);
        
        if (curso) {
            // Atualizar título do curso
            const tituloElement = document.querySelector('.titulo-curso');
            if (tituloElement) {
                tituloElement.textContent = `Conteúdo do curso: ${curso.titulo}`;
            }
            
            // Carregar aulas dinamicamente
            if (curso.aulas && curso.aulas.length > 0) {
                carregarAulas(curso.aulas);
            }
            
            // Carregar requisitos dinamicamente
            if (curso.requisitos && curso.requisitos.length > 0) {
                carregarRequisitos(curso.requisitos);
            }
            
            // Carregar informações da instrutora
            if (curso.instrutora) {
                const nomeElement = document.querySelector('.info-instr h4');
                const descElement = document.querySelector('.info-instr p');
                const imgElement = document.querySelector('.img-instrutora');
                const bioElement = document.querySelector('.desc-intr p');
                
                if (nomeElement) nomeElement.textContent = curso.instrutora.nome;
                if (descElement) descElement.textContent = curso.instrutora.descricao;
                if (imgElement) imgElement.src = curso.instrutora.imagem;
                if (bioElement) bioElement.textContent = curso.instrutora.biografia;
            }
        }
    } catch (error) {
        console.error('Erro ao carregar curso:', error);
    }
}

function carregarAulas(aulas) {
    const accordionContainer = document.querySelector('.accordion');
    if (!accordionContainer) return;
    
    // Limpar conteúdo existente
    accordionContainer.innerHTML = '';
    
    aulas.forEach((aula, index) => {
        const aulaNumber = index + 1;
        const accordionItem = document.createElement('div');
        accordionItem.className = 'accordion-item';
        
        accordionItem.innerHTML = `
            <input type="checkbox" id="item${aulaNumber}">
            <label class="accordion-header" for="item${aulaNumber}">
                <span class="titulo-item">Aula ${aulaNumber}: ${aula.titulo}</span>
                <span class="seta">▼</span>
            </label>
            <div class="accordion-content">
                <p class="descricao-curso">${aula.descricao}</p>
                <div class="p-icons">
                    <i class="icone bi bi-download" onclick="baixarConteudoAula(${aulaNumber})"></i>
                    <i class="icone bi bi-caret-right-square-fill" onclick="abrirModal(${aulaNumber})"></i>
                </div>
            </div>
        `;
        
        accordionContainer.appendChild(accordionItem);
    });
}

function carregarRequisitos(requisitos) {
    const requisitosContainer = document.querySelector('.requisitos-um');
    if (!requisitosContainer) return;
    
    // Manter o título e limpar apenas os requisitos
    const titulo = requisitosContainer.querySelector('h3');
    requisitosContainer.innerHTML = '';
    
    if (titulo) {
        requisitosContainer.appendChild(titulo);
    } else {
        const novoTitulo = document.createElement('h3');
        novoTitulo.textContent = 'Requisitos';
        requisitosContainer.appendChild(novoTitulo);
    }
    
    requisitos.forEach(requisito => {
        const requisitoDiv = document.createElement('div');
        requisitoDiv.className = 'requisitos-icones';
        
        requisitoDiv.innerHTML = `
            <i class="bi bi-check2-circle"></i>
            <p>${requisito}</p>
        `;
        
        requisitosContainer.appendChild(requisitoDiv);
    });
}

function abrirModal(aulaNumero = null) {
    const modal = document.getElementById('modalVideo');
    const modalTitulo = modal.querySelector('h2');
    
    if (aulaNumero) {
        modalTitulo.textContent = `Aula ${aulaNumero}`;
    } else {
        modalTitulo.textContent = 'Aula';
    }
    
    modal.style.display = 'flex';
}

function fecharModal() {
    document.getElementById('modalVideo').style.display = 'none';
}

function baixarConteudoAula(aulaNumero = null) {
    if (aulaNumero) {
        alert(`Download da Aula ${aulaNumero} iniciado!`);
    } else {
        alert('Download iniciado!');
    }
}

document.addEventListener('DOMContentLoaded', init);
