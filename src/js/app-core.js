// Core App - Funcionalidades consolidadas (integra cache-manager.js)
class AppCore {
    constructor() {
        this.cache = new Map();
        this.cacheTime = 5 * 60 * 1000; 
        this.maxCacheSize = 50;
        this.usuaria = JSON.parse(localStorage.getItem('usuariaLogada') || 'null');
    }

    // Cache otimizado (integra CacheManager)
    async getData(key, fetchFn) {
        const cached = this.cache.get(key);

        // Retorno rápido se o cache estiver válido
        if (cached && Date.now() - cached.timestamp < this.cacheTime) {
            return cached.data;
        }

        // Limpa o item mais antigo se o cache estiver cheio
        if (this.cache.size >= this.maxCacheSize) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }

        // Busca os dados e armazena no cache
        const data = await fetchFn();
        this.cache.set(key, { data, timestamp: Date.now() });
        return data;
    }

    // Métodos do CacheManager
    invalidate(key) {
        this.cache.delete(key);
    }

    clear() {
        this.cache.clear();
    }

    getStats() {
        return {
            size: this.cache.size,
            maxSize: this.maxCacheSize,
            keys: Array.from(this.cache.keys())
        };
    }

    // Carregar cursos (executa apenas uma vez devido ao cache)
    async getCursos() {
        return this.getData('cursos', async () => {
            const response = await fetch('./json/cursos.json');
            return response.json();
        });
    }

    // Progresso simplificado
    getProgresso(cursoId) {
        const progresso = JSON.parse(localStorage.getItem('progresso') || '{}');
        return progresso[cursoId] || { aulas: [], percent: 0 };
    }

    setProgresso(cursoId, aulaId) {
        const progresso = JSON.parse(localStorage.getItem('progresso') || '{}');

        if (!progresso[cursoId]) {
            progresso[cursoId] = { aulas: [], percent: 0 };
        }

        // Evita duplicatas
        if (!progresso[cursoId].aulas.includes(aulaId)) {
            progresso[cursoId].aulas.push(aulaId);
        }

        localStorage.setItem('progresso', JSON.stringify(progresso));
        return progresso[cursoId];
    }

    // Favoritos simplificado
    toggleFavorito(cursoId) {
        if (!this.usuaria) return false;

        const favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
        const index = favoritos.indexOf(cursoId);

        if (index > -1) {
            favoritos.splice(index, 1); // remove
        } else {
            favoritos.push(cursoId);    // adiciona
        }

        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        return index === -1; // true = virou favorito
    }

    isFavorito(cursoId) {
        const favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
        return favoritos.includes(cursoId);
    }
}

// Instância global
window.app = new AppCore();

// Compatibilidade com cache-manager.js
window.cacheManager = window.app;
