# MPB Interativa

Sistema web desenvolvido para a disciplina de Banco de Dados II, com foco em gerenciamento de usuários, autenticação, músicas e comentários.

## Tecnologias

* Node.js
* Express.js
* TypeScript
* Prisma ORM
* SQLite
* JWT
* bcrypt
* HTML
* CSS
* JavaScript
* REST Client

## Arquitetura

O backend utiliza uma organização baseada em MVC:

```text
controllers/
models/
routes/
middleware/
types/
public/
prisma/
```

### Principais componentes

* **Controllers:** regras das requisições e respostas da API.
* **Models:** acesso aos dados utilizando Prisma.
* **Routes:** definição dos endpoints.
* **Middleware:** autenticação e validação do JWT.
* **Public:** interface web da aplicação.
* **Prisma:** schema, migrations e seed do banco.

## Funcionalidades

### Usuários

* Cadastro de usuário.
* Login.
* Listagem de usuários.
* Atualização de usuário.
* Exclusão de usuário.
* Validação de senha mínima.
* Validação de e-mail duplicado.

### Autenticação

A autenticação utiliza JWT.

Após o login, a API retorna um token que é armazenado no navegador.

As rotas protegidas exigem o header:

```http
Authorization: Bearer SEU_TOKEN
```

O middleware valida o token e disponibiliza os dados do usuário autenticado em:

```text
req.usuario
```

### Segurança

As senhas são armazenadas utilizando `bcrypt`.

A chave utilizada para assinar os tokens JWT é armazenada na variável de ambiente `JWT_SECRET`.

### Músicas

* Listagem de músicas.
* Consulta de uma música por ID.
* Página individual da música.
* Player de áudio no front-end.

### Comentários

* Listagem de comentários por música.
* Criação de comentários por usuários autenticados.
* O usuário autor do comentário é identificado através do JWT.
* O `id_usuario` não é confiado ao cliente.

### Front-end

A aplicação possui:

* Página de cadastro.
* Página de login.
* Home com catálogo de músicas.
* Player individual.
* Página de comentários.
* Gerenciamento de usuários.
* Logout.
* Redirecionamento para login quando não existe autenticação válida.
* Layout responsivo.

## Banco de Dados

O projeto utiliza SQLite através do Prisma.

Principais entidades:

```text
Usuario
Musica
Comentario
Curtida
Topico
```

Os modelos possuem relacionamentos entre usuários, músicas, comentários e curtidas.

A exclusão de um usuário utiliza exclusão em cascata para seus registros relacionados.

## Configuração do ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="file:../database.db"
JWT_SECRET="SUA_CHAVE_SECRETA"
```

### Importante

O arquivo `.env` não deve ser enviado ao repositório.

O banco local também não deve ser versionado.

Esses arquivos já estão configurados no `.gitignore`.

## Instalação

Clone o projeto e entre na pasta:

```bash
git clone URL_DO_REPOSITORIO
cd meu-site-main
```

Instale as dependências:

```bash
npm install
```

## Prisma

Depois de instalar as dependências, gere o Prisma Client:

```bash
npx prisma generate
```

Para aplicar as migrations:

```bash
npm run migrate
```

Para popular o banco com dados de teste:

```bash
npm run seed
```

O seed pode ser executado novamente para recriar os dados iniciais.

## Executando em desenvolvimento

Use:

```bash
npm run dev
```

O servidor será executado na porta:

```text
3000
```

A aplicação pode ser acessada em:

```text
http://localhost:3000
```

## Build

Para compilar o projeto TypeScript:

```bash
npm run build
```

Os arquivos compilados são gerados na pasta:

```text
dist/
```

## Executando a versão compilada

Depois do build:

```bash
npm start
```

O servidor será iniciado a partir de:

```text
dist/server.js
```

## Testes da API

O projeto possui o arquivo:

```text
requests.http
```

Ele contém testes para:

* cadastro de usuário;
* validação de campos;
* senha menor que 6 caracteres;
* e-mail duplicado;
* login válido;
* login inválido;
* acesso a rota protegida sem token;
* acesso a rota protegida com token;
* atualização autenticada;
* exclusão autenticada;
* criação de comentário autenticada;
* consulta de músicas;
* consulta de comentários.

Para testar rotas protegidas, primeiro faça login e copie o JWT retornado pela API.

## Principais endpoints

### Usuários

```http
POST /usuarios
GET /usuarios
PUT /usuarios/:id
DELETE /usuarios/:id
```

### Autenticação

```http
POST /login
```

### Músicas

```http
GET /musicas
GET /musicas/:id
```

### Comentários

```http
GET /comentarios/:id
POST /comentarios
```

As operações de gerenciamento de usuários e criação de comentários exigem autenticação.

## Estrutura resumida

```text
meu-site-main/
│
├── controllers/
├── models/
├── middleware/
├── routes/
├── types/
│
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.js
│
├── public/
│   ├── css/
│   ├── js/
│   ├── audio/
│   ├── index.html
│   ├── login.html
│   ├── home.html
│   ├── musica.html
│   ├── comentarios.html
│   └── usuarios.html
│
├── .env
├── .gitignore
├── package.json
├── requests.http
├── prisma.ts
├── server.ts
└── tsconfig.json
```

## Status do projeto

O projeto possui atualmente:

* autenticação com JWT;
* senhas protegidas com bcrypt;
* rotas protegidas;
* CRUD de usuários;
* operações com Prisma;
* migrations;
* seed;
* catálogo de músicas;
* player;
* comentários;
* interface responsiva;
* build em TypeScript;
* execução em modo de desenvolvimento e produção.
