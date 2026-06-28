# CONTEXTO DO PROJETO - BANCO DE DADOS II

## Objetivo

Projeto da disciplina Banco de Dados II utilizando:

* Node.js
* Express.js
* Prisma ORM
* SQLite
* Arquitetura MVC
* Front-end em HTML/CSS/JavaScript

Atualmente está sendo migrado para TypeScript (obrigatório).

---

# Estrutura do projeto

controllers/

* comentarioController.js
* musicaController.js
* usuarioController.js

models/

* comentarioModel.js
* musicaModel.js
* usuarioModel.js

routes/

* comentarioRoutes.js
* musicaRoutes.js
* usuarioRoutes.js

public/

* index.html
* login.html
* home.html
* musica.html
* comentarios.html
* usuarios.html
* css/
* js/

prisma/

* schema.prisma
* migrations/
* seed.js

database/

* migrations/
* seeds/
* db.js

Arquivos principais:

* server.js
* prisma.js
* prisma.config.ts
* package.json
* database.db
* teste.http

---

# Banco de Dados

Tabelas existentes:

* Usuario
* Musica
* Comentario
* Curtida
* Topico

Topico NÃO é utilizado pelo sistema.

Curtida existe apenas no banco e ainda não possui funcionalidade.

---

# Prisma

Já configurado.

schema.prisma contém:

* Usuario
* Musica
* Comentario
* Curtida
* Topico

Relacionamentos:

Usuario
↓

Comentario

Musica
↓

Comentario

Usuario
↓

Curtida

Musica
↓

Curtida

Migration criada.

Seed funcionando.

Prisma Client funcionando.

---

# Models migrados para Prisma

✅ UsuarioModel

Foi convertido para Prisma.

Não utiliza mais sqlite3.

Operações:

* listar
* buscarPorId
* criar
* atualizar
* excluir

---

✅ MusicaModel

Foi convertido para Prisma.

Operações:

* listar
* buscarPorId

---

✅ ComentarioModel

Foi convertido para Prisma.

Operações:

* listarPorMusica

Utiliza:

include: {
usuario: true
}

para demonstrar relacionamento no Prisma.

Também possui:

* criar

---

# Controllers migrados

UsuarioController

Convertido para async/await.

---

MusicaController

Convertido para async/await.

---

ComentarioController

Convertido para async/await.

---

# REST Client

Existe:

teste.http

Contém testes das rotas.

---

# Front-end

Funciona atualmente.

Funcionalidades:

Cadastro

Login

Listagem de músicas

Página individual da música

Criação de comentários

CRUD de usuário

Tudo funcionando.

---

# Situação atual

Projeto está funcional.

Login funciona.

Cadastro funciona.

Comentários funcionam.

Músicas funcionam.

Prisma funcionando.

---

# O que NÃO deve ser feito

Não desenvolver Curtidas.

Não desenvolver Topicos.

Não criar novas funcionalidades.

A prioridade agora é concluir os requisitos da disciplina.

---

# Próximos passos

1.

Gerar o ERD do Prisma.

2.

Criar README simples.

3.

Migrar todo o projeto para TypeScript.

---

# Estratégia definida para TypeScript

Não converter tudo de uma vez.

Ordem correta:

1.

Configurar TypeScript

(Concluído)

Foi instalado:

typescript

ts-node

ts-node-dev

@types/node

@types/express

@types/cors

@types/morgan

Foi criado:

tsconfig.json

configurado para CommonJS.

---

Depois converter nesta ordem:

1.

server.js

↓

server.ts

2.

prisma.js

↓

prisma.ts

3.

Models

4.

Controllers

5.

Routes

6.

Scripts do Front-end

---

Importante:

Não alterar funcionalidades durante a migração.

Migrar apenas linguagem.

Testar após cada arquivo convertido.

---

# Observações importantes

O professor exige TypeScript.

O navegador NÃO executa TypeScript diretamente.

Os arquivos .ts deverão ser compilados para .js.

HTML permanece HTML.

CSS permanece CSS.

Os scripts do frontend serão convertidos para .ts e compilados.

---

# Estado atual

Prisma: 100%

MVC: praticamente concluído

CRUD: funcionando

Banco: funcionando

REST Client: funcionando

Front-end: funcionando

Pendências principais:

* ERD
* README
* Migração completa para TypeScript

---

# Próximo arquivo da migração

server.js

Será o primeiro arquivo convertido para TypeScript.
