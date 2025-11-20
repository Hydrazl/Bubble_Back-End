import bcrypt from "bcrypt";
import User from "../../models/userModel.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, nickname } = req.body;

    // verifica se o e-mail já existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email já cadastrado em outro usuário." });
    }

    // gera hash seguro da senha
    const saltRounds = 10; // nível de segurança
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // cria o usuário no banco com a senha criptografada
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      nickname,
    });

    // não retorna a senha na resposta
    const userResponse = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      nickname: newUser.nickname,
      role: newUser.role,
    };

    res.status(201).json({
      message: "Usuário criado com sucesso!",
      user: userResponse,
    });
  } catch (error) {
    console.error(`Erro ao criar o Usuário: ${error}`);
    res.status(500).json({ message: "Erro na criação do Usuário!" });
  }
};

console.log("Arquivo createUserController.js carregado!");
