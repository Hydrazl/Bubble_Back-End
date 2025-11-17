import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Follow extends Model {}

Follow.init (
    {

    },
    {sequelize, modelName: "Follow"}
)

export default Follow;