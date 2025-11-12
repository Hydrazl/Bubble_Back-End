import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import likeRoutes from './routes/likeRoutes.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json()); // Nós permite fazer o uso do JSON no corpo de requisições
app.use(bodyParser.json())

app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public'))); // Serve arquivos estáticos

// Rotas
app.get('/', (req, res) => {
    res.send('Hello world');
});

app.use('/', postRoutes);
app.use('/', userRoutes);
app.use('/api', likeRoutes);

export default app;