import Post from '../../models/postModel.js';

export async function newPostController(req, res) {
    try {
        const { userId, description, mediaURL } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "Usuário não informado." });
        }

        let media = null;

        // Se vier arquivo via Multer
        if (req.file) {
            media = `uploads/${req.file.filename}`;
        }

        // Se vier URL de mídia direto
        else if (mediaURL && mediaURL.trim() !== "") {
            media = mediaURL.trim();
        }

        // Validar se tem pelo menos mídia OU descrição
        if (!description?.trim() && !media) {
            return res.status(400).json({
                message: "Preencha a descrição ou envie uma mídia."
            });
        }

        const newPost = await Post.create({
            userId,
            description: description?.trim() || null,
            media
        });

        return res.status(201).json({
            message: "Post criado com sucesso!",
            post: newPost
        });

    } catch (err) {
        console.error("Erro na criação do post:", err);
        return res.status(500).json({
            message: "Erro ao tentar criar o post"
        });
    }
}
