import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import { fileURLToPath } from 'url';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import likeRoutes from './routes/likeRoutes.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json()); // Nós permite fazer o uso do JSON no corpo de requisições
app.use(bodyParser.json())


app.use(cors({
  origin: "http://localhost:5173", // porta do seu React
  credentials: true
}));

app.use("/uploads", express.static("uploads"));
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads'))); // Serve arquivos estáticos

// Rotas
app.get('/', (req, res) => {
    res.send('Hello world');
});

app.use('/', postRoutes);
app.use('/', userRoutes);
app.use('/like', likeRoutes);

export default app;