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


**Caso de Teste** | **CT01 - Registro de usuária**
:--------------: | ------------
**Procedimento**  | 1) Acessar a página de cadastro. <br> 2) Preencher nome, e-mail e senha. <br> 3) Enviar o formulário.
**Requisitos associados** | RF-001
**Resultado esperado** | Usuária registrada com sucesso.
**Dados de entrada** | Nome, e-mail e telefone válidos.
**Resultado obtido** | Sucesso

---

**Caso de Teste** | **CT02 - Acesso de usuária**
:--------------: | ------------
**Procedimento**  | 1) Acessar a página de login. <br> 2) Realizar login com credenciais válidas.
**Requisitos associados** | RF-002
**Resultado esperado** | Acesso liberado apenas para usuárias cadastradas.
**Dados de entrada** | E-mail e senha válidos.
**Resultado obtido** | Sucesso

---

**Caso de Teste** | **CT03 - Organização de cursos por área**
:--------------: | ------------
**Procedimento**  | 1) Acessar catálogo de cursos. <br> 2) Verificar listagem filtrada.
**Requisitos associados** | RF-003
**Resultado esperado** | Cursos exibidos corretamente por área.
**Dados de entrada** | Nenhum.
**Resultado obtido** | Sucesso

---

**Caso de Teste** | **CT04 - Quiz inicial de recomendação**
:--------------: | ------------
**Procedimento**  | 1) Acessar página de cursos 2) Acessar quiz. <br> 3) Responder todas as perguntas. <br> 4) Finalizar e visualizar trilhas recomendadas.
**Requisitos associados** | RF-004
**Resultado esperado** | Trilha personalizada exibida.
**Dados de entrada** | Respostas do quiz.
**Resultado obtido** | Sucesso

---

**Caso de Teste** | **CT05 - Ambiente de aulas**
:--------------: | ------------
**Procedimento**  | 1) Acessar curso. <br> 2) Abrir aula. <br> 3) Reproduzir vídeo/material.
**Requisitos associados** | RF-005
**Resultado esperado** | Aula reproduzida corretamente.
**Dados de entrada** | Seleção de curso.
**Resultado obtido** | Sucesso

---

**Caso de Teste** | **CT06 - Percentual de conclusão**
:--------------: | ------------
**Procedimento**  | 1) Acessar curso em andamento. <br> 2) Concluir uma aula. <br> 3) Verificar atualização do progresso.
**Requisitos associados** | RF-006
**Resultado esperado** | Percentual atualizado automaticamente.
**Dados de entrada** | Progresso de aulas.
**Resultado obtido** | Sucesso

---

**Caso de Teste** | **CT07 - Histórico de cursos concluídos**
:--------------: | ------------
**Procedimento**  | 1) Concluir curso. <br> 2) Acessar perfil. <br> 3) Verificar aba “Cursos concluídos”.
**Requisitos associados** | RF-007
**Resultado esperado** | Histórico exibido corretamente.
**Dados de entrada** | Curso finalizado.
**Resultado obtido** | Sucesso

---

**Caso de Teste** | **CT08 - Acesso de empresas parceiras**
:--------------: | ------------
**Procedimento**  | 1) Acessar banco de talentos. <br> 2) Buscar aluna.
**Requisitos associados** | RF-008
**Resultado esperado** | Perfil exibido com dados profissionais.
**Dados de entrada** | Conta de empresa parceira.
**Resultado obtido** | Sucesso

---

**Caso de Teste** | **CT09 - Geração de certificado digital**
:--------------: | ------------
**Procedimento**  | 1) Finalizar curso. <br> 2) Clicar em “Gerar Certificado”. <br> 3) Baixar PDF.
**Requisitos associados** | RF-009
**Resultado esperado** | Certificado gerado corretamente.
**Dados de entrada** | Curso concluído.
**Resultado obtido** | Sucesso

---

**Caso de Teste** | **CT10 - Marketplace**
:--------------: | ------------
**Procedimento**  | 1) Acessar Marketplace. <br> 2) Buscar serviço. <br> 3) Visualizar listagem.
**Requisitos associados** | RF-010
**Resultado esperado** | Serviços listados corretamente.
**Dados de entrada** | Palavra-chave ou filtro.
**Resultado obtido** | Sucesso

