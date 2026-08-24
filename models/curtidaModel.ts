import prisma from '../prisma';

const Curtida = {

    curtir: async (
        id_usuario: number,
        id_musica: number
    ) => {

        return await prisma.curtida.create({
            data: {
                id_usuario,
                id_musica
            }
        });

    },


    descurtir: async (
        id_usuario: number,
        id_musica: number
    ) => {

        return await prisma.curtida.delete({
            where: {
                id_usuario_id_musica: {
                    id_usuario,
                    id_musica
                }
            }
        });

    },


    verificar: async (
        id_usuario: number,
        id_musica: number
    ) => {

        return await prisma.curtida.findUnique({
            where: {
                id_usuario_id_musica: {
                    id_usuario,
                    id_musica
                }
            }
        });

    },


    listarPorUsuario: async (
        id_usuario: number
    ) => {

        return await prisma.curtida.findMany({
            where: {
                id_usuario
            },

            include: {
                musica: true
            }
        });

    }

};

export default Curtida;