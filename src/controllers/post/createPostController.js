import Post from '../../models/postModel.js'

export async function newPostController(req, res) {
    try {
        const { userId, description, mediaURL } = req.body;
        let media = null;

        // Diferenciar se é um arquivo ou URL
        if (req.file) {
            media = `uploads/${req.file.filename}`; // Em caso de ser arquivo
        } else  if (mediaURL) {
           media = mediaURL ; // Em caso de ser link
        }
        
        // Validação do Post
        if (!description && !media ) {
            return res.status(400).json ({ message: "Preencha um dos campos para realizar a sua postagem."});
        } 
        
        // Criação do Post
        const newPost =  await Post.create ({ userId, description, media});
        
        res.status(201).json({ message: "Post criado com sucesso!", post: newPost});
    } catch (error) {
        console.error("Erro na criação do post", error);
        res.status(500).json({ message: "Erro ao tentar criar o post" });
    }
}