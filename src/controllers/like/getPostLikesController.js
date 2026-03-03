import { Like, User } from "../../models/associations.js";

export const getPostLikes = async (req, res) => {
  try {
    const { postId } = req.params;

    const likes = await Like.findAll({
      where: { postId },
      include: [{
        model: User,
        attributes: ['id', 'username', 'nickname', 'profilePic']
      }]
    });

    return res.status(200).json({
      success: true,
      count: likes.length,
      users: likes.map(like => like.User)
    });
  } catch (error) {
    console.error('Erro em getPostLikes:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Erro ao buscar likes',
      error: error.message 
    });
  }
};