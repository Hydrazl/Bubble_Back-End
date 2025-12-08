import Post from '../../models/postModel.js';

export const updatePostController = async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;

        let media = req.file ? req.file.filename : null;

        const post = await Post.findByPk(id);

        if (!post) {
            return res.status(404).json({ error: 'Post não encontrado' });
        }

        if (!media) {
            media = post.media;
        }

        post.description = description ?? post.description;
        post.media = media;

        await post.save();

        return res.json({
            message: 'Post atualizado com sucesso',
            post: {
                id: post.id,
                user: post.userId,
                description: post.description,
                media: post.media,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt
            }
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Erro ao atualizar post' });
    }
};
