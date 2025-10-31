import { Model, dataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class Post extends  Model {}

Post.init(
    {
        id: { type: dataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        description: { type: dataTypes.STRING },
        media: { type: dataTypes.STRING }
    },
    {sequelize, modelName: "Post"}
);

export default Post;