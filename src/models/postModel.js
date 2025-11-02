import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class Post extends Model {}

Post.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        description: { type: DataTypes.STRING },
        media: { type: DataTypes.STRING }
    },
    {sequelize, modelName: "Post"}
);

export default Post;