import { Post } from '../../models/associations.js';

export const deletePostController = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id; 
        const userRole = Boolean(req.user.admin);

        const post = await Post.findByPk(id);

        if (!post) {
            return res.status(404).json({ message: "Post não encontrado." });
        }

        if (post.userId !== userId && userRole === false) {
            return res.status(403).json({
                message: "Você não tem permissão para deletar este post."
            });
        }

        await post.destroy();
        return res.status(200).json({ message: "Post deletado com sucesso!" });

    } catch (err) {
        console.error("Erro ao deletar post:", err);
        return res.status(500).json({ message: "Erro interno ao deletar post"})
    }
};