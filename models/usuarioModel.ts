import prisma from '../prisma';

const Usuario = {
    criar: async (nome: string, email: string, senha: string) => {
        return await prisma.usuario.create({
            data: { nome, email, senha }
        });
    },

    listar: async () => {
        return await prisma.usuario.findMany();
    },

    buscarPorEmail: async (email: string) => {
        return await prisma.usuario.findUnique({
            where: { email }
        });
    },

    atualizar: async (id: number, nome: string, email: string, senha: string) => {
        return await prisma.usuario.update({
            where: { id_usuario: id },
            data: { nome, email, senha }
        });
    },

    remover: async (id: number) => {
        return await prisma.usuario.delete({
            where: { id_usuario: id }
        });
    }
};

export default Usuario;