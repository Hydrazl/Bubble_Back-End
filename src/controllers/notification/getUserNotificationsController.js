import { Notification, User, Post } from '../../models/associations.js';

export const getUserNotifications = async (req, res) => {
    try {
        const userId = req.user.id;
        const { limit = 20, offset = 0 } = req.query;

        const notifications = await Notification.findAll({
            where: { userId },
            include: [
                {
                    model: User,
                    as: 'actor',
                    attributes: ['id', 'username', 'nickname', 'profilePic']
                },
                {
                    model: Post,
                    as: 'post',
                    attributes: ['id', 'description', 'media'],
                    required: false
                }
            ],
            order: [['createdAt', 'DESC']],
            limit: parseInt(limit),
            offset: parseInt(offset)
        });

        return res.status(200).json({
            success: true,
            notifications,
            count: notifications.length
        });
    } catch (error) {
        console.error('Erro ao buscar notificações:', error);
        return res.status(500).json({
            success: false,
            message: 'Erro ao buscar notificações',
            error: error.message
        });
    }
};
