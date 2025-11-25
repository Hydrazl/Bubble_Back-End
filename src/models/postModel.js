import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Post = sequelize.define("Post", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  media: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

export default Post;
