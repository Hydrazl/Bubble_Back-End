import { Follow, Notification } from '../../models/associations.js';
import { createNotification } from '../notification/createNotificationController.js';

export const followUserController = async (req, res) => {
  try {
    const { userId } = req.params;
    const followerId = req.user.id;

    // Não pode seguir a si mesmo
    if (followerId == userId) {
      return res.status(400).json({ error: 'Você não pode seguir a si mesmo' });
    }

    const existingFollow = await Follow.findOne({
      where: { followerId, followingId: userId }
    });

    if (existingFollow) {
      // Unfollow
      await existingFollow.destroy();

      // Remover notificação de follow se existir
      try {
        await Notification.destroy({
          where: {
            userId,
            actorId: followerId,
            notificationType: 'follow'
          }
        });
      } catch (notifError) {
        console.error('Erro ao remover notificação de follow:', notifError);
      }

      return res.json({ message: 'Deixou de seguir', isFollowing: false });
    } else {
      // Follow
      await Follow.create({ followerId, followingId: userId });

      // Criar notificação para o usuário seguido
      try {
        await createNotification(userId, followerId, 'follow');
      } catch (notifError) {
        console.error('Erro ao criar notificação de follow:', notifError);
      }

      return res.json({ message: 'Começou a seguir', isFollowing: true });
    }
  } catch (error) {
    console.error('Erro no followUser:', error);
    return res.status(500).json({ error: 'Erro ao seguir usuário' });
  }
};