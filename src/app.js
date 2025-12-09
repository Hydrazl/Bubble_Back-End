import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import { fileURLToPath } from 'url';

import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import likeRoutes from './routes/likeRoutes.js';
import followRoutes from './routes/followRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import bubbleRoutes from './routes/bubbleRoutes.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(express.json());
app.use(bodyParser.json());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Arquivos de upload (IMAGENS)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Rotas
app.get('/', (req, res) => {
  res.send('Hello world');
});

app.use('/', postRoutes);
app.use('/', followRoutes);
app.use('/', userRoutes);
app.use('/', likeRoutes);
app.use('/', profileRoutes);
app.use('/notifications', notificationRoutes);
app.use('/bubbles', bubbleRoutes);


export default app;
