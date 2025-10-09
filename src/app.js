import express from 'express';

const app = express();

app.use(express.json()); // Nós permite fazer o uso do JSON no corpo de requisições

app.get('/', (req, res) => {
    res.send('Hello world');
});

export default app;