class UsuariaService {
    constructor() {
        this.cacheManager = window.cacheManager || new CacheManager();
    }

    // Gera UUID v4 estilo ALxxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
    generateUUID() {
        return 'ALxxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // Hash simples de senha
    hashPassword(password) {
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            hash = ((hash << 5) - hash) + password.charCodeAt(i);
            hash &= hash;
        }
        return Math.abs(hash).toString(16);
    }

    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    validatePassword(password) {
        return password?.length >= 3;
    }

    validateName(name) {
        return name?.trim().length >= 3;
    }

    // Carrega usuárias do localStorage
    async loadUsuarias() {
        let stored = localStorage.getItem('usuarias');

        if (stored) {
            let parsed = JSON.parse(stored);
            if (!parsed.usuarias) {
                parsed = { usuarias: [] };
                localStorage.setItem('usuarias', JSON.stringify(parsed));
            }
            return parsed;
        }

        const vazio = { usuarias: [] };
        localStorage.setItem('usuarias', JSON.stringify(vazio));
        return vazio;
    }

    async saveUsuarias(data) {
        if (!data.usuarias) data.usuarias = [];
        localStorage.setItem('usuarias', JSON.stringify(data));
        this.cacheManager.invalidate('usuarias');
        return true;
    }

    createCleanProfile(userData) {
        return {
            id: this.generateUUID(),
            nome: userData.nome.trim(),
            email: userData.email.trim().toLowerCase(),
            senha: this.hashPassword(userData.senha),
            foto: "",
            favoritos: [],
            inscritos: [],
            progressoCursos: {},
            agendamentos: [],
            grupos: [],
            certificados: [],
            aulasConcluidas: {}
        };
    }

    async cadastrar(userData) {
        const { nome, email, senha } = userData;
        if (!this.validateName(nome)) throw new Error('Nome deve ter pelo menos 3 caracteres');
        if (!this.validateEmail(email)) throw new Error('E-mail inválido');
        if (!this.validatePassword(senha)) throw new Error('Senha deve ter pelo menos 3 caracteres');

        const data = await this.loadUsuarias();

        if (data.usuarias.some(u => u.email === email.trim().toLowerCase())) {
            throw new Error('E-mail já cadastrado');
        }

        const newProfile = this.createCleanProfile(userData);
        data.usuarias.push(newProfile);

        await this.saveUsuarias(data);

        return { success: true, id: newProfile.id };
    }

    async autenticar(email, senha) {
        if (!email || !senha) throw new Error('E-mail e senha são obrigatórios');

        const data = await this.loadUsuarias();
        const hashed = this.hashPassword(senha);

        const usuaria = data.usuarias.find(u =>
            u.email === email.trim().toLowerCase() && u.senha === hashed
        );

        if (!usuaria) throw new Error('E-mail ou senha incorretos');

        const session = {
            id: usuaria.id,
            nome: usuaria.nome,
            email: usuaria.email,
            loginTime: new Date().toISOString()
        };

        localStorage.setItem('usuariaLogada', JSON.stringify(session));
        return { success: true, usuaria: session };
    }

    getUsuariaLogada() {
        const stored = localStorage.getItem('usuariaLogada');
        return stored ? JSON.parse(stored) : null;
    }

    logout() {
        localStorage.removeItem('usuariaLogada');
        this.cacheManager.clear();
    }

    async carregarPerfil(id) {
        const data = await this.loadUsuarias();
        const usuaria = data.usuarias.find(u => u.id === id);
        if (!usuaria) throw new Error('Usuária não encontrada');
        return usuaria;
    }

    async atualizarPerfil(id, updates) {
        const data = await this.loadUsuarias();
        const index = data.usuarias.findIndex(u => u.id === id);
        if (index === -1) throw new Error('Usuária não encontrada');

        const usuaria = data.usuarias[index];

        if (updates.nome && !this.validateName(updates.nome)) throw new Error('Nome inválido');
        if (updates.email) {
            if (!this.validateEmail(updates.email)) throw new Error('E-mail inválido');
            const exists = data.usuarias.some(u => u.id !== id && u.email === updates.email.trim().toLowerCase());
            if (exists) throw new Error('E-mail já está em uso');
        }

        Object.keys(updates).forEach(k => {
            if (k !== 'senha' && updates[k] !== undefined) usuaria[k] = updates[k];
        });

        await this.saveUsuarias(data);
        return usuaria;
    }

    async alterarSenha(id, senhaAtual, novaSenha) {
        if (!this.validatePassword(novaSenha)) throw new Error('Nova senha inválida');

        const data = await this.loadUsuarias();
        const index = data.usuarias.findIndex(u => u.id === id);
        if (index === -1) throw new Error('Usuária não encontrada');

        const usuaria = data.usuarias[index];
        if (usuaria.senha !== this.hashPassword(senhaAtual)) throw new Error('Senha atual incorreta');

        usuaria.senha = this.hashPassword(novaSenha);
        await this.saveUsuarias(data);

        return { success: true };
    }

