# FeedBack

O FeedBack é um pequeno Web App criado para postar avaliações sobre usuários da própria plataforma, possui um **frontend** em `HTML5`, `CSS3` e `JavaScript` e um **backend** em `Node.js`, tendo como principais framework's o `Express.js` e `Handlebars`, alimentado por uma base dados em `SQLite`.

## Estrutura do projeto
```txt
├── config # Estratégias de autenticação.
├── helpers # Regras de renderização das paginas
├── models # Classes das tabelas.
├── modules # Modulos do sistema.
├── public # Arquivos estaticos do sistema.
│   ├── css # Design das paginas do sistema.
│   ├── img # Imagens estaticas do sistema.
│   ├── js # das paginas do sistema.
│   ├── script_paginas # Scripts individuais.
│   ├── base.html # Eestrutura basica das paginas.
│   └── menu.html # Menu do sistema.
│
├── routes # Rotas das paginas do sistema.
├── views # Templates das paginas do sistema.
├── .gitignore # Arquivos exclusos do git.
├── app.js # Script principal do sistema.
├── db.sqlite # Base de Dados do sistema.
├── package-lock.json # Espeficicações das dependências do sistema.
├── package.json # Dependências do sistema.
└── README.md # Descrição do projeto.
```

## Instalação

Com o [Node.js](https://nodejs.org/en/download/) devidamente instalado e configurado, entre na pasta `feedback`.
  ```bash
    cd feedback
  ```
Instalando as dependências.
  ```bash
    npm install package.json
  ```
Iniciando o servidor.
  * ### Produção.
    ```bash
      npm run start
    ```
  * ### Homologação.
    ```bash
      npm run dev
    ```
No navegador acesse o endereço [localhost:3000](http://localhost:3000)

## Como usar
  * O acesso e visualização das `avaliações` é livre para qualquer vistante.
  * Todas as `avaliações` podem ser visualizadas em [localhost:3000/avaliacoes](http://localhost:3000/avaliacoes).
  * Para postar uma avaliação sobre algum usuário da plataforma é necessário ter uma conta e estar logado nela.
  * Já existem 2 usuários pré cadastrados no banco:
    * usuário => `jeduardoferreira@hotmail.com` senha => `123456`.
    * usuário => `nathalia_162010@hotmail.com` senha => `654321`.
  * Uma nova conta pode ser criada em [localhost:3000/cadastre-se](http://localhost:3000/cadastre-se).
  * Uma conta pode ser acessada em [localhost:3000/login](http://localhost:3000/login).

