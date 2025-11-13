import app from './src/app.js';
import sequelize from './src/config/database.js';
import { seedUsers } from "./src/seeders/userSeeder.js";

const PORT = 4000

async function startServer() {
    try {
        await sequelize.sync();
        console.log("Database has sucessful connected!");
        await seedUsers();
        
        app.listen(PORT, () => {
            console.log(`Server is running on http:localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Database hasn´t connected, check the error!")
        console.error("Detalhes do erro:", error.message);
        console.error(error); // mostra o stack completo
    }
}

startServer();
