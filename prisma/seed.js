const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {

  await prisma.usuario.createMany({
    data: [
      {
        nome: 'Israel',
        email: 'israel@email.com',
        senha: '123456'
      },
      {
        nome: 'Maria',
        email: 'maria@email.com',
        senha: '654321'
      }
    ]
  });

  await prisma.musica.createMany({
    data: [
      { titulo: 'Chega de Saudade', artista: 'Tom Jobim' },
      { titulo: 'Aquarela do Brasil', artista: 'Ary Barroso' },
      { titulo: 'Anunciação', artista: 'Alceu Valença' },
      { titulo: 'Construção', artista: 'Chico Buarque' },
      { titulo: 'Garota de Ipanema', artista: 'Tom Jobim e Vinicius de Moraes' },
      { titulo: 'Mas que Nada', artista: 'Jorge Ben Jor' },
      { titulo: 'Gostava Tanto de Você', artista: 'Tim Maia' },
      { titulo: 'Metamorfose Ambulante', artista: 'Raul Seixas' }
    ]
  });

  await prisma.topico.createMany({
    data: [
      {
        titulo: 'MPB Clássica',
        descricao: 'Discussões sobre músicas clássicas'
      },
      {
        titulo: 'Favoritas',
        descricao: 'Compartilhe suas músicas favoritas'
      }
    ]
  });

  await prisma.comentario.createMany({
    data: [
      {
        texto: 'Essa música é incrível!',
        data_comentario: '2026-06-18',
        id_usuario: 1,
        id_musica: 1
      },
      {
        texto: 'Uma das melhores da MPB.',
        data_comentario: '2026-06-18',
        id_usuario: 2,
        id_musica: 1
      },
      {
        texto: 'Gosto muito dessa interpretação.',
        data_comentario: '2026-06-18',
        id_usuario: 1,
        id_musica: 2
      }
    ]
  });

  console.log("Seed executado com sucesso!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());