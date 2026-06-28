import prisma from '../prisma';

const Comentario = {
    listarPorMusica: async (idMusica: number) => {
        return await prisma.comentario.findMany({
            where: {
                id_musica: Number(idMusica)
            },
            include: {
                usuario: true
            }
        });
    },

    criar: async (
        texto: string,
        dataComentario: string,
        idUsuario: number,
        idMusica: number
    ) => {
        return await prisma.comentario.create({
            data: {
                texto,
                data_comentario: dataComentario,
                id_usuario: Number(idUsuario),
                id_musica: Number(idMusica)
            }
        });
    }
};

export default Comentario;