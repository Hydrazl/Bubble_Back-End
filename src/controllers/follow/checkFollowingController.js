import { Follow } from '../../models/associations.js';

export const checkFollowingController = async (req, res) => {
  try {
    const { userId } = req.params;
    const followerId = req.user.id;

    const follow = await Follow.findOne({
      where: { followerId, followingId: userId }
    });

    return res.json({ isFollowing: !!follow });
  } catch (error) {
    console.error('Erro no checkFollowing:', error);
    return res.status(500).json({ error: 'Erro ao verificar' });
  }
};