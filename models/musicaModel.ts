import prisma from '../prisma';

const Musica = {
    listar: async (nome?: string) => {
        return await prisma.musica.findMany({
            where: nome
                ? {
                    titulo: {
                        contains: nome
                    }
                }
                : undefined
        });
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