---

**Caso de Teste** | **CT11 - Suporte**
:--------------: | ------------
**Procedimento**  | 1) Acessar suporte. <br> 2) Preencher formulário. <br> 3) Enviar.
**Requisitos associados** | RF-011
**Resultado esperado** | Mensagem enviada com sucesso.
**Dados de entrada** | Assunto e descrição.
**Resultado obtido** | Sucesso

---

**Caso de Teste** | **CT12 - Compartilhamento de experiências**
:--------------: | ------------
**Procedimento**  | 1) Acessar comunidade. <br> 2) Inserir depoimento. <br> 3) Publicar.
**Requisitos associados** | RF-012
**Resultado esperado** | Comentário publicado.
**Dados de entrada** | Texto do comentário.
**Resultado obtido** | Sucesso

---

**Caso de Teste** | **CT13 - Fórum de dúvidas**
:--------------: | ------------
**Procedimento**  | 1) Acessar área de dúvidas. <br> 2) Criar pergunta. <br> 3) Ver respostas.
**Requisitos associados** | RF-013
**Resultado esperado** | Perguntas e respostas exibidas corretamente.
**Dados de entrada** | Pergunta e resposta.
**Resultado obtido** | Sucesso

---

**Caso de Teste** | **CT14 - Solicitação de mentoria**
:--------------: | ------------
**Procedimento**  | 1) Acessar área de mentoria. <br> 2) Escolher mentora. <br> 3) Enviar solicitação.
**Requisitos associados** | RF-014
**Resultado esperado** | Solicitação registrada.
**Dados de entrada** | Objetivo da mentoria.
**Resultado obtido** | Sucesso

---

**Caso de Teste** | **CT15 - Medalhas e conquistas**
:--------------: | ------------
**Procedimento**  | 1) Concluir etapa ou curso. <br> 2) Acessar painel de conquistas. <br> 3) Verificar medalha liberada.
**Requisitos associados** | RF-015
**Resultado esperado** | Medalhas exibidas corretamente.
**Dados de entrada** | Etapas concluídas.
**Resultado obtido** | Sucesso

---

## Registro dos Testes de Software

|*Caso de Teste*                                 |*CT01*                                         |
|---|---|
|Requisito Associado | RF-001 - O sistema deve permitir que usuárias se registrem com dados básicos (nome, e-mail e senha)|
|Link do vídeo do teste realizado: |https://sgapucminasbr-my.sharepoint.com/personal/1592155_sga_pucminas_br/_layouts/15/guestaccess.aspx?share=IQCpsgBK33z1QrxAKKU298waAc2gFewRsE_f_gkRa1_5VNg&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=nD2kVh| 

|*Caso de Teste*                                 |*CT02*                                        |
|---|---|
|Requisito Associado | RF-002 - O sistema deve garantir que só alunas cadastradas acessem a plataforma|
|Link do vídeo do teste realizado: | https://sgapucminasbr-my.sharepoint.com/personal/1592155_sga_pucminas_br/_layouts/15/guestaccess.aspx?share=IQCA8qstc6oMRKGALLatv2-dAWlQ2QIIzNm1MuKlJkj86Vg&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=UUpqpr | 

|*Caso de Teste*                                 |*CT03*                                        |
|---|---|
|Requisito Associado | RF-003 - O sistema deve organizar cursos por áreas (tecnologia, finanças, empreendedorismo etc.).|
|Link do vídeo do teste realizado: | https://sgapucminasbr-my.sharepoint.com/personal/1592155_sga_pucminas_br/_layouts/15/guestaccess.aspx?share=IQAuOouy6JQKRIYddM-K9pkrAcIxGJBi9T3IqeOlZrFRjZw&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=mMJwI7 | 

|*Caso de Teste*                                 |*CT05*                                        |
|---|---|
|Requisito Associado | RF-005 - O sistema deve proporcionar um ambiente para as usuárias assistirem as aulas.|
|Link do vídeo do teste realizado: | https://sgapucminasbr-my.sharepoint.com/personal/1592155_sga_pucminas_br/_layouts/15/guestaccess.aspx?share=IQC8YpP5f6w6SLrru-9h-JIxAVmqSWj6moyQU-fwBiJobtg&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=97Qvps | 

