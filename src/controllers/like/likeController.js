import Like from '../../models/likeModel.js'

export const toggleLike = async (req, res) => {
    try {
        const { userId, postId } = req.body;

        if (!userId, postId)
            return res.status(400).json({ message: "userID e postID são obrigatórios." });

        const existiLike = await Like.findOne({ where: { userId, postId } });

        if (existiLike) {
            await existiLike.destroy();
            return res.status(200).json({ liked: false ; message: "Like foi removido." });
        }

        await Like.create({ userId, postId });
        res.status(201).json({ liked: true, message: "Like adicionado" });

    }catch (error) {
        console.error("Erro ao processar like:", errpr);
        res.status(500).json({ message: "Erro Interno." });
    }
};

export const getLikesCount = async (req, res) => {
    try {
        const { postId } = req.params;

        const likesCount = await Like.count({ where: { postId } });
        res.status(200).json({ postId, likes: likesCount });

    } catch (error) {
        console.error("Erro ao contar like:", error);
        res.status(500).json({ message: "Erro ao buscar likes." });
    }
};