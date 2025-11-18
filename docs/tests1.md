# Testes

Neste projeto serão realizados dois tipos de testes:

 - O **Teste de Software**, que utiliza uma abordadem de caixa preta, e tem por objetivo verificar a conformidade do software com os requisitos funcionais e não funcionais do sistema.
 - O **Teste de Usabilidade**, que busca avaliar a qualidade do uso do sistema por um usuário do público alvo. 

Se quiser conhecer um pouco mais sobre os tipos de teste de software, leia o documento [Teste de Software: Conceitos e tipos de testes](https://blog.onedaytesting.com.br/teste-de-software/).

A documentação dos testes é dividida nas seguintes seções:

 - [Plano de Testes de Software](#plano-de-testes-de-software)
 - [Registro dos Testes de Software](#registro-dos-testes-de-software)
 - [Avaliação dos Testes de Software](#avaliação-dos-testes-de-software)
 - [Cenários de Teste de Usabilidade](#cenários-de-teste-de-usabilidade)
 - [Registro dos Testes de Usabilidade](#registro-dos-testes-de-usabilidade)
 - [Avaliação dos Testes de Usabilidade](#avaliação-dos-testes-de-usabilidade)

# Teste de Software

Nesta seção o grupo deverá documentar os testes de software que verificam a correta implementação dos requisitos funcionais e não funcionais do software.

## Plano de Testes de Software

Preencha a tabela com o plano dos testes. Para cada Caso de Teste (CT), associe qual o Requisito Funcional ou não funcional que ele está verificando. Associe também a página (ou artefato) onde o teste será realizado e descreva o cenário do teste. Veja a tabela de exemplo.


**Caso de Teste** | **CT01 - Cadastro de Usuária**
 :--------------: | ------------
**Procedimento**  | 1) Acessar a página de cadastro. <br>2) Preencher Nome, E-mail e Senha.<br>3) Clicar em “Criar conta”<br>4) Confirmar criação da conta.
**Requisitos associados** | RF-001
**Resultado esperado** | Usuária cadastrada e redirecionada para a página de login.
**Dados de entrada** | Inserção de dados válidos no formulário de cadastro
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT02 - Login na plataforma**
 :--------------: | ------------
**Procedimento**  | 1) 1) Acessar página de login.<br>2) Informar e-mail e senha válidos.<br>3) Clicar em “Entrar”.
**Requisitos associados** | RF-002
**Resultado esperado** | Acesso liberado apenas para usuárias cadastradas.
**Dados de entrada** | Inserção de dados válidos no formulário de cadastro
**Resultado obtido** | Acesso liberado

**Caso de Teste** | **CT03 - Organização de cursos por áreas**
 :--------------: | ------------
**Procedimento**  | 1) 1) Fazer login.<br>2) Acessar “Cursos”.<br>3) Verificar categorias (tecnologia, finanças...).
**Requisitos associados** | RF-003
**Resultado esperado** | Cursos exibidos organizados por área.
**Dados de entrada** | Nenhum
**Resultado obtido** | Cursos organizados por área de atuação

**Caso de Teste** | **CT04 — Quiz Inicial e Recomendação de Trilhas**
 :--------------: | ------------
**Procedimento**  | 1) 1) Acessar quiz.<br>2) Responder perguntas.<br>3) Finalizar quiz.
**Requisitos associados** | RF-004
**Resultado esperado** | Trilha personalizada recomendada..
**Dados de entrada** | Respostas do quiz
**Resultado obtido** | 

**Caso de Teste** | **CT05 — Ambiente de Aulas**
 :--------------: | ------------
**Procedimento**  | 1) 1) Acessar Curso.<br>2) Abrir aula.<br>3) Reproduzir material.
**Requisitos associados** | RF-005
**Resultado esperado** | Aula disponível e funcional..
**Dados de entrada** | ID do curso
**Resultado obtido** | 

**Caso de Teste** | **CT06 — Percentual de Conclusão**
 :--------------: | ------------
**Procedimento**  | 1) 1) Iniciar curso.<br>2) Concluir aulas.<br>3) Verificar barra de progresso.
**Requisitos associados** | RF-006
**Resultado esperado** | Percentual atualizado automaticamente.
**Dados de entrada** | Aulas concluídas
**Resultado obtido** | 

**Caso de Teste** | **CT07 — Histórico de Cursos Concluídos**
 :--------------: | ------------
**Procedimento**  | 1) 1) Concluir um curso.<br>2) Acessar perfil.<br>3) Verificar seção "Cursos concluídos".
**Requisitos associados** | RF-007
**Resultado esperado** | Histórico exibido corretamente.
**Dados de entrada** | Curso Concluído
**Resultado obtido** | 

