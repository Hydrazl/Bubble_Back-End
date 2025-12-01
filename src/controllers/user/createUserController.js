import bcrypt from "bcrypt";
import User from "../../models/userModel.js";
import { Op } from 'sequelize';

export const registerUser = async (req, res) => {
  try {
    console.log('🔍 DEBUG req.body:', req.body); 
    console.log('🔍 DEBUG Content-Type:', req.headers['content-type']);
    
    const { username, email, password } = req.body;

    // ✅ VALIDAR SE OS CAMPOS CHEGARAM
    if (!username || !email || !password) {
      console.log('❌ Campos faltando:', { username, email, password: password ? '***' : undefined });
      return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    console.log('✅ Dados recebidos:', { username, email });

    // verifica se o e-mail já existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email já cadastrado em outro usuário." });
    }

    console.log('Email disponível');

    // gera hash seguro da senha
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    console.log('Senha hasheada');

    // cria o usuário no banco com a senha criptografada
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      nickname: username
    });

    console.log('Usuário criado:', newUser.id);

    // não retorna a senha na resposta
    const userResponse = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      admin: newUser.admin,
    };

    res.status(201).json({
      message: "Usuário criado com sucesso!",
      user: userResponse,
    });
  } catch (error) {
    console.error('ERRO COMPLETO:', error);
    console.error('Erro message:', error.message);
    console.error('Erro stack:', error.stack);
    res.status(500).json({ 
      message: "Erro na criação do Usuário!",
      error: error.message
    });
  }
};