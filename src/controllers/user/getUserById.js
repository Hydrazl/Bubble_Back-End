import Follow from '../../models/followModel.js';
import User from '../../models/userModel.js';

export const getByIdUser = async (req, res) => {
    try {
        const user = await User.findByPK(req.user.id, {
            attributes: ['id', 'username', 'email', 'nickname', 'description', 'admin']
        });

        const followersCount = await Follow.count ({
            where: { followerId: user.id}
        })
        const followingCount = await Follow.count ({
            where: {followingId: user.id}
        })

        res.json({
            ...user.toJSON(),
            followersCount,
            followingCount
        });

    } catch (error) {
        res.status(500).json({ message: 'Erro ao Busar informações do Usuário'});
    }
};