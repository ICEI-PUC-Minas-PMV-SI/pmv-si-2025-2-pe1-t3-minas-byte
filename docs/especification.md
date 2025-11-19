# Especificações do Projeto

Na etapa de Especificações do Projeto, buscamos transformar ideias em soluções concretas, traduzindo necessidades reais em funcionalidades e propostas de valor. Para isso, exploramos diferentes caminhos criativos utilizando entrevistas qualitativas, matriz CSD, Mapa de Stakeholders, personas, proposta de valor, brainstorming/brainwriting, mural de possibilidades, histórias de usuários e mapa de priorização de ideias.

## Definição do Problema 

Mulheres em situação de vulnerabilidade social e/ou baixa renda encontram dificuldades para acessar cursos de qualidade, acessíveis e práticos, que permitam sua profissionalização rápida e inserção no mercado de trabalho. Além disso, enfrentam barreiras como falta de apoio familiar, limitações financeiras, pouco tempo disponível e baixo conhecimento tecnológico. 

## Ideia de Solução 

Desenvolver uma plataforma de aprendizado em tecnologia, intuitiva e acessível, que ofereça: 

- Trilhas de cursos rápidos e gratuitos. 
- Mentorias e conteúdos práticos voltados à empregabilidade. 
- Recursos offline para estudo sem internet. 
- Banco de talentos interno, conectado a empresas parceiras. 
- Marketplace de serviços digitais, permitindo que alunas ofertem trabalhos e gerem renda. 
- Espaço de comunidade para troca de experiências e rede de apoio. 

## Personas

Beatriz Santos, 33 anos, é uma mãe solo desempregada, dedicada ao cuidado ao filho, mantendo a vontade de aprender e avançar profissionalmente. Ela busca uma profissão que ofereça estabilidade e flexibilidade, de modo que possa estudar enquanto cumpre suas responsabilidades familiares. Usa seu notebook antigo para ajudar nas tarefas e assistir aulas online. Beatriz quer reconquistar sua autoestima e se sentir confiante ao ingressar no mercado de trabalho. Para isso, precisa de um serviço que lhe ofereça qualificação profissional acessível, que seja empático e respeite seu tempo e situação, com orientação clara, personalizada e acolhedora.

Gabriela Almeida, 24 anos, é uma jovem criativa que trabalha informalmente como atendente e busca estabilidade financeira para conquistar independência. Apaixonada por desenho e artesanato, ela deseja transformar seu hobby em fonte de renda, adquirindo novas habilidades em design. Convive com ansiedade pela falta de apoio familiar e de estabilidade profissional. Gabriela precisa de um serviço que a oriente a organizar, divulgar e profissionalizar seus trabalhos, sempre com incentivo e reconhecimento de seu talento, para que desenvolva autoconfiança e cresça no mercado de forma sustentável.

Julia Souza, 20 anos, trabalha como recepcionista e tem como hobby a leitura, que utiliza como forma de aprendizado. Focada no futuro e no desejo de crescer, ela busca aprender tecnologia de maneira simples e prática, além de desenvolver hábitos de estudo e disciplina. Usa o celular diariamente para estudar e o caderno como ferramenta de apoio para anotações. Julia é determinada, mesmo enfrentando a falta de apoio e os desafios do início de carreira. Seu maior sonho é conquistar estabilidade profissional e independência financeira. Para isso, precisa de um serviço que lhe ofereça orientação clara, prática e voltada para iniciantes, permitindo que ela dê os primeiros passos rumo a uma carreira sólida.

## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Mulher em vulnerabilidade| Um curso rápido e objetivo | Aprender novas habilidades rapidamente e me profissionalizar.|
|Mulher em vulnerabilidade| Mentorias individuais ou em grupo |Aprender sobre carreira e mercado de trabalho.|
|Mulher em vulnerabilidade| Acesso a uma plataforma de baixo ou nenhum custo| Conseguir estudar sem depender de recursos financeiros.|
|Mulher em vulnerabilidade| Conteúdo disponível offline| Estudar mesmo com internet limitada ou instável.|
|Mulher em vulnerabilidade| Banco de talentos interno| Ser encontrada por empresas parceiras e ter oportunidades de trabalho.|
|Mulher em vulnerabilidade| Cursos curtos e modulares| Me desenvolver profissionalmente mesmo com pouco tempo disponível.|
|Mulher em vulnerabilidade| Um marketplace de serviços digitais| Oferecer meus serviços e conquistar clientes.|
|Mulher em vulnerabilidade| Uma plataforma fácil de usar e intuitiva| Conseguir acessar e aprender sem dificuldade tecnológica.|
|Mulher em vulnerabilidade| Um quiz de recomendação de trilhas| Iniciar os cursos de acordo com meu nível de conhecimento e necessidade.|

<!-- Apresente aqui as histórias de usuário que são relevantes para o projeto de sua solução. As Histórias de Usuário consistem em uma ferramenta poderosa para a compreensão e elicitação dos requisitos funcionais e não funcionais da sua aplicação. Se possível, agrupe as histórias de usuário por contexto, para facilitar consultas recorrentes à essa parte do documento. -->


## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade | 
|------|-----------------------------------------|----| 
|RF-001| O sistema deve permitir que usuárias se registrem com dados básicos (nome, e-mail e senha) | ALTA |  
|RF-002| O sistema deve garantir que só alunas cadastradas acessem a plataforma   | ALTA | 
|RF-003| O sistema deve organizar cursos por áreas (tecnologia, finanças, empreendedorismo etc.).   | ALTA | 
|RF-004| O sistema deve disponibilizar um quiz inicial para recomendar trilhas de aprendizado personalizadas.   | ALTA | 
|RF-005| O sistema deve proporcionar um ambiente para as usuárias assistirem as aulas. |  ALTA |
|RF-006| O sistema deve mostrar percentual de conclusão de curso em andamento da cada aluna. | ALTA | 
|RF-007| O sistema deve mostrar histórico de cursos concluídos de cada aluna.   | ALTA | 
|RF-008| O sistema deve disponibilizar um espaço onde empresas parceiras acessem perfis das alunas. | ALTA |  
|RF-009| O sistema deve gerar certificados digitais para cursos concluídos.   | MÉDIA | 
|RF-010| O sistema deve permitir que ex-alunas ofereçam serviços digitais (planilhas, logos, edições), Marketplace. | MÉDIA | 
|RF-011| O sistema deve proporcionar um canal de suporte simples as alunas (formulário). |  MÉDIA |
|RF-012| O sistema deve permitir que usuárias compartilhem experiências e comentários.   | MÉDIA |
|RF-013| O sistema deve permitir que usuárias tirem dúvidas sobre temas de cursos com outras usuárias. | MÉDIA |
|RF-014| O sistema deve permitir usuárias solicitarem mentoria. | MÉDIA |
|RF-015| O sistema deve gerar medalhas ou conquistas a cada curso ou etapa concluída. | BAIXA |


### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ser responsiva | MÉDIA | 
|RNF-002| O sistema deve processar requisições do usuário em no máximo 3s |  MÉDIA | 
|RNF-003| O sistema deve ter visual simples, botões grandes e linguagem acessível. |  ALTA | 
|RNF-004| O sistema deve proteger dados pessoais conforme a LGPD. |  ALTA | 
|RNF-005| O sistema deve funcionar nos principais navegadores (Chrome, Firefox, Edge). |  MÉDIA | 
|RNF-006| O sistema deve suportar crescimento no número de usuárias sem perda de desempenho. |  MÉDIA | 
|RNF-007| O sistema deve ser modular para facilitar atualizações futuras (novos cursos, recursos). |  MÉDIA |  


## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |
|03| Os recursos e funcionalidades deverão ser planejados considerando acessibilidade e usabilidade, evitando complexidade excessiva.|
|04| A plataforma deverá ser compatível com dispositivos de baixo desempenho (celulares antigos, notebooks básicos).|
|05| A aplicação deve ser responsiva.|
|06| A solução deve ser gratuita para as usuárias.|
