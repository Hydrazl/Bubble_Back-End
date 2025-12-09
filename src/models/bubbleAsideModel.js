import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Bubble = sequelize.define('Bubble', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'bubbles',
    timestamps: false
});

export default Bubble;