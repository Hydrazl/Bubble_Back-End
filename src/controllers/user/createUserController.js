import bcrypt from "bcrypt";
import User from "../../models/userModel.js";
import { Op } from 'sequelize';

export const registerUser = async (req, res) => {
  try {
    console.log('DEBUG req.body:', req.body); 
    console.log('DEBUG Content-Type:', req.headers['content-type']);
    const { username, email, password,} = req.body;

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
    });

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
    console.error(`Erro ao criar o Usuário: ${error}`);
    res.status(500).json({ message: "Erro na criação do Usuário!" });
  }
};

export const completeProfile = async (req, res) => {
  try {
    console.log('Body data (req.body):', req.body); 
    console.log('Files (req.files):', req.files); 
    
    const { userId, nickname, description } = req.body;
    const files = req.files;

    console.log('Step 2 - Completando perfil:', { userId, nickname, description });
    console.log('Arquivos:', files ? Object.keys(files) : 'nenhum');

    // Validações
    if (!userId) {
      return res.status(400).json({ 
        message: "ID do usuário é obrigatório" 
      });
    }

    if (!nickname || !nickname.trim()) {
      return res.status(400).json({ 
        message: "Nickname é obrigatório" 
      });
    }

    // Buscar usuário
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ 
        message: "Usuário não encontrado" 
      });
    }

    // Verificar se nickname já está em uso (por outro usuário)
    const existingNickname = await User.findOne({ 
      where: { 
        nickname: nickname.trim(),
        id: { [Op.ne]: userId } // Excluir o próprio usuário
      } 
    });
    if (existingNickname) {
      return res.status(400).json({ 
        message: "Este nickname já está em uso" 
      });
    }

    // Montar dados para atualização
    const updateData = {
      nickname: nickname.trim()
    };

    // Description é opcional
    if (description !== undefined) {
      updateData.description = description.trim();
    }

    // ProfilePic é opcional
    if (files?.profilePic?.[0]) {
      updateData.profilePic = `uploads/users/profile/${files.profilePic[0].filename}`;
      console.log('📸 Foto de perfil:', updateData.profilePic);
    }

    // Banner é opcional
    if (files?.banner?.[0]) {
      updateData.banner = `uploads/users/banner/${files.banner[0].filename}`;
      console.log('Banner:', updateData.banner);
    }

    console.log('Atualizando usuário com:', updateData);

    // Atualizar usuário
    await user.update(updateData);

    // Buscar usuário atualizado (sem senha)
    const updatedUser = await User.findByPk(userId, {
      attributes: { exclude: ['password'] }
    });

    console.log('Perfil completado com sucesso!');

    res.json({
      success: true,
      message: "Perfil completado com sucesso!",
      user: updatedUser
    });
  } catch (error) {
    console.error('Erro ao completar perfil:', error);
    res.status(500).json({ 
      message: "Erro ao completar perfil",
      error: error.message 
    });
  }
};
