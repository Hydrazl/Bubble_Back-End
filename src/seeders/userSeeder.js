import User from "../models/userModel.js";

export async function seedUsers() {
  const admin = await User.findOne({ where: {username: 'Admin'}});
  if (!admin) {
    await User.bulkCreate([
      { username: "Admin", email: "Admin@bubble.com", password: "admin007", nickname: "Admin-Ts", admin: true }
    ]);
    console.log("Adm inserido!");
  } else {
    console.log("Adm já existe, seed ignorado.");
  }
}
