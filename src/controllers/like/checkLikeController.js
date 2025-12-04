import { Like } from "../../models/associations.js";

export const checkLike = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const like = await Like.findOne({
      where: { userId, postId }
    });

    return res.status(200).json({
      success: true,
      liked: !!like
    });
  } catch (error) {
    console.error('Erro em checkLike:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Erro ao verificar like',
      error: error.message 
    });
  }
};