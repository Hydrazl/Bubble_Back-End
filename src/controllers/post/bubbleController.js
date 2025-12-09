import Bubble from "../../models/bubbleAsideModel.js";
import Post from "../../models/postModel.js";
import { User } from "../../models/associations.js";

export const getAllBubbles = async (req, res) => {
    try {
        const bubbles = await Bubble.findAll({
            attributes: ["id", "name"]
        });
        return res.json(bubbles);
    } catch (err) {
        console.error('Erro ao buscar bolha', err);
        return res.status(500).json({ error: 'Erro ao buscar bolha' });
    }
};


export const getPostsFromBubble = async (req, res) => {
    const { id } = req.params;

    try {
        const posts = await Post.findAll({
            where: { bubbleId: id},
            include: [
                {
                    model: User,
                    as: "author",
                    attributes: ["id", "username", "profilePic"]
                }
            ],
            order: [["createdAt", "DESC"]]
        });

        return res.json(posts);
    } catch (err) {
        console.error('Erro ao tentar buscar post na bolha', err);
        return res.status(500).json({ error: "Erro ao buscar posts da bolha" });
    }
};