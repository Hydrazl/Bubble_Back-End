import { Notification } from '../../models/associations.js';

export const createNotification = async (userId, actorId, type, postId = null) => {
    try {
        if (userId === actorId) {
            return null;
        }
        const existingNotification = await Notification.findOne({
            where: {
                userId,
                actorId,
                notificationType: type,
                ...(postId && { postId }),
                isRead: false
            }
        });

        if (existingNotification) {
            return existingNotification;
        }
        const notification = await Notification.create({
            userId,
            actorId,
            notificationType: type,
            postId
        });

        return notification;
    } catch (error) {
        console.error('Erro ao criar notificação:', error);
        throw error;
    }
};
