import User from "../../models/userModel.js";

export async function getProfile(req, res) {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId);

    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar perfil" });
  }
}

export async function updateProfile(req, res) {
  try {
    const userId = req.user.id;
    const { nickname, username, description } = req.body;

    const updateData = { nickname, username, description };

    if (req.files?.banner)
      updateData.banner = `uploads/${req.files.banner[0].filename}`;

    if (req.files?.profilePic)
      updateData.profilePic = `uploads/${req.files.profilePic[0].filename}`;

    await User.update(updateData, { where: { id: userId } });

    res.json({ message: "Atualizado" });
  } catch (err) {
    res.status(500).json({ message: "Erro ao atualizar perfil" });
  }
}
