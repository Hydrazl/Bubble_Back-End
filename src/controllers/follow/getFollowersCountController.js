import { Follow } from '../../models/associations.js';

export const getFollowersCountController = async (req, res) => {
  try {
    const { userId } = req.params;
    const count = await Follow.count({ where: { followingId: userId } });
    return res.json({ count });
  } catch (error) {
    console.error('Erro no getFollowersCount:', error);
    return res.status(500).json({ error: 'Erro ao contar seguidores' });
  }
};