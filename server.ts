import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';

// Importações modernas das rotas que acabamos de corrigir!
import usuarioRoutes from './routes/usuarioRoutes';
import comentarioRoutes from './routes/comentarioRoutes';
import musicaRoutes from './routes/musicaRoutes';

const app: Express = express();

console.log("INICIOU");

// Middlewares globais
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Ativando as rotas sem o perigo de virem 'undefined'
app.use(usuarioRoutes);
app.use(musicaRoutes);
app.use(comentarioRoutes);

// Ligando o servidor na porta 3000
app.use((req, res, next) => {
    res.status(404).json({ erro: 'Rota não encontrada' });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000 🚀');
});