    async favoritarCurso(usuariaId, cursoId) {
        const data = await this.loadUsuarias();
        const usuaria = data.usuarias.find(u => u.id === usuariaId);
        if (!usuaria) throw new Error('Usuária não encontrada');

        if (!usuaria.favoritos.includes(cursoId)) usuaria.favoritos.push(cursoId);
        await this.saveUsuarias(data);

        return usuaria.favoritos;
    }

    async inscreverCurso(usuariaId, cursoId) {
        const data = await this.loadUsuarias();
        const usuaria = data.usuarias.find(u => u.id === usuariaId);
        if (!usuaria) throw new Error('Usuária não encontrada');

        if (!usuaria.inscritos.includes(cursoId)) {
            usuaria.inscritos.push(cursoId);
            usuaria.progressoCursos[cursoId] = 0;
        }

        await this.saveUsuarias(data);
        return { inscritos: usuaria.inscritos, progresso: usuaria.progressoCursos };
    }

    async atualizarProgresso(usuariaId, cursoId, progresso) {
        const data = await this.loadUsuarias();
        const usuaria = data.usuarias.find(u => u.id === usuariaId);
        if (!usuaria) throw new Error('Usuária não encontrada');

        usuaria.progressoCursos[cursoId] = Math.min(100, Math.max(0, progresso));

        if (progresso >= 100) await this.gerarCertificado(usuariaId, cursoId);

        await this.saveUsuarias(data);
        return usuaria.progressoCursos[cursoId];
    }

    async gerarCertificado(usuariaId, cursoId) {
        const data = await this.loadUsuarias();
        const usuaria = data.usuarias.find(u => u.id === usuariaId);
        if (!usuaria) return null;

        if (!usuaria.certificados) usuaria.certificados = [];
        if (usuaria.certificados.some(c => c.cursoId === cursoId)) return null;

        let nomeCurso = `Curso ${cursoId}`;
        try {
            const r = await fetch('./json/cursos.json');
            const json = await r.json();
            const curso = json.cursos.find(c => c.id == cursoId);
            if (curso) nomeCurso = curso.titulo;
        } catch (e) { }

        const certificado = {
            id: this.generateUUID(),
            cursoId,
            nomeCurso,
            dataEmissao: new Date().toISOString(),
            cargaHoraria: "40h",
            arquivo: `certificado_${cursoId}_${usuaria.nome.replace(/\s+/g, '_')}.pdf`
        };

        usuaria.certificados.push(certificado);
        await this.saveUsuarias(data);
        return certificado;
    }

    async concluirAula(usuariaId, cursoId, aulaId) {
        const data = await this.loadUsuarias();
        const usuaria = data.usuarias.find(u => u.id === usuariaId);
        if (!usuaria) throw new Error('Usuária não encontrada');

        if (!usuaria.aulasConcluidas[cursoId]) usuaria.aulasConcluidas[cursoId] = [];

        if (!usuaria.aulasConcluidas[cursoId].includes(aulaId)) {
            usuaria.aulasConcluidas[cursoId].push(aulaId);

            let totalAulas = 30;
            try {
                const r = await fetch('./json/cursos.json');
                const json = await r.json();
                const curso = json.cursos.find(c => c.id == cursoId);
                if (curso?.aulas) totalAulas = curso.aulas.length;
            } catch (e) { }

            const concluidas = usuaria.aulasConcluidas[cursoId].length;
            usuaria.progressoCursos[cursoId] = Math.round((concluidas / totalAulas) * 100);

            if (usuaria.progressoCursos[cursoId] >= 100) await this.gerarCertificado(usuariaId, cursoId);
        }

        await this.saveUsuarias(data);

        return {
            progresso: usuaria.progressoCursos[cursoId] || 0,
            aulasConcluidas: usuaria.aulasConcluidas[cursoId].length
        };
    }

    async agendarMentoria(usuariaId, mentoriaData) {
        const data = await this.loadUsuarias();
        const usuaria = data.usuarias.find(u => u.id === usuariaId);
        if (!usuaria) throw new Error('Usuária não encontrada');

        const agendamento = { id: this.generateUUID(), ...mentoriaData, dataAgendamento: new Date().toISOString() };
        usuaria.agendamentos.push(agendamento);

        await this.saveUsuarias(data);
        return agendamento;
    }

    async desmarcarMentoria(usuariaId, mentoriaId) {
        const data = await this.loadUsuarias();
        const usuaria = data.usuarias.find(u => u.id === usuariaId);
        if (!usuaria) throw new Error('Usuária não encontrada');

        usuaria.agendamentos = usuaria.agendamentos.filter(a => a.id !== mentoriaId);
        await this.saveUsuarias(data);

        return usuaria.agendamentos;
    }
}

// Instância global
const usuariaService = new UsuariaService();
window.usuariaService = usuariaService;
