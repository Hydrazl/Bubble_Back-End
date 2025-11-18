import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Bubble extends Model {}

Bubble.init (
    {
        id: { type:DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type:DataTypes.STRING(15), allowNull: false }
    },
    {sequelize, modelName: "Bubble"}
)

export default Bubble;