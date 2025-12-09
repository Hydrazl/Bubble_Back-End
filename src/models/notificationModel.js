import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

class Notification extends Model { }

Notification.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Usuário que receberá a notificação'
    },
    actorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Usuário que realizou a ação (curtiu ou seguiu)'
    },
    notificationType: {
        type: DataTypes.ENUM('like', 'comment', 'follow'),
        allowNull: false
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    commentId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    isRead: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize,
    modelName: 'Notification',
    tableName: 'notifications',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
});

export default Notification;