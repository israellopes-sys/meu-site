const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
    console.log('Iniciando seed...');

    // =========================================================
    // 1. LIMPAR DADOS ANTIGOS
    // =========================================================

    await prisma.comentario.deleteMany();
    await prisma.curtida.deleteMany();
    await prisma.topico.deleteMany();
    await prisma.musica.deleteMany();
    await prisma.usuario.deleteMany();

    console.log('Dados antigos removidos.');

    // =========================================================
    // 2. CRIAR USUÁRIOS
    // =========================================================

    const senhaIsrael = await bcrypt.hash('123456', 12);
    const senhaMaria = await bcrypt.hash('654321', 12);

    const israel = await prisma.usuario.create({
        data: {
            nome: 'Israel',
            email: 'israel@email.com',
            senha: senhaIsrael
        }
    });

    const maria = await prisma.usuario.create({
        data: {
            nome: 'Maria',
            email: 'maria@email.com',
            senha: senhaMaria
        }
    });

    console.log('Usuários criados.');

    // =========================================================
    // 3. CRIAR MÚSICAS
    // =========================================================

    const musica1 = await prisma.musica.create({
        data: {
            titulo: 'Chega de Saudade',
            artista: 'Tom Jobim'
        }
    });

    const musica2 = await prisma.musica.create({
        data: {
            titulo: 'Aquarela do Brasil',
            artista: 'Ary Barroso'
        }
    });

    const musica3 = await prisma.musica.create({
        data: {
            titulo: 'Anunciação',
            artista: 'Alceu Valença'
        }
    });

    await prisma.musica.create({
        data: {
            titulo: 'Construção',
            artista: 'Chico Buarque'
        }
    });

    await prisma.musica.create({
        data: {
            titulo: 'Garota de Ipanema',
            artista: 'Tom Jobim e Vinicius de Moraes'
        }
    });

    await prisma.musica.create({
        data: {
            titulo: 'Mas que Nada',
            artista: 'Jorge Ben Jor'
        }
    });

    await prisma.musica.create({
        data: {
            titulo: 'Gostava Tanto de Você',
            artista: 'Tim Maia'
        }
    });

    await prisma.musica.create({
        data: {
            titulo: 'Metamorfose Ambulante',
            artista: 'Raul Seixas'
        }
    });

    console.log('Músicas criadas.');

    // =========================================================
    // 4. CRIAR TÓPICOS
    // =========================================================

    await prisma.topico.create({
        data: {
            titulo: 'MPB Clássica',
            descricao: 'Discussões sobre músicas clássicas'
        }
    });

    await prisma.topico.create({
        data: {
            titulo: 'Favoritas',
            descricao: 'Compartilhe suas músicas favoritas'
        }
    });

    console.log('Tópicos criados.');

    // =========================================================
    // 5. CRIAR COMENTÁRIOS USANDO OS IDs REAIS
    // =========================================================

    await prisma.comentario.create({
        data: {
            texto: 'Essa música é incrível!',
            data_comentario: '2026-06-18',
            id_usuario: israel.id_usuario,
            id_musica: musica1.id_musica
        }
    });

    await prisma.comentario.create({
        data: {
            texto: 'Uma das melhores da MPB.',
            data_comentario: '2026-06-18',
            id_usuario: maria.id_usuario,
            id_musica: musica1.id_musica
        }
    });

    await prisma.comentario.create({
        data: {
            texto: 'Gosto muito dessa interpretação.',
            data_comentario: '2026-06-18',
            id_usuario: israel.id_usuario,
            id_musica: musica2.id_musica
        }
    });

    console.log('Comentários criados.');

    console.log('Seed executado com sucesso!');
}

main()
    .catch((erro) => {
        console.error('Erro ao executar seed:', erro);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });