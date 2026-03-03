import { Follow } from '../../models/associations.js';

export const getFollowingCountController = async (req, res) => {
  try {
    const { userId } = req.params;
    const count = await Follow.count({ where: { followerId: userId } });
    return res.json({ count });
  } catch (error) {
    console.error('Erro no getFollowingCount:', error);
    return res.status(500).json({ error: 'Erro ao contar seguindo' });
  }
};