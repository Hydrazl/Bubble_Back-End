import User from "../../models/userModel.js";

export const registerUser = async (req, res) => {
    try {
        const { username, email, password, nickname } = req.body;

        // Verificação da existência do Email no DB
        const existingUser = await User.findOne({ where: { email } })
        if (existingUser) {
            return res.status(400).json({ message: "email já cadastrado em outro usuário."});
        }

        const newUser = await User.create({ username, email, password, nickname });
        res.status(201).json(newUser)
        
    } catch (error) {
        console.error(`Erro ao criar o Usuário ${error}`)
        res.status(500).json({ message: "Erro na criação do Usuário!" });
    }
}