|*Caso de Teste*                                 |*CT08*                                        |
|---|---|
|Requisito Associado | RF-008 - O sistema deve disponibilizar um espaço onde empresas parceiras acessem perfis das alunas.|
|Link do vídeo do teste realizado: | https://sgapucminasbr-my.sharepoint.com/personal/1592155_sga_pucminas_br/_layouts/15/guestaccess.aspx?share=IQBCXQzso9B-T63J6xLcpL35AWbpteHfFyrnoxJJuJcPD0c&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=DtxtGB | 

|*Caso de Teste*                                 |*CT09*                                        |
|---|---|
|Requisito Associado | RF-009 - O sistema deve gerar certificados digitais para cursos concluídos.|
|Link do vídeo do teste realizado: | https://sgapucminasbr-my.sharepoint.com/personal/1592155_sga_pucminas_br/_layouts/15/guestaccess.aspx?share=IQBVMlm9t5aATKNJTSvEWwilAa798o9v0E6lmXnSVtJ8EuU&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=10IazC | 

|*Caso de Teste*                                 |*CT11*                                        |
|---|---|
|Requisito Associado | RF-011 - O sistema deve proporcionar um canal de suporte simples as alunas (formulário).|
|Link do vídeo do teste realizado: | https://sgapucminasbr-my.sharepoint.com/personal/1592155_sga_pucminas_br/_layouts/15/guestaccess.aspx?share=IQA6sDrrYxIGSKmce5qwAHLiARiezTcgX3Fdm0mkjc2t4sU&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=oqjkQZ | 

|*Caso de Teste*                                 |*CT12*                                        |
|---|---|
|Requisito Associado | RF-012 - O sistema deve permitir que usuárias compartilhem experiências e comentários.|
|Link do vídeo do teste realizado: | https://sgapucminasbr-my.sharepoint.com/personal/1592155_sga_pucminas_br/_layouts/15/guestaccess.aspx?share=IQB0HLmILBe1SJwy5C5-6GOOAfdvNn0TNDwFRqJun_Y3oz8&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=9M4CBa | 

|*Caso de Teste*                                 |*CT14*                                        |
|---|---|
|Requisito Associado | RF-014 - O sistema deve permitir usuárias solicitarem mentoria.|
|Link do vídeo do teste realizado: | https://sgapucminasbr-my.sharepoint.com/personal/1592155_sga_pucminas_br/_layouts/15/guestaccess.aspx?share=IQBEtw73aN3eSaaKzT9OL3nGAbH5raw9emhhciXB2Szx6nI&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=6dJ4Gs | 


## Avaliação dos Testes de Software

A execução dos testes de software permitiu confirmar que as funcionalidades principais do sistema estão operando conforme o planejado. Os cenários testados apresentaram boa fluidez, coerência entre as telas e comportamento consistente diante dos dados inseridos.

O processo de testes também contribuiu para validar a experiência geral de uso, reforçando que as escolhas de interface e fluxo de navegação estão adequadas. Além disso, a realização dos testes possibilitou ao grupo compreender melhor o comportamento da aplicação em situações reais de uso, oferecendo uma visão clara sobre como as usuárias navegam no site.

# Testes de Usabilidade

O objetivo do Plano de Testes de Usabilidade é obter informações quanto à expectativa dos usuários em relação à  funcionalidade da aplicação de forma geral.

Para tanto, elaboramos cinco cenários, cada um baseado na definição apresentada sobre as histórias dos usuários, definido na etapa das especificações do projeto.

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
| 1             | Você é uma mulher que deseja iniciar uma formação profissional. Acesse a plataforma, faça login, encontre a área de cursos e se inscreva. |
| 2             | Você busca oportunidades profissionais. Acesse a área destinada às empresas parceiras e visualize seu próprio perfil público. |
| 3             | Você deseja assistir uma aula. Acesse o curso já iniciado e reproduza a primeira videoaula. |
| 4             | Você deseja visualizar seus certificados. Acesse a aba de Perfil, localize a seção “Cursos Concluídos” e abra o certificado digital disponível. |
| 5             | Você deseja saber qual o melhor curso de acordo com a sua necessidade e conhecimento. Inicie o quiz, responda todas as perguntas e veja o curso mais apropriado . |



