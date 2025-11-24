import User from '../../models/userModel.js';

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

        res.json({
            id: user.id,
            username: user.username,
            email: user.email,
            nickname: user.nickname,
            description: user.description,
            banner: user.banner,
            profilePic: user.profilePic, 
            followersCount: 0, // Por enquanto fixo
            followingCount: 0, // Por enquanto fixo
            bubbleCount: 0
        });

    } catch (error) {
        console.error('❌ Erro:', error);
        res.status(500).json({ 
            message: 'Erro ao buscar informações do Usuário', 
            error: error.message 
        });
    }
};