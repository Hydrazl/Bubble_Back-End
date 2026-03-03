import Comment from '../../models/commentModel.js';
import User from '../../models/userModel.js';

export const createComment = async (req, res) => {
    try {
        const { postId, content } = req.body;

        if (!postId || !content || !content.trim()) {
            return res.status(400).json({ message: "Dados inválidos" });
        }

        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: "Usuário não autenticado" });
        }

        // cria o comentário
        const comment = await Comment.create({
            postId,
            userId,
            content
        });

        // busca dados do autor (para enviar ao cliente)
        const author = await User.findByPk(userId, {
            attributes: ['id', 'username', 'profilePic']
        });

        // retorna o comentário enriquecido com author
        return res.status(201).json({
            ...comment.toJSON(),
            author: author ? author.toJSON() : null
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Erro ao criar comentário" });
    }
};


export async function getCommentsByPost(req, res) {
    try {
        const { postId } = req.params;

        const comments = await Comment.findAll({
            where: { postId },
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: User,
                    as: 'author',
                    attributes: ['id', 'username', 'profilePic']
                }
            ]
        });

        res.json(comments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao carregar comentários." });
    }
}


export async function deleteComment(req, res) {
    try {
        // corrigido: pega id do usuário autenticado no req.user
        const userId = req.user?.id;
        const { id } = req.params;

        const comment = await Comment.findByPk(id);

        if (!comment) return res.status(404).json({ error: "Comentário não encontrado." });

        if (comment.userId !== userId)
            return res.status(403).json({ error: "Não autorizado." });

        await comment.destroy();
        res.json({ message: "Comentário removido." });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao deletar comentário." });
    }
}
