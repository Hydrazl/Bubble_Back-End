import Post from "../../models/postModel.js";

export async function getPostByIdController(req, res) {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);

    if (!post) {
      return res.status(404).json({ message: "Post não encontrado" });
    }

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar post" });
  }
}