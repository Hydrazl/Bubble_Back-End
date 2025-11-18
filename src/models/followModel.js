import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Follow extends Model {}

Follow.init (
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        followerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        followingId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        }
    },
    {sequelize, modelName: "Follow"}
)

export default Follow;