# Programação de Funcionalidades

Implementação do sistema descritas por meio dos requisitos funcionais e/ou não funcionais. Deve relacionar os requisitos atendidos os artefatos criados (código fonte) além das estruturas de dados utilizadas e as instruções para acesso e verificação da implementação que deve estar funcional no ambiente de hospedagem.

Para cada requisito funcional, pode ser entregue um artefato desse tipo.

O professor Rommel Carneiro apresenta alguns exemplos prontos para serem utilizados como referência:
- Login do sistema: [https://repl.it/@rommelpuc/LoginApp](https://repl.it/@rommelpuc/LoginApp) 
- Cadastro de Contatos: [https://repl.it/@rommelpuc/Cadastro-de-Contatos](https://repl.it/@rommelpuc/Cadastro-de-Contatos)


> **Links Úteis**:
>
> - [Trabalhando com HTML5 Local Storage e JSON](https://www.devmedia.com.br/trabalhando-com-html5-local-storage-e-json/29045)
> - [JSON Tutorial](https://www.w3resource.com/JSON)
> - [JSON Data Set Sample](https://opensource.adobe.com/Spry/samples/data_region/JSONDataSetSample.html)
> - [JSON - Introduction (W3Schools)](https://www.w3schools.com/js/js_json_intro.asp)
> - [JSON Tutorial (TutorialsPoint)](https://www.tutorialspoint.com/json/index.htm)

## Exemplo

## Requisitos Atendidos

As tabelas que se seguem apresentam os requisitos funcionais e não-funcionais que relacionam o escopo do projeto com os artefatos criados:

### Requisitos Funcionais

|ID    | Descrição do Requisito | Responsável | Artefato Criado |
|------|------------------------|------------|-----------------|
|RF-001| O sistema deve permitir que usuárias se registrem com dados básicos (nome, e-mail, telefone). | Stanley | cadastro.html |
|RF-002| O sistema deve garantir que só alunas cadastradas acessem a plataforma. | Giovana | index.html |
|RF-003| O sistema deve organizar cursos por áreas (tecnologia, finanças, empreendedorismo etc.). | Guilherme | cursos.html |
|RF-004| O sistema deve disponibilizar um quiz inicial para recomendar trilhas de aprendizado personalizadas.  | Isabelly | quizPerguntas.html |
|RF-005| O sistema deve proporcionar um ambiente para as usuárias assistirem as aulas. | Raphaela | aula.html |
|RF-006| O sistema deve mostrar percentual de cconclusão de curso em andamento da cada aluna | Giovana | perfil.html |
|RF-007| O sistema deve mostrar histórico de cursos concluídos de cada aluna. | Giovana | perfil.html |  
|RF-008| O sistema deve disponibilizar um espaço onde empresas parceiras acessem perfis das alunas.   |  | .html | 
|RF-009| O sistema deve permitir que ex-alunas ofereçam serviços digitais (planilhas, logos, edições), Marketplace. | | marketplace.html | 
|RF-010| O sistema deve permitir que usuárias compartilhem experiências e comentários.   | Raphaela | comunidade.html | 
|RF-011| O sistema deve permitir que usuárias tirem dúvidas sobre temas de cursos com outras usuárias. | Raphaela | comunidade.html | 
|RF-012| O sistema deve proporcionar um canal de suporte simples as alunas (formulário). | Giovana | index.html | 
|RF-013| O sistema deve permitir usuárias solicitarem mentoria. | Guilherme | .html | 


## Descrição das estruturas:

## Notícia
|  **Nome**      | **Tipo**          | **Descrição**                             | **Exemplo**                                    |
|:--------------:|-------------------|-------------------------------------------|------------------------------------------------|
| Id             | Numero (Inteiro)  | Identificador único da notícia            | 1                                              |
| Título         | Texto             | Título da notícia                         | Sistemas de Informação PUC Minas é o melhor                                   |
| Conteúdo       | Texto             | Conteúdo da notícia                       | Sistemas de Informação da PUC Minas é eleito o melhor curso do Brasil                            |
| Id do usuário  | Numero (Inteiro)  | Identificador do usuário autor da notícia | 1                                              |

