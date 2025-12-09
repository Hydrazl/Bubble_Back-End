// controllers/trendingController.js
import Post from "../../models/postModel.js";
import User from "../../models/userModel.js";
import "../../models/associations.js";

export async function getTrendingPosts(req, res) {
    try {
        const posts = await Post.findAll({
            attributes: ["id", "description", "media", "likesCount", "createdAt"],
            include: [
                {
                    model: User,
                    as: "author",
                    attributes: ["id", "username"]
                }
            ],
            order: [["likesCount", "DESC"]],
            limit: 9
        });

        return res.json(posts);
    } catch (err) {
        console.error("Erro getTrendingPosts:", err);
        return res.status(500).json({ error: "Erro ao buscar trending posts" });
    }
}
