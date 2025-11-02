// controllers/post/getPostByIdController.js
import Post from "../../models/postModel.js";

export async function getPostByIdController(req, res) {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id); // Sequelize
    // ou: const post = await Post.findOne({ where: { id } });

    if (!post) {
      return res.status(404).json({ message: "Post não encontrado" });
    }

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar post" });
  }
}


// SIM FIZ COM IA, SO TAVA QUERENDO VER O POST, MY BAD