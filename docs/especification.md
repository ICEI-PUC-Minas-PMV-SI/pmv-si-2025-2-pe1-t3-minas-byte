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
|Mãe solo| Um curso rápido para aprender modos para me profisionalizar mais rapidamente| Não esquecer de fazê-las.|
|Mulher em busca da primeira oportunidade|Mentorias|Aprender sobre carreira e mercado de trabalho.|
|Mulher de baixa renda|Uma plataforma que não precise utilizar tanto dinheiro ou nada de dinheiro e mesmo assim tenha qualidade|Conseguir me profissionalizar e possa me sustentar.|
|Aluna em vulnerabilidade social|Conteúdo disponível offline|Conseguir estudar mesmo sem internet.|
|Profissional em formação|Banco de talentos interno|Ser encontrada por empresas parceiras.|
|Mulher com 2 empregos|Uma plataforma com cursos rápidos|Me desenvolver profissionalmente mesmo com pouco tempo e pouco poder aquisitivo.|
|Mulher que gera renda|Um marketplace de serviços digitais|Oferecer meus serviços e conquistar clientes.|
|Uma mulher de 40 anos sem muito contato com tecnologia|Uma plataforma fácil de usar e intuitiva|Me realocar no mercado de trabalho utilizado a tecnologia.|
|Mulher sem muito conhecimento técnico|Um quiz de recomendação de trilhas|Iniciar os cursos no meu nível de conhecimento.|

<!-- Apresente aqui as histórias de usuário que são relevantes para o projeto de sua solução. As Histórias de Usuário consistem em uma ferramenta poderosa para a compreensão e elicitação dos requisitos funcionais e não funcionais da sua aplicação. Se possível, agrupe as histórias de usuário por contexto, para facilitar consultas recorrentes à essa parte do documento. -->


## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade | 
|------|-----------------------------------------|----| 
|RF-001| Permitir que usuárias se registrem com dados básicos (nome, e-mail, telefone) | ALTA |  
|RF-002| Garantir que só alunas cadastradas acessem a plataforma   | ALTA | 
|RF-003| Organizar cursos por áreas (tecnologia, finanças, empreendedorismo etc.).   | ALTA | 
|RF-004| O sistema deve disponibilizar um quiz inicial para recomendar trilhas de aprendizado personalizadas.   | ALTA | 
|RF-005| O sistema deve mostrar progresso da usuária (percentual concluído, histórico de cursos, certificados).   | ALTA | 
|RF-006| O sistema deve gerar certificados digitais para cursos concluídos.   | MÉDIA | 
|RF-007| O sistema deve permitir que usuárias compartilhem experiências e comentários.   | MÉDIA | 
|RF-008| O sistema deve disponibilizar um espaço onde empresas parceiras acessem perfis das alunas.   | ALTA | 
|RF-009| O sistema deve permitir que ex-alunas ofereçam serviços digitais (planilhas, logos, edições). | MÉDIA | 
|RF-010| O sistema deve gerar medalhas ou conquistas a cada curso ou etapa concluída.   | BAIXA |



### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| A aplicação deve ser responsiva | MÉDIA | 
|RNF-002| A aplicação deve processar requisições do usuário em no máximo 3s |  MÉDIA | 
|RNF-003| A interface deve ter visual simples, botões grandes e linguagem acessível. |  ALTA | 
|RNF-004| O sistema deve proteger dados pessoais conforme a LGPD. |  ALTA | 
|RNF-005| A plataforma deve funcionar nos principais navegadores (Chrome, Firefox, Edge). |  MÉDIA | 
|RNF-006| O sistema deve suportar crescimento no número de usuárias sem perda de desempenho. |  MÉDIA | 
|RNF-007| O sistema deve ser modular para facilitar atualizações futuras (novos cursos, recursos). |  MÉDIA | 
|RNF-008| Deve haver canal de suporte simples (WhatsApp ou chatbot para dúvidas). |  MÉDIA | 


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
