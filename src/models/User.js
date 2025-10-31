import { Model, dataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class User extends  Model {}

User.init(
    {
        id: { type: dataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        username: { type: dataTypes.STRING(25), allowNull: false, unique: true },
        email: { type: dataTypes.STRING, allowNull: false, unique: true },
        password: { type: dataTypes.STRING, allowNull: false },
        nickname: { type: dataTypes.STRING(25), allowNull:false },
        description: { type:dataTypes.STRING(150) }
    },
    {sequelize, modelName: "User"}
);

export default User;