**Caso de Teste** | **CT08 - Acesso de Empresas Parceiras**
 :--------------: | ------------
**Procedimento**  | 1) 1) Logar como empresa.<br>2) Procurar aluna.<br>3) Acessar perfil.
**Requisitos associados** | RF-008
**Resultado esperado** | Perfil exibido com dados profissionais.
**Dados de entrada** | ID da aluna: 1
**Resultado obtido** | 

**Caso de Teste** | **CT09 — Geração de Certificado**
 :--------------: | ------------
**Procedimento**  | 1) 1) Finalizar curso.<br>2) Clicar em "Gerar certificado"
**Requisitos associados** | RF-009
**Resultado esperado** | Certificado PDF disponível.
**Dados de entrada** | Curso concluído
**Resultado obtido** | 

**Caso de Teste** | **CT10 — Marketplace**
 :--------------: | ------------
**Procedimento**  | 1) 1) Acessar Marketplace.<br>2) Buscar serviço.<br>3)Visualizar resultados.
**Requisitos associados** | RF-010
**Resultado esperado** | Serviços listados corretamente.
**Dados de entrada** | Palavra-chave
**Resultado obtido** | 

**Caso de Teste** | **CT11 — Suporte**
 :--------------: | ------------
**Procedimento**  | 1) 1) Acessar suporte.<br>2) Preencher formulário.3)Enviar.
**Requisitos associados** | RF-011
**Resultado esperado** | Mensagem enviada.
**Dados de entrada** | Assunto e descrição
**Resultado obtido** | 

**Caso de Teste** | **CT12 — Comentários e Experiências**
 :--------------: | ------------
**Procedimento**  | 1) 1) Acessar comentários.<br>2) inserir depoimentos.3)Publicar.
**Requisitos associados** | RF-012
**Resultado esperado** | Comentário publicado.
**Dados de entrada** | Texto do comentário
**Resultado obtido** | 

**Caso de Teste** | **CT11 — Suporte**
 :--------------: | ------------
**Procedimento**  | 1) 1) Acessar suporte.<br>2) Preencher formulário.3)Enviar
**Requisitos associados** | RF-011
**Resultado esperado** | Mensagem enviada.
**Dados de entrada** | Assunto e descrição
**Resultado obtido** | 

**Caso de Teste** | **CT11 — Suporte**
 :--------------: | ------------
**Procedimento**  | 1) 1) Acessar suporte.<br>2) Preencher formulário.3)Enviar
**Requisitos associados** | RF-011
**Resultado esperado** | Mensagem enviada.
**Dados de entrada** | Assunto e descrição
**Resultado obtido** | 

**Caso de Teste** | **CT11 — Suporte**
 :--------------: | ------------
**Procedimento**  | 1) 1) Acessar suporte.<br>2) Preencher formulário.3)Enviar
**Requisitos associados** | RF-011
**Resultado esperado** | Mensagem enviada.
**Dados de entrada** | Assunto e descrição
**Resultado obtido** | 

## Registro dos Testes de Software

Esta seção deve apresentar o relatório com as evidências dos testes de software realizados no sistema pela equipe, baseado no plano de testes pré-definido. Documente cada caso de teste apresentando um vídeo ou animação que comprove o funcionamento da funcionalidade. Veja os exemplos a seguir.

|*Caso de Teste*                                 |*CT01 - Criar conta parte 1*                                         |
|---|---|
|Requisito Associado | RF-001 - A aplicação deve permitir que os usuários criem uma conta e gerenciem seu cadastro|
|Link do vídeo do teste realizado: | https://1drv.ms/u/s!AhD2JqpOUvJChapRtRSQ9vPzbNLwGA?e=mxZs6t| 

|*Caso de Teste*                                 |*CT02 - Criar conta parte 2*                                        |
|---|---|
|Requisito Associado | RF-001 - A aplicação deve permitir que os usuários criem uma conta e gerenciem seu cadastro|
|Link do vídeo do teste realizado: | https://1drv.ms/v/s!AhD2JqpOUvJChapQ8CPXL-TI_A7iVg?e=spD3Ar | 


## Avaliação dos Testes de Software

Discorra sobre os resultados do teste. Ressaltando pontos fortes e fracos identificados na solução. Comente como o grupo pretende atacar esses pontos nas próximas iterações. Apresente as falhas detectadas e as melhorias geradas a partir dos resultados obtidos nos testes.

## Testes de unidade automatizados (Opcional)

