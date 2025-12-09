import Post from '../../models/postModel.js';

export async function newPostController(req, res) {
    try {
        // Pegando os dados do body, incluindo bubbleId
        const { userId, description, mediaURL, bubbleId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "Usuário não informado." });
        }

        let media = null;

        // Se veio arquivo via Multer
        if (req.file) {
            media = `posts/${req.file.filename}`;
        } 
        // Se veio URL de mídia direto
        else if (mediaURL && mediaURL.trim() !== "") {
            media = mediaURL.trim();
        }

        // Validar se tem pelo menos descrição ou mídia
        if (!description?.trim() && !media) {
            return res.status(400).json({
                message: "Preencha a descrição ou envie uma mídia."
            });
        }

        // Criar o post somente para a bolha selecionada
        const newPost = await Post.create({
            userId,
            description: description?.trim() || null,
            media,
            bubbleId: bubbleId ? parseInt(bubbleId) : null
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
