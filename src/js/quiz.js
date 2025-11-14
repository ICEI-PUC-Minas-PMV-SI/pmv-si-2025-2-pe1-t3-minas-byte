document.getElementById("form-quiz").addEventListener("submit", function (e) {
  e.preventDefault();

  const respostas = {};
  for (let i = 1; i <= 10; i++) {
    const selecao = document.querySelector(`input[name="p${i}"]:checked`);
    respostas[`p${i}`] = selecao ? selecao.value : null;
  }

  const cursosDisponiveis = [
    { categoria: "Inclusão Digital", titulo: "Primeiros Passos no Computador", descricao: "Aprenda a ligar, usar teclado, mouse e organizar seus arquivos com autonomia.", imagem: "img/cursos/primeirospassos.png" },
    { categoria: "Inclusão Digital", titulo: "Ferramentas de Escritório", descricao: "Descubra como textos, planilhas e apresentações podem transformar sua rotina.", imagem: "img/cursos/ferramentasescritorio.png" },
    { categoria: "Inclusão Digital", titulo: "Segurança Digital para Iniciantes", descricao: "Navegue tranquilo(a) aprendendo a se proteger de golpes e cuidar da sua privacidade.", imagem: "img/cursos/segurancadigital.png" },
    { categoria: "Informática básica", titulo: "Informática básica", descricao: "Aprenda os fundamentos da informática, navegação na internet e uso de aplicativos essenciais para o dia a dia.", imagem: "img/cursos/informaticabasica.png" },
    { categoria: "Informática básica", titulo: "Pacote Office", descricao: "Desenvolva os primeiros passos no computador, internet e e-mail. Entendendo os cuidados online, a privacidade e prevenção de golpes.", imagem: "img/cursos/pacoteoffice.png" },
    { categoria: "Informática básica", titulo: "Digitação, arquivos, uso de nuvem", descricao: "Entenda como a tecnologia transforma empresas e como você pode começar nessa área cheia de oportunidades.", imagem: "img/cursos/digitacaoarquivos.png" },
    { categoria: "Tecnologia da informação", titulo: "Lógica de programação básica", descricao: "Aprenda os fundamentos da programação e algoritmos de forma simples.", imagem: "img/cursos/logicaprogramacao.png" },
    { categoria: "Tecnologia da informação", titulo: "Fundamentos de suporte técnico", descricao: "Aprenda a identificar e resolver problemas básicos de computadores e redes.", imagem: "img/cursos/suportetecnico.png" },
    { categoria: "Tecnologia da informação", titulo: "Desenvolvimento web", descricao: "Aprenda a criar sites e aplicações web, do básico ao intermediário.", imagem: "img/cursos/desenvolvimentoweb.png" }
  ];

  function escolherCursosAleatorios(array, n) {
    const copia = [...array];
    const resultado = [];
    n = Math.min(n, copia.length);
    for (let i = 0; i < n; i++) {
      const idx = Math.floor(Math.random() * copia.length);
      resultado.push(copia[idx]);
      copia.splice(idx, 1);
    }
    return resultado;
  }

  const cursosSelecionados = escolherCursosAleatorios(cursosDisponiveis, 3);

  localStorage.setItem("quizResultado", JSON.stringify({ respostas, cursosSelecionados }));

  window.location.href = "resultado.html";
});


