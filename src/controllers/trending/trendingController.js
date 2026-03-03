// controllers/trendingController.js
import  User  from '../../models/userModel.js';
import  Post  from '../../models/postModel.js';
import '../../models/associations.js';
import Sequelize from 'sequelize';

const Op = Sequelize.Op;

export async function getTopUsers(req, res) {
  try {
    // Top 5 usuários ordenados por followersCount (decrescente)
    const users = await User.findAll({
      attributes: ['id', 'username', 'profilePic', 'followersCount'],
      order: [['followersCount', 'DESC']],
      limit: 5
    });

    // Retornar com formato simples
    return res.json(users);
  } catch (error) {
    console.error('Erro em getTopUsers:', error);
    return res.status(500).json({ error: 'Erro ao obter top users' });
  }
}

export async function getTopPosts(req, res) {
  try {
    // Buscar posts ordenados por likesCount (decrescente)
    // Incluir o author para exibir username/profilePic no frontend
    const posts = await Post.findAll({
      attributes: ['id', 'description', 'media', 'likesCount', 'createdAt'],
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'username', 'profilePic']
        }
      ],
      order: [['likesCount', 'DESC']],
      limit: 5
    });

    // Produzimos um campo "title" porque seu modelo Post não tem title.
    const transformed = posts.map(p => {
      // deriveTitle: se existir campo de título real, substitua aqui
      let title = null;
      // se, no futuro, Post ganhar title, use: title = p.title ?? ...
      if (p.description && p.description.trim().length > 0) {
        title = p.description.trim().slice(0, 120); // pedaço da descrição
      } else {
        title = 'Untitled';
      }

      return {
        id: p.id,
        title,
        likesCount: p.likesCount,
        author: p.author ? {
          id: p.author.id,
          username: p.author.username,
          profilePic: p.author.profilePic
        } : null,
        createdAt: p.createdAt
      };
    });

    return res.json(transformed);
  } catch (error) {
    console.error('Erro em getTopPosts:', error);
    return res.status(500).json({ error: 'Erro ao obter top posts' });
  }
}

export async function getBubblesPlaceholder(req, res) {
  return res.json({ message: 'Em breve — seção de Bolhas será implementada.' });
}
