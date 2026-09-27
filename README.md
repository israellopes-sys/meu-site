# MPB Interativa

Sistema web desenvolvido para a disciplina de Banco de Dados II, utilizando Node.js, Express e TypeScript. A aplicação possui cadastro e autenticação de usuários, catálogo de músicas, comentários e integração com banco de dados.

## Tecnologias

* Node.js
* Express.js
* TypeScript
* Prisma ORM
* SQLite
* Zod
* Nodemailer
* JWT
* bcrypt
* HTML, CSS e JavaScript

## Arquitetura

O back-end segue uma organização baseada em MVC:

```text
controllers/  → regras das requisições
models/       → acesso ao banco via Prisma
routes/       → definição das rotas
middleware/   → autenticação, validação e tratamento de erros
services/     → serviços externos, como envio de e-mail
types/        → tipagens TypeScript
public/       → front-end
prisma/       → schema, migrations e seed
```

## Funcionalidades

* Cadastro e login de usuários.
* Autenticação utilizando JWT.
* Senhas protegidas com bcrypt.
* CRUD de usuários.
* Catálogo e consulta de músicas.
* Comentários autenticados.
* Player de áudio.
* Validação de dados no back-end e front-end.
* Envio de e-mail após cadastro.

## Validação de dados

A API utiliza **Zod** para validar os dados antes que eles cheguem aos Controllers ou ao banco de dados.

São validados:

* Corpo das requisições.
* Parâmetros de rota.
* Parâmetros de consulta.
* E-mail.
* Tamanho mínimo de nome e senha.
* IDs numéricos positivos.

As validações utilizam um middleware genérico:

```ts
validate({ body: cadastroSchema })
validate({ params: idSchema })
validate({ query: musicaQuerySchema })
```

Isso evita repetir regras de validação dentro dos Controllers.

### Tratamento de erros

Os erros são tratados por um middleware centralizado.

* **400** — dados enviados são inválidos.
* **404** — recurso solicitado não existe.
* **409** — conflito, como e-mail já cadastrado.

As respostas de validação informam o campo e a mensagem do erro.

Exemplo:

```json
{
    "erro": "Dados inválidos",
    "detalhes": [
        {
            "campo": "email",
            "mensagem": "Informe um e-mail válido"
        }
    ]
}
```

## Envio de e-mail

O projeto utiliza **Nodemailer** para envio de e-mails através de SMTP.

As configurações são armazenadas em variáveis de ambiente:

```env
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
```

O serviço está isolado em:

```text
services/SendMail.ts
```

Após um cadastro realizado com sucesso, o sistema envia um e-mail de confirmação contendo versões em texto e HTML.

Durante o desenvolvimento, quando não há credenciais SMTP configuradas, é utilizada uma conta de teste do **Ethereal**, que fornece uma URL para visualizar o e-mail enviado.

Caso o envio falhe, o cadastro não é cancelado: o usuário continua sendo criado e o erro é registrado no servidor.

## Front-end

O formulário de cadastro utiliza validação nativa do navegador:

* `required`;
* `minlength`;
* `type="email"`.

A confirmação de senha utiliza `setCustomValidity()` para impedir o envio quando as senhas são diferentes.

Os erros retornados pela API são exibidos próximos aos campos correspondentes.

A validação do front-end melhora a experiência do usuário, mas a proteção dos dados é feita no back-end através do Zod.

## Banco de dados

O projeto utiliza **SQLite** através do Prisma.

Principais entidades:

```text
Usuario
Musica
Comentario
Curtida
Topico
```

As senhas não são armazenadas em texto puro e os registros possuem relacionamentos definidos no Prisma.

## Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="file:../database.db"
JWT_SECRET="SUA_CHAVE_SECRETA"

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
```

O `.env` não deve ser enviado ao repositório. O arquivo `.env.example` contém apenas as variáveis necessárias, sem credenciais.

## Instalação

```bash
npm install
npx prisma generate
npm run migrate
npm run seed
```

## Execução

Modo de desenvolvimento:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Executar a versão compilada:

```bash
npm start
```

A aplicação fica disponível em:

```text
http://localhost:3000
```

## Testes

O arquivo `requests.http` contém testes para:

* cadastro válido;
* cadastro inválido;
* parâmetros de rota inválidos;
* parâmetros de consulta inválidos;
* recurso inexistente;
* e-mail duplicado;
* envio de e-mail;
* rotas autenticadas.

Os testes principais de validação retornam:

```text
201 → cadastro válido
400 → dados inválidos
404 → recurso inexistente
409 → e-mail já cadastrado
```

## Segurança

* Senhas protegidas com bcrypt.
* Autenticação utilizando JWT.
* `JWT_SECRET` armazenado em variável de ambiente.
* Credenciais SMTP fora do código-fonte.
* Rotas protegidas por middleware de autenticação.

## Estrutura resumida

```text
meu-site-main/
├── controllers/
├── models/
├── middleware/
├── routes/
├── services/
├── schemas/
├── types/
├── prisma/
├── public/
├── .env.example
├── .gitignore
├── package.json
├── requests.http
├── prisma.ts
├── server.ts
└── tsconfig.json
```

## Status

O projeto possui atualmente:

* arquitetura MVC;
* TypeScript;
* Prisma e SQLite;
* autenticação JWT;
* bcrypt;
* validação com Zod;
* middleware genérico de validação;
* tratamento centralizado de erros;
* envio de e-mail com Nodemailer;
* integração com SMTP/Ethereal;
* validação e feedback no front-end;
* testes das principais situações da API.
