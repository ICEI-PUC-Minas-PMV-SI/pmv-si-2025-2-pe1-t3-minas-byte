# Programação de Funcionalidades

Implementação do sistema descritas por meio dos requisitos funcionais e/ou não funcionais. Deve relacionar os requisitos atendidos os artefatos criados (código fonte) além das estruturas de dados utilizadas e as instruções para acesso e verificação da implementação que deve estar funcional no ambiente de hospedagem.

Para cada requisito funcional, pode ser entregue um artefato desse tipo.


## Requisitos Atendidos

As tabelas que se seguem apresentam os requisitos funcionais que relacionam o escopo do projeto com os artefatos criados:

### Requisitos Funcionais

|ID    | Descrição do Requisito | Responsável | Artefato Criado |
|------|------------------------|------------|-----------------|
|RF-001| O sistema deve permitir que usuárias se registrem com dados básicos (nome, e-mail). | Stanley | registro.html |
|RF-002| O sistema deve possuir uma página inicial que apresente informações gerais sobre o projeto, destaque cursos, ofereça acesso ao quiz de recomendação. | Giovana | index.html |
|RF-003| O sistema deve organizar cursos por áreas (tecnologia, finanças, empreendedorismo etc.). | Guilherme | cursos.html |
|RF-004| O sistema deve disponibilizar um quiz inicial para recomendar trilhas de aprendizado personalizadas.  | Isabelly | quizPerguntas.html |
|RF-005| O sistema deve proporcionar um ambiente para as usuárias assistirem as aulas. | Raphaela | aula.html |
|RF-006| O sistema deve mostrar percentual de cconclusão de curso em andamento da cada aluna | Giovana | perfil.html |
|RF-007| O sistema deve mostrar histórico de cursos concluídos de cada aluna. | Giovana | perfil.html |  
|RF-008| O sistema deve disponibilizar um espaço onde empresas parceiras acessem perfis das alunas.   | Stanley | bancoTalentos.html | 
|RF-009| O sistema deve permitir que ex-alunas ofereçam serviços digitais (planilhas, logos, edições), Marketplace. | Isabelly | marketplace.html | 
|RF-010| O sistema deve permitir que usuárias compartilhem experiências e comentários.   | Raphaela | comunidade.html | 
|RF-011| O sistema deve permitir que usuárias tirem dúvidas sobre temas de cursos com outras usuárias. | Raphaela | comunidade.html | 
|RF-012| O sistema deve proporcionar um canal de suporte simples as alunas (formulário). | Giovana | index.html | 
|RF-013| O sistema deve permitir usuárias solicitarem mentoria. | Guilherme | mentoria.html | 
|RF-014| O sistema deve indicar cursos com base no quiz | Guilherme | quizresultado.html | 
|RF-015| O sistema deve permitir que usuárias façam login com seu perfil cadastrado. | Stanley | cadastro.html |
|RF-016| O sistema deve permitir que usuárias acessem os detalhes sobre o curso.  | Isabelly | descricao.html |



## Descrição das estruturas:

## Usuária
| **Nome**  | **Tipo**         | **Descrição**                          | **Exemplo**                 |
| --------- | ---------------- | -------------------------------------- | --------------------------- |
| Id | Número (Inteiro) | Identificador único da aluna.| 1 |
| Nome | Texto | Nome completo da aluna. | Julia Silva |
| E-mail | Texto | Endereço de e-mail da aluna. | julia.silva@gmail.com |
| Telefone | Texto | Telefone para contato. | (21) 99999-9999 |
| Cidade | Texto | Localização da aluna. | Rio de Janeiro - RJ |
| Cargo | Texto | Área ou função profissional. | Desenvolvedora Front-end |
| Competências | Texto | Habilidades ou tecnologias dominadas. | JavaScript, React, UI/UX |
| Foto de perfil | Texto (URL) | Caminho da imagem da usuária. | img/personas/comentarios/persona_julia_silva.jpeg |


## Curso em andamento
| **Nome**  | **Tipo**         | **Descrição**                          | **Exemplo**                 |
| --------- | ---------------- | -------------------------------------- | --------------------------- |
| Id do curso | Número (Inteiro) | Identificador do curso atual. | 3 |
| Título | Texto | Nome do curso em andamento. | Criação de Loja Virtual |
| Aulas concluídas | Número (Inteiro) | Quantas aulas a aluna já fez. | 28 |
| Total de aulas | Número (Inteiro) | Quantidade total de aulas do curso. | 30 |
| Progresso | Número (Porcentagem) | Percentual de conclusão. | 80% |
| Próxima aula | Texto | Título da próxima aula. | “Sua loja está pronta, e agora?” |


## Curso concluído
| **Nome**  | **Tipo**         | **Descrição**                          | **Exemplo**                 |
| --------- | ---------------- | -------------------------------------- | --------------------------- |
| Id do curso | Número (Inteiro) | Identificador do curso concluído. | 5 |
| Título | Texto | Nome do curso finalizado. | Desenvolvimento Web Completo |
| Data de conclusão | Data | Quando o curso foi finalizado. | 20/10/2025 |


## Conquista
| **Nome**  | **Tipo**         | **Descrição**                          | **Exemplo**                 |
| --------- | ---------------- | -------------------------------------- | --------------------------- |
| Id | Número (Inteiro) | Identificador da conquista. | 1 |
| Título | Texto | Nome da conquista. | Primeira Conquista |
| Descrição | Texto | O que foi feito para conquistar | Complete seu primeiro curso |
| Tipo | Texto | Nível da conquista (comum, rara etc.). | Rara |
| Data | Data | Quando foi conquistada. | 20/10/2025 |

## Certificado
| **Nome**        | **Tipo**         | **Descrição**                 | **Exemplo**                  |
| --------------- | ---------------- | ----------------------------- | ---------------------------- |
| Id | Número (Inteiro) | Identificador do certificado. | 1 |
| Título | Texto | Nome do curso certificado. | Desenvolvimento Web Completo |
| Data de emissão | Data | Quando foi emitido. | 15/03/2024 |
| Carga horária | Texto | Duração total do curso. | 120h |

## Autenticação
| **Nome**        | **Tipo**         | **Descrição**                 | **Exemplo**                  |
| --------------- | ---------------- | ----------------------------- | ---------------------------- |
| Id | Número (Inteiro) | Identificador único do usuário. | 1 |
| Nome completo | Texto | Nome completo informado no momento do cadastro. | João Souza |
| E-mail | Texto | Endereço de e-mail utilizado para autenticação e comunicação. | joao.souza@gmail.com |
| Senha | Texto | Código secreto utilizado para login e validação de acesso. | ******** |
