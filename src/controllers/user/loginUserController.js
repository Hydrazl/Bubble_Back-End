// src/controllers/user/loginUser.js
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../../models/userModel.js";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // verifica se o usuário existe
    const user = await User.findOne({ where: { email } });
    console.log(user);
    console.log(password, user?.password);
    if (!user)
      return res.status(401).json({ message: "Credenciais inválidas!" });

    // compara senha
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword && password !== user.password) {
      return res.status(401).json({ message: "Credenciais inválidas!" });
    }

    // gera token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "admin-ts",
      { expiresIn: "7d" }
    );

    // retorna resposta
    res.status(200).json({
      message: "Login realizado com sucesso!",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    res.status(500).json({ message: "Erro ao realizar o login." });
  }
};
