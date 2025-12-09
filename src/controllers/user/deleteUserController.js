import User from "../../models/userModel.js";
import Notification from "../../models/notificationModel.js";

export const deleteUser = async (req, res) => {
    try {
        const userId = req.user.id; // user id from JWT token

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        await Notification.destroy({ where: { actorId: userId } });
        await user.destroy();

        res.status(200).json({ message: "Conta excluída com sucesso." });
    } catch (error) {
        console.error("Erro ao excluir usuário:", error);
        res.status(500).json({ message: "Erro ao excluir a conta." });
    }
};
