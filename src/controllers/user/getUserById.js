import User from '../../models/userModel.js';
import Post from '../../models/postModel.js';
import Follow from '../../models/followModel.js';

export const getByIdUser = async (req, res) => {
    try {
        const { userId } = req.params;
        
        console.log('🔍 Buscando usuário:', userId);

        const user = await User.findByPk(userId, {
            attributes: ['id', 'username', 'email', 'nickname', 'description', 'banner', 'profilePic']
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        console.log('✅ Usuário encontrado:', user.username);
        console.log("🔎 Valor do banner no banco:", user.banner);

        const postsCount = await Post.count({
            where: { userId }
        });

        const followersCount = await Follow.count({
            where: { followingId: userId }
        });

        const followingCount = await Follow.count({
            where: { followerId: userId }
        });

        res.json({
            id: user.id,
            username: user.username,
            email: user.email,
            nickname: user.nickname,
            description: user.description,
            banner: user.banner,
            profilePic: user.profilePic, 
            followersCount: followersCount,
            followingCount: followingCount,
            postsCount: postsCount,
            bubbleCount: user.bubbleCount
        });

    } catch (error) {
        console.error('❌ Erro:', error);
        res.status(500).json({ 
            message: 'Erro ao buscar informações do Usuário', 
            error: error.message 
        });
    }
};