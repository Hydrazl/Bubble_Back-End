import app from './src/app.js';
import sequelize from './src/config/database.js';

const PORT = 3000;

async function startServer() {
    try {
        await sequelize.sync({ alter:true });
        console.log("Database has sucessful connected!");
        
        app.listen(PORT, () => {
            console.log(`Server is running on http:localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Database hasn´t connected, check the error!")
    }
}

startServer();