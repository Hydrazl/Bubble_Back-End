import User from "../../models/userModel.js";

export const completeProfile = async (req, res) => {
    try {
        const { userId, nickname, description } = req.body;

        const files = req.files;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        if (!nickname || nickname.trim() === '') {
            return res.status(400).json({ error: 'Nome de exibição é obrigatório' });
        }

        const updateData = {
            nickname: nickname.trim()
        };

        if (description !== undefined && description.trim()) {
            updateData.description = description.trim();
        }

        if (files?.profilePic?.[0]) {
            updateData.profilePic = `uploads/users/profile/${files.profilePic[0].filename}`;
        }

        if (files?.banner?.[0]) {
            updateData.banner = `uploads/users/banner/${files.banner[0].filename}`;
        }

        await User.update(updateData, { where: { id: userId } });

        const updatedUser = await User.findByPk(userId, {
            attributes: ['id', 'nickname', 'username', 'email', 'description', 'profilePic', 'banner']
        });

        return res.json({
            message: 'Perfil completado com sucesso',
            user: updatedUser
        });

    } catch (error) {
        console.error('Erro ao completar perfil:', error);
        return res.status(500).json({ error: 'Erro ao completar perfil' });
    }
};