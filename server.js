import dotenv from 'dotenv';
dotenv.config();

import app from './src/app.js';
import sequelize from './src/config/database.js';
import { seedUsers } from "./src/seeders/userSeeder.js";
import { seedBubbles } from './src/seeders/bubbleSeeder.js';

const PORT = process.env.PORT || 4000

async function startServer() {
    try {
        await sequelize.sync();
        console.log("Database has sucessful connected!");
        await seedUsers();
        await seedBubbles();
        
        app.listen(PORT, () => {
            console.log(`Server is running on http:localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Database hasnt connected, check the error!")
        console.error("Detalhes do erro:", error.message);
        console.error(error); // mostra o stack completo
    }
}

startServer();
