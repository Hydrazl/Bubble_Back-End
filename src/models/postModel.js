import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Post = sequelize.define("Post", {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  conteudo: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

export default Post;
