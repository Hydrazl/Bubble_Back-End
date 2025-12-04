import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class User extends Model {}

User.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        username: { type: DataTypes.STRING(25), allowNull: false, unique: true },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
        nickname: { type: DataTypes.STRING(25), allowNull:true, defaultValue: null },
        admin: { type: DataTypes.BOOLEAN, defaultValue: false },
        description: { type: DataTypes.STRING(150) },
        profilePic: { type: DataTypes.STRING },
        banner: { type: DataTypes.STRING },
        postCount: { type: DataTypes.INTEGER, defaultValue: 0 },
        followersCount: { type: DataTypes.INTEGER, defaultValue: 0 },
        followingCount: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    {sequelize, modelName: "User"}
);

export default User;