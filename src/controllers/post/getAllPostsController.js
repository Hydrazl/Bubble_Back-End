import Post from "../../models/postModel.js";
import User from "../../models/userModel.js";

export const getAllPostsController = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "nickname", "username", "profilePic"], // Traz apenas os dados necessários do usuário
        },
      ],
      order: [["createdAt", "DESC"]], // Ordena do mais recente para o mais antigo
    });

    res.status(200).json(posts);
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    res.status(500).json({ message: "Erro ao buscar posts." });
  }
};
