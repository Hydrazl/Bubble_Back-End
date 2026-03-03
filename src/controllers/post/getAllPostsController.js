import { Post, User } from '../../models/associations.js';
import { Op } from 'sequelize';

export const getAllPostsController = async (req, res) => {
  try {
    const { userId, keyword, bubbleId, limit = 20, page = 1 } = req.query;

    const whereClause = {};

    if (userId) whereClause.userId = userId;
    if (keyword) whereClause.description = { [Op.like]: `%${keyword}%` };
    if (bubbleId) whereClause.bubbleId = parseInt(bubbleId); 

    const posts = await Post.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'author',
          attributes: ["id", "nickname", "username", "profilePic"]
        },
      ],
      attributes: [
        'id', 'description', 'createdAt',
        'likesCount', 'commentsCount', 'media'
      ],
      order: [["createdAt", "DESC"]],
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit),
    });

    res.status(200).json(posts);
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    res.status(500).json({ message: "Erro ao buscar posts." });
  }
};