## Registro de Testes de Usabilidade

Cenário 1: Você é uma mulher que deseja iniciar uma formação profissional. Acesse a plataforma, faça login, encontre a área de cursos e se inscreva.

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1       | SIM             | 5                    | 25.12 segundos                  |
| 2       | SIM             | 5                    | 18.77 segundos                  |
| 3       | SIM             | 5                    | 32.04 segundos                  |
|  |  |  |  |
| **Média**     | 100%           | 5                | 25.31 segundos                           |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 9.45 segundos |


    Comentários dos usuários: A navegação até os cursos de tecnologia foi considerada clara e simples.

Cenário 2: Você busca oportunidades profissionais. Acesse a área destinada às empresas parceiras e visualize seu próprio perfil público.

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1       | SIM             | 5                    | 21.33 segundos                          |
| 2       | SIM             | 5                    | 27.88 segundos                          |
| 3       | SIM             | 4                    | 30.11 segundos                          |
|  |  |  |  |
| **Média**     | 100%           | 4.67                | 26.44 segundos                           |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 11.02 segundos |


    Comentários dos usuários: Os usuários relataram que o acesso ao perfil público foi rápido e intuitivo.

Cenário 3: Você deseja assistir uma aula. Acesse o curso já iniciado e reproduza a primeira videoaula.

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1       | SIM             | 5                    | 24.55 segundos                          |
| 2       | SIM             | 5                    | 29.73 segundos                          |
| 3       | SIM             | 4                    | 34.19 segundos                          |
|  |  |  |  |
| **Média**     | 100%           | 4.67                | 29.49 segundos                           |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 12.14 segundos |


    Comentários dos usuários: A navegação até o player de vídeo foi bem avaliado e  ocorreu sem dificuldades.

Cenário 4: Você deseja visualizar seus certificados. Acesse a aba de Perfil, localize a seção “Cursos Concluídos” e abra o certificado digital disponível.

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1       | SIM             | 5                    | 26.14 segundos                          |
| 2       | SIM             | 4                    | 34.22 segundos                          |
| 3       | SIM             | 5                    | 29.87 segundos                          |
|  |  |  |  |
| **Média**     | 100%           | 4.67                | 30.07 segundos                           |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 12.33segundos |


    Comentários dos usuários: A participante informou que a navegação até a aba de Perfil está clara e intuitiva. Sugeriu destacar visualmente a seção “Cursos Concluídos” para acelerar a localização dos certificados.

## Avaliação dos Testes de Usabilidade

Tomando como base os resultados obtidos nos três cenários avaliados, foi possível observar que a aplicação apresenta um desempenho consistente quanto à taxa de sucesso, já que todas as participantes conseguiram concluir as tarefas propostas. Isso demonstra que as funcionalidades principais — acesso aos cursos, visualização de perfil profissional e reprodução de aulas — estão acessíveis e compreensíveis para o público-alvo.

A satisfação subjetiva registrada também se mostrou elevada. As médias variaram entre 4,67 e 5, indicando que as usuárias consideraram a experiência positiva, avaliando a interface como clara, funcional e adequada às necessidades apresentadas.

No que diz respeito ao tempo de conclusão das tarefas, notou-se, assim como esperado, uma diferença significativa entre as usuárias e o especialista. Isso se explica pelo fato de que o desenvolvedor possui total familiaridade com a organização da interface, elementos visuais e fluxos de navegação. Ainda assim, mesmo com essa diferença, o tempo médio das participantes se manteve dentro de um intervalo aceitável para sistemas educacionais de navegação multipáginas.

Os comentários das usuárias reforçaram que a plataforma é intuitiva e permite que as principais ações sejam realizadas sem dificuldade. No entanto, a diferença consistente entre o tempo das usuárias e o especialista sugere oportunidades de aprimoramento, especialmente no fluxo de acesso aos cursos e na navegação entre páginas internas.

Diante disso, o grupo entende que algumas melhorias podem ser implementadas nas próximas iterações, como otimização do caminho de acesso às principais funcionalidades, ajustes de navegação e simplificação de menus. Essas ações têm potencial para tornar o sistema ainda mais fluido e acessível, contribuindo para uma experiência alinhada às necessidades das mulheres em situação de vulnerabilidade que utilizarão a plataforma.
