import { Notification } from '../../models/associations.js';

export const markAsRead = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        if (id) {
            // Marcar uma notificação específica como lida
            const notification = await Notification.findOne({
                where: { id, userId }
            });

            if (!notification) {
                return res.status(404).json({
                    success: false,
                    message: 'Notificação não encontrada'
                });
            }

            notification.isRead = true;
            await notification.save();

            return res.status(200).json({
                success: true,
                message: 'Notificação marcada como lida',
                notification
            });
        } else {
            // Marcar todas as notificações como lidas
            await Notification.update(
                { isRead: true },
                { where: { userId, isRead: false } }
            );

            return res.status(200).json({
                success: true,
                message: 'Todas as notificações foram marcadas como lidas'
            });
        }
    } catch (error) {
        console.error('Erro ao marcar notificação como lida:', error);
        return res.status(500).json({
            success: false,
            message: 'Erro ao marcar notificação como lida',
            error: error.message
        });
    }
};
