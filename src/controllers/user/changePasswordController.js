import bcrypt from "bcrypt";
import User from "../../models/userModel.js";

export const changePassword = async (req, res) => {
    try {
        const userId = req.user.id;
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: "As senhas antiga e nova são obrigatórias!" });
        }

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        const validPassword = await bcrypt.compare(oldPassword, user.password);

        if (!validPassword) {
            return res.status(401).json({ message: "A senha antiga está incorreta." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Senha alterada com sucesso!" });

    } catch (error) {
        console.error("Erro ao alterar senha:", error);
        res.status(500).json({ message: "Erro ao alterar a senha." });
    }
};
