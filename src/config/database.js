import { Sequelize } from "sequelize";

const sequelize = new Sequelize('bubble_db', 'root', '123456789', {
    host: 'localhost',
    dialect: 'mysql',
});

async function Connection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

Connection();

export default sequelize;