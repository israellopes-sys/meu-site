import prisma from '../prisma';

const Usuario = {

    criar: async (
        nome: string,
        email: string,
        senha: string
    ) => {

        return await prisma.usuario.create({
            data: {
                nome,
                email,
                senha
            }
        });

    },

    contarComentarios: async (id: number) => {
        return await prisma.comentario.count({
            where: {
                id_usuario: id
            }
        });
    },


    listar: async () => {

        return await prisma.usuario.findMany();

    },


    buscarPorId: async (
        id: number
    ) => {

        return await prisma.usuario.findUnique({
            where: {
                id_usuario: id
            }
        });

    },


    buscarPorEmail: async (
        email: string
    ) => {

        return await prisma.usuario.findUnique({
            where: {
                email
            }
        });

    },


    atualizar: async (
        id: number,
        nome: string,
        email: string,
        senha?: string
    ) => {

        const dados: {
            nome: string;
            email: string;
            senha?: string;
        } = {
            nome,
            email
        };


        if (senha) {
            dados.senha = senha;
        }


        return await prisma.usuario.update({
            where: {
                id_usuario: id
            },
            data: dados
        });

    },


    remover: async (
        id: number
    ) => {

        return await prisma.usuario.delete({
            where: {
                id_usuario: id
            }
        });

    }

};

export default Usuario;