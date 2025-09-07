# Especificações do Projeto

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto.

Caso deseje atribuir uma imagem a sua persona, utilize o site https://thispersondoesnotexist.com/

## Personas

Beatriz Santos, 33 anos, é uma mãe solo desempregada, dedicada ao cuidado ao filho, mantendo a vontade de aprender e avançar profissionalmente. Ela busca uma profissão que ofereça estabilidade e flexibilidade, de modo que possa estudar enquanto cumpre suas responsabilidades familiares. Usa seu notebook antigo para ajudar nas tarefas e assistir aulas online. Beatriz quer reconquistar sua autoestima e se sentir confiante ao ingressar no mercado de trabalho. Para isso, precisa de um serviço que lhe ofereça qualificação profissional acessível, que seja empático e respeite seu tempo e situação, com orientação clara, personalizada e acolhedora.

Gabriela Almeida, 24 anos, é uma jovem criativa que trabalha informalmente como atendente e busca estabilidade financeira para conquistar independência. Apaixonada por desenho e artesanato, ela deseja transformar seu hobby em fonte de renda, adquirindo novas habilidades em design. Convive com ansiedade pela falta de apoio familiar e de estabilidade profissional. Gabriela precisa de um serviço que a oriente a organizar, divulgar e profissionalizar seus trabalhos, sempre com incentivo e reconhecimento de seu talento, para que desenvolva autoconfiança e cresça no mercado de forma sustentável.

Julia Souza, 20 anos, trabalha como recepcionista e tem como hobby a leitura, que utiliza como forma de aprendizado. Focada no futuro e no desejo de crescer, ela busca aprender tecnologia de maneira simples e prática, além de desenvolver hábitos de estudo e disciplina. Usa o celular diariamente para estudar e o caderno como ferramenta de apoio para anotações. Julia é determinada, mesmo enfrentando a falta de apoio e os desafios do início de carreira. Seu maior sonho é conquistar estabilidade profissional e independência financeira. Para isso, precisa de um serviço que lhe ofereça orientação clara, prática e voltada para iniciantes, permitindo que ela dê os primeiros passos rumo a uma carreira sólida.

## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Mãe solo| Um curso rápido para aprender modos para me profisionalizar mais rapidamente| Não esquecer de fazê-las|

|Mulher em busca da primeira oportunidade|Mentorias|Aprender sobre carreira e mercado de trabalho.|

|Mulher de baixa renda|Uma plataforma que não precise utilizar tanto dinheiro ou nada de dinheiro e mesmo assim tenha qualidade.|Para poder me profissionalizar e possa me sustentar.|

|Aluna em vulnerabilidade social|Conteúdo disponível offline|Conseguir estudar mesmo sem internet|

|Profissional em formação|Banco de talentos interno|Ser encontrada por empresas parceiras|

|Mulher com 2 empregos|Uma plataforma com cursos rápidos.|Procuro me desenvolver profissionalmente mesmo com pouco tempo e pouco poder aquisitivo.|

|Mulher que gera renda|Um marketplace de serviços digitais|Oferecer meus serviços e conquistar clientes|

|Uma mulher de 40 anos sem muito contato com tecnologia|Uma plataforma fácil de usar e intuitiva.|para me realocar no mercado de trabalho utilizado a tecnologia.|

|Mulher sem muito conhecimento técnico|Um quiz de recomendação de trilhas|Para iniciar os cursos no meu nível de conhecimento.|

Apresente aqui as histórias de usuário que são relevantes para o projeto de sua solução. As Histórias de Usuário consistem em uma ferramenta poderosa para a compreensão e elicitação dos requisitos funcionais e não funcionais da sua aplicação. Se possível, agrupe as histórias de usuário por contexto, para facilitar consultas recorrentes à essa parte do documento.

> **Links Úteis**:
> - [Histórias de usuários com exemplos e template](https://www.atlassian.com/br/agile/project-management/user-stories)
> - [Como escrever boas histórias de usuário (User Stories)](https://medium.com/vertice/como-escrever-boas-users-stories-hist%C3%B3rias-de-usu%C3%A1rios-b29c75043fac)
> - [User Stories: requisitos que humanos entendem](https://www.luiztools.com.br/post/user-stories-descricao-de-requisitos-que-humanos-entendem/)
> - [Histórias de Usuários: mais exemplos](https://www.reqview.com/doc/user-stories-example.html)
> - [9 Common User Story Mistakes](https://airfocus.com/blog/user-story-mistakes/)

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade | 
|------|-----------------------------------------|----| 
|RF-001| A aplicação deve permitir que o usuário gerencie suas tarefas | ALTA |  
|RF-002| A aplicação deve permitir a emissão de um relatório de tarefas realizadas no mês   | MÉDIA | 


### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| A aplicação deve ser responsiva | MÉDIA | 
|RNF-002| A aplicação deve processar requisições do usuário em no máximo 3s |  BAIXA | 

Com base nas Histórias de Usuário, enumere os requisitos da sua solução. Classifique esses requisitos em dois grupos:

- [Requisitos Funcionais
 (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
 correspondem a uma funcionalidade que deve estar presente na
  plataforma (ex: cadastro de usuário).
- [Requisitos Não Funcionais
  (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
  correspondem a uma característica técnica, seja de usabilidade,
  desempenho, confiabilidade, segurança ou outro (ex: suporte a
  dispositivos iOS e Android).
Lembre-se que cada requisito deve corresponder à uma e somente uma
característica alvo da sua solução. Além disso, certifique-se de que
todos os aspectos capturados nas Histórias de Usuário foram cobertos.

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |


Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)