Se o grupo tiver interesse em se aprofundar no desenvolvimento de testes de software, ele podera desenvolver testes automatizados de software que verificam o funcionamento das funções JavaScript desenvolvidas. Para conhecer sobre testes unitários em JavaScript, leia 0 documento  [Ferramentas de Teste para Java Script](https://geekflare.com/javascript-unit-testing/).

# Testes de Usabilidade

O objetivo do Plano de Testes de Usabilidade é obter informações quanto à expectativa dos usuários em relação à  funcionalidade da aplicação de forma geral.

Para tanto, elaboramos quatro cenários, cada um baseado na definição apresentada sobre as histórias dos usuários, definido na etapa das especificações do projeto.

Foram convidadas quatro pessoas que os perfis se encaixassem nas definições das histórias apresentadas na documentação, visando averiguar os seguintes indicadores:

Taxa de sucesso: responde se o usuário conseguiu ou não executar a tarefa proposta;

Satisfação subjetiva: responde como o usuário avalia o sistema com relação à execução da tarefa proposta, conforme a seguinte escala:

1. Péssimo; 
2. Ruim; 
3. Regular; 
4. Bom; 
5. Ótimo.

Tempo para conclusão da tarefa: em segundos, e em comparação com o tempo utilizado quando um especialista (um desenvolvedor) realiza a mesma tarefa.

Objetivando respeitar as diretrizes da Lei Geral de Proteção de Dados, as informações pessoais dos usuários que participaram do teste não foram coletadas, tendo em vista a ausência de Termo de Consentimento Livre e Esclarecido.

Apresente os cenários de testes utilizados na realização dos testes de usabilidade da sua aplicação. Escolha cenários de testes que demonstrem as principais histórias de usuário sendo realizadas. Neste tópico o grupo deve detalhar quais funcionalidades avaliadas, o grupo de usuários que foi escolhido para participar do teste e as ferramentas utilizadas.

> - [UX Tools](https://uxdesign.cc/ux-user-research-and-user-testing-tools-2d339d379dc7)


## Cenários de Teste de Usabilidade

| Nº do Cenário | Descrição do cenário |
|---------------|----------------------|
| 1             | Você é uma pessoa que deseja comprar um iphone. Encontre no site um iphone e veja detalhes de localização e contato da loja que anunciando. |
| 2             | Você é uma pessoa que deseja comprar um smartphone até R$ 2.000,00. Encontre no site smartphone's nessa faixa de preço. |



## Registro de Testes de Usabilidade

Cenário 1: Você é uma pessoa que deseja comprar um iphone. Encontre no site um iphone e veja detalhes de localização e contato da loja que anunciando.

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1       | SIM             | 5                    | 27.87 segundos                  |
| 2       | SIM             | 5                    | 17.11 segundos                  |
| 3       | SIM             | 5                    | 39.09 segundos                  |
|  |  |  |  |
| **Média**     | 100%           | 5                | 28.02 segundos                           |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 8.66 segundos |


    Comentários dos usuários: Achei o site muito bom e intuitivo. 
    Não tive dificuldades e acho que ficou bem intuitivo.


Cenário 2: Você é uma pessoa que deseja comprar um smartphone até R$ 2.000,00. Encontre no site smartphone's nessa faixa de preço.

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1       | SIM             | 5                    | 22.54 segundos                          |
| 2       | SIM             | 5                    | 31.42 segundos                          |
| 3       | SIM             | 4                    | 36.21 segundos                          |
|  |  |  |  |
| **Média**     | 100%           | 4.67                | 30.05 segundos                           |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 13.57 segundos |


    Comentários dos usuários: O site é fácil de acessar, mas algumas páginas poderiam 
    redirecionar a gente automaticamente para outras. Senti a falta de mais opções de filtros, 
    tanto na hora da pesquisa, quanto depois dela, nos resultados.

## Avaliação dos Testes de Usabilidade

Tomando como base os resultados obtidos, foi possível verificar que a aplicação web apresenta bons resultados quanto à taxa de sucesso na interação dos usuários, tendo em vista que os cenários propostos foram concluídos com sucesso.

Além disso, a aplicação obteve também uma elevada satisfação subjetiva dos usuários no momento que realizavam os cenários propostos. Prova são as médias das avaliações em cada um dos cenários, que variou entre 4 (bom) e 5 (ótimo).

Com relação ao tempo para conclusão de cada tarefa/cenário, notamos discrepância entre a média de tempo dos usuários e o tempo do especialista/desenvolvedor em todos os cenários. Tal discrepância, em certa medida, é esperada, tendo em vista que o desenvolvedor já tem prévio conhecimento de toda a interface da aplicação, do posicionamento dos elementos, lógica de organização das páginas, etc.

Contudo, tendo em vista que a diferença foi relevante (por exemplo, 113 segundos — média usuários — contra 25 segundos — especialista — no cenário três), e ainda os comentários feitos por alguns usuários, entendemos haver oportunidades de melhoria na usabilidade da aplicação.



