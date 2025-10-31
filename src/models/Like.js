import { Model, dataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
import Post from './Post.js';

class Like extends  Model {}

Like.init(
    {
        userId: { type: dataTypes.INTEGER, allowNull: false},
        postId: { type: dataTypes.INTEGER, allowNull: false }
    },
    {sequelize, modelName: "Like"}
);

export default Like;