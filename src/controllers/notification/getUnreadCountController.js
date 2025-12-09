import { Notification } from '../../models/associations.js';

export const getUnreadCount = async (req, res) => {
    try {
        const userId = req.user.id;

        const count = await Notification.count({
            where: {
                userId,
                isRead: false
            }
        });

        return res.status(200).json({
            success: true,
            unreadCount: count
        });
    } catch (error) {
        console.error('Erro ao contar notificações não lidas:', error);
        return res.status(500).json({
            success: false,
            message: 'Erro ao contar notificações não lidas',
            error: error.message
        });
    }
};
