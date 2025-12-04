import { Like, Post } from "../../models/associations.js";

export const toggleLike = async (req, res) => {
  try {
    console.log('🔍 req.user:', req.user);
    const { postId } = req.params;
    const userId = req.user.id; // Vem do middleware de autenticação

    // Verifica se o post existe
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ 
        success: false,
        message: 'Post não encontrado' 
      });
    }

    // Verifica se já deu like
    const existingLike = await Like.findOne({
      where: { userId, postId }
    });

    if (existingLike) {
      // Remove o like
      await existingLike.destroy();
      
      // Recarrega o post para pegar o likesCount atualizado (por causa do hook)
      await post.reload();
      
      return res.status(200).json({
        success: true,
        liked: false,
        message: 'Like removido com sucesso',
        likesCount: post.likesCount // Retorna o contador atualizado
      });
    } else {
      // Adiciona o like
      await Like.create({ userId, postId });
      
      // Recarrega o post para pegar o likesCount atualizado (por causa do hook)
      await post.reload();
      
      return res.status(201).json({
        success: true,
        liked: true,
        message: 'Like adicionado com sucesso',
        likesCount: post.likesCount // Retorna o contador atualizado
      });
    }
  } catch (error) {
    console.error('Erro em toggleLike:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Erro ao processar like',
      error: error.message 
    });
  }
};