import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class Like extends  Model {}

Like.init(
    {
        userId: { type: DataTypes.INTEGER, allowNull: false},
        postId: { type: DataTypes.INTEGER, allowNull: false }
    },
    {sequelize, modelName: "Like"}
);

export default Like;