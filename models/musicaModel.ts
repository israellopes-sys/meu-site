import prisma from '../prisma';

const Musica = {
    listar: async () => {
        return await prisma.musica.findMany();
    },

    buscarPorId: async (id: number) => {
        return await prisma.musica.findUnique({
            where: {
                id_musica: id
            }
        });
    }
};

export default Musica;