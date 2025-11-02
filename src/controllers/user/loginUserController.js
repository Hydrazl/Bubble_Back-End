import User from "../../models/userModel.js";

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user || user.password !== password)
            return res.status(401).json({ message: "Credenciais inválidas!" });

        res.status(200).json({ message: `Login realizado com sucesso! ${user}` })
    } catch (error) {
        console.error(`Erro ao entrar na conta ${error}`)
        res.status(500).json({ message: "Erro ao realizar o login." })
